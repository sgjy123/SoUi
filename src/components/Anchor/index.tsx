import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

// ==================== Types ====================

/** 锚点方向 */
export type AnchorDirection = 'vertical' | 'horizontal';

/** 数据化配置项 */
export interface AnchorItem {
  /** 唯一标志 */
  key: string | number;
  /** 锚点链接 */
  href: string;
  /** 文字内容 */
  title: React.ReactNode;
  /** 该属性指定在何处显示链接的资源 */
  target?: string;
  /** 嵌套的子锚点 */
  children?: AnchorItem[];
  /** 替换浏览器历史记录中的项目 href 而不是推送它 */
  replace?: boolean;
}

/** Anchor.Link Props */
export interface AnchorLinkProps {
  /** 锚点链接 */
  href: string;
  /** 文字内容 */
  title?: React.ReactNode;
  /** 该属性指定在何处显示链接的资源 */
  target?: string;
  /** 替换浏览器历史记录中的项目 href 而不是推送它 */
  replace?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 子元素（嵌套的 Anchor.Link） */
  children?: React.ReactNode;
  /** 内部：由父组件注入的点击回调 */
  onLinkClick?: (e: React.MouseEvent<HTMLAnchorElement>, href: string, title: React.ReactNode, replace?: boolean) => void;
}

/** Anchor 主组件 Props */
export interface AnchorProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onClick'> {
  /** 固定模式，当该值为 true 时，Anchor 将固定在页面上 */
  affix?: boolean;
  /** 锚点区域边界，单位 px（滚动到边界外时不再更新高亮） */
  bounds?: number;
  /** 指定滚动的容器 */
  getContainer?: () => HTMLElement | Window;
  /** 自定义高亮的锚点 */
  getCurrentAnchor?: (activeLink: string) => string;
  /** 距离窗口顶部达到指定偏移量后触发固定模式 */
  offsetTop?: number;
  /** affix={false} 时是否显示小方块指示器 */
  showInkInFixed?: boolean;
  /** 锚点滚动偏移量，默认与 offsetTop 相同 */
  targetOffset?: number;
  /** 监听锚点链接改变的回调 */
  onChange?: (currentActiveLink: string) => void;
  /** 点击事件的 handler */
  onClick?: (e: React.MouseEvent<HTMLElement>, link: { title: React.ReactNode; href: string }) => void;
  /** 数据化配置选项内容 */
  items?: AnchorItem[];
  /** 设置导航方向 */
  direction?: AnchorDirection;
  /** 替换浏览器历史记录中项目的 href 而不是推送它 */
  replace?: boolean;
}

// ==================== Utils ====================

/** 根据 href 获取目标元素 */
function getTargetElement(href: string): HTMLElement | null {
  if (!href || href === '#') return null;
  const id = href.startsWith('#') ? href.slice(1) : href;
  return document.getElementById(id);
}

/** 获取元素距离容器顶部/左侧的距离 */
function getOffset(element: HTMLElement, container: HTMLElement | Window, direction: AnchorDirection): number {
  const rect = element.getBoundingClientRect();
  if (container === window) {
    return direction === 'vertical' ? rect.top : rect.left;
  }
  const containerRect = (container as HTMLElement).getBoundingClientRect();
  return direction === 'vertical'
    ? rect.top - containerRect.top
    : rect.left - containerRect.left;
}

/** 从 React children 树中提取所有 AnchorLink 的链接信息 */
function extractLinksFromChildren(
  children: React.ReactNode,
): { href: string; title: React.ReactNode; replace?: boolean }[] {
  const result: { href: string; title: React.ReactNode; replace?: boolean }[] = [];

  const traverse = (nodes: React.ReactNode) => {
    React.Children.forEach(nodes, (child) => {
      if (!React.isValidElement(child)) return;
      const childProps = child.props as AnchorLinkProps;
      if (childProps.href) {
        result.push({
          href: childProps.href,
          title: childProps.title || childProps.href,
          replace: childProps.replace === true,
        });
        if (childProps.children) {
          traverse(childProps.children);
        }
      }
    });
  };

  traverse(children);
  return result;
}

// ==================== Anchor.Link ====================

const AnchorLink: React.FC<AnchorLinkProps> = ({
  href,
  title,
  target,
  replace,
  className,
  children,
  onLinkClick,
}) => {
  return (
    <div className={classNames('soui-anchor-link', className)} data-href={href}>
      <a
        className="soui-anchor-link-title"
        href={href}
        target={target}
        data-replace={replace ? 'true' : undefined}
        title={typeof title === 'string' ? title : undefined}
        onClick={(e) => {
          // 优先使用父组件注入的点击回调
          if (onLinkClick) {
            onLinkClick(e, href, title || href, replace);
          } else {
            e.preventDefault();
          }
        }}
      >
        {title || href}
      </a>
      {children && <div className="soui-anchor-link-children">{children}</div>}
    </div>
  );
};

// ==================== Anchor ====================

const Anchor: React.FC<AnchorProps> = (props) => {
  const {
    affix = true,
    bounds,
    getContainer,
    getCurrentAnchor,
    offsetTop = 0,
    showInkInFixed = false,
    targetOffset,
    onChange,
    onClick,
    items,
    direction = 'vertical',
    replace: globalReplace = false,
    className,
    style,
    children,
    ...rest
  } = props;

  // 安全地获取主题配置（不依赖 ConfigProvider）
  const configContext = React.useContext(ConfigContext);
  const globalTheme = configContext?.theme || {};
  const anchorTheme = (configContext?.components?.Anchor || {}) as any;

  // State
  const [activeLink, setActiveLink] = useState<string>('');
  const [isAffixed, setIsAffixed] = useState<boolean>(false);
  const [inkStyle, setInkStyle] = useState<React.CSSProperties>({});

  // Refs
  const rootRef = useRef<HTMLDivElement>(null);
  const inkRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<Map<string, HTMLElement>>(new Map());
  const scrollRafRef = useRef<number>(0);
  const activeLinkRef = useRef<string>('');
  const isAffixedRef = useRef<boolean>(false);

  const actualTargetOffset = targetOffset ?? offsetTop;

  // 构建链接列表（支持 items 和 children 两种模式）
  const linkList = useMemo(() => {
    const result: { href: string; title: React.ReactNode; replace?: boolean }[] = [];

    if (items) {
      const collectLinks = (itemList: AnchorItem[]) => {
        itemList.forEach((item) => {
          result.push({ href: item.href, title: item.title, replace: item.replace });
          if (item.children) {
            collectLinks(item.children);
          }
        });
      };
      collectLinks(items);
    } else if (children) {
      return extractLinksFromChildren(children);
    }

    return result;
  }, [items, children]);

  // 获取滚动容器
  const getScrollContainer = useCallback((): HTMLElement | Window => {
    if (getContainer) return getContainer();
    return window;
  }, [getContainer]);

  // 计算当前激活的锚点
  const getCurrentActiveLink = useCallback((): string => {
    const container = getScrollContainer();
    const links = linkList.map((link) => ({
      href: link.href,
      element: getTargetElement(link.href),
    }));

    // 过滤掉不存在的目标
    const validLinks = links.filter((l) => l.element !== null) as {
      href: string;
      element: HTMLElement;
    }[];

    if (validLinks.length === 0) return '';

    // 从后往前找到第一个进入视口范围内的锚点
    // 注意：内容始终是垂直滚动的，方向始终用 vertical 检测
    let active = '';
    for (let i = validLinks.length - 1; i >= 0; i--) {
      const link = validLinks[i];
      const offset = getOffset(link.element, container, 'vertical');

      const isInView =
        offset <= actualTargetOffset + 100 && offset + link.element.offsetHeight > actualTargetOffset - 100;

      if (isInView) {
        active = link.href;
        break;
      }
    }

    // 如果没有找到，使用第一个
    if (!active && validLinks.length > 0) {
      active = validLinks[0].href;
    }

    return active;
  }, [linkList, getScrollContainer, actualTargetOffset]);

  // 更新指示器位置
  const updateInkPosition = useCallback(
    (href: string) => {
      const linkElement = linksRef.current.get(href);
      if (!linkElement || !rootRef.current) {
        setInkStyle({ display: 'none' });
        return;
      }

      const rootRect = rootRef.current.getBoundingClientRect();
      const linkRect = linkElement.getBoundingClientRect();

      if (direction === 'vertical') {
        setInkStyle({
          display: 'block',
          top: linkRect.top - rootRect.top + linkElement.offsetHeight / 2,
          height: linkElement.offsetHeight,
          transform: 'translateY(-50%)',
          opacity: 1,
        });
      } else {
        setInkStyle({
          display: 'block',
          left: linkRect.left - rootRect.left + linkElement.offsetWidth / 2,
          width: linkElement.offsetWidth,
          transform: 'translateX(-50%)',
          opacity: 1,
        });
      }
    },
    [direction]
  );

  // 滚动监听（不依赖 isAffixed state，避免频繁重注册）
  const handleScroll = useCallback(() => {
    if (scrollRafRef.current) {
      cancelAnimationFrame(scrollRafRef.current);
    }

    scrollRafRef.current = requestAnimationFrame(() => {
      // 检查 bounds 边界：基于锚点目标元素的位置（内容始终垂直滚动）
      if (bounds !== undefined && linkList.length > 0) {
        const container = getScrollContainer();
        const targetElements = linkList
          .map((link) => getTargetElement(link.href))
          .filter(Boolean) as HTMLElement[];

        if (targetElements.length > 0) {
          const firstTargetTop = getOffset(targetElements[0], container, 'vertical');
          const lastTarget = targetElements[targetElements.length - 1];
          const lastTargetOffset = getOffset(lastTarget, container, 'vertical');
          const lastTargetBottom = lastTargetOffset + lastTarget.offsetHeight;

          const isAboveBounds = firstTargetTop > bounds;
          const isBelowBounds = lastTargetBottom < -bounds;

          if (isAboveBounds || isBelowBounds) {
            if (activeLinkRef.current) {
              activeLinkRef.current = '';
              setActiveLink('');
              setInkStyle({ display: 'none' });
            }
            return;
          }
        }
      }

      let currentActive = getCurrentActiveLink();

      // 自定义高亮逻辑
      if (getCurrentAnchor && currentActive) {
        currentActive = getCurrentAnchor(currentActive);
      }

      if (currentActive !== activeLinkRef.current) {
        activeLinkRef.current = currentActive;
        setActiveLink(currentActive);
        onChange?.(currentActive);
        updateInkPosition(currentActive);
      }

      // 更新 affix 状态（使用 ref 避免闭包陈旧值）
      if (affix && rootRef.current) {
        const container = getScrollContainer();
        const rootRect = rootRef.current.getBoundingClientRect();
        const containerTop =
          container === window ? 0 : (container as HTMLElement).getBoundingClientRect().top;
        const rootTop = rootRect.top - containerTop;

        if (rootTop <= offsetTop && !isAffixedRef.current) {
          isAffixedRef.current = true;
          setIsAffixed(true);
        } else if (rootTop > offsetTop && isAffixedRef.current) {
          isAffixedRef.current = false;
          setIsAffixed(false);
        }
      }
    });
  }, [
    getCurrentActiveLink,
    getCurrentAnchor,
    onChange,
    affix,
    offsetTop,
    direction,
    getScrollContainer,
    bounds,
    linkList,
  ]);

  // 初始化滚动监听
  useEffect(() => {
    const container = getScrollContainer();
    container.addEventListener('scroll', handleScroll, { passive: true });
    // 初始计算
    handleScroll();

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollRafRef.current) {
        cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, [handleScroll, getScrollContainer]);

  // 点击锚点处理
  const handleClick = useCallback(
    (
      e: React.MouseEvent<HTMLElement>,
      href: string,
      title: React.ReactNode,
      linkReplace?: boolean
    ) => {
      e.preventDefault();

      // 浏览器历史记录处理
      const shouldReplace = linkReplace ?? globalReplace;
      try {
        if (shouldReplace) {
          window.history.replaceState(null, '', href);
        } else {
          window.history.pushState(null, '', href);
        }
      } catch {
        // 忽略跨域等异常情况
      }

      const targetElement = getTargetElement(href);
      if (targetElement) {
        const container = getScrollContainer();
        if (container === window) {
          const top = targetElement.getBoundingClientRect().top + window.scrollY - actualTargetOffset;
          window.scrollTo({ top, behavior: 'smooth' });
        } else {
          const containerEl = container as HTMLElement;
          const targetTop =
            targetElement.getBoundingClientRect().top -
            containerEl.getBoundingClientRect().top +
            containerEl.scrollTop -
            actualTargetOffset;
          containerEl.scrollTo({ top: targetTop, behavior: 'smooth' });
        }
      }

      setActiveLink(href);
      activeLinkRef.current = href;
      onClick?.(e, { title, href });

      // 指示器定位延迟执行，等待滚动完成
      setTimeout(() => updateInkPosition(href), 50);
    },
    [globalReplace, actualTargetOffset, getScrollContainer, onClick, updateInkPosition]
  );

  // 渲染 items 模式
  const renderItems = useCallback(
    (itemList: AnchorItem[], level: number = 0): React.ReactNode => {
      return itemList.map((item) => (
        <div
          key={item.key}
          className={classNames('soui-anchor-link', {
            'soui-anchor-link-active': activeLink === item.href,
          })}
          data-href={item.href}
        >
          <a
            className="soui-anchor-link-title"
            href={item.href}
            target={item.target}
            title={typeof item.title === 'string' ? item.title : undefined}
            onClick={(e) => handleClick(e, item.href, item.title, item.replace)}
          >
            <span className="soui-anchor-link-title-content">{item.title}</span>
          </a>
          {item.children && item.children.length > 0 && (
            <div className="soui-anchor-link-children">
              {renderItems(item.children, level + 1)}
            </div>
          )}
        </div>
      ));
    },
    [activeLink, handleClick]
  );

  // 渲染嵌套的 children（递归处理）
  const renderNestedChildren = useCallback(
    (nestedChildren: React.ReactNode): React.ReactNode => {
      return React.Children.map(nestedChildren, (child) => {
        if (!React.isValidElement(child)) return child;
        const childProps = child.props as AnchorLinkProps;
        return React.cloneElement(child, {
          ...childProps,
          className: classNames((child.props as any).className, {
            'soui-anchor-link-active': activeLink === childProps.href,
          }),
          onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string, title: React.ReactNode, replace?: boolean) => {
            handleClick(e, href, title, replace);
          },
          children: childProps.children ? renderNestedChildren(childProps.children) : undefined,
        } as any);
      });
    },
    [activeLink, handleClick]
  );

  // 渲染 children 模式（顶层处理）
  const renderChildren = useCallback((): React.ReactNode => {
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      const childProps = child.props as AnchorLinkProps;

      return React.cloneElement(child, {
        ...childProps,
        className: classNames((child.props as any).className, {
          'soui-anchor-link-active': activeLink === childProps.href,
        }),
        onLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string, title: React.ReactNode, replace?: boolean) => {
          handleClick(e, href, title, replace);
        },
        children: childProps.children ? renderNestedChildren(childProps.children) : undefined,
      } as any);
    });
  }, [children, activeLink, handleClick, renderNestedChildren]);

  // 注册 link 元素到 ref map（用于指示器定位）
  useEffect(() => {
    if (rootRef.current) {
      linksRef.current.clear();
      const linkElements = rootRef.current.querySelectorAll('.soui-anchor-link');
      linkElements.forEach((el) => {
        const href = el.getAttribute('data-href');
        if (href) {
          linksRef.current.set(href, el as HTMLElement);
        }
      });
    }
  });

  // activeLink 变化时同步更新指示器位置（确保 linksRef 已填充）
  useEffect(() => {
    if (activeLink) {
      // 延迟一帧确保 DOM 已渲染
      requestAnimationFrame(() => {
        updateInkPosition(activeLink);
      });
    }
  }, [activeLink, updateInkPosition]);

  // 合并行内样式（使用正确的 CSS 变量名）
  const anchorStyle: React.CSSProperties = {
    ...(anchorTheme?.colorPrimary || globalTheme?.primaryColor
      ? { '--soui-anchor-color-primary': anchorTheme?.colorPrimary || globalTheme?.primaryColor }
      : {}),
    ...(anchorTheme?.fontSize
      ? { '--soui-anchor-font-size': `${anchorTheme.fontSize}px` }
      : {}),
    ...(anchorTheme?.linkPadding !== undefined
      ? { '--soui-anchor-link-padding-block': `${anchorTheme.linkPadding}px` }
      : {}),
    ...(anchorTheme?.inkWidth !== undefined
      ? { '--soui-anchor-ink-width': `${anchorTheme.inkWidth}px` }
      : {}),
    ...style,
  } as any;

  // Anchor 容器类名
  const anchorClassName = classNames(
    'soui-anchor',
    `soui-anchor-${direction}`,
    {
      'soui-anchor-fixed': affix && isAffixed,
      'soui-anchor-static': !affix,
      'soui-anchor-show-ink': !affix || showInkInFixed,
    },
    className
  );

  // affix 固定样式
  const wrapperStyle: React.CSSProperties = {};
  if (affix) {
    if (isAffixed) {
      wrapperStyle.position = 'fixed';
      wrapperStyle.top = offsetTop;
    }
    // 保留占位空间
    wrapperStyle.minHeight = rootRef.current ? `${rootRef.current.offsetHeight}px` : undefined;
  }

  return (
    <div className="soui-anchor-wrapper" style={wrapperStyle}>
      <div ref={rootRef} className={anchorClassName} style={anchorStyle} {...rest}>
        {/* 指示器 */}
        <div
          ref={inkRef}
          className="soui-anchor-ink"
          style={inkStyle}
        >
          <span className="soui-anchor-ink-ball" />
        </div>
        {/* 锚点列表 */}
        <div className="soui-anchor-list">
          {items ? renderItems(items) : renderChildren()}
        </div>
      </div>
    </div>
  );
};

// 附加子组件
(Anchor as any).Link = AnchorLink;

export default Anchor;
export { AnchorLink };
