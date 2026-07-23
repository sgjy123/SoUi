import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
  useContext,
} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

// ==================== Types ====================

/** 浮层位置 */
export type PopCardPlacement =
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

/** 触发方式 */
export type PopCardTrigger = 'hover' | 'click' | 'focus' | 'contextMenu';

export interface PopCardProps {
  /** 卡片内容 */
  content?: React.ReactNode;
  /** 卡片标题 */
  title?: React.ReactNode;
  /** 子节点（触发元素） */
  children?: React.ReactNode;
  /** 浮层位置 */
  placement?: PopCardPlacement;
  /** 触发方式 */
  trigger?: PopCardTrigger | PopCardTrigger[];
  /** 是否显示浮层（受控） */
  open?: boolean;
  /** 默认是否显示浮层 */
  defaultOpen?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 隐藏时是否销毁浮层 */
  destroyOnHidden?: boolean;
  /** 是否自动调整位置以防止溢出 */
  autoAdjustOverflow?: boolean;
  /** 是否显示箭头 */
  arrow?: boolean;
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

const GAP = 10;

// ==================== Utils ====================

const getRect = (el: HTMLElement): DOMRect => el.getBoundingClientRect();

const keepInViewport = (
  left: number,
  top: number,
  popupRect: DOMRect
): { left: number; top: number } => {
  const padding = 4;
  const maxLeft = window.innerWidth - popupRect.width - padding;
  const maxTop = window.innerHeight - popupRect.height - padding;
  return {
    left: Math.max(padding, Math.min(left, maxLeft)),
    top: Math.max(padding, Math.min(top, maxTop)),
  };
};

const calcPosition = (
  placement: PopCardPlacement,
  triggerRect: DOMRect,
  popupRect: DOMRect,
  autoAdjustOverflow: boolean
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

// ==================== Main Component ====================

const PopCard: React.FC<PopCardProps> = ({
  content,
  title,
  children,
  placement = 'top',
  trigger = 'hover',
  open: controlledOpen,
  defaultOpen = false,
  disabled = false,
  destroyOnHidden = true,
  autoAdjustOverflow = true,
  arrow = true,
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
  const context = useContext(ConfigContext);
  const componentTheme = (context?.components?.PopCard || {}) as Record<string, any>;

  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const [position, setPosition] = useState({ top: -9999, left: -9999 });

  const triggerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visible = controlledOpen !== undefined ? controlledOpen : innerOpen;
  const triggers = Array.isArray(trigger) ? trigger : [trigger];

  // 主题 CSS 变量（注入到 Portal 浮层，绕过 DOM 继承限制）
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (componentTheme.colorBg !== undefined) {
    cssVars['--soui-popcard-color-bg'] = componentTheme.colorBg;
  }
  if (componentTheme.borderRadius !== undefined) {
    cssVars['--soui-popcard-border-radius'] = `${componentTheme.borderRadius}px`;
  }
  if (componentTheme.boxShadow !== undefined) {
    cssVars['--soui-popcard-box-shadow'] = componentTheme.boxShadow;
  }

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const changeVisible = (next: boolean) => {
    if (disabled) return;
    if (controlledOpen === undefined) setInnerOpen(next);
    onOpenChange?.(next);
  };

  const align = useCallback(() => {
    const triggerNode = triggerRef.current;
    const popupNode = popupRef.current;
    if (!triggerNode || !popupNode) return;
    const triggerRect = getRect(triggerNode);
    const popupRect = popupNode.getBoundingClientRect();
    const next = calcPosition(placement, triggerRect, popupRect, autoAdjustOverflow);
    setPosition((prev) =>
      prev.top === next.top && prev.left === next.left ? prev : next
    );
  }, [placement, autoAdjustOverflow]);

  useLayoutEffect(() => {
    if (!visible) return;
    align();
  }, [visible, title, content, align]);

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

  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') changeVisible(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => () => clearTimer(), []);

  const openCard = () => {
    clearTimer();
    timerRef.current = setTimeout(() => changeVisible(true), mouseEnterDelay * 1000);
  };

  const closeCard = () => {
    clearTimer();
    timerRef.current = setTimeout(() => changeVisible(false), mouseLeaveDelay * 1000);
  };

  const toggleCard = () => {
    clearTimer();
    changeVisible(!visible);
  };

  const triggerProps: React.HTMLAttributes<HTMLDivElement> = {};
  if (triggers.includes('hover')) {
    triggerProps.onMouseEnter = openCard;
    triggerProps.onMouseLeave = closeCard;
  }
  if (triggers.includes('click')) {
    triggerProps.onClick = (e) => {
      e.stopPropagation();
      toggleCard();
    };
  }
  if (triggers.includes('focus')) {
    triggerProps.onFocus = openCard;
    triggerProps.onBlur = closeCard;
  }
  if (triggers.includes('contextMenu')) {
    triggerProps.onContextMenu = (e) => {
      e.preventDefault();
      toggleCard();
    };
  }

  const popup =
    visible || !destroyOnHidden ? (
      <div
        ref={popupRef}
        className={classNames(
          'soui-popcard',
          `soui-popcard-placement-${placement}`,
          overlayClassName
        )}
        style={{
          ...cssVars,
          position: 'fixed',
          top: position.top,
          left: position.left,
          zIndex,
          visibility: visible ? 'visible' : 'hidden',
          pointerEvents: visible ? 'auto' : 'none',
          ...overlayStyle,
        }}
        onMouseEnter={triggers.includes('hover') ? openCard : undefined}
        onMouseLeave={triggers.includes('hover') ? closeCard : undefined}
        role="tooltip"
      >
        {arrow && <div className="soui-popcard-arrow" />}
        <div className="soui-popcard-inner" style={overlayInnerStyle}>
          {title && <div className="soui-popcard-title">{title}</div>}
          <div className="soui-popcard-content">{content}</div>
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
        className={classNames('soui-popcard-trigger', className)}
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

PopCard.displayName = 'PopCard';

export default PopCard;
