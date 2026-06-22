import React, { useState, useEffect, useRef, useCallback } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

// ==================== Types ====================

/** Affix 组件 Props */
export interface AffixProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 距离窗口顶部达到指定偏移量后触发固定模式（像素） */
  offsetTop?: number;
  /** 距离窗口底部达到指定偏移量后触发固定模式（像素） */
  offsetBottom?: number;
  /** 设置 Affix 需要监听其滚动事件的元素，默认为 window */
  target?: () => HTMLElement | Window;
  /** 固定状态改变时的回调函数 */
  onChange?: (affixed: boolean) => void;
}

// ==================== Component ====================

const Affix: React.FC<AffixProps> = ({
  offsetTop = 0,
  offsetBottom,
  target,
  onChange,
  className,
  style,
  children,
  ...rest
}) => {
  // 从 ConfigContext 读取主题配置
  const context = React.useContext(ConfigContext);
  const affixTheme = (context?.components?.Affix || {}) as Record<string, any>;

  // State
  const [affixed, setAffixed] = useState<boolean>(false);

  // Refs
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scrollRafRef = useRef<number>(0);
  const affixedRef = useRef<boolean>(false);
  // 缓存 fixed 前的尺寸，避免 fixed 后测量为 0
  const preFixedSizeRef = useRef<{ width: number; height: number }>({ width: 0, height: 0 });
  // 缓存容器相对于视口的位置，用于计算 fixed 定位
  const containerRectRef = useRef<{ top: number; left: number }>({ top: 0, left: 0 });

  // 获取滚动容器
  const getScrollContainer = useCallback((): HTMLElement | Window => {
    if (target) return target();
    return window;
  }, [target]);

  // 检查是否需要固定
  const checkAffix = useCallback(() => {
    if (!wrapperRef.current) return;

    const container = getScrollContainer();
    const wrapperRect = wrapperRef.current.getBoundingClientRect();
    const containerTop = container === window ? 0 : (container as HTMLElement).getBoundingClientRect().top;
    const containerLeft = container === window ? 0 : (container as HTMLElement).getBoundingClientRect().left;
    const wrapperTop = wrapperRect.top - containerTop;

    // 缓存容器位置，用于 fixed 定位计算
    containerRectRef.current = { top: containerTop, left: containerLeft };

    let shouldBeAffixed = false;

    if (offsetBottom !== undefined) {
      // 基于底部偏移量判断
      const containerHeight = container === window
        ? window.innerHeight
        : (container as HTMLElement).clientHeight;
      const wrapperBottom = wrapperRect.bottom - containerTop;
      shouldBeAffixed = wrapperBottom > containerHeight - offsetBottom;
    } else {
      // 基于顶部偏移量判断（默认行为）
      shouldBeAffixed = wrapperTop <= offsetTop;
    }

    if (shouldBeAffixed !== affixedRef.current) {
      // 切换前缓存当前尺寸
      if (wrapperRef.current && contentRef.current && !shouldBeAffixed) {
        preFixedSizeRef.current = {
          width: wrapperRef.current.offsetWidth,
          height: contentRef.current.offsetHeight,
        };
      }

      affixedRef.current = shouldBeAffixed;
      setAffixed(shouldBeAffixed);
      onChange?.(shouldBeAffixed);
    }
  }, [offsetTop, offsetBottom, getScrollContainer, onChange]);

  // 滚动监听
  const handleScroll = useCallback(() => {
    if (scrollRafRef.current) {
      cancelAnimationFrame(scrollRafRef.current);
    }

    scrollRafRef.current = requestAnimationFrame(() => {
      checkAffix();
    });
  }, [checkAffix]);

  // 初始化滚动监听和 resize 监听
  useEffect(() => {
    const container = getScrollContainer();
    container.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    // 初始计算
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, [handleScroll, getScrollContainer]);

  // 将主题值注入为 CSS 变量
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (affixTheme.zIndex !== undefined) {
    cssVars['--soui-affix-z-index'] = affixTheme.zIndex;
  }

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  // wrapper 留在文档流中，通过显式尺寸撑住原始空间
  const wrapperStyle: React.CSSProperties = {};
  if (affixed) {
    wrapperStyle.width = preFixedSizeRef.current.width;
    wrapperStyle.height = preFixedSizeRef.current.height;
  }

  // 内容元素的 fixed 样式：仅在 affix 激活时应用
  const contentFixedStyle: React.CSSProperties = {};
  if (affixed) {
    contentFixedStyle.position = 'fixed';
    if (offsetBottom !== undefined) {
      // offsetBottom 模式下，fixed 定位相对于视口底部
      contentFixedStyle.bottom = offsetBottom;
    } else {
      // offsetTop 模式下，需要根据容器位置计算正确的 top 值
      // position: fixed 相对于视口，所以需要加上容器相对于视口的位置
      contentFixedStyle.top = containerRectRef.current.top + offsetTop;
      contentFixedStyle.left = containerRectRef.current.left;
    }
    contentFixedStyle.width = preFixedSizeRef.current.width;
  }

  // 合并行内样式
  const mergedContentStyle: React.CSSProperties = { ...componentStyle, ...contentFixedStyle };

  return (
    <div ref={wrapperRef} className="soui-affix-wrapper" style={wrapperStyle}>
      <div
        ref={contentRef}
        className={classNames('soui-affix', { 'soui-affix-fixed': affixed }, className)}
        style={mergedContentStyle}
        {...rest}
      >
        {children}
      </div>
    </div>
  );
};

export default Affix;
