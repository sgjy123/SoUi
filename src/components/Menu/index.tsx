import React, {
  useState,
  useContext,
  useCallback,
  useEffect,
  useRef,
  useMemo,
} from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import Icon from '../Icon';
import Tooltip from '../Tooltip';
import { useComponentTheme, useTheme } from '../ConfigProvider';
import './style.less';

/* =========================
 * Types
 * ========================= */

export type MenuMode = 'horizontal' | 'vertical' | 'inline';
export type MenuTheme = 'light' | 'dark';

export interface MenuItemProps {
  itemKey: string;
  label?: React.ReactNode;
  icon?: string | React.ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onClick?: (key: string) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export interface SubMenuProps {
  itemKey: string;
  title?: React.ReactNode;
  icon?: string | React.ReactNode;
  disabled?: boolean;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface MenuGroupProps {
  title?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface MenuDividerProps {
  dashed?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface MenuProps {
  mode?: MenuMode;
  theme?: MenuTheme;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  openKeys?: string[];
  defaultOpenKeys?: string[];
  inlineCollapsed?: boolean;
  collapsedWidth?: number;
  popupZIndex?: number;
  accordion?: boolean;
  triggerSubMenuAction?: 'hover' | 'click';
  onClick?: (info: {
    key: string;
    keyPath: string[];
  }) => void;
  onOpenChange?: (openKeys: string[]) => void;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

/* =========================
 * Context
 * ========================= */

interface MenuContextType {
  mode: MenuMode;
  theme: MenuTheme;
  selectedKeys: string[];
  openKeys: string[];
  inlineCollapsed: boolean;
  popupZIndex: number;
  firstLevel: boolean;
  triggerSubMenuAction: 'hover' | 'click';
  onSelect: (
    key: string,
    keyPath: string[]
  ) => void;
  onOpenChange: (key: string) => void;
}

const MenuContext =
  React.createContext<MenuContextType | null>(
    null
  );

const useMenuContext = () => {
  const context = useContext(MenuContext);

  if (!context) {
    throw new Error(
      'Menu components must be wrapped in Menu'
    );
  }

  return context;
};

/* =========================
 * Utils
 * ========================= */

const hasSelectedChild = (
  children: React.ReactNode,
  selectedKeys: string[]
): boolean => {
  return React.Children.toArray(children).some(
    (child) => {
      if (!React.isValidElement(child)) {
        return false;
      }

      const props = child.props as any;

      if (
        props.itemKey &&
        selectedKeys.includes(props.itemKey)
      ) {
        return true;
      }

      if (props.children) {
        return hasSelectedChild(
          props.children,
          selectedKeys
        );
      }

      return false;
    }
  );
};

/* =========================
 * MenuItem
 * ========================= */

const MenuItem: React.FC<
  MenuItemProps & {
    keyPath?: string[];
  }
> = ({
  itemKey,
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
  const {
    mode,
    theme,
    selectedKeys,
    inlineCollapsed,
    firstLevel,
    onSelect,
  } = useMenuContext();

  const isSelected =
    selectedKeys.includes(itemKey);

  const handleClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onSelect(itemKey, [
        ...keyPath,
        itemKey,
      ]);

      onClick?.(itemKey);
    },
    [
      disabled,
      itemKey,
      keyPath,
      onSelect,
      onClick,
    ]
  );

  const itemClassName = classNames(
    'soui-menu-item',
    {
      'soui-menu-item-selected':
        isSelected,
      'soui-menu-item-disabled':
        disabled,
      'soui-menu-item-danger': danger,
    },
    className
  );

  const renderContent = () => (
    <div
      className={itemClassName}
      style={style}
      onClick={handleClick}
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled}
      aria-selected={isSelected}
      onKeyDown={(e) => {
        if (
          e.key === 'Enter' ||
          e.key === ' '
        ) {
          e.preventDefault();
          handleClick(e as any);
        }
      }}
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
                  ? 'rgba(255,255,255,.65)'
                  : 'rgba(0,0,0,.85)'
              }
            />
          ) : (
            icon
          )}
        </span>
      )}

      {!inlineCollapsed && (
        <span className="soui-menu-item-label">
          {label || children}
        </span>
      )}

      {inlineCollapsed &&
        firstLevel &&
        typeof label === 'string' && (
          <div className="soui-menu-inline-collapsed-noicon">
            {label.charAt(0)}
          </div>
        )}
    </div>
  );

  if (
    inlineCollapsed &&
    mode === 'inline' &&
    firstLevel
  ) {
    return (
      <Tooltip
        title={label || children}
        placement="right"
      >
        {renderContent()}
      </Tooltip>
    );
  }

  return renderContent();
};

(MenuItem as any).__MENU_ITEM = true;

/* =========================
 * SubMenu
 * ========================= */

const SubMenu: React.FC<
  SubMenuProps & {
    keyPath?: string[];
  }
> = ({
  itemKey,
  title,
  icon,
  disabled = false,
  children,
  className,
  style,
  keyPath = [],
}) => {
  const {
    mode,
    theme,
    selectedKeys,
    openKeys,
    inlineCollapsed,
    popupZIndex,
    triggerSubMenuAction,
    onOpenChange,
    onSelect,
  } = useMenuContext();

  const isOpen =
    openKeys.includes(itemKey);

  const isSubMenuSelected =
    hasSelectedChild(
      children,
      selectedKeys
    );

  const containerRef =
    useRef<HTMLDivElement>(null);

  const popupRef =
    useRef<HTMLDivElement>(null);

  const closeTimerRef = useRef<
    ReturnType<typeof setTimeout> | null
  >(null);

  const clearCloseTimer = () => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  };

  const handleToggle = useCallback(() => {
    if (disabled) {
      return;
    }

    onOpenChange(itemKey);
  }, [disabled, itemKey, onOpenChange]);

  const handlePointerEnter =
    useCallback(() => {
      clearCloseTimer();

      if (
        triggerSubMenuAction ===
          'hover' &&
        mode === 'horizontal' &&
        !isOpen
      ) {
        onOpenChange(itemKey);
      }
    }, [
      triggerSubMenuAction,
      mode,
      isOpen,
      itemKey,
      onOpenChange,
    ]);

  const handlePointerLeave =
    useCallback(() => {
      clearCloseTimer();

      // 只有 horizontal 模式才在鼠标离开时收起子菜单
      // vertical 和 inline 模式通过点击切换
      if (mode === 'horizontal') {
        closeTimerRef.current =
          setTimeout(() => {
            if (isOpen) {
              onOpenChange(itemKey);
            }
          }, 100);
      }
    }, [
      mode,
      isOpen,
      itemKey,
      onOpenChange,
    ]);

  useEffect(() => {
    return () => {
      clearCloseTimer();
    };
  }, []);

  const popup = isOpen ? (
    <div
      ref={popupRef}
      className={classNames(
        'soui-submenu-popup',
        `soui-submenu-popup-${theme}`
      )}
      role="menu"
      style={{
        position: 'fixed',
        top:
          containerRef.current?.getBoundingClientRect()
            .bottom ?? 0,
        left:
          containerRef.current?.getBoundingClientRect()
            .left ?? 0,
        zIndex: popupZIndex,
      }}
    >
      <MenuContext.Provider
        value={{
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
        }}
      >
        {children}
      </MenuContext.Provider>
    </div>
  ) : null;

  return (
    <div
      ref={containerRef}
      className={classNames(
        'soui-submenu',
        {
          'soui-submenu-open':
            isOpen,
          'soui-submenu-selected':
            isSubMenuSelected,
          'soui-submenu-disabled':
            disabled,
        },
        className
      )}
      style={style}
      onPointerEnter={
        handlePointerEnter
      }
      onPointerLeave={
        handlePointerLeave
      }
    >
      <div
        className="soui-submenu-title"
        role="menuitem"
        tabIndex={
          disabled ? -1 : 0
        }
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-disabled={disabled}
        onClick={handleToggle}
        onKeyDown={(e) => {
          if (
            e.key === 'Enter' ||
            e.key === ' '
          ) {
            e.preventDefault();
            handleToggle();
          }
        }}
      >
        {icon && (
          <span className="soui-submenu-icon">
            {typeof icon ===
            'string' ? (
              <Icon
                name={icon}
                size={16}
              />
            ) : (
              icon
            )}
          </span>
        )}

        {!inlineCollapsed && (
          <span className="soui-submenu-title-text">
            {title}
          </span>
        )}

        <Icon
          name="Down"
          size={12}
          className={classNames(
            'soui-submenu-arrow',
            {
              'soui-submenu-arrow-open':
                isOpen,
            }
          )}
        />
      </div>

      {mode === 'inline' &&
        !inlineCollapsed &&
        isOpen && (
          <div className="soui-submenu-content">
            <MenuContext.Provider
              value={{
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
              }}
            >
              {children}
            </MenuContext.Provider>
          </div>
        )}

      {mode === 'vertical' &&
        !inlineCollapsed &&
        isOpen && (
          <div className="soui-submenu-content">
            <MenuContext.Provider
              value={{
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
              }}
            >
              {children}
            </MenuContext.Provider>
          </div>
        )}

      {mode === 'horizontal' && popup && createPortal(popup, document.body)}
    </div>
  );
};

(SubMenu as any).__SUB_MENU = true;

/* =========================
 * MenuGroup
 * ========================= */

const MenuGroup: React.FC<
  MenuGroupProps
> = ({
  title,
  children,
  className,
  style,
}) => {
  return (
    <div
      className={classNames(
        'soui-menu-group',
        className
      )}
      style={style}
      role="group"
    >
      {title && (
        <div className="soui-menu-group-title">
          {title}
        </div>
      )}

      <div className="soui-menu-group-content">
        {children}
      </div>
    </div>
  );
};

(MenuGroup as any).__MENU_GROUP = true;

/* =========================
 * MenuDivider
 * ========================= */

const MenuDivider: React.FC<
  MenuDividerProps
> = ({
  dashed = false,
  className,
  style,
}) => {
  return (
    <div
      role="separator"
      className={classNames(
        'soui-menu-divider',
        {
          'soui-menu-divider-dashed':
            dashed,
        },
        className
      )}
      style={style}
    />
  );
};

(MenuDivider as any).__MENU_DIVIDER =
  true;

/* =========================
 * Menu
 * ========================= */

const Menu: React.FC<MenuProps> & {
  Item: typeof MenuItem;
  SubMenu: typeof SubMenu;
  Group: typeof MenuGroup;
  Divider: typeof MenuDivider;
} = ({
  mode = 'inline',
  theme = 'light',
  selectedKeys:
    controlledSelectedKeys,
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
  const menuTheme =
    useComponentTheme('Menu');

  const globalTheme = useTheme();

  const mergedInlineCollapsed =
    mode === 'inline' &&
    inlineCollapsed;

  const [
    innerSelectedKeys,
    setInnerSelectedKeys,
  ] = useState<string[]>(
    defaultSelectedKeys
  );

  const [
    innerOpenKeys,
    setInnerOpenKeys,
  ] = useState<string[]>(
    defaultOpenKeys
  );

  const selectedKeys =
    controlledSelectedKeys ??
    innerSelectedKeys;

  const openKeys =
    controlledOpenKeys ??
    innerOpenKeys;

  const handleSelect = useCallback(
    (
      key: string,
      keyPath: string[]
    ) => {
      if (
        controlledSelectedKeys ===
        undefined
      ) {
        setInnerSelectedKeys([key]);
      }

      onClick?.({
        key,
        keyPath,
      });
    },
    [
      controlledSelectedKeys,
      onClick,
    ]
  );

  const handleOpenChange =
    useCallback(
      (key: string) => {
        let nextKeys: string[] =
          [];

        if (
          openKeys.includes(key)
        ) {
          nextKeys =
            openKeys.filter(
              (k) => k !== key
            );
        } else {
          nextKeys = accordion
            ? [key]
            : [...openKeys, key];
        }

        if (
          controlledOpenKeys ===
          undefined
        ) {
          setInnerOpenKeys(
            nextKeys
          );
        }

        onOpenChange?.(
          nextKeys
        );
      },
      [
        openKeys,
        accordion,
        controlledOpenKeys,
        onOpenChange,
      ]
    );

  const contextValue =
    useMemo(
      () => ({
        mode,
        theme,
        selectedKeys,
        openKeys,
        inlineCollapsed:
          mergedInlineCollapsed,
        popupZIndex,
        firstLevel: true,
        triggerSubMenuAction,
        onSelect: handleSelect,
        onOpenChange:
          handleOpenChange,
      }),
      [
        mode,
        theme,
        selectedKeys,
        openKeys,
        mergedInlineCollapsed,
        popupZIndex,
        triggerSubMenuAction,
        handleSelect,
        handleOpenChange,
      ]
    );

  const renderChildren = (
    children: React.ReactNode
  ) => {
    return React.Children.map(
      children,
      (child) => {
        if (
          !React.isValidElement(
            child
          )
        ) {
          return child;
        }

        const childType =
          child.type as any;

        if (
          childType?.__MENU_ITEM ||
          childType?.__SUB_MENU ||
          childType?.__MENU_GROUP ||
          childType?.__MENU_DIVIDER
        ) {
          return child;
        }

        if (
          process.env.NODE_ENV !==
          'production'
        ) {
          console.warn(
            'Menu only accepts Menu.Item, Menu.SubMenu, Menu.Group, Menu.Divider'
          );
        }

        return null;
      }
    );
  };

  return (
    <MenuContext.Provider
      value={contextValue}
    >
      <nav
        className={classNames(
          'soui-menu',
          `soui-menu-${mode}`,
          `soui-menu-${theme}`,
          {
            'soui-menu-inline-collapsed':
              mergedInlineCollapsed,
          },
          className
        )}
        role="menu"
        style={
          {
            '--soui-menu-collapsed-width': `${collapsedWidth}px`,
            '--soui-menu-item-selected-color':
              globalTheme?.primaryColor ||
              '#1677ff',
            '--soui-menu-border-radius': `${menuTheme?.borderRadius || 6}px`,
            ...style,
          } as React.CSSProperties
        }
      >
        {renderChildren(
          children
        )}
      </nav>
    </MenuContext.Provider>
  );
};

Menu.Item = MenuItem;
Menu.SubMenu = SubMenu;
Menu.Group = MenuGroup;
Menu.Divider = MenuDivider;

export default Menu;