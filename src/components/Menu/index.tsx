import React, {
  useMemo,
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { createPortal } from "react-dom";
import classNames from "classnames";
import Icon from "../Icon";
import Tooltip from "../Tooltip";
import "./style.less";

export type MenuMode = "inline" | "vertical" | "horizontal";
export interface MenuItemType {
  key: string;
  label: React.ReactNode;
  icon?: React.ReactNode | string;
  disabled?: boolean;
  danger?: boolean;
  children?: MenuItemType[];
  type?: "item" | "group" | "divider";
}
export interface MenuProps {
  items: MenuItemType[];
  mode?: MenuMode;
  inlineCollapsed?: boolean;
  selectedKeys?: string[];
  defaultSelectedKeys?: string[];
  openKeys?: string[];
  defaultOpenKeys?: string[];
  accordion?: boolean;
  triggerSubMenuAction?: "hover" | "click";
  popupZIndex?: number;
  className?: string;
  style?: React.CSSProperties;
  onClick?: (info: { key: string; keyPath: string[] }) => void;
  onOpenChange?: (keys: string[]) => void;
  popupTheme?: "light" | "dark";
}
/* =========================
 * Context
 * ========================= */

interface MenuContextProps {
  mode: MenuMode;
  inlineCollapsed: boolean;
  selectedKeys: string[];
  openKeys: string[];
  triggerSubMenuAction: "hover" | "click";
  popupZIndex: number;
  level: number;
  isPopup: boolean;
  popupTheme: "light" | "dark";
  onSelect: (key: string, keyPath: string[]) => void;
  onToggleOpen: (key: string) => void;
}
const MenuContext = React.createContext<MenuContextProps | null>(null);

const useMenuContext = () => {
  const ctx = useContext(MenuContext);
  if (!ctx) {
    throw new Error("Menu context missing");
  }
  return ctx;
};
/* =========================
 * Utils
 * ========================= */

const renderIcon = (icon?: React.ReactNode | string) => {
  if (!icon) {
    return null;
  }
  if (typeof icon === "string") {
    return <Icon name={icon} size={16} />;
  }
  return icon;
};
const hasSelectedChild = (
  children: MenuItemType[] = [],
  selectedKeys: string[],
): boolean => {
  return children.some((child) => {
    if (selectedKeys.includes(child.key)) {
      return true;
    }
    return hasSelectedChild(child.children, selectedKeys);
  });
};
/* =========================
 * MenuItem
 * ========================= */

const MenuItem = React.memo(
  ({ item, parentKeys }: { item: MenuItemType; parentKeys: string[] }) => {
    const { inlineCollapsed, selectedKeys, onSelect, level, isPopup } =
      useMenuContext();
    const selected = selectedKeys.includes(item.key);
    const keyPath = [...parentKeys, item.key];
    const content = (
      <div
        role="menuitem"
        tabIndex={item.disabled ? -1 : 0}
        className={classNames("soui-menu-item", {
          "soui-menu-item-selected": selected,
          "soui-menu-item-disabled": item.disabled,
          "soui-menu-item-danger": item.danger,
          "soui-menu-item-collapsed":
            inlineCollapsed && level === 0 && !isPopup,
        })}
        style={{
          paddingLeft:
            inlineCollapsed && !isPopup ? undefined : level * 16 + 16,
        }}
        onClick={() => {
          if (item.disabled) {
            return;
          }
          onSelect(item.key, keyPath);
        }}
      >
        {item.icon && (
          <span className="soui-menu-item-icon">{renderIcon(item.icon)}</span>
        )}
        {!(inlineCollapsed && level === 0 && !isPopup) && (
          <span className="soui-menu-item-label">{item.label}</span>
        )}
        {inlineCollapsed && level === 0 && !isPopup && !item.icon && (
          <span className="soui-menu-collapsed-char">
            {String(item.label).charAt(0)}
          </span>
        )}
      </div>
    );
    if (inlineCollapsed && level === 0 && !isPopup) {
      return (
        <Tooltip placement="right" title={item.label} className="soui-menu-tooltip-trigger">
          {content}
        </Tooltip>
      );
    }
    return content;
  },
);
/* =========================
 * Popup
 * ========================= */

const Popup = ({
  visible,
  anchor,
  children,
  zIndex,
  mode,
  popupTheme,
  level,
}: {
  visible: boolean;
  anchor: DOMRect | null;
  children: React.ReactNode;
  zIndex: number;
  mode: MenuMode;
  popupTheme: "light" | "dark";
  level: number;
}) => {
  if (!visible || !anchor) {
    return null;
  }

  // 水平菜单的第一层和第二层从下方弹出，第三层及以上从右侧弹出
  const isHorizontal = mode === "horizontal";
  const shouldPopupFromBottom = isHorizontal && level < 2;

  return createPortal(
    <div
      className={classNames("soui-submenu-popup", {
        "soui-submenu-popup-dark": popupTheme === "dark",
        "soui-submenu-popup-light": popupTheme === "light",
      })}
      style={{
        position: "fixed",
        top: shouldPopupFromBottom ? anchor.bottom : anchor.top,
        left: shouldPopupFromBottom ? anchor.left : anchor.right + 4,
        zIndex,
      }}
    >
      {children}
    </div>,
    document.body,
  );
};
/* =========================
 * SubMenu
 * ========================= */

const SubMenu = React.memo(
  ({ item, parentKeys }: { item: MenuItemType; parentKeys: string[] }) => {
    const {
      mode,
      inlineCollapsed,
      selectedKeys,
      openKeys,
      triggerSubMenuAction,
      popupZIndex,
      level,
      isPopup,
      popupTheme,
      onToggleOpen,
    } = useMenuContext();
    const open = openKeys.includes(item.key);
    const selected = hasSelectedChild(item.children, selectedKeys);
    const ref = useRef<HTMLDivElement>(null);
    const [popupVisible, setPopupVisible] = useState(false);
    const [popupRect, setPopupRect] = useState<DOMRect | null>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const keyPath = [...parentKeys, item.key];
    const clearTimer = () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
    const showPopup = useCallback(() => {
      clearTimer();
      if (ref.current) {
        setPopupRect(ref.current.getBoundingClientRect());
      }
      setPopupVisible(true);
    }, []);
    const hidePopup = useCallback(() => {
      clearTimer();
      timerRef.current = setTimeout(() => {
        setPopupVisible(false);
      }, 120);
    }, []);
    useEffect(() => {
      return () => {
        clearTimer();
      };
    }, []);
    const collapsed =
      inlineCollapsed && mode === "inline" && level === 0 && !isPopup;
    const popupMode = collapsed || mode !== "inline";
    const popupOpen = popupMode ? popupVisible : open;
    const renderChildren = () => (
      <MenuContext.Provider
        value={{
          mode,
          inlineCollapsed: false,
          selectedKeys,
          openKeys,
          triggerSubMenuAction,
          popupZIndex,
          level: level + 1,
          isPopup: popupMode,
          popupTheme,
          onSelect: useMenuContext().onSelect,
          onToggleOpen,
        }}
      >
        {item.children?.map((child) => renderNode(child, keyPath))}
      </MenuContext.Provider>
    );
    return (
      <div
        ref={ref}
        className={classNames("soui-submenu", {
          "soui-submenu-open": popupOpen,
          "soui-submenu-selected": selected,
          "soui-submenu-collapsed": collapsed,
        })}
        onMouseEnter={() => {
          if (popupMode && triggerSubMenuAction === "hover") {
            showPopup();
          }
        }}
        onMouseLeave={() => {
          if (popupMode && triggerSubMenuAction === "hover") {
            hidePopup();
          }
        }}
      >
        <div
          className={classNames("soui-submenu-title", {
            "soui-submenu-title-collapsed": collapsed,
          })}
          style={{
            paddingLeft: collapsed ? undefined : level * 16 + 16,
          }}
          onClick={() => {
            if (popupMode) {
              setPopupVisible((prev) => !prev);
              if (ref.current) {
                setPopupRect(ref.current.getBoundingClientRect());
              }
              return;
            }
            onToggleOpen(item.key);
          }}
        >
          {item.icon && (
            <span className="soui-submenu-icon">{renderIcon(item.icon)}</span>
          )}
          {!collapsed && (
            <span className="soui-submenu-title-text">{item.label}</span>
          )}
          {collapsed && !item.icon && (
            <span className="soui-menu-collapsed-char">
              {String(item.label).charAt(0)}
            </span>
          )}
          {!collapsed && (
            <Icon
              name={mode === "horizontal" && level === 0 ? "Down" : "Right"}
              size={12}
              className={classNames("soui-submenu-arrow", {
                "soui-submenu-arrow-open": popupOpen && !popupMode,
              })}
            />
          )}
        </div>
        {/* inline mode */}
        {!popupMode && open && (
          <div className="soui-submenu-content">{renderChildren()}</div>
        )}
        {/* popup mode */}
        {/* {popupMode && (
          <Popup
            visible={popupOpen}
            anchor={popupRect}
            zIndex={popupZIndex + level}
            mode={mode}
            popupTheme={popupTheme}
            level={level + 1}
          >
            <div
              onMouseEnter={() => {
                clearTimer();
              }}
              onMouseLeave={() => {
                hidePopup();
              }}
            >
              {renderChildren()}
            </div>
          </Popup>
        )} */}
                  <Popup
            visible={true}
            anchor={popupRect}
            zIndex={popupZIndex + level}
            mode={mode}
            popupTheme={popupTheme}
            level={level + 1}
          >
            <div
              onMouseEnter={() => {
                clearTimer();
              }}
              onMouseLeave={() => {
                hidePopup();
              }}
            >
              {renderChildren()}
            </div>
          </Popup>
      </div>
    );
  },
);
/* =========================
 * renderNode
 * ========================= */

const renderNode = (
  item: MenuItemType,
  parentKeys: string[],
): React.ReactNode => {
  if (item.type === "divider") {
    return <div key={item.key} className="soui-menu-divider" />;
  }
  if (item.type === "group") {
    return (
      <div key={item.key} className="soui-menu-group">
        <div className="soui-menu-group-title">{item.label}</div>
        <div className="soui-menu-group-content">
          {item.children?.map((child) => renderNode(child, parentKeys))}
        </div>
      </div>
    );
  }
  if (item.children?.length) {
    return <SubMenu key={item.key} item={item} parentKeys={parentKeys} />;
  }
  return <MenuItem key={item.key} item={item} parentKeys={parentKeys} />;
};
/* =========================
 * Menu
 * ========================= */

const Menu: React.FC<MenuProps> = ({
  items,
  mode = "inline",
  inlineCollapsed = false,
  selectedKeys: controlledSelectedKeys,
  defaultSelectedKeys = [],
  openKeys: controlledOpenKeys,
  defaultOpenKeys = [],
  accordion = false,
  popupZIndex = 1050,
  triggerSubMenuAction = "hover",
  className,
  style,
  onClick,
  onOpenChange,
  popupTheme = "light",
}) => {
  const [innerSelectedKeys, setInnerSelectedKeys] =
    useState(defaultSelectedKeys);
  const [innerOpenKeys, setInnerOpenKeys] = useState(defaultOpenKeys);
  const selectedKeys = controlledSelectedKeys ?? innerSelectedKeys;
  const openKeys = controlledOpenKeys ?? innerOpenKeys;
  const onSelect = useCallback(
    (key: string, keyPath: string[]) => {
      if (controlledSelectedKeys === undefined) {
        setInnerSelectedKeys([key]);
      }
      onClick?.({
        key,
        keyPath,
      });
    },
    [controlledSelectedKeys, onClick],
  );
  const onToggleOpen = useCallback(
    (key: string) => {
      let nextKeys: string[];
      if (openKeys.includes(key)) {
        nextKeys = openKeys.filter((k) => k !== key);
      } else {
        nextKeys = accordion ? [key] : [...openKeys, key];
      }
      if (controlledOpenKeys === undefined) {
        setInnerOpenKeys(nextKeys);
      }
      onOpenChange?.(nextKeys);
    },
    [openKeys, accordion, controlledOpenKeys, onOpenChange],
  );
  const contextValue = useMemo(
    () => ({
      mode,
      inlineCollapsed,
      selectedKeys,
      openKeys,
      triggerSubMenuAction,
      popupZIndex,
      level: 0,
      isPopup: false,
      popupTheme,
      onSelect,
      onToggleOpen,
    }),
    [
      mode,
      inlineCollapsed,
      selectedKeys,
      openKeys,
      triggerSubMenuAction,
      popupZIndex,
      popupTheme,
      onSelect,
      onToggleOpen,
    ],
  );
  return (
    <MenuContext.Provider value={contextValue}>
      <div
        className={classNames(
          "soui-menu",
          `soui-menu-${mode}`,
          {
            "soui-menu-inline-collapsed": inlineCollapsed,
          },
          className,
        )}
        style={style}
        role="menu"
      >
        {items.map((item) => renderNode(item, []))}
      </div>
    </MenuContext.Provider>
  );
};

export default Menu;
