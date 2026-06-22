import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import './style.less';

// ==================== Types ====================

/** Loading 组件尺寸 */
export type LoadingSize = 'small' | 'default' | 'large';

/** Loading 组件属性 */
export interface LoadingProps {
  /** 是否为加载中状态 */
  spinning?: boolean;
  /** 组件大小 */
  size?: LoadingSize;
  /** 自定义描述文案 */
  tip?: React.ReactNode;
  /** 自定义加载指示器 */
  indicator?: React.ReactNode;
  /** 延迟显示加载效果的时间（毫秒），避免闪烁 */
  delay?: number;
  /** 包装器的类属性 */
  wrapperClassName?: string;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}

// ==================== Default Indicator ====================

/** 默认加载指示器 */
const DefaultIndicator: React.FC<{ size: LoadingSize }> = () => {
  return (
    <span className="soui-loading-dot-spin">
      <i className="soui-loading-dot-item" />
      <i className="soui-loading-dot-item" />
      <i className="soui-loading-dot-item" />
      <i className="soui-loading-dot-item" />
    </span>
  );
};

// ==================== Main Component ====================

const Loading: React.FC<LoadingProps> = ({
  spinning = true,
  size = 'default',
  tip,
  indicator,
  delay,
  wrapperClassName,
  children,
  style,
  className,
}) => {
  // 延迟显示逻辑
  const [shouldShow, setShouldShow] = useState(delay ? false : spinning);
  const delayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (delay && delay > 0) {
      if (spinning) {
        delayTimerRef.current = setTimeout(() => {
          setShouldShow(true);
        }, delay);
      } else {
        setShouldShow(false);
      }
    } else {
      setShouldShow(spinning);
    }

    return () => {
      if (delayTimerRef.current) {
        clearTimeout(delayTimerRef.current);
      }
    };
  }, [spinning, delay]);

  // 判断是否作为包裹元素
  const hasChildren = children !== undefined && children !== null;

  // 渲染指示器
  const renderIndicator = () => {
    if (indicator === null) return null;

    if (indicator) {
      return (
        <span className="soui-loading-custom-indicator">
          {indicator}
        </span>
      );
    }

    return <DefaultIndicator size={size} />;
  };

  // 渲染加载内容
  const renderLoadingElement = () => {
    const spinClassName = classNames(
      'soui-loading',
      {
        'soui-loading-sm': size === 'small',
        'soui-loading-lg': size === 'large',
        'soui-loading-show-text': !!tip,
        'soui-loading-spinning': shouldShow,
      },
      className
    );

    return (
      <div
        className={spinClassName}
        style={style}
        role="status"
        aria-live="polite"
        aria-label={tip ? undefined : '加载中'}
      >
        {renderIndicator()}
        {tip ? <div className="soui-loading-text" aria-hidden="true">{tip}</div> : null}
      </div>
    );
  };

  // 作为包裹元素
  if (hasChildren) {
    const containerClassName = classNames(
      'soui-loading-container',
      {
        'soui-loading-blur': shouldShow,
      }
    );

    const wrapperCls = classNames('soui-loading-nested-loading', wrapperClassName);

    return (
      <div className={wrapperCls} aria-busy={shouldShow}>
        {shouldShow && (
          <div key="loading" className="soui-loading-overlay">
            {renderLoadingElement()}
          </div>
        )}
        <div className={containerClassName} key="container">
          {children}
        </div>
      </div>
    );
  }

  // 独立使用
  if (!shouldShow) return null;

  return renderLoadingElement();
};

export default Loading;
