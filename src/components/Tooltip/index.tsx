import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import './style.less';

// ==================== Types ====================

/** Tooltip 浮层位置 */
export type TooltipPlacement =
  | 'top'
  | 'topLeft'
  | 'topRight'
  | 'bottom'
  | 'bottomLeft'
  | 'bottomRight'
  | 'left'
  | 'leftTop'
  | 'leftBottom'
  | 'right'
  | 'rightTop'
  | 'rightBottom';

/** Tooltip 触发方式 */
export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'contextMenu';

export interface TooltipProps {
  /** 提示文字 */
  title?: React.ReactNode;
  /** 子节点 */
  children?: React.ReactNode;
  /** 浮层位置 */
  placement?: TooltipPlacement;
  /** 触发方式 */
  trigger?: TooltipTrigger | TooltipTrigger[];
  /** 是否显示浮层（受控） */
  open?: boolean;
  /** 默认是否显示浮层 */
  defaultOpen?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否每次重新渲染内容 */
  fresh?: boolean;
  /** 隐藏时是否销毁浮层 */
  destroyOnHidden?: boolean;
  /** 是否自动调整位置以防止溢出 */
  autoAdjustOverflow?: boolean;
  /** 是否显示箭头 */
  arrow?: boolean;
  /** 背景颜色 */
  color?: string;
  /** z-index */
  zIndex?: number;
  /** 鼠标移入延迟时间（秒） */
  mouseEnterDelay?: number;
  /** 鼠标移出延迟时间（秒） */
  mouseLeaveDelay?: number;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 浮层类名 */
  overlayClassName?: string;
  /** 浮层样式 */
  overlayStyle?: React.CSSProperties;
  /** 浮层内部样式 */
  overlayInnerStyle?: React.CSSProperties;
  /** 指定浮层挂载的节点 */
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
  /** 显示/隐藏回调 */
  onOpenChange?: (open: boolean) => void;
}

// ==================== Constants ====================

/** 浮层与触发元素的间距 */
const GAP = 8;

// ==================== Utils ====================

/** 获取元素的位置信息 */
const getRect = (el: HTMLElement): DOMRect => {
  return el.getBoundingClientRect();
};

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
  placement: TooltipPlacement,
  triggerRect: DOMRect,
  popupRect: DOMRect,
  autoAdjustOverflow: boolean,
): { left: number; top: number } => {
  let top = 0;
  let left = 0;

  switch (placement) {
    case 'top':
      top = triggerRect.top - popupRect.height - GAP;
      left = triggerRect.left + (triggerRect.width - popupRect.width) / 2;
      break;

    case 'topLeft':
      top = triggerRect.top - popupRect.height - GAP;
      left = triggerRect.left;
      break;

    case 'topRight':
      top = triggerRect.top - popupRect.height - GAP;
      left = triggerRect.right - popupRect.width;
      break;

    case 'bottom':
      top = triggerRect.bottom + GAP;
      left = triggerRect.left + (triggerRect.width - popupRect.width) / 2;
      break;

    case 'bottomLeft':
      top = triggerRect.bottom + GAP;
      left = triggerRect.left;
      break;

    case 'bottomRight':
      top = triggerRect.bottom + GAP;
      left = triggerRect.right - popupRect.width;
      break;

    case 'left':
      top = triggerRect.top + (triggerRect.height - popupRect.height) / 2;
      left = triggerRect.left - popupRect.width - GAP;
      break;

    case 'leftTop':
      top = triggerRect.top;
      left = triggerRect.left - popupRect.width - GAP;
      break;

    case 'leftBottom':
      top = triggerRect.bottom - popupRect.height;
      left = triggerRect.left - popupRect.width - GAP;
      break;

    case 'right':
      top = triggerRect.top + (triggerRect.height - popupRect.height) / 2;
      left = triggerRect.right + GAP;
      break;

    case 'rightTop':
      top = triggerRect.top;
      left = triggerRect.right + GAP;
      break;

    case 'rightBottom':
      top = triggerRect.bottom - popupRect.height;
      left = triggerRect.right + GAP;
      break;
  }

  if (autoAdjustOverflow) {
    return keepInViewport(left, top, popupRect);
  }

  return { top, left };
};

// ==================== Popup ====================

interface PopupProps {
  /** 是否可见 */
  visible: boolean;
  /** 提示文字 */
  title: React.ReactNode;
  /** 浮层位置 */
  placement: TooltipPlacement;
  /** 是否显示箭头 */
  arrow: boolean;
  /** 背景颜色 */
  color?: string;
  /** z-index */
  zIndex?: number;
  /** 浮层类名 */
  overlayClassName?: string;
  /** 浮层样式 */
  overlayStyle?: React.CSSProperties;
  /** 浮层内部样式 */
  overlayInnerStyle?: React.CSSProperties;
  /** 位置信息 */
  position: { top: number; left: number };
  /** 浮层引用 */
  popupRef: React.RefObject<HTMLDivElement>;
  /** 鼠标移入回调 */
  onMouseEnter?: () => void;
  /** 鼠标移出回调 */
  onMouseLeave?: () => void;
}

const Popup: React.FC<PopupProps> = ({
  visible,
  title,
  placement,
  arrow,
  color,
  zIndex,
  overlayClassName,
  overlayStyle,
  overlayInnerStyle,
  position,
  popupRef,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <div
      ref={popupRef}
      className={classNames(
        'soui-tooltip',
        `soui-tooltip-placement-${placement}`,
        overlayClassName,
      )}
      style={{
        position: 'fixed',
        top: position.top,
        left: position.left,
        zIndex,
        visibility: visible ? 'visible' : 'hidden',
        pointerEvents: visible ? 'auto' : 'none',
        ...overlayStyle,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {arrow && <div className="soui-tooltip-arrow" style={{ background: color }} />}
      <div
        className="soui-tooltip-inner"
        style={{
          background: color,
          ...overlayInnerStyle,
        }}
      >
        {title}
      </div>
    </div>
  );
};

// ==================== Main Component ====================

const Tooltip: React.FC<TooltipProps> = ({
  title,
  children,
  placement = 'top',
  trigger = 'hover',
  open: controlledOpen,
  defaultOpen = false,
  disabled = false,
  fresh = false,
  destroyOnHidden = true,
  autoAdjustOverflow = true,
  arrow = true,
  color,
  zIndex = 1030,
  mouseEnterDelay = 0.1,
  mouseLeaveDelay = 0.1,
  className,
  style,
  overlayClassName,
  overlayStyle,
  overlayInnerStyle,
  getPopupContainer,
  onOpenChange,
  ...props
}) => {
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const [position, setPosition] = useState({ top: -9999, left: -9999 });

  const triggerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const visible = controlledOpen !== undefined ? controlledOpen : innerOpen;
  const triggers = Array.isArray(trigger) ? trigger : [trigger];

  /** 清除定时器 */
  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  /** 改变显示状态 */
  const changeVisible = (next: boolean) => {
    if (disabled) return;

    if (controlledOpen === undefined) {
      setInnerOpen(next);
    }
    onOpenChange?.(next);
  };

  /** 对齐浮层位置 */
  const align = useCallback(() => {
    const triggerNode = triggerRef.current;
    const popupNode = popupRef.current;

    if (!triggerNode || !popupNode) return;

    const triggerRect = getRect(triggerNode);
    const popupRect = popupNode.getBoundingClientRect();
    const next = calcPosition(placement, triggerRect, popupRect, autoAdjustOverflow);

    setPosition((prev) => {
      if (prev.top === next.top && prev.left === next.left) {
        return prev;
      }
      return next;
    });
  }, [placement, autoAdjustOverflow]);

  /** 当可见性变化时重新对齐 */
  useLayoutEffect(() => {
    if (!visible || !title) return;
    align();
  }, [visible, title, align]);

  /** 监听滚动和 resize 事件 */
  useEffect(() => {
    if (!visible) return;

    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        align();
      });
    };

    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [visible, align]);

  /** 监听 ESC 键关闭 */
  useEffect(() => {
    if (!visible) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        changeVisible(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [visible]);

  /** 组件卸载时清除定时器 */
  useEffect(() => {
    return () => clearTimer();
  }, []);

  /** 打开 Tooltip */
  const openTooltip = () => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      changeVisible(true);
    }, mouseEnterDelay * 1000);
  };

  /** 关闭 Tooltip */
  const closeTooltip = () => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      changeVisible(false);
    }, mouseLeaveDelay * 1000);
  };

  /** 切换 Tooltip 状态 */
  const toggleTooltip = () => {
    clearTimer();
    changeVisible(!visible);
  };

  /** 构建触发器属性 */
  const triggerProps: React.HTMLAttributes<HTMLDivElement> = {};

  if (triggers.includes('hover')) {
    triggerProps.onMouseEnter = openTooltip;
    triggerProps.onMouseLeave = closeTooltip;
  }

  if (triggers.includes('click')) {
    triggerProps.onClick = (e) => {
      e.stopPropagation();
      toggleTooltip();
    };
  }

  if (triggers.includes('focus')) {
    triggerProps.onFocus = openTooltip;
    triggerProps.onBlur = closeTooltip;
  }

  if (triggers.includes('contextMenu')) {
    triggerProps.onContextMenu = (e) => {
      e.preventDefault();
      toggleTooltip();
    };
  }

  /** 渲染浮层 */
  const popup = visible || !destroyOnHidden ? (
    <Popup
      visible={visible}
      title={title}
      placement={placement}
      arrow={arrow}
      color={color}
      zIndex={zIndex}
      overlayClassName={overlayClassName}
      overlayStyle={overlayStyle}
      overlayInnerStyle={overlayInnerStyle}
      position={position}
      popupRef={popupRef}
      onMouseEnter={triggers.includes('hover') ? openTooltip : undefined}
      onMouseLeave={triggers.includes('hover') ? closeTooltip : undefined}
    />
  ) : null;

  /** 获取挂载容器 */
  const container =
    getPopupContainer && triggerRef.current
      ? getPopupContainer(triggerRef.current)
      : document.body;

  return (
    <>
      <div
        ref={triggerRef}
        className={classNames('soui-tooltip-trigger', className)}
        style={style}
        {...triggerProps}
        {...props}
      >
        {children}
      </div>
      {popup && ReactDOM.createPortal(popup, container)}
    </>
  );
};

export default Tooltip;
