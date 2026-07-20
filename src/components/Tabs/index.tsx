import React, {
  useState,
  useRef,
  useCallback,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import Icon from '../Icon';
import './style.less';

// ==================== Types ====================

/** 标签项配置 */
export interface TabItem {
  /** 唯一标识 */
  key: string;
  /** 标签头显示内容 */
  label: React.ReactNode;
  /** 标签面板内容 */
  children?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 标签头图标 */
  icon?: React.ReactNode;
  /** 非激活时也渲染面板（适用于表单等需保留状态的场景） */
  forceRender?: boolean;
  /** 是否可关闭（仅 editable-card 模式） */
  closable?: boolean;
}

/** 标签页类型 */
export type TabsType = 'line' | 'card' | 'editable-card';

/** 标签页尺寸 */
export type TabsSize = 'large' | 'middle' | 'small';

/** 标签栏位置 */
export type TabPosition = 'top' | 'bottom' | 'left' | 'right';

/** 编辑操作类型 */
export type EditAction = 'add' | 'remove';

export interface TabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 标签项数组 */
  items?: TabItem[];
  /** 受控：当前激活标签的 key */
  activeKey?: string;
  /** 默认激活标签的 key */
  defaultActiveKey?: string;
  /** 切换标签回调 */
  onChange?: (key: string) => void;
  /** 标签类型 */
  type?: TabsType;
  /** 尺寸 */
  size?: TabsSize;
  /** 标签栏位置 */
  tabPosition?: TabPosition;
  /** 标签头居中 */
  centered?: boolean;
  /** 标签栏额外内容 */
  tabBarExtraContent?: React.ReactNode | { left?: React.ReactNode; right?: React.ReactNode };
  /** 是否开启墨条动画 */
  animated?: boolean;
  /** 标签点击回调 */
  onTabClick?: (key: string, e: React.MouseEvent) => void;
  /** 非激活时销毁面板 */
  destroyInactiveTabPane?: boolean;
  /** 标签之间的间距（像素） */
  tabBarGutter?: number;
  /** 标签栏自定义样式 */
  tabBarStyle?: React.CSSProperties;
  /** 编辑回调（editable-card 模式） */
  onEdit?: (targetKey: string | React.MouseEvent, action: EditAction) => void;
  /** 是否隐藏添加按钮（editable-card 模式） */
  hideAdd?: boolean;
}

// ==================== Component ====================

const Tabs: React.FC<TabsProps> = ({
  items = [],
  activeKey: controlledActiveKey,
  defaultActiveKey,
  onChange,
  type = 'line',
  size = 'middle',
  tabPosition = 'top',
  centered = false,
  tabBarExtraContent,
  animated = true,
  onTabClick,
  destroyInactiveTabPane = false,
  tabBarGutter,
  tabBarStyle,
  onEdit,
  hideAdd = false,
  className,
  style,
  ...rest
}) => {
  const context = useContext(ConfigContext);
  const componentTheme = (context?.components?.Tabs || {}) as Record<string, any>;

  // 主题 CSS 变量
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (componentTheme.colorPrimary !== undefined) {
    cssVars['--soui-tabs-color-primary'] = componentTheme.colorPrimary;
  }
  if (componentTheme.fontSize !== undefined) {
    cssVars['--soui-tabs-font-size'] = `${componentTheme.fontSize}px`;
  }
  if (componentTheme.borderRadius !== undefined) {
    cssVars['--soui-tabs-border-radius'] = `${componentTheme.borderRadius}px`;
  }
  if (componentTheme.itemActiveColor !== undefined) {
    cssVars['--soui-tabs-item-active-color'] = componentTheme.itemActiveColor;
  }
  if (componentTheme.cardBg !== undefined) {
    cssVars['--soui-tabs-card-bg'] = componentTheme.cardBg;
  }

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  // ==================== State ====================
  const firstKey = items.length > 0 ? items[0].key : '';
  const [innerActiveKey, setInnerActiveKey] = useState<string>(defaultActiveKey ?? firstKey);
  const activeKey = controlledActiveKey !== undefined ? controlledActiveKey : innerActiveKey;

  // 墨条位置
  const navRef = useRef<HTMLDivElement>(null);
  const [inkStyle, setInkStyle] = useState<React.CSSProperties>({});

  // 滚动相关
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(false);

  // 用 ref 缓存回调，避免不必要的重渲染
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const onTabClickRef = useRef(onTabClick);
  onTabClickRef.current = onTabClick;
  const onEditRef = useRef(onEdit);
  onEditRef.current = onEdit;

  const isHorizontal = tabPosition === 'top' || tabPosition === 'bottom';

  // ==================== Scroll ====================
  const checkOverflow = useCallback(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    if (isHorizontal) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollEl;
      setShowPrev(scrollLeft > 1);
      setShowNext(scrollLeft + clientWidth < scrollWidth - 1);
    } else {
      const { scrollTop, scrollHeight, clientHeight } = scrollEl;
      setShowPrev(scrollTop > 1);
      setShowNext(scrollTop + clientHeight < scrollHeight - 1);
    }
  }, [isHorizontal]);

  const handleScrollPrev = useCallback(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    const distance = isHorizontal ? scrollEl.clientWidth : scrollEl.clientHeight;
    scrollEl.scrollBy({
      [isHorizontal ? 'left' : 'top']: -distance,
      behavior: 'smooth',
    } as ScrollToOptions);
  }, [isHorizontal]);

  const handleScrollNext = useCallback(() => {
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;
    const distance = isHorizontal ? scrollEl.clientWidth : scrollEl.clientHeight;
    scrollEl.scrollBy({
      [isHorizontal ? 'left' : 'top']: distance,
      behavior: 'smooth',
    } as ScrollToOptions);
  }, [isHorizontal]);

  // 滚动到激活标签
  const scrollToActiveTab = useCallback(() => {
    const scrollEl = scrollRef.current;
    const navEl = navRef.current;
    if (!scrollEl || !navEl) return;

    const activeTab = navEl.querySelector(`[data-tab-key="${activeKey}"]`) as HTMLElement;
    if (!activeTab) return;

    if (isHorizontal) {
      const { offsetLeft, offsetWidth } = activeTab;
      const { scrollLeft, clientWidth } = scrollEl;
      if (offsetLeft < scrollLeft) {
        scrollEl.scrollTo({ left: offsetLeft - 8, behavior: 'smooth' });
      } else if (offsetLeft + offsetWidth > scrollLeft + clientWidth) {
        scrollEl.scrollTo({ left: offsetLeft + offsetWidth - clientWidth + 8, behavior: 'smooth' });
      }
    } else {
      const { offsetTop, offsetHeight } = activeTab;
      const { scrollTop, clientHeight } = scrollEl;
      if (offsetTop < scrollTop) {
        scrollEl.scrollTo({ top: offsetTop - 8, behavior: 'smooth' });
      } else if (offsetTop + offsetHeight > scrollTop + clientHeight) {
        scrollEl.scrollTo({ top: offsetTop + offsetHeight - clientHeight + 8, behavior: 'smooth' });
      }
    }
  }, [activeKey, isHorizontal]);

  // 监听溢出变化
  useEffect(() => {
    checkOverflow();
    const scrollEl = scrollRef.current;
    if (!scrollEl) return;

    scrollEl.addEventListener('scroll', checkOverflow, { passive: true });
    const ro = new ResizeObserver(checkOverflow);
    ro.observe(scrollEl);

    return () => {
      scrollEl.removeEventListener('scroll', checkOverflow);
      ro.disconnect();
    };
  }, [checkOverflow, items]);

  // 激活标签变化时滚动到可见
  useEffect(() => {
    scrollToActiveTab();
    // 延迟检查溢出（滚动动画后）
    const timer = setTimeout(checkOverflow, 300);
    return () => clearTimeout(timer);
  }, [activeKey, scrollToActiveTab, checkOverflow]);

  // ==================== Handlers ====================
  const handleTabClick = useCallback((key: string, disabled: boolean | undefined, e: React.MouseEvent) => {
    if (disabled) return;
    onTabClickRef.current?.(key, e);
    if (controlledActiveKey === undefined) {
      setInnerActiveKey(key);
    }
    if (key !== activeKey) {
      onChangeRef.current?.(key);
    }
  }, [controlledActiveKey, activeKey]);

  // 键盘导航
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    const enabledItems = items.filter((item) => !item.disabled);
    if (enabledItems.length === 0) return;

    const currentIndex = enabledItems.findIndex((item) => item.key === activeKey);
    let nextIndex = -1;

    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';

    if (e.key === nextKey) {
      nextIndex = (currentIndex + 1) % enabledItems.length;
    } else if (e.key === prevKey) {
      nextIndex = (currentIndex - 1 + enabledItems.length) % enabledItems.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = enabledItems.length - 1;
    }

    if (nextIndex >= 0 && nextIndex !== currentIndex) {
      e.preventDefault();
      const nextItemKey = enabledItems[nextIndex].key;
      if (controlledActiveKey === undefined) {
        setInnerActiveKey(nextItemKey);
      }
      onChangeRef.current?.(nextItemKey);
    }
  }, [items, activeKey, isHorizontal, controlledActiveKey]);

  // 关闭标签
  const handleRemove = useCallback((key: string, e: React.MouseEvent) => {
    e.stopPropagation();
    onEditRef.current?.(key, 'remove');
  }, []);

  // 添加标签
  const handleAdd = useCallback((e: React.MouseEvent) => {
    onEditRef.current?.(e, 'add');
  }, []);

  // ==================== Ink Bar ====================
  const updateInkBar = useCallback(() => {
    if (type === 'card' || type === 'editable-card' || !navRef.current) return;
    const activeTab = navRef.current.querySelector(`[data-tab-key="${activeKey}"]`) as HTMLElement;
    if (!activeTab) return;

    if (isHorizontal) {
      setInkStyle({
        width: activeTab.offsetWidth,
        transform: `translateX(${activeTab.offsetLeft}px)`,
      });
    } else {
      setInkStyle({
        height: activeTab.offsetHeight,
        transform: `translateY(${activeTab.offsetTop}px)`,
      });
    }
  }, [activeKey, type, isHorizontal]);

  useEffect(() => {
    updateInkBar();
  }, [updateInkBar, items]);

  // 窗口 resize 时更新墨条
  useEffect(() => {
    const handleResize = () => updateInkBar();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateInkBar]);

  // ==================== Extra Content ====================
  const extraLeft = useMemo(() => {
    if (!tabBarExtraContent) return null;
    if (typeof tabBarExtraContent === 'object' && !React.isValidElement(tabBarExtraContent)) {
      return (tabBarExtraContent as { left?: React.ReactNode }).left ?? null;
    }
    return null;
  }, [tabBarExtraContent]);

  const extraRight = useMemo(() => {
    if (!tabBarExtraContent) return null;
    if (typeof tabBarExtraContent === 'object' && !React.isValidElement(tabBarExtraContent)) {
      return (tabBarExtraContent as { right?: React.ReactNode }).right ?? null;
    }
    return tabBarExtraContent;
  }, [tabBarExtraContent]);

  // ==================== Gutter Style ====================
  const gutterStyle = useMemo(() => {
    if (tabBarGutter === undefined) return undefined;
    return isHorizontal
      ? { marginLeft: tabBarGutter }
      : { marginTop: tabBarGutter };
  }, [tabBarGutter, isHorizontal]);

  // ==================== Render ====================
  const isEditable = type === 'editable-card';

  const renderTabBar = () => (
    <div
      className={classNames('soui-tabs-nav', { 'soui-tabs-nav-centered': centered })}
      style={tabBarStyle}
    >
      {extraLeft && <div className="soui-tabs-extra soui-tabs-extra-left">{extraLeft}</div>}

      {/* 滚动操作按钮 - 前 */}
      {showPrev && (
        <button
          type="button"
          className="soui-tabs-scroll-btn soui-tabs-scroll-btn-prev"
          aria-label="向前滚动"
          onClick={handleScrollPrev}
        >
          <Icon name={isHorizontal ? 'Left' : 'Up'} size={14} />
        </button>
      )}

      {/* 可滚动区域 */}
      <div className="soui-tabs-nav-scroll" ref={scrollRef}>
        <div
          className="soui-tabs-nav-list"
          ref={navRef}
          role="tablist"
          aria-orientation={isHorizontal ? 'horizontal' : 'vertical'}
          onKeyDown={handleKeyDown}
        >
          {items.map((item, index) => {
            const isActive = item.key === activeKey;
            const tabCls = classNames('soui-tabs-tab', {
              'soui-tabs-tab-active': isActive,
              'soui-tabs-tab-disabled': item.disabled,
              'soui-tabs-tab-closable': isEditable && item.closable !== false,
            });

            const showClose = isEditable && item.closable !== false;

            return (
              <div
                key={item.key}
                data-tab-key={item.key}
                className={tabCls}
                role="tab"
                tabIndex={item.disabled ? -1 : 0}
                aria-selected={isActive}
                aria-disabled={item.disabled}
                style={index > 0 ? gutterStyle : undefined}
                onClick={(e) => handleTabClick(item.key, item.disabled, e)}
              >
                {item.icon && <span className="soui-tabs-tab-icon">{item.icon}</span>}
                <span className="soui-tabs-tab-label">{item.label}</span>
                {showClose && (
                  <span
                    className="soui-tabs-tab-close"
                    role="button"
                    aria-label="关闭"
                    onClick={(e) => handleRemove(item.key, e)}
                  >
                    <Icon name="Close" size={12} />
                  </span>
                )}
              </div>
            );
          })}
          {type === 'line' && (
            <div
              className={classNames('soui-tabs-ink-bar', { 'soui-tabs-ink-bar-animated': animated })}
              style={inkStyle}
            />
          )}
        </div>
      </div>

      {/* 滚动操作按钮 - 后 */}
      {showNext && (
        <button
          type="button"
          className="soui-tabs-scroll-btn soui-tabs-scroll-btn-next"
          aria-label="向后滚动"
          onClick={handleScrollNext}
        >
          <Icon name={isHorizontal ? 'Right' : 'Down'} size={14} />
        </button>
      )}

      {isEditable && !hideAdd && (
        <button
          type="button"
          className="soui-tabs-add-btn"
          aria-label="添加标签"
          onClick={handleAdd}
        >
          <Icon name="Plus" size={14} />
        </button>
      )}
      {extraRight && <div className="soui-tabs-extra soui-tabs-extra-right">{extraRight}</div>}
    </div>
  );

  const renderContent = () => (
    <div className="soui-tabs-content">
      {items.map((item) => {
        const isActive = item.key === activeKey;

        // destroyInactiveTabPane: 非激活且非 forceRender 时不渲染
        if (destroyInactiveTabPane && !isActive && !item.forceRender) {
          return null;
        }

        return (
          <div
            key={item.key}
            className={classNames('soui-tabs-tabpane', { 'soui-tabs-tabpane-active': isActive })}
            role="tabpanel"
            aria-hidden={!isActive}
            style={{ display: isActive ? undefined : 'none' }}
          >
            {item.children}
          </div>
        );
      })}
    </div>
  );

  const tabsCls = classNames(
    'soui-tabs',
    `soui-tabs-${type}`,
    `soui-tabs-${size}`,
    `soui-tabs-${tabPosition}`,
    className,
  );

  return (
    <div className={tabsCls} style={componentStyle} {...rest}>
      {tabPosition === 'bottom' || tabPosition === 'right' ? (
        <>
          {renderContent()}
          {renderTabBar()}
        </>
      ) : (
        <>
          {renderTabBar()}
          {renderContent()}
        </>
      )}
    </div>
  );
};

export default Tabs;
