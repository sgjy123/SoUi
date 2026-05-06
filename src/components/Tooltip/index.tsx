import React, { useState, useRef, useEffect, useCallback } from 'react';
import classNames from 'classnames';
import './style.less';

// ==================== Types ====================

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

export type TooltipTrigger = 'hover' | 'click' | 'focus' | 'contextMenu';

export interface TooltipProps {
  /** 提示文字 */
  title?: React.ReactNode;
  /** 触发方式 */
  trigger?: TooltipTrigger | TooltipTrigger[];
  /** 弹出位置 */
  placement?: TooltipPlacement;
  /** 是否可见（受控） */
  open?: boolean;
  /** 默认是否可见（非受控） */
  defaultOpen?: boolean;
  /** 浮层渲染父节点，默认渲染到 body 上 */
  getPopupContainer?: (triggerNode: HTMLElement) => HTMLElement;
  /** 关闭后是否销毁 dom */
  destroyOnHidden?: boolean;
  /** 鼠标移入延迟（秒） */
  mouseEnterDelay?: number;
  /** 鼠标移出延迟（秒） */
  mouseLeaveDelay?: number;
  /** 显示变化回调 */
  onOpenChange?: (open: boolean) => void;
  /** 自定义类名 */
  className?: string;
  /** 浮层类名 */
  overlayClassName?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 浮层样式 */
  overlayStyle?: React.CSSProperties;
  /** 子元素 */
  children?: React.ReactNode;
}

// ==================== Utility Functions ====================

const getPlacementStyles = (
  placement: TooltipPlacement,
  triggerRect: DOMRect,
  tooltipRect: DOMRect
): React.CSSProperties => {
  const gap = 8;
  let top = 0;
  let left = 0;

  // getBoundingClientRect() 返回相对于视口的位置，配合 fixed 定位直接使用
  switch (placement) {
    case 'top':
      top = triggerRect.top - tooltipRect.height - gap;
      left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
      break;
    case 'topLeft':
      top = triggerRect.top - tooltipRect.height - gap;
      left = triggerRect.left;
      break;
    case 'topRight':
      top = triggerRect.top - tooltipRect.height - gap;
      left = triggerRect.right - tooltipRect.width;
      break;
    case 'bottom':
      top = triggerRect.bottom + gap;
      left = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
      break;
    case 'bottomLeft':
      top = triggerRect.bottom + gap;
      left = triggerRect.left;
      break;
    case 'bottomRight':
      top = triggerRect.bottom + gap;
      left = triggerRect.right - tooltipRect.width;
      break;
    case 'left':
      top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
      left = triggerRect.left - tooltipRect.width - gap;
      break;
    case 'leftTop':
      top = triggerRect.top;
      left = triggerRect.left - tooltipRect.width - gap;
      break;
    case 'leftBottom':
      top = triggerRect.bottom - tooltipRect.height;
      left = triggerRect.left - tooltipRect.width - gap;
      break;
    case 'right':
      top = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
      left = triggerRect.right + gap;
      break;
    case 'rightTop':
      top = triggerRect.top;
      left = triggerRect.right + gap;
      break;
    case 'rightBottom':
      top = triggerRect.bottom - tooltipRect.height;
      left = triggerRect.right + gap;
      break;
  }

  return {
    top: `${top}px`,
    left: `${left}px`,
  };
};

// ==================== Main Component ====================

const Tooltip: React.FC<TooltipProps> = ({
  title,
  trigger = 'hover',
  placement = 'top',
  open: controlledOpen,
  defaultOpen = false,
  getPopupContainer,
  destroyOnHidden = false,
  mouseEnterDelay = 0.1,
  mouseLeaveDelay = 0.1,
  onOpenChange,
  className,
  overlayClassName,
  style,
  overlayStyle,
  children,
  ...props
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [position, setPosition] = useState<React.CSSProperties>({ left: 0, top: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 判断是否为受控模式
  const isControlled = controlledOpen !== undefined;
  const visible = isControlled ? controlledOpen : internalOpen;

  // 清除定时器
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // 更新位置
  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    // 确保尺寸有效
    if (tooltipRect.width === 0 && tooltipRect.height === 0) return;

    const newPosition = getPlacementStyles(placement, triggerRect, tooltipRect);
    setPosition(newPosition);
  }, [placement]);

  // 打开浮层
  const handleOpen = useCallback(() => {
    clearTimer();
    const delay = typeof trigger === 'string' && trigger === 'hover' ? mouseEnterDelay * 1000 : 0;

    timerRef.current = setTimeout(() => {
      if (!isControlled) {
        setInternalOpen(true);
      }
      onOpenChange?.(true);
    }, delay);
  }, [clearTimer, isControlled, mouseEnterDelay, onOpenChange, trigger]);

  // 关闭浮层
  const handleClose = useCallback(() => {
    clearTimer();
    const delay = typeof trigger === 'string' && trigger === 'hover' ? mouseLeaveDelay * 1000 : 0;

    timerRef.current = setTimeout(() => {
      if (!isControlled) {
        setInternalOpen(false);
      }
      onOpenChange?.(false);
    }, delay);
  }, [clearTimer, isControlled, mouseLeaveDelay, onOpenChange, trigger]);

  // 切换显示状态
  const handleToggle = useCallback(() => {
    clearTimer();
    const newOpen = !visible;
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  }, [clearTimer, isControlled, visible, onOpenChange]);

  // 处理触发事件
  const triggers = Array.isArray(trigger) ? trigger : [trigger];

  const triggerProps: React.HTMLAttributes<HTMLDivElement> = {};

  if (triggers.includes('hover')) {
    triggerProps.onMouseEnter = handleOpen;
    triggerProps.onMouseLeave = handleClose;
  }

  if (triggers.includes('click')) {
    triggerProps.onClick = (e) => {
      e.stopPropagation();
      handleToggle();
    };
  }

  if (triggers.includes('focus')) {
    triggerProps.onFocus = handleOpen;
    triggerProps.onBlur = handleClose;
  }

  if (triggers.includes('contextMenu')) {
    triggerProps.onContextMenu = (e) => {
      e.preventDefault();
      handleToggle();
    };
  }

  // 浮层显示时计算位置
  useEffect(() => {
    if (!visible || !title) return;

    // 使用 requestAnimationFrame 确保 DOM 已渲染且布局完成
    const rafId = requestAnimationFrame(() => {
      updatePosition();
    });

    return () => cancelAnimationFrame(rafId);
  }, [visible, title, placement]);

  // 监听窗口 resize（fixed 定位不需要监听 scroll，因为坐标是相对于视口的）
  useEffect(() => {
    if (!visible) return;

    const handleResize = () => {
      updatePosition();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [visible, updatePosition]);

  // 点击外部关闭
  useEffect(() => {
    if (!visible || !triggers.includes('click')) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node) &&
        tooltipRef.current &&
        !tooltipRef.current.contains(e.target as Node)
      ) {
        handleClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [visible, triggers, handleClose]);

  // 清理
  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  // 如果不显示且需要销毁，则不渲染浮层
  if (!visible && destroyOnHidden) {
    return (
      <div
        ref={triggerRef}
        className={classNames('soui-tooltip-trigger', className)}
        style={style}
        {...triggerProps}
        {...props}
      >
        {children}
      </div>
    );
  }

  // 计算箭头位置样式
  const arrowPositionStyle: React.CSSProperties = {};
  switch (placement) {
    case 'top':
    case 'topLeft':
    case 'topRight':
      arrowPositionStyle.bottom = '-6px';
      if (placement === 'top') {
        arrowPositionStyle.left = '50%';
        arrowPositionStyle.transform = 'translateX(-50%)';
      } else if (placement === 'topLeft') {
        arrowPositionStyle.left = '16px';
      } else {
        arrowPositionStyle.right = '16px';
      }
      break;
    case 'bottom':
    case 'bottomLeft':
    case 'bottomRight':
      arrowPositionStyle.top = '-6px';
      if (placement === 'bottom') {
        arrowPositionStyle.left = '50%';
        arrowPositionStyle.transform = 'translateX(-50%)';
      } else if (placement === 'bottomLeft') {
        arrowPositionStyle.left = '16px';
      } else {
        arrowPositionStyle.right = '16px';
      }
      break;
    case 'left':
    case 'leftTop':
    case 'leftBottom':
      arrowPositionStyle.right = '-6px';
      if (placement === 'left') {
        arrowPositionStyle.top = '50%';
        arrowPositionStyle.transform = 'translateY(-50%)';
      } else if (placement === 'leftTop') {
        arrowPositionStyle.top = '16px';
      } else {
        arrowPositionStyle.bottom = '16px';
      }
      break;
    case 'right':
    case 'rightTop':
    case 'rightBottom':
      arrowPositionStyle.left = '-6px';
      if (placement === 'right') {
        arrowPositionStyle.top = '50%';
        arrowPositionStyle.transform = 'translateY(-50%)';
      } else if (placement === 'rightTop') {
        arrowPositionStyle.top = '16px';
      } else {
        arrowPositionStyle.bottom = '16px';
      }
      break;
  }

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

      {visible && title && (
        <div
          ref={tooltipRef}
          className={classNames('soui-tooltip', `soui-tooltip-${placement}`, overlayClassName)}
          style={{
            position: 'fixed',
            zIndex: 1030,
            ...position,
            ...overlayStyle,
          }}
          onMouseEnter={triggers.includes('hover') ? handleOpen : undefined}
          onMouseLeave={triggers.includes('hover') ? handleClose : undefined}
        >
          <div className="soui-tooltip-arrow" style={arrowPositionStyle} />
          <div className="soui-tooltip-inner">{title}</div>
        </div>
      )}
    </>
  );
};

export default Tooltip;
