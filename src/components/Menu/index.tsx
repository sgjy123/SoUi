import React, { useState, useContext, useCallback, useEffect } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import Tooltip from '../Tooltip';
import { useComponentTheme, useTheme } from '../ConfigProvider';
import './style.less';

// ==================== Types ====================

export type MenuMode = 'horizontal' | 'vertical';
export type MenuTheme = 'light' | 'dark';

export interface MenuItemProps {
  /** 菜单项唯一标识 */
  key: string;
  /** 菜单项文本 */
  label?: React.ReactNode;
  /** 菜单项图标 */
  icon?: string | React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
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
  /** 子菜单唯一标识 */
  key: string;
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
  label,
  icon,
  disabled = false,
  onClick,
  className,
  style,
  children,
  keyPath = [],
}) => {
  const { mode, theme, selectedKeys, inlineCollapsed, onSelect } = useMenuContext();
  const isSelected = selectedKeys.includes(key);

  const handleClick = useCallback(() => {
    if (disabled) return;
    onSelect(key, [...keyPath, key]);
    onClick?.(key);
  }, [disabled, key, keyPath, onSelect, onClick]);

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
      role="menuitem"
      aria-selected={isSelected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
    >
      {icon && (
        <span className="soui-menu-item-icon">
          {typeof icon === 'string' ? <Icon name={icon} size={16} /> : icon}
        </span>
      )}
      <span className="soui-menu-item-label">{label || children}</span>
    </div>
  );

  // 折叠模式下显示 Tooltip
  if (inlineCollapsed && mode === 'vertical') {
    return (
      <Tooltip title={label} placement="right">
        {renderContent()}
      </Tooltip>
    );
  }

  return renderContent();
};

// ==================== SubMenu Component ====================

const SubMenu: React.FC<SubMenuProps & { keyPath?: string[] }> = ({
  key,
  title,
  icon,
  disabled = false,
  children,
  className,
  style,
  keyPath = [],
}) => {
  const { mode, theme, openKeys, inlineCollapsed, onOpenChange } = useMenuContext();
  const isOpen = openKeys.includes(key);

  const handleToggle = useCallback(() => {
    if (disabled) return;
    onOpenChange(key);
  }, [disabled, key, onOpenChange]);

  const submenuClassName = classNames(
    'soui-submenu',
    {
      'soui-submenu-open': isOpen,
      'soui-submenu-disabled': disabled,
    },
    className
  );

  const popupClassName = classNames(
    'soui-submenu-popup',
    `soui-submenu-popup-${theme}`
  );

  // 渲染子菜单内容
  const renderChildren = () => {
    if (!children) return null;
    
    return React.Children.map(children, (child) => {
      if (!React.isValidElement(child)) return child;
      
      // 为子菜单项添加 keyPath
      if (child.type === MenuItem || child.type === SubMenu) {
        return React.cloneElement(child as any, {
          keyPath: [...keyPath, key],
        });
      }
      
      return child;
    });
  };

  // 垂直模式下的子菜单
  if (mode === 'vertical') {
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
              {typeof icon === 'string' ? <Icon name={icon} size={16} /> : icon}
            </span>
          )}
          <span className="soui-submenu-title-text">{title}</span>
          <Icon
            name="Down"
            size={12}
            className={classNames('soui-submenu-arrow', {
              'soui-submenu-arrow-open': isOpen,
            })}
          />
        </div>
        {isOpen && (
          <div className="soui-submenu-content" role="menu">
            {renderChildren()}
          </div>
        )}
      </div>
    );
  }

  // 水平模式下的子菜单（使用 Popup）
  return (
    <div className={submenuClassName} style={style}>
      <Tooltip
        title={
          <div className={popupClassName}>
            {renderChildren()}
          </div>
        }
        trigger="hover"
        placement="bottomLeft"
      >
        <div
          className="soui-submenu-title"
          role="menuitem"
          aria-haspopup="true"
          aria-disabled={disabled}
          tabIndex={disabled ? -1 : 0}
        >
          {icon && (
            <span className="soui-submenu-icon">
              {typeof icon === 'string' ? <Icon name={icon} size={16} /> : icon}
            </span>
          )}
          <span className="soui-submenu-title-text">{title}</span>
          <Icon name="Down" size={12} className="soui-submenu-arrow" />
        </div>
      </Tooltip>
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
    let newOpenKeys: string[];
    
    if (openKeys.includes(key)) {
      // 关闭
      newOpenKeys = openKeys.filter(k => k !== key);
    } else {
      // 展开
      newOpenKeys = [...openKeys, key];
    }

    if (controlledOpenKeys === undefined) {
      setInternalOpenKeys(newOpenKeys);
    }
    onOpenChange?.(newOpenKeys);
  }, [openKeys, controlledOpenKeys, onOpenChange]);

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
      '--soui-menu-item-hover-bg': 'rgba(0, 0, 0, 0.04)',
      '--soui-menu-item-active-bg': 'rgba(0, 0, 0, 0.06)',
    } : {
      '--soui-menu-bg-color': '#001529',
      '--soui-menu-color-text': 'rgba(255, 255, 255, 0.65)',
      '--soui-menu-item-hover-bg': 'rgba(255, 255, 255, 0.08)',
      '--soui-menu-item-active-bg': 'rgba(255, 255, 255, 0.12)',
    }),
    // 圆角配置
    ...((menuTheme?.borderRadius || globalTheme?.borderRadius) && {
      '--soui-menu-border-radius': `${menuTheme?.borderRadius || globalTheme?.borderRadius}px`,
    }),
    // 字体大小配置
    ...((menuTheme?.fontSize || globalTheme?.fontSize) && {
      '--soui-menu-font-size': `${menuTheme?.fontSize || globalTheme?.fontSize}px`,
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
      
      // 为 MenuItem 和 SubMenu 添加 keyPath
      if (child.type === MenuItem || child.type === SubMenu) {
        return React.cloneElement(child as any, {
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
