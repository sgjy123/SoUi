import React, { useState, useRef, useEffect } from 'react';
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

export type TooltipTrigger = 'hover' | 'focus' | 'click' | 'contextMenu';

export interface TooltipProps {
  /** 提示文字 */
  title?: React.ReactNode;
  /** 弹出位置 */
  placement?: TooltipPlacement;
  /** 触发方式 */
  trigger?: TooltipTrigger | TooltipTrigger[];
  /** 是否默认显示 */
  defaultVisible?: boolean;
  /** 是否显示 */
  visible?: boolean;
  /** 显示/隐藏回调 */
  onVisibleChange?: (visible: boolean) => void;
  /** 鼠标移入后延时多少才显示 Tooltip */
  mouseEnterDelay?: number;
  /** 鼠标移出后延时多少才隐藏 Tooltip */
  mouseLeaveDelay?: number;
  /** 额外的类名 */
  overlayClassName?: string;
  /** 额外的样式 */
  overlayStyle?: React.CSSProperties;
  /** 文字颜色 */
  color?: string;
  /** 背景颜色 */
  bgColor?: string;
  /** 子元素 */
  children?: React.ReactNode;
}

// ==================== Helper Functions ====================

// 根据放置位置计算箭头的边框颜色
const getArrowBorderColor = (placement: TooltipPlacement, bgColor: string): string => {
  const transparent = 'transparent';

  if (placement.startsWith('top')) {
    return `${bgColor} ${transparent} ${transparent}`;
  }
  if (placement.startsWith('bottom')) {
    return `${transparent} ${transparent} ${bgColor}`;
  }
  if (placement.startsWith('left')) {
    return `${transparent} ${transparent} ${transparent} ${bgColor}`;
  }
  // right
  return `${transparent} ${bgColor} ${transparent} ${transparent}`;
};

// ==================== Main Component ====================

const Tooltip: React.FC<TooltipProps> = ({
  title,
  placement = 'top',
  trigger = 'hover',
  defaultVisible = false,
  visible: controlledVisible,
  onVisibleChange,
  mouseEnterDelay = 0.1,
  mouseLeaveDelay = 0.1,
  overlayClassName,
  overlayStyle,
  color,
  bgColor,
  children,
}) => {
  const [internalVisible, setInternalVisible] = useState(defaultVisible);
  const containerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const showTimerRef = useRef<NodeJS.Timeout>();
  const hideTimerRef = useRef<NodeJS.Timeout>();

  // 判断是受控模式还是非受控模式
  const isControlled = controlledVisible !== undefined;
  const visible = isControlled ? controlledVisible : internalVisible;

  // 清除定时器
  const clearTimers = () => {
    if (showTimerRef.current) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = undefined;
    }
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = undefined;
    }
  };

  // 显示 Tooltip
  const show = () => {
    clearTimers();
    showTimerRef.current = setTimeout(() => {
      if (!isControlled) {
        setInternalVisible(true);
      }
      onVisibleChange?.(true);
    }, mouseEnterDelay * 1000);
  };

  // 隐藏 Tooltip
  const hide = () => {
    clearTimers();
    hideTimerRef.current = setTimeout(() => {
      if (!isControlled) {
        setInternalVisible(false);
      }
      onVisibleChange?.(false);
    }, mouseLeaveDelay * 1000);
  };

  // 切换显示状态
  const toggle = () => {
    if (visible) {
      hide();
    } else {
      show();
    }
  };

  // 清理定时器
  useEffect(() => {
    return () => clearTimers();
  }, []);

  // 点击外部关闭
  useEffect(() => {
    if (!visible || !Array.isArray(trigger) || !trigger.includes('click')) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        hide();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [visible, trigger]);

  // 如果没有 title，直接返回子元素
  if (!title && title !== 0) {
    return (
      <div className="soui-tooltip-wrapper">
        {children}
      </div>
    );
  }

  const tooltipClassName = classNames(
    'soui-tooltip',
    `soui-tooltip-placement-${placement}`,
    {
      'soui-tooltip-visible': visible,
    },
    overlayClassName
  );

  // 获取触发器事件
  const triggers = Array.isArray(trigger) ? trigger : [trigger];

  const triggerProps: Record<string, any> = {};

  if (triggers.includes('hover')) {
    triggerProps.onMouseEnter = show;
    triggerProps.onMouseLeave = hide;
  }

  if (triggers.includes('focus')) {
    triggerProps.onFocus = show;
    triggerProps.onBlur = hide;
  }

  if (triggers.includes('click')) {
    triggerProps.onClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      toggle();
    };
  }

  if (triggers.includes('contextMenu')) {
    triggerProps.onContextMenu = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      toggle();
    };
  }

  return (
    <div ref={containerRef} className="soui-tooltip-wrapper" {...triggerProps}>
      {children}
      {visible && (
        <div
          ref={tooltipRef}
          className={tooltipClassName}
          style={overlayStyle}
          role="tooltip"
        >
          <div
            className="soui-tooltip-arrow"
            style={bgColor ? { borderColor: getArrowBorderColor(placement, bgColor) } : undefined}
          />
          <div
            className="soui-tooltip-inner"
            style={{
              backgroundColor: bgColor,
              color: color,
            }}
          >
            {title}
          </div>
        </div>
      )}
    </div>
  );
};

export default Tooltip;
