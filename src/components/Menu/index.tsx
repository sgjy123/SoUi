import React, { useState, useContext, useCallback, useEffect, useRef, useMemo } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import Tooltip from '../Tooltip';
import { useComponentTheme, useTheme } from '../ConfigProvider';
import './style.less';

// ==================== Types ====================

export type MenuMode = 'horizontal' | 'vertical' | 'inline';
export type MenuTheme = 'light' | 'dark';

export interface MenuItemProps {
  /** 菜单项唯一标识（必需，用户通过 React 的 key 属性传递） */
  key?: string;
  /** @internal 由 Menu 组件内部通过 cloneElement 注入，用户不需要传递 */
  menuKey?: string;
  /** 菜单项文本 */
  label?: React.ReactNode;
  /** 菜单项图标 */
  icon?: string | React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 危险状态 */
  danger?: boolean;
  /** 点击回调 */
  onClick?: (key: string) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子元素 */
  children?: React.ReactNode;
}

export interface SubMenuProps {
  /** 子菜单唯一标识（必需，用户通过 React 的 key 属性传递） */
  key?: string;
  /** @internal 由 Menu 组件内部通过 cloneElement 注入，用户不需要传递 */
  menuKey?: string;
  /** 子菜单标题 */
  title?: React.ReactNode;
  /** 子菜单图标 */
  icon?: string | React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 子菜单内容 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface MenuGroupProps {
  /** 分组标题 */
  title?: React.ReactNode;
  /** 分组内容 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface MenuDividerProps {
  /** 是否为虚线 */
  dashed?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface MenuProps {
  /** 菜单模式 */
  mode?: MenuMode;
  /** 菜单主题 */
  theme?: MenuTheme;
  /** 当前选中的菜单项 key */
  selectedKeys?: string[];
  /** 默认选中的菜单项 key */
  defaultSelectedKeys?: string[];
  /** 当前展开的子菜单 key 数组 */
  openKeys?: string[];
  /** 默认展开的子菜单 key 数组 */
  defaultOpenKeys?: string[];
  /** 是否内嵌菜单（仅 vertical/inline 模式有效） */
  inlineCollapsed?: boolean;
  /** 折叠模式下的菜单宽度 */
  collapsedWidth?: number;
  /** Popup 弹出层的 zIndex */
  popupZIndex?: number;
  /** 是否开启手风琴模式（每次只展开一个子菜单） */
  accordion?: boolean;
  /** 子菜单展开/关闭的触发行为 */
  triggerSubMenuAction?: 'hover' | 'click';
  /** 菜单项点击回调 */
  onClick?: (info: { key: string; keyPath: string[] }) => void;
  /** 子菜单展开/收起回调 */
  onOpenChange?: (openKeys: string[]) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子元素 */
  children?: React.ReactNode;
}

// ==================== Context ====================

interface MenuContextType {
  mode: MenuMode;
  theme: MenuTheme;
  selectedKeys: string[];
  openKeys: string[];
  inlineCollapsed: boolean;
  popupZIndex: number;
  firstLevel: boolean; // 标记是否为第一级菜单（参考 Ant Design v6）
  triggerSubMenuAction: 'hover' | 'click';
  isInPopup?: boolean; // 标记是否在折叠模式的弹出面板中
  onSelect: (key: string, keyPath: string[]) => void;
  onOpenChange: (key: string) => void;
}

const MenuContext = React.createContext<MenuContextType | null>(null);

const useMenuContext = () => {
  const context = useContext(MenuContext);
  if (!context) {
    throw new Error('Menu components must be wrapped in <Menu>');
  }
  return context;
};

// ==================== MenuItem Component ====================

const MenuItem: React.FC<MenuItemProps & { keyPath?: string[] }> = ({
  key,
  menuKey,
  label,
  icon,
  disabled = false,
  danger = false,
  onClick,
  className,
  style,
  children,
  keyPath = [],
}) => {
  // 优先使用 menuKey（由父组件注入），如果没有则使用 key
  const itemKey = menuKey || key || '';

  if (!itemKey && process.env.NODE_ENV === 'development') {
    console.warn('Menu.Item: key is required');
  }

  const { mode, theme, selectedKeys, inlineCollapsed, firstLevel, onSelect } = useMenuContext();
  const isSelected = selectedKeys.includes(itemKey);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (disabled) return;
      onSelect(itemKey, [...keyPath, itemKey]);
      onClick?.(itemKey);
    },
    [disabled, itemKey, keyPath, onSelect, onClick]
  );

  const itemClassName = classNames(
    'soui-menu-item',
    {
      'soui-menu-item-selected': isSelected,
      'soui-menu-item-disabled': disabled,
      'soui-menu-item-danger': danger,
    },
    className
  );

  const renderContent = () => (
    <div
      className={itemClassName}
      style={style}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick(e as any);
        }
      }}
      role="menuitem"
      aria-selected={isSelected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {icon && (
        <span className="soui-menu-item-icon">
          {typeof icon === 'string' ? (
            <Icon
              name={icon}
              size={16}
              fill={
                danger
                  ? 'var(--soui-menu-item-danger-color, #ff4d4f)'
                  : isSelected
                  ? 'var(--soui-menu-item-selected-color)'
                  : theme === 'dark'
                  ? 'rgba(255, 255, 255, 0.65)'
                  : 'rgba(0, 0, 0, 0.85)'
              }
            />
          ) : (
            icon
          )}
        </span>
      )}
      {!inlineCollapsed && <span className="soui-menu-item-label">{label || children}</span>}
      {inlineCollapsed && firstLevel && typeof label === 'string' && (
        <div className="soui-menu-inline-collapsed-noicon">{label.charAt(0)}</div>
      )}
    </div>
  );

  // 折叠模式下显示 Tooltip，但仅限于一级菜单项（参考 Ant Design v6 的 firstLevel 设计）
  if (inlineCollapsed && mode === 'vertical' && firstLevel) {
    return (
      <Tooltip title={label || children} placement="right" mouseEnterDelay={0.1} className="soui-menu-tooltip-trigger">
        {renderContent()}
      </Tooltip>
    );
  }

  return renderContent();
};

// 添加静态标记，用于类型判断（避免 HMR 导致的引用不一致）
(MenuItem as any).isSoUiMenuItem = true;

// ==================== SubMenu Component ====================

const SubMenu: React.FC<SubMenuProps & { keyPath?: string[] }> = ({
  key,
  menuKey,
  title,
  icon,
  disabled = false,
  children,
  className,
  style,
  keyPath = [],
}) => {
  // 优先使用 menuKey（由父组件注入），如果没有则使用 key
  const itemKey = menuKey || key || '';

  if (!itemKey && process.env.NODE_ENV === 'development') {
    console.warn('Menu.SubMenu: key is required');
  }

  const {
    mode,
    theme,
    selectedKeys,
    openKeys,
    inlineCollapsed,
    onOpenChange,
    popupZIndex,
    triggerSubMenuAction,
    onSelect,
    isInPopup: parentIsInPopup = false, // 从上下文中获取是否在弹出面板中
  } = useMenuContext();
  const isOpen = openKeys.includes(itemKey);

  // 检查子菜单中是否有选中项
  const isSubMenuSelected = React.Children.toArray(children).some((child) => {
    if (!React.isValidElement(child)) return false;
    const childKey = child.key as string;
    return selectedKeys.includes(childKey);
  });

  const closeTimerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [popupPosition, setPopupPosition] = useState<'bottom' | 'top'>('bottom');
  const [popupVisible, setPopupVisible] = useState(false);

  const handleToggle = useCallback(() => {
    if (disabled) return;
    onOpenChange(itemKey);
  }, [disabled, itemKey, onOpenChange]);

  // 延迟关闭，给鼠标移动留出时间
  const handleMouseEnter = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    // 折叠模式下，使用 popupVisible 控制显示
    if (inlineCollapsed && mode === 'vertical') {
      if (!disabled) {
        setPopupVisible(true);
      }
      return;
    }

    // hover 触发模式
    if (triggerSubMenuAction === 'hover') {
      // 水平模式下，使用 openKeys 控制显示
      if (!disabled && !isOpen) {
        onOpenChange(itemKey);
      }
    }
  }, [disabled, isOpen, itemKey, onOpenChange, inlineCollapsed, mode, triggerSubMenuAction]);

  const handleMouseLeave = useCallback(() => {
    closeTimerRef.current = window.setTimeout(() => {
      // 折叠模式下，关闭 popup
      if (inlineCollapsed && mode === 'vertical') {
        setPopupVisible(false);
        return;
      }

      // hover 触发模式且垂直模式下，关闭子菜单
      if (triggerSubMenuAction === 'hover' && mode === 'vertical' && isOpen) {
        onOpenChange(itemKey);
      }
    }, 100); // 100ms 延迟
  }, [isOpen, itemKey, onOpenChange, inlineCollapsed, mode, triggerSubMenuAction]);

  // 组件卸载时清理定时器
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
  }, []);

  // 检测 Popup 位置，避免超出屏幕边界
  useEffect(() => {
    if ((popupVisible || isOpen) && containerRef.current) {
      requestAnimationFrame(() => {
        if (!containerRef.current) return;

        const containerRect = containerRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const popupElement = containerRef.current.querySelector('.soui-submenu-popup');
        const popupRect = popupElement?.getBoundingClientRect();
        const popupHeight = popupRect?.height || 300;

        // 垂直方向检测
        if (mode === 'horizontal') {
          if (containerRect.bottom + popupHeight > viewportHeight && containerRect.top > popupHeight) {
            setPopupPosition('top');
          } else {
            setPopupPosition('bottom');
          }
        }
      });
    }
  }, [popupVisible, isOpen, mode]);

  const submenuClassName = classNames(
    'soui-submenu',
    {
      'soui-submenu-open': isOpen || popupVisible,
      'soui-submenu-disabled': disabled,
      'soui-submenu-inline-collapsed': inlineCollapsed && mode === 'vertical',
    },
    className
  );

  const popupClassName = classNames('soui-submenu-popup', `soui-submenu-popup-${theme}`);

  // 为子菜单创建新的 Context，设置 firstLevel: false
  const subMenuContextValue = useMemo(
    () => ({
      mode,
      theme,
      selectedKeys,
      openKeys,
      inlineCollapsed,
      popupZIndex,
      firstLevel: false,
      triggerSubMenuAction,
      onSelect,
      onOpenChange,
      isInPopup: parentIsInPopup, // 传递父级的 isInPopup 状态
    }),
    [mode, theme, selectedKeys, openKeys, inlineCollapsed, popupZIndex, triggerSubMenuAction, onSelect, onOpenChange, parentIsInPopup]
  );

  // 渲染子菜单内容
  const renderChildren = useCallback(() => {
    if (!children) return null;

    const processChild = (child: React.ReactElement<any>, parentKeyPath: string[]): React.ReactElement<any> => {
      if (!React.isValidElement(child)) return child;

      // 使用静态标记属性判断组件类型（避免 HMR 导致的引用不一致）
      const isMenuItem = (child.type as any)?.isSoUiMenuItem === true || 
                         child.type === MenuItem || 
                         child.type === (Menu as any).Item;
      const isSubMenu = (child.type as any)?.isSoUiSubMenu === true || 
                        child.type === SubMenu || 
                        child.type === (Menu as any).SubMenu;
      
      if (isMenuItem || isSubMenu) {
        const childKey = child.key as string;
        return React.cloneElement(child as any, {
          keyPath: parentKeyPath,
          menuKey: childKey, // 注入 menuKey，解决 React key 不会传递给 props 的问题
        });
      }

      // 检查是否是 MenuGroup
      const isMenuGroup = child.type === MenuGroup || child.type === (Menu as any).Group;
      if (isMenuGroup) {
        const childChildren = (child.props as any).children;
        if (!childChildren) return child;

        const processedGroupChildren = React.Children.map(childChildren, (c: any) =>
          processChild(c, parentKeyPath)
        );

        return React.cloneElement(child as any, {
          children: processedGroupChildren,
        });
      }

      return child;
    };

    return React.Children.map(children, (child) =>
      processChild(child as React.ReactElement<any>, [...keyPath, itemKey])
    );
  }, [children, keyPath, itemKey]);

  // 垂直模式下的子菜单
  if (mode === 'vertical' || mode === 'inline') {
    // 折叠模式：显示图标和 Popup
    if (inlineCollapsed) {
      return (
        <div
          ref={containerRef}
          className={submenuClassName}
          style={{ ...style, position: 'relative' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="soui-submenu-title"
            onClick={() => !disabled && setPopupVisible(!popupVisible)}
            role="menuitem"
            aria-haspopup="true"
            aria-expanded={popupVisible}
            aria-disabled={disabled}
            tabIndex={disabled ? -1 : 0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (!disabled) setPopupVisible(!popupVisible);
              }
            }}
          >
            {icon && (
              <span className="soui-submenu-icon">
                {typeof icon === 'string' ? (
                  <Icon
                    name={icon}
                    size={16}
                    fill={
                      isSubMenuSelected || popupVisible
                        ? 'var(--soui-menu-item-selected-color)'
                        : theme === 'dark'
                        ? 'rgba(255, 255, 255, 0.65)'
                        : 'rgba(0, 0, 0, 0.85)'
                    }
                  />
                ) : (
                  icon
                )}
              </span>
            )}
          </div>
          {/* 折叠模式弹出面板：设置 inlineCollapsed: false 使子菜单项正常显示文字 */}
          {popupVisible && (
            <div
              className={`${popupClassName} soui-submenu-popup-animated soui-submenu-popup-collapsed`}
              role="menu"
              style={{
                position: 'absolute',
                top: 0,
                left: '100%',
                marginLeft: '4px',
                zIndex: popupZIndex,
              }}
              onMouseEnter={(e) => {
                e.stopPropagation();
                if (closeTimerRef.current) {
                  clearTimeout(closeTimerRef.current);
                }
              }}
              onMouseLeave={(e) => {
                e.stopPropagation();
                handleMouseLeave();
              }}
            >
              <div className="soui-submenu-popup-title">{title}</div>
              <MenuContext.Provider
                value={{
                  ...subMenuContextValue,
                  inlineCollapsed: false, // 弹出面板中不折叠，显示完整内容
                  isInPopup: true, // 标记在折叠弹出面板中
                }}
              >
                {renderChildren()}
              </MenuContext.Provider>
            </div>
          )}
        </div>
      );
    }

    // 正常模式：向下展开（树形结构）
    // 使用 isInPopup 上下文标记来判断是否在折叠模式的弹出面板中
    const isInPopup = subMenuContextValue.isInPopup === true;
    
    return (
      <div
        ref={isInPopup ? containerRef : undefined}
        className={submenuClassName}
        style={{ ...style, position: isInPopup ? 'relative' : undefined }}
        onMouseEnter={isInPopup ? handleMouseEnter : undefined}
        onMouseLeave={isInPopup ? handleMouseLeave : undefined}
      >
        <div
          className="soui-submenu-title"
          onClick={isInPopup ? () => !disabled && setPopupVisible(!popupVisible) : handleToggle}
          role="menuitem"
          aria-haspopup="true"
          aria-expanded={isInPopup ? popupVisible : isOpen}
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
        >
          {icon && (
            <span className="soui-submenu-icon">
              {typeof icon === 'string' ? (
                <Icon
                  name={icon}
                  size={16}
                  fill={
                    isSubMenuSelected || isOpen || popupVisible
                      ? 'var(--soui-menu-item-selected-color)'
                      : theme === 'dark'
                      ? 'rgba(255, 255, 255, 0.65)'
                      : 'rgba(0, 0, 0, 0.85)'
                  }
                />
              ) : (
                icon
              )}
            </span>
          )}
          <span className="soui-submenu-title-text">{title}</span>
          {/* 在弹出面板中使用向右箭头，正常模式使用向下箭头 */}
          <Icon
            name={isInPopup ? 'Right' : 'Down'}
            size={12}
            fill={
              isSubMenuSelected || isOpen || popupVisible
                ? 'var(--soui-menu-item-selected-color)'
                : theme === 'dark'
                ? 'rgba(255, 255, 255, 0.65)'
                : 'rgba(0, 0, 0, 0.85)'
            }
            className={classNames('soui-submenu-arrow', {
              'soui-submenu-arrow-open': isInPopup ? popupVisible : isOpen,
            })}
          />
        </div>
        
        {isInPopup ? (
          // 折叠弹出面板中的 SubMenu：向右级联弹出
          popupVisible && (
            <div
              className={`${popupClassName} soui-submenu-popup-animated`}
              role="menu"
              style={{
                position: 'absolute',
                top: 0,
                left: '100%',
                marginLeft: '4px',
                zIndex: popupZIndex + 1,
              }}
              onMouseEnter={(e) => {
                e.stopPropagation();
                if (closeTimerRef.current) {
                  clearTimeout(closeTimerRef.current);
                }
              }}
              onMouseLeave={(e) => {
                e.stopPropagation();
                handleMouseLeave();
              }}
            >
              <MenuContext.Provider value={subMenuContextValue}>
                {renderChildren()}
              </MenuContext.Provider>
            </div>
          )
        ) : (
          // 正常模式：向下展开
          isOpen && (
            <div className="soui-submenu-content" role="menu">
              <MenuContext.Provider
                value={{
                  ...subMenuContextValue,
                  isInPopup: false, // 明确设置为 false，确保嵌套的 SubMenu 也向下展开
                }}
              >
                {renderChildren()}
              </MenuContext.Provider>
            </div>
          )
        )}
      </div>
    );
  }

  // 水平模式下的子菜单（使用 Popup）
  return (
    <div
      ref={containerRef}
      className={submenuClassName}
      style={{ ...style, position: 'relative' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={triggerSubMenuAction === 'click' ? handleToggle : undefined}
    >
      <div
        className="soui-submenu-title"
        role="menuitem"
        aria-haspopup="true"
        aria-disabled={disabled}
        aria-expanded={isOpen}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!disabled) onOpenChange(itemKey);
          }
        }}
      >
        {icon && (
          <span className="soui-submenu-icon">
            {typeof icon === 'string' ? (
              <Icon
                name={icon}
                size={16}
                fill={theme === 'dark' ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.85)'}
              />
            ) : (
              icon
            )}
          </span>
        )}
        <span className="soui-submenu-title-text">{title}</span>
        <Icon
          name="Down"
          size={12}
          className="soui-submenu-arrow"
          fill={theme === 'dark' ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.85)'}
        />
      </div>

      {isOpen && (
        <div
          className={`${popupClassName} soui-submenu-popup-animated`}
          role="menu"
          style={{
            position: 'absolute',
            [popupPosition === 'bottom' ? 'top' : 'bottom']: '100%',
            left: 0,
            zIndex: popupZIndex,
            marginTop: popupPosition === 'bottom' ? '4px' : '0',
            marginBottom: popupPosition === 'top' ? '4px' : '0',
          }}
        >
          <MenuContext.Provider value={subMenuContextValue}>
            {renderChildren()}
          </MenuContext.Provider>
        </div>
      )}
    </div>
  );
};

// ==================== MenuGroup Component ====================

const MenuGroup: React.FC<MenuGroupProps> = ({ title, children, className, style }) => {
  const groupClassName = classNames('soui-menu-group', className);

  return (
    <div className={groupClassName} style={style} role="group">
      {title && <div className="soui-menu-group-title">{title}</div>}
      <div className="soui-menu-group-content" role="menu">
        {children}
      </div>
    </div>
  );
};

// 添加静态标记，用于类型判断（避免 HMR 导致的引用不一致）
(SubMenu as any).isSoUiSubMenu = true;

// ==================== MenuDivider Component ====================

const MenuDivider: React.FC<MenuDividerProps> = ({ dashed = false, className, style }) => {
  const dividerClassName = classNames('soui-menu-divider', {
    'soui-menu-divider-dashed': dashed,
  });

  return <div className={dividerClassName} style={style} role="separator" />;
};

// ==================== Main Menu Component ====================

const Menu: React.FC<MenuProps> & {
  Item: typeof MenuItem;
  SubMenu: typeof SubMenu;
  Group: typeof MenuGroup;
  Divider: typeof MenuDivider;
} = ({
  mode = 'vertical',
  theme = 'light',
  selectedKeys: controlledSelectedKeys,
  defaultSelectedKeys = [],
  openKeys: controlledOpenKeys,
  defaultOpenKeys = [],
  inlineCollapsed = false,
  collapsedWidth = 80,
  popupZIndex = 1050,
  accordion = true,
  triggerSubMenuAction = 'hover',
  onClick,
  onOpenChange,
  className,
  style,
  children,
}) => {
  // 获取主题配置
  const menuTheme = useComponentTheme('Menu');
  const globalTheme = useTheme();

  // 受控/非受控状态管理
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(defaultSelectedKeys);
  const [internalOpenKeys, setInternalOpenKeys] = useState<string[]>(defaultOpenKeys);

  const selectedKeys = controlledSelectedKeys ?? internalSelectedKeys;
  const openKeys = controlledOpenKeys ?? internalOpenKeys;

  // 处理菜单项选择
  const handleSelect = useCallback(
    (key: string, keyPath: string[]) => {
      if (controlledSelectedKeys === undefined) {
        setInternalSelectedKeys([key]);
      }
      onClick?.({ key, keyPath });
    },
    [controlledSelectedKeys, onClick]
  );

  // 处理子菜单展开/收起
  const handleOpenChange = useCallback(
    (key: string) => {
      if (!key) {
        console.warn('Menu: SubMenu key is required');
        return;
      }

      let newOpenKeys: string[];

      if (openKeys.includes(key)) {
        // 关闭
        newOpenKeys = openKeys.filter((k) => k !== key);
      } else {
        // 展开
        if (accordion) {
          // 手风琴模式：关闭其他，只展开当前
          const keyParts = key.split('/');
          const parentKey = keyParts.length > 1 ? keyParts.slice(0, -1).join('/') : '';
          newOpenKeys = openKeys.filter((k) => {
            const kParts = k.split('/');
            const kParent = kParts.length > 1 ? kParts.slice(0, -1).join('/') : '';
            return kParent !== parentKey || k === key;
          });
          if (!newOpenKeys.includes(key)) {
            newOpenKeys = [...newOpenKeys, key];
          }
        } else {
          // 非手风琴模式：可以同时展开多个
          newOpenKeys = [...openKeys, key];
        }
      }

      if (controlledOpenKeys === undefined) {
        setInternalOpenKeys(newOpenKeys);
      }
      onOpenChange?.(newOpenKeys);
    },
    [openKeys, controlledOpenKeys, onOpenChange, accordion]
  );

  // 生成 CSS 变量
  const menuStyle: React.CSSProperties = {
    // 颜色配置
    ...(globalTheme?.primaryColor && {
      '--soui-menu-color-primary': globalTheme.primaryColor,
    }),
    ...(globalTheme?.primaryHoverColor && {
      '--soui-menu-color-primary-hover': globalTheme.primaryHoverColor,
    }),
    // 背景色配置
    ...(theme === 'light'
      ? {
          '--soui-menu-bg-color': '#fff',
          '--soui-menu-color-text': 'rgba(0, 0, 0, 0.85)',
          '--soui-menu-item-hover-bg': 'rgba(0, 0, 0, 0.04)',
          '--soui-menu-item-active-bg': 'rgba(0, 0, 0, 0.06)',
          '--soui-menu-item-selected-bg': 'rgba(24, 144, 255, 0.1)',
          '--soui-menu-item-selected-color': globalTheme?.primaryColor || '#1677ff',
          '--soui-menu-border-color': 'rgba(0, 0, 0, 0.06)',
        }
      : {
          '--soui-menu-bg-color': '#001529',
          '--soui-menu-color-text': 'rgba(255, 255, 255, 0.65)',
          '--soui-menu-item-hover-bg': 'rgba(255, 255, 255, 0.08)',
          '--soui-menu-item-active-bg': 'rgba(255, 255, 255, 0.12)',
          '--soui-menu-item-selected-bg': 'rgba(24, 144, 255, 0.2)',
          '--soui-menu-item-selected-color': '#fff',
          '--soui-menu-border-color': 'rgba(255, 255, 255, 0.1)',
        }),
    // 折叠宽度配置
    '--soui-menu-collapsed-width': `${collapsedWidth}px`,
    // 圆角配置
    ...((menuTheme?.borderRadius || globalTheme?.borderRadius) && {
      '--soui-menu-border-radius': `${menuTheme?.borderRadius || globalTheme?.borderRadius}px`,
    }),
    // 字体大小配置
    ...((menuTheme?.fontSize || globalTheme?.fontSize) && {
      '--soui-menu-font-size': `${menuTheme?.fontSize || globalTheme?.fontSize}px`,
    }),
    // 选中背景色配置
    ...(menuTheme?.itemSelectedBg && {
      '--soui-menu-item-selected-bg': menuTheme.itemSelectedBg,
    }),
    // 选中文字颜色配置
    ...(menuTheme?.itemSelectedColor && {
      '--soui-menu-item-selected-color': menuTheme.itemSelectedColor,
    }),
  } as any;

  const menuClassName = classNames(
    'soui-menu',
    `soui-menu-${mode}`,
    `soui-menu-${theme}`,
    {
      'soui-menu-inline-collapsed': inlineCollapsed && (mode === 'vertical' || mode === 'inline'),
    },
    className
  );

  // 为子元素添加 keyPath 和 menuKey
  const renderChildren = () => {
    if (!children) return null;

    const processChild = (child: React.ReactElement<any>, parentKeyPath: string[] = []): React.ReactElement<any> => {
      if (!React.isValidElement(child)) return child;

      // 处理 MenuItem 和 SubMenu
      if (child.type === MenuItem || child.type === SubMenu) {
        const childKey = child.key as string;
        return React.cloneElement(child as any, {
          keyPath: parentKeyPath,
          menuKey: childKey, // 注入 menuKey，解决 React key 不会传递给 props 的问题
        });
      }

      // 处理 MenuGroup，递归处理其内部的子元素
      if (child.type === MenuGroup) {
        const groupChildren = (child.props as any).children;
        if (!groupChildren) return child;

        const processedChildren = React.Children.map(groupChildren, (c: any) =>
          processChild(c, parentKeyPath)
        );

        return React.cloneElement(child as any, {
          children: processedChildren,
        });
      }

      // 处理 Menu.Divider，直接返回
      if (child.type === MenuDivider) {
        return child;
      }

      return child;
    };

    return React.Children.map(children, (child) => processChild(child as React.ReactElement<any>, []));
  };

  return (
    <MenuContext.Provider
      value={{
        mode,
        theme,
        selectedKeys,
        openKeys,
        inlineCollapsed,
        popupZIndex,
        firstLevel: true,
        triggerSubMenuAction,
        onSelect: handleSelect,
        onOpenChange: handleOpenChange,
      }}
    >
      <nav
        className={menuClassName}
        style={{ ...menuStyle, ...style }}
        role="menu"
        aria-orientation={mode === 'horizontal' ? 'horizontal' : 'vertical'}
      >
        {renderChildren()}
      </nav>
    </MenuContext.Provider>
  );
};

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;
Menu.Group = MenuGroup;
Menu.Divider = MenuDivider;

export default Menu;
