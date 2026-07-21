import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import Icon from '../Icon';
import './style.less';

// ==================== Types ====================

/** 下拉菜单项 */
export interface DropdownMenuItem {
  /** 唯一标识 */
  key: string;
  /** 菜单项文字 */
  label?: React.ReactNode;
  /** 菜单项图标 */
  icon?: React.ReactNode;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否为危险项（红色） */
  danger?: boolean;
  /** 菜单项类型 */
  type?: 'group' | 'divider';
  /** 子菜单 */
  children?: DropdownMenuItem[];
}

/** 菜单配置 */
export interface DropdownMenuProps {
  /** 菜单项数组 */
  items?: DropdownMenuItem[];
  /** 点击菜单项回调 */
  onClick?: (info: { key: string }) => void;
  /** 是否支持选中 */
  selectable?: boolean;
  /** 选中的菜单项 key 数组 */
  selectedKeys?: string[];
}

/** 触发方式 */
export type DropdownTrigger = 'hover' | 'click' | 'contextMenu';

/** 浮层位置 */
export type DropdownPlacement =
  | 'bottomLeft'
  | 'bottomCenter'
  | 'bottomRight'
  | 'topLeft'
  | 'topCenter'
  | 'topRight';

export interface DropdownProps {
  /** 菜单配置 */
  menu?: DropdownMenuProps;
  /** 子节点（触发元素） */
  children?: React.ReactNode;
  /** 触发方式数组 */
  trigger?: DropdownTrigger[];
  /** 浮层位置 */
  placement?: DropdownPlacement;
  /** 是否显示浮层（受控） */
  open?: boolean;
  /** 默认是否显示浮层 */
  defaultOpen?: boolean;
  /** 显示/隐藏回调 */
  onOpenChange?: (open: boolean) => void;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否显示箭头 */
  arrow?: boolean;
  /** 是否自动调整位置防止溢出 */
  autoAdjustOverflow?: boolean;
  /** 隐藏时是否销毁浮层 */
  destroyPopupOnHide?: boolean;
  /** z-index */
  zIndex?: number;
  /** 浮层类名 */
  overlayClassName?: string;
  /** 浮层样式 */
  overlayStyle?: React.CSSProperties;
  /** 自定义浮层渲染 */
  dropdownRender?: (menu: React.ReactNode) => React.ReactNode;
  /** 指定浮层挂载的节点 */
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  /** 鼠标移入延迟时间（秒） */
  mouseEnterDelay?: number;
  /** 鼠标移出延迟时间（秒） */
  mouseLeaveDelay?: number;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ==================== Constants ====================

/** 浮层与触发元素的间距 */
const GAP = 4;

// ==================== Utils ====================

const getRect = (el: HTMLElement): DOMRect => el.getBoundingClientRect();

/** 确保浮层在可视区域内 */
const keepInViewport = (
  left: number,
  top: number,
  popupRect: DOMRect,
): { left: number; top: number } => {
  const padding = 4;
  const maxLeft = window.innerWidth - popupRect.width - padding;
  const maxTop = window.innerHeight - popupRect.height - padding;

  return {
    left: Math.max(padding, Math.min(left, maxLeft)),
    top: Math.max(padding, Math.min(top, maxTop)),
  };
};

/** 计算浮层位置 */
const calcPosition = (
  placement: DropdownPlacement,
  triggerRect: DOMRect,
  popupRect: DOMRect,
  autoAdjustOverflow: boolean,
): { left: number; top: number } => {
  let top = 0;
  let left = 0;

  switch (placement) {
    case 'bottomLeft':
      top = triggerRect.bottom + GAP;
      left = triggerRect.left;
      break;
    case 'bottomCenter':
      top = triggerRect.bottom + GAP;
      left = triggerRect.left + (triggerRect.width - popupRect.width) / 2;
      break;
    case 'bottomRight':
      top = triggerRect.bottom + GAP;
      left = triggerRect.right - popupRect.width;
      break;
    case 'topLeft':
      top = triggerRect.top - popupRect.height - GAP;
      left = triggerRect.left;
      break;
    case 'topCenter':
      top = triggerRect.top - popupRect.height - GAP;
      left = triggerRect.left + (triggerRect.width - popupRect.width) / 2;
      break;
    case 'topRight':
      top = triggerRect.top - popupRect.height - GAP;
      left = triggerRect.right - popupRect.width;
      break;
  }

  if (autoAdjustOverflow) {
    return keepInViewport(left, top, popupRect);
  }

  return { top, left };
};

// ==================== Sub Menu ====================

interface SubMenuProps {
  item: DropdownMenuItem;
  level: number;
  onItemClick: (key: string) => void;
  selectedKeys: string[];
  selectable: boolean;
}

const SubMenu: React.FC<SubMenuProps> = ({ item, level, onItemClick, selectedKeys, selectable }) => {
  const [subOpen, setSubOpen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const openSub = () => {
    clearTimer();
    setSubOpen(true);
  };

  const closeSub = () => {
    clearTimer();
    timerRef.current = setTimeout(() => setSubOpen(false), 100);
  };

  useEffect(() => clearTimer, []);

  return (
    <li
      className={classNames('soui-dropdown-item soui-dropdown-submenu', {
        'soui-dropdown-submenu-open': subOpen,
        'soui-dropdown-item-disabled': item.disabled,
      })}
      role="none"
      onMouseEnter={item.disabled ? undefined : openSub}
      onMouseLeave={item.disabled ? undefined : closeSub}
    >
      <div className="soui-dropdown-item-content">
        {item.icon && <span className="soui-dropdown-item-icon">{item.icon}</span>}
        <span className="soui-dropdown-item-label">{item.label}</span>
        <span className="soui-dropdown-item-arrow">
          <Icon name="Right" size={12} />
        </span>
      </div>
      {subOpen && !item.disabled && (
        <div className="soui-dropdown-submenu-popup">
          <MenuList
            items={item.children || []}
            level={level + 1}
            onItemClick={onItemClick}
            selectedKeys={selectedKeys}
            selectable={selectable}
          />
        </div>
      )}
    </li>
  );
};

// ==================== Menu List ====================

interface MenuListProps {
  items: DropdownMenuItem[];
  level: number;
  onItemClick: (key: string) => void;
  selectedKeys: string[];
  selectable: boolean;
}

const MenuList: React.FC<MenuListProps> = ({ items, level, onItemClick, selectedKeys, selectable }) => {
  return (
    <ul className="soui-dropdown-menu" role="menu">
      {items.map((item) => {
        if (item.type === 'divider') {
          return <li key={item.key} className="soui-dropdown-divider" role="separator" />;
        }

        if (item.type === 'group') {
          return (
            <li key={item.key} className="soui-dropdown-group" role="none">
              <div className="soui-dropdown-group-title">{item.label}</div>
              <MenuList
                items={item.children || []}
                level={level + 1}
                onItemClick={onItemClick}
                selectedKeys={selectedKeys}
                selectable={selectable}
              />
            </li>
          );
        }

        if (item.children && item.children.length > 0) {
          return (
            <SubMenu
              key={item.key}
              item={item}
              level={level + 1}
              onItemClick={onItemClick}
              selectedKeys={selectedKeys}
              selectable={selectable}
            />
          );
        }

        const isSelected = selectable && selectedKeys.includes(item.key);

        return (
          <li
            key={item.key}
            className={classNames('soui-dropdown-item', {
              'soui-dropdown-item-disabled': item.disabled,
              'soui-dropdown-item-danger': item.danger,
              'soui-dropdown-item-selected': isSelected,
            })}
            role="menuitem"
            aria-disabled={item.disabled}
            onClick={() => {
              if (item.disabled) return;
              onItemClick(item.key);
            }}
          >
            <div className="soui-dropdown-item-content">
              {item.icon && <span className="soui-dropdown-item-icon">{item.icon}</span>}
              <span className="soui-dropdown-item-label">{item.label}</span>
              {isSelected && (
                <span className="soui-dropdown-item-check">
                  <Icon name="Check" size={12} />
                </span>
              )}
            </div>
          </li>
        );
      })}
    </ul>
  );
};

// ==================== Main Component ====================

const Dropdown: React.FC<DropdownProps> = ({
  menu,
  children,
  trigger = ['hover'],
  placement = 'bottomLeft',
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  disabled = false,
  arrow = false,
  autoAdjustOverflow = true,
  destroyPopupOnHide = true,
  zIndex = 1050,
  overlayClassName,
  overlayStyle,
  dropdownRender,
  getPopupContainer,
  mouseEnterDelay = 0.15,
  mouseLeaveDelay = 0.1,
  className,
  style,
}) => {
  const context = useContext(ConfigContext);
  const componentTheme = (context?.components?.Dropdown || {}) as Record<string, any>;

  // 主题 CSS 变量
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (componentTheme.colorPrimary !== undefined) {
    cssVars['--soui-dropdown-color-primary'] = componentTheme.colorPrimary;
  }
  if (componentTheme.fontSize !== undefined) {
    cssVars['--soui-dropdown-font-size'] = `${componentTheme.fontSize}px`;
  }
  if (componentTheme.borderRadius !== undefined) {
    cssVars['--soui-dropdown-border-radius'] = `${componentTheme.borderRadius}px`;
  }
  if (componentTheme.colorBg !== undefined) {
    cssVars['--soui-dropdown-color-bg'] = componentTheme.colorBg;
  }
  if (componentTheme.itemHoverBg !== undefined) {
    cssVars['--soui-dropdown-item-hover-bg'] = componentTheme.itemHoverBg;
  }
  if (componentTheme.colorError !== undefined) {
    cssVars['--soui-dropdown-color-error'] = componentTheme.colorError;
  }

  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const [position, setPosition] = useState({ top: -9999, left: -9999 });

  const triggerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const visible = controlledOpen !== undefined ? controlledOpen : innerOpen;

  const menuItems = menu?.items || [];
  const selectable = menu?.selectable || false;
  const selectedKeys = menu?.selectedKeys || [];

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const changeVisible = useCallback((next: boolean) => {
    if (disabled) return;
    if (controlledOpen === undefined) {
      setInnerOpen(next);
    }
    onOpenChange?.(next);
  }, [disabled, controlledOpen, onOpenChange]);

  /** 对齐浮层位置 */
  const align = useCallback(() => {
    const triggerNode = triggerRef.current;
    const popupNode = popupRef.current;
    if (!triggerNode || !popupNode) return;

    const triggerRect = getRect(triggerNode);
    const popupRect = popupNode.getBoundingClientRect();
    const next = calcPosition(placement, triggerRect, popupRect, autoAdjustOverflow);

    setPosition((prev) => {
      if (prev.top === next.top && prev.left === next.left) return prev;
      return next;
    });
  }, [placement, autoAdjustOverflow]);

  useLayoutEffect(() => {
    if (!visible) return;
    align();
  }, [visible, align, menuItems]);

  /** 监听滚动和 resize */
  useEffect(() => {
    if (!visible) return;

    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(align);
    };

    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [visible, align]);

  /** 点击外部关闭 */
  useEffect(() => {
    if (!visible) return;

    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        popupRef.current?.contains(target)
      ) {
        return;
      }
      changeVisible(false);
    };

    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [visible, changeVisible]);

  /** ESC 关闭 */
  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') changeVisible(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [visible, changeVisible]);

  useEffect(() => clearTimer, []);

  const openDropdown = () => {
    clearTimer();
    timerRef.current = setTimeout(() => changeVisible(true), mouseEnterDelay * 1000);
  };

  const closeDropdown = () => {
    clearTimer();
    timerRef.current = setTimeout(() => changeVisible(false), mouseLeaveDelay * 1000);
  };

  const toggleDropdown = () => {
    clearTimer();
    changeVisible(!visible);
  };

  /** 点击菜单项 */
  const handleItemClick = useCallback((key: string) => {
    menu?.onClick?.({ key });
    changeVisible(false);
  }, [menu, changeVisible]);

  // 构建触发器属性
  const triggerProps: React.HTMLAttributes<HTMLDivElement> = {};

  if (trigger.includes('hover')) {
    triggerProps.onMouseEnter = openDropdown;
    triggerProps.onMouseLeave = closeDropdown;
  }
  if (trigger.includes('click')) {
    triggerProps.onClick = (e) => {
      e.stopPropagation();
      toggleDropdown();
    };
  }
  if (trigger.includes('contextMenu')) {
    triggerProps.onContextMenu = (e) => {
      e.preventDefault();
      toggleDropdown();
    };
  }

  /** 渲染菜单内容 */
  const menuContent = (
    <MenuList
      items={menuItems}
      level={0}
      onItemClick={handleItemClick}
      selectedKeys={selectedKeys}
      selectable={selectable}
    />
  );

  const isTop = placement.startsWith('top');

  const popup = visible || !destroyPopupOnHide ? (
    <div
      ref={popupRef}
      className={classNames(
        'soui-dropdown',
        `soui-dropdown-placement-${placement}`,
        overlayClassName,
      )}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        zIndex,
        visibility: visible ? 'visible' : 'hidden',
        pointerEvents: visible ? 'auto' : 'none',
        ...cssVars,
        ...overlayStyle,
      } as React.CSSProperties}
      onMouseEnter={trigger.includes('hover') ? openDropdown : undefined}
      onMouseLeave={trigger.includes('hover') ? closeDropdown : undefined}
    >
      {arrow && (
        <div className={classNames('soui-dropdown-arrow', { 'soui-dropdown-arrow-top': isTop })} />
      )}
      <div className="soui-dropdown-inner">
        {dropdownRender ? dropdownRender(menuContent) : menuContent}
      </div>
    </div>
  ) : null;

  const container =
    getPopupContainer && triggerRef.current
      ? getPopupContainer(triggerRef.current)
      : document.body;

  return (
    <>
      <div
        ref={triggerRef}
        className={classNames('soui-dropdown-trigger', { 'soui-dropdown-trigger-disabled': disabled }, className)}
        style={style}
        {...triggerProps}
      >
        {children}
      </div>
      {popup && ReactDOM.createPortal(popup, container)}
    </>
  );
};

export default Dropdown;
