import React, { useState, useRef, useEffect, useCallback } from 'react';
import ReactDOM from 'react-dom';
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

// 获取元素相对于容器的位置
const getRelativePosition = (element: HTMLElement, container: HTMLElement) => {
  const elementRect = element.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  return {
    top: elementRect.top - containerRect.top + container.scrollTop,
    left: elementRect.left - containerRect.left + container.scrollLeft,
    width: elementRect.width,
    height: elementRect.height,
    right: elementRect.right - containerRect.left + container.scrollLeft,
    bottom: elementRect.bottom - containerRect.top + container.scrollTop,
    x: elementRect.left - containerRect.left + container.scrollLeft,
    y: elementRect.top - containerRect.top + container.scrollTop,
  };
};

// 计算浮层位置
const getPlacementStyles = (
  placement: TooltipPlacement,
  triggerPos: ReturnType<typeof getRelativePosition>,
  tooltipRect: DOMRect
): React.CSSProperties => {
  const gap = 8;
  let top = 0;
  let left = 0;

  switch (placement) {
    case 'top':
      top = triggerPos.top - tooltipRect.height - gap;
      left = triggerPos.left + (triggerPos.width - tooltipRect.width) / 2;
      break;
    case 'topLeft':
      top = triggerPos.top - tooltipRect.height - gap;
      left = triggerPos.left;
      break;
    case 'topRight':
      top = triggerPos.top - tooltipRect.height - gap;
      left = triggerPos.right - tooltipRect.width;
      break;
    case 'bottom':
      top = triggerPos.bottom + gap;
      left = triggerPos.left + (triggerPos.width - tooltipRect.width) / 2;
      break;
    case 'bottomLeft':
      top = triggerPos.bottom + gap;
      left = triggerPos.left;
      break;
    case 'bottomRight':
      top = triggerPos.bottom + gap;
      left = triggerPos.right - tooltipRect.width;
      break;
    case 'left':
      top = triggerPos.top + (triggerPos.height - tooltipRect.height) / 2;
      left = triggerPos.left - tooltipRect.width - gap;
      break;
    case 'leftTop':
      top = triggerPos.top;
      left = triggerPos.left - tooltipRect.width - gap;
      break;
    case 'leftBottom':
      top = triggerPos.bottom - tooltipRect.height;
      left = triggerPos.left - tooltipRect.width - gap;
      break;
    case 'right':
      top = triggerPos.top + (triggerPos.height - tooltipRect.height) / 2;
      left = triggerPos.right + gap;
      break;
    case 'rightTop':
      top = triggerPos.top;
      left = triggerPos.right + gap;
      break;
    case 'rightBottom':
      top = triggerPos.bottom - tooltipRect.height;
      left = triggerPos.right + gap;
      break;
  }

  return {
    top: `${top}px`,
    left: `${left}px`,
  };
};

// ==================== Tooltip Popup Component ====================

interface TooltipPopupProps {
  title: React.ReactNode;
  placement: TooltipPlacement;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  positionStyle: React.CSSProperties;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  innerRef: React.RefObject<HTMLDivElement>;
}

const TooltipPopup: React.FC<TooltipPopupProps> = ({
  title,
  placement,
  overlayClassName,
  overlayStyle,
  positionStyle,
  onMouseEnter,
  onMouseLeave,
  innerRef,
}) => {
  // 计算箭头位置样式
  const arrowStyle: React.CSSProperties = {};
  switch (placement) {
    case 'top':
    case 'topLeft':
    case 'topRight':
      arrowStyle.bottom = '-6px';
      if (placement === 'top') {
        arrowStyle.left = '50%';
        arrowStyle.transform = 'translateX(-50%)';
      } else if (placement === 'topLeft') {
        arrowStyle.left = '16px';
      } else {
        arrowStyle.right = '16px';
      }
      break;
    case 'bottom':
    case 'bottomLeft':
    case 'bottomRight':
      arrowStyle.top = '-6px';
      if (placement === 'bottom') {
        arrowStyle.left = '50%';
        arrowStyle.transform = 'translateX(-50%)';
      } else if (placement === 'bottomLeft') {
        arrowStyle.left = '16px';
      } else {
        arrowStyle.right = '16px';
      }
      break;
    case 'left':
    case 'leftTop':
    case 'leftBottom':
      arrowStyle.right = '-6px';
      if (placement === 'left') {
        arrowStyle.top = '50%';
        arrowStyle.transform = 'translateY(-50%)';
      } else if (placement === 'leftTop') {
        arrowStyle.top = '16px';
      } else {
        arrowStyle.bottom = '16px';
      }
      break;
    case 'right':
    case 'rightTop':
    case 'rightBottom':
      arrowStyle.left = '-6px';
      if (placement === 'right') {
        arrowStyle.top = '50%';
        arrowStyle.transform = 'translateY(-50%)';
      } else if (placement === 'rightTop') {
        arrowStyle.top = '16px';
      } else {
        arrowStyle.bottom = '16px';
      }
      break;
  }

  return (
    <div
      className={classNames('soui-tooltip', `soui-tooltip-${placement}`, overlayClassName)}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 1030,
        ...overlayStyle,
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={innerRef}
        className="soui-tooltip-wrapper"
        style={positionStyle}
      >
        <div className="soui-tooltip-arrow" style={arrowStyle} />
        <div className="soui-tooltip-inner">{title}</div>
      </div>
    </div>
  );
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
  const [positionStyle, setPositionStyle] = useState<React.CSSProperties>({});
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // 判断是否为受控模式
  const isControlled = controlledOpen !== undefined;
  const visible = isControlled ? controlledOpen : internalOpen;

  // 获取容器
  const getContainer = useCallback(() => {
    if (getPopupContainer && triggerRef.current) {
      return getPopupContainer(triggerRef.current);
    }
    return document.body;
  }, [getPopupContainer]);

  // 清除定时器
  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // 更新位置 - 参考 antd 实现方式
  const updatePosition = useCallback(() => {
    if (!triggerRef.current || !tooltipRef.current || !containerRef.current) return;

    const triggerPos = getRelativePosition(triggerRef.current, containerRef.current);
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    // 确保尺寸有效
    if (tooltipRect.width === 0 && tooltipRect.height === 0) return;

    const newPosition = getPlacementStyles(placement, triggerPos, tooltipRect);
    setPositionStyle(newPosition);
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

  // 获取容器并计算位置
  useEffect(() => {
    if (!visible || !title) return;

    // 获取容器
    containerRef.current = getContainer();

    // 使用 requestAnimationFrame 确保 DOM 已渲染
    const rafId = requestAnimationFrame(() => {
      updatePosition();
    });

    return () => cancelAnimationFrame(rafId);
  }, [visible, title, placement, getContainer, updatePosition]);

  // 监听窗口滚动和 resize
  useEffect(() => {
    if (!visible) return;

    const handleUpdate = () => {
      updatePosition();
    };

    window.addEventListener('scroll', handleUpdate, true);
    window.addEventListener('resize', handleUpdate);

    return () => {
      window.removeEventListener('scroll', handleUpdate, true);
      window.removeEventListener('resize', handleUpdate);
    };
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

  // 使用 Portal 渲染浮层到指定容器
  const popupContent = visible && title ? (
    <TooltipPopup
      title={title}
      placement={placement}
      overlayClassName={overlayClassName}
      overlayStyle={overlayStyle}
      positionStyle={positionStyle}
      onMouseEnter={triggers.includes('hover') ? handleOpen : undefined}
      onMouseLeave={triggers.includes('hover') ? handleClose : undefined}
      innerRef={tooltipRef}
    />
  ) : null;

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

      {popupContent && ReactDOM.createPortal(
        popupContent,
        containerRef.current || document.body
      )}
    </>
  );
};

export default Tooltip;
