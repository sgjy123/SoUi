import React, { useState, useContext, useCallback, useEffect, useRef } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import Tooltip from '../Tooltip';
import { useComponentTheme, useTheme } from '../ConfigProvider';
import './style.less';

// ==================== Types ====================

export type MenuMode = 'horizontal' | 'vertical';
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
  /** 点击回调 */
  onClick?: (menuKey: string) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子元素 */
  children?: React.ReactNode;
}

export interface SubMenuProps {
  /** 子菜单唯一标识（必需） */
  menuKey: string;
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
  /** 是否内嵌菜单（仅 vertical 模式有效） */
  inlineCollapsed?: boolean;
  /** 折叠模式下的菜单宽度 */
  collapsedWidth?: number;
  /** Popup 弹出层的 zIndex */
  popupZIndex?: number;
  /** 是否开启手风琴模式（每次只展开一个子菜单） */
  accordion?: boolean;
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
  onClick,
  className,
  style,
  children,
  keyPath = [],
}) => {
  // 优先使用 menuKey（由父组件注入），如果没有则使用 key（TypeScript 类型声明需要）
  const itemKey = menuKey || key || '';
  
  if (!itemKey && process.env.NODE_ENV === 'development') {
    console.warn('Menu.Item: key is required');
  }
  
  const { mode, theme, selectedKeys, inlineCollapsed, firstLevel, onSelect } = useMenuContext();
  const isSelected = selectedKeys.includes(itemKey);

  const handleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // 阻止事件冒泡
    if (disabled) return;
    onSelect(itemKey, [...keyPath, itemKey]);
    onClick?.(itemKey);
  }, [disabled, itemKey, keyPath, onSelect, onClick]);

  const itemClassName = classNames(
    'soui-menu-item',
    {
      'soui-menu-item-selected': isSelected,
      'soui-menu-item-disabled': disabled,
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
                isSelected 
                  ? 'var(--soui-menu-item-selected-color)' 
                  : theme === 'dark'
                    ? 'rgba(255, 255, 255, 0.65)'
                    : 'rgba(0, 0, 0, 0.85)'
              }
            />
          ) : icon}
        </span>
      )}
      {!inlineCollapsed && (
        <span className="soui-menu-item-label">{label || children}</span>
      )}
    </div>
  );

  // 折叠模式下显示 Tooltip，但仅限于一级菜单项（参考 Ant Design v6 的 firstLevel 设计）
  if (inlineCollapsed && mode === 'vertical' && firstLevel) {
    return (
      <Tooltip title={label || children} placement="right" mouseEnterDelay={0.1}>
        {renderContent()}
      </Tooltip>
    );
  }

  return renderContent();
};

// ==================== SubMenu Component ====================

const SubMenu: React.FC<SubMenuProps & { keyPath?: string[] }> = ({
  menuKey,
  title,
  icon,
  disabled = false,
  children,
  className,
  style,
  keyPath = [],
}) => {
  const { mode, theme, selectedKeys, openKeys, inlineCollapsed, onOpenChange, popupZIndex, onSelect } = useMenuContext();
  const isOpen = openKeys.includes(menuKey);
  
  // 检查子菜单中是否有选中项（参考 Ant Design v6：使用 child.key 而不是 child.props.menuKey）
  const isSubMenuSelected = React.Children.toArray(children).some((child) => {
    if (!React.isValidElement(child)) return false;
    // 注意：使用 child.key（React Element 对象上的属性）而不是 child.props.menuKey
    const childKey = child.key as string;
    return selectedKeys.includes(childKey);
  });
  const closeTimerRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [popupPosition, setPopupPosition] = useState<'bottom' | 'top'>('bottom');
  const [popupVisible, setPopupVisible] = useState(false);

  const handleToggle = useCallback(() => {
    if (disabled) return;
    onOpenChange(menuKey);
  }, [disabled, menuKey, onOpenChange]);

  // 延迟关闭，给鼠标移动留出时间
  const handleMouseEnter = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }
    
    // 折叠模式下，使用popupVisible控制显示
    if (inlineCollapsed && mode === 'vertical') {
      if (!disabled) {
        setPopupVisible(true);
      }
      return;
    }
    
    // 水平模式下，使用openKeys控制显示
    if (!disabled && !isOpen) {
      onOpenChange(menuKey);
    }
  }, [disabled, isOpen, menuKey, onOpenChange, inlineCollapsed, mode]);

  const handleMouseLeave = useCallback(() => {
    closeTimerRef.current = window.setTimeout(() => {
      // 折叠模式下，关闭popup
      if (inlineCollapsed && mode === 'vertical') {
        setPopupVisible(false);
        return;
      }
      
      // 垂直模式下，关闭子菜单
      if (mode === 'vertical' && isOpen) {
        onOpenChange(menuKey);
      }
    }, 100); // 100ms 延迟
  }, [isOpen, menuKey, onOpenChange, inlineCollapsed, mode]);

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
        const viewportWidth = window.innerWidth;
        
        // 获取实际的 Popup 元素尺寸
        const popupElement = containerRef.current.querySelector('.soui-submenu-popup');
        const popupRect = popupElement?.getBoundingClientRect();
        const popupHeight = popupRect?.height || 300;
        const popupWidth = popupRect?.width || 160;
        
        // 垂直方向检测
        if (mode === 'horizontal') {
          if (containerRect.bottom + popupHeight > viewportHeight && containerRect.top > popupHeight) {
            setPopupPosition('top');
          } else {
            setPopupPosition('bottom');
          }
        }
        
        // 水平方向检测（折叠模式）
        if (inlineCollapsed && mode === 'vertical') {
          if (containerRect.right + popupWidth > viewportWidth) {
            // 如果右侧空间不足，且左侧空间足够，可以考虑从左侧弹出
            // 这里简化处理，保持右侧弹出
          }
        }
      });
    }
  }, [popupVisible, isOpen, mode, inlineCollapsed]);

  const submenuClassName = classNames(
    'soui-submenu',
    {
      'soui-submenu-open': isOpen || popupVisible,
      'soui-submenu-disabled': disabled,
      'soui-submenu-inline-collapsed': inlineCollapsed && mode === 'vertical',
    },
    className
  );

  const popupClassName = classNames(
    'soui-submenu-popup',
    `soui-submenu-popup-${theme}`
  );

  // 为子菜单创建新的 Context，设置 firstLevel: false（参考 Ant Design v6）
  const subMenuContextValue = React.useMemo(() => ({
    mode,
    theme,
    selectedKeys,
    openKeys,
    inlineCollapsed,
    popupZIndex,
    firstLevel: false, // 子菜单内部，firstLevel 为 false
    onSelect,
    onOpenChange,
  }), [mode, theme, selectedKeys, openKeys, inlineCollapsed, popupZIndex, onSelect, onOpenChange]);

  // 渲染子菜单内容（递归处理嵌套 SubMenu）
  const renderChildren = useCallback(() => {
    if (!children) return null;
    
    const processChild = (child: React.ReactElement<any>, parentKeyPath: string[]): React.ReactElement<any> => {
      if (!React.isValidElement(child)) return child;
      
      // 为 MenuItem 和 SubMenu 添加 menuKey 和 keyPath
      if (child.type === MenuItem || child.type === SubMenu) {
        // 注意：React 的 key 在 child.key 上，不在 child.props.key 上
        const childKey = child.key as string;
        const childProps = child.props as any;
        return React.cloneElement(child as any, {
          menuKey: childKey,
          keyPath: parentKeyPath,
          // 保持原有的 props，除了 keyPath 和 menuKey
          ...childProps,
        });
      }
      
      // 如果是 MenuGroup，也需要处理其子元素
      if (child.type === MenuGroup) {
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
    
    return React.Children.map(children, (child) => processChild(child as React.ReactElement<any>, [...keyPath, menuKey]));
  }, [children, keyPath, menuKey]);

  // 垂直模式下的子菜单
  if (mode === 'vertical') {
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
                ) : icon}
              </span>
            )}
          </div>
          
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
              <MenuContext.Provider value={subMenuContextValue}>
                {renderChildren()}
              </MenuContext.Provider>
            </div>
          )}
        </div>
      );
    }
    
    // 正常模式
    return (
      <div className={submenuClassName} style={style}>
        <div
          className="soui-submenu-title"
          onClick={handleToggle}
          role="menuitem"
          aria-haspopup="true"
          aria-expanded={isOpen}
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
                    isSubMenuSelected || isOpen
                      ? 'var(--soui-menu-item-selected-color)' 
                      : theme === 'dark'
                        ? 'rgba(255, 255, 255, 0.65)'
                        : 'rgba(0, 0, 0, 0.85)'
                  }
                />
              ) : icon}
            </span>
          )}
          <span className="soui-submenu-title-text">{title}</span>
          <Icon
            name="Down"
            size={12}
            fill={
              isSubMenuSelected || isOpen
                ? 'var(--soui-menu-item-selected-color)'
                : theme === 'dark'
                  ? 'rgba(255, 255, 255, 0.65)'
                  : 'rgba(0, 0, 0, 0.85)'
            }
            className={classNames('soui-submenu-arrow', {
              'soui-submenu-arrow-open': isOpen,
            })}
          />
        </div>
        {isOpen && (
          <div className="soui-submenu-content" role="menu">
            <MenuContext.Provider value={subMenuContextValue}>
              {renderChildren()}
            </MenuContext.Provider>
          </div>
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
    >
      <div
        className="soui-submenu-title"
        onClick={() => !disabled && onOpenChange(menuKey)}
        role="menuitem"
        aria-haspopup="true"
        aria-disabled={disabled}
        aria-expanded={isOpen}
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!disabled) onOpenChange(menuKey);
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
            ) : icon}
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

const MenuGroup: React.FC<MenuGroupProps> = ({
  title,
  children,
  className,
  style,
}) => {
  const { mode } = useMenuContext();
  const groupClassName = classNames('soui-menu-group', className);

  // 为子元素添加 menuKey
  const renderChildren = () => {
    if (!children) return null;
    
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      
      // 为 MenuItem 和 SubMenu 添加 menuKey
      if (child.type === MenuItem || child.type === SubMenu) {
        const childKey = child.key as string;
        return React.cloneElement(child as any, {
          menuKey: childKey,
          keyPath: [],
        });
      }
      
      return child;
    });
  };

  return (
    <div className={groupClassName} style={style} role="group">
      {title && <div className="soui-menu-group-title">{title}</div>}
      <div className="soui-menu-group-content" role="menu">
        {renderChildren()}
      </div>
    </div>
  );
};

// ==================== Main Menu Component ====================

const Menu: React.FC<MenuProps> & {
  Item: typeof MenuItem;
  SubMenu: typeof SubMenu;
  Group: typeof MenuGroup;
} = ({
  mode = 'vertical',
  theme = 'light',
  selectedKeys: controlledSelectedKeys,
  defaultSelectedKeys = [],
  openKeys: controlledOpenKeys,
  defaultOpenKeys = [],
  inlineCollapsed = false,
  collapsedWidth = 80, // 默认折叠宽度
  popupZIndex = 1050, // 默认 Popup zIndex
  accordion = true, // 默认开启手风琴模式
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
  const [internalSelectedKeys, setInternalSelectedKeys] = useState<string[]>(
    defaultSelectedKeys
  );
  const [internalOpenKeys, setInternalOpenKeys] = useState<string[]>(
    defaultOpenKeys
  );

  const selectedKeys = controlledSelectedKeys ?? internalSelectedKeys;
  const openKeys = controlledOpenKeys ?? internalOpenKeys;

  // 处理菜单项选择
  const handleSelect = useCallback((key: string, keyPath: string[]) => {
    if (controlledSelectedKeys === undefined) {
      setInternalSelectedKeys([key]);
    }
    onClick?.({ key, keyPath });
  }, [controlledSelectedKeys, onClick]);

  // 处理子菜单展开/收起
  const handleOpenChange = useCallback((key: string) => {
    // 防止 key 为 undefined 导致报错
    if (!key) {
      console.warn('Menu: SubMenu key is required');
      return;
    }

    let newOpenKeys: string[];
    
    if (openKeys.includes(key)) {
      // 关闭
      newOpenKeys = openKeys.filter(k => k !== key);
    } else {
      // 展开
      if (accordion) {
        // 手风琴模式：关闭其他，只展开当前
        // 找到与当前 key 同级的其他 key 并关闭
        const keyParts = key.split('/');
        const parentKey = keyParts.length > 1 ? keyParts.slice(0, -1).join('/') : '';
        newOpenKeys = openKeys.filter(k => {
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
  }, [openKeys, controlledOpenKeys, onOpenChange, accordion]);

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
    ...(theme === 'light' ? {
      '--soui-menu-bg-color': '#fff',
      '--soui-menu-color-text': 'rgba(0, 0, 0, 0.85)',
      '--soui-menu-item-hover-bg': 'rgba(0, 0, 0, 0.04)',
      '--soui-menu-item-active-bg': 'rgba(0, 0, 0, 0.06)',
      '--soui-menu-item-selected-bg': 'rgba(24, 144, 255, 0.1)',
      '--soui-menu-item-selected-color': globalTheme?.primaryColor || '#1677ff',
      '--soui-menu-border-color': 'rgba(0, 0, 0, 0.06)',
    } : {
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
      'soui-menu-inline-collapsed': inlineCollapsed && mode === 'vertical',
    },
    className
  );

  // 为子元素添加 keyPath
  const renderChildren = () => {
    if (!children) return null;
    
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      
      // 为 MenuItem 和 SubMenu 添加 menuKey 和 keyPath
      if (child.type === MenuItem || child.type === SubMenu) {
        const childKey = child.key as string;
        return React.cloneElement(child as any, {
          menuKey: childKey, // ✅ 使用 menuKey 而不是 key（React 的 key 不会传递到 props）
          keyPath: [],
        });
      }
      
      return child;
    });
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
        firstLevel: true, // 顶层菜单，firstLevel 为 true
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

export default Menu;
