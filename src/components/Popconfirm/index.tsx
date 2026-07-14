import React, {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useCallback,
} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Icon from '../Icon';
import Button from '../Button';
import type { ButtonProps } from '../Button';
import './style.less';

// ==================== Types ====================

export type PopconfirmPlacement =
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

export type PopconfirmTrigger = 'hover' | 'click' | 'focus' | 'contextMenu';

export interface PopconfirmProps {
  /** 确认框的描述文字 */
  title?: React.ReactNode;
  /** 确认框的详细描述 */
  description?: React.ReactNode;
  /** 子节点（触发元素） */
  children?: React.ReactNode;
  /** 浮层位置 */
  placement?: PopconfirmPlacement;
  /** 触发方式 */
  trigger?: PopconfirmTrigger | PopconfirmTrigger[];
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
  /** 确认按钮文字 */
  okText?: React.ReactNode;
  /** 取消按钮文字 */
  cancelText?: React.ReactNode;
  /** 确认按钮类型 */
  okType?: ButtonProps['type'];
  /** 确认按钮 props */
  okButtonProps?: ButtonProps;
  /** 取消按钮 props */
  cancelButtonProps?: ButtonProps;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 是否显示取消按钮 */
  showCancel?: boolean;
  /** 点击确认回调 */
  onConfirm?: (e?: React.MouseEvent) => void | Promise<void>;
  /** 点击取消回调 */
  onCancel?: (e?: React.MouseEvent) => void;
  /** 显示/隐藏回调 */
  onOpenChange?: (open: boolean) => void;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 浮层类名 */
  overlayClassName?: string;
  /** 浮层样式 */
  overlayStyle?: React.CSSProperties;
  /** 指定浮层挂载的节点 */
  getPopupContainer?: (node: HTMLElement) => HTMLElement;
}

// ==================== Constants ====================

const GAP = 8;

// ==================== Utils ====================

const getRect = (el: HTMLElement): DOMRect => el.getBoundingClientRect();

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

const calcPosition = (
  placement: PopconfirmPlacement,
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

// ==================== DOM Bridge ====================

const CONFIG_PROVIDER_VARS = [
  '--soui-popconfirm-bg-color',
  '--soui-popconfirm-border-radius',
  '--soui-popconfirm-font-size',
  '--soui-popconfirm-title-color',
  '--soui-popconfirm-description-color',
  '--soui-popconfirm-color-primary',
  '--soui-popconfirm-color-primary-hover',
  '--soui-popconfirm-color-warning',
  '--soui-popconfirm-color-error',
  '--soui-popconfirm-box-shadow',
  '--soui-primary-color',
  '--soui-primary-hover-color',
  '--soui-warning-color',
  '--soui-error-color',
  '--soui-border-radius',
  '--soui-font-size',
  '--soui-text-color',
  '--soui-text-color-secondary',
  '--soui-transition-duration',
  '--soui-transition-timing-function',
];

function applyConfigProviderVars(el: HTMLElement): void {
  const provider = document.querySelector('.soui-config-provider');
  if (!provider) return;
  const cs = getComputedStyle(provider);
  CONFIG_PROVIDER_VARS.forEach((v) => {
    const val = cs.getPropertyValue(v).trim();
    if (val) el.style.setProperty(v, val);
  });
}

// ==================== Popup ====================

interface PopupProps {
  visible: boolean;
  title: React.ReactNode;
  description?: React.ReactNode;
  placement: PopconfirmPlacement;
  arrow: boolean;
  zIndex?: number;
  icon: React.ReactNode;
  okText: React.ReactNode;
  cancelText: React.ReactNode;
  okType: ButtonProps['type'];
  okButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
  showCancel: boolean;
  overlayClassName?: string;
  overlayStyle?: React.CSSProperties;
  position: { top: number; left: number };
  popupRef: React.RefObject<HTMLDivElement>;
  confirmLoading: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onConfirm?: (e: React.MouseEvent) => void;
  onCancel?: (e: React.MouseEvent) => void;
}

const Popup: React.FC<PopupProps> = ({
  visible,
  title,
  description,
  placement,
  arrow,
  zIndex,
  icon,
  okText,
  cancelText,
  okType,
  okButtonProps,
  cancelButtonProps,
  showCancel,
  overlayClassName,
  overlayStyle,
  position,
  popupRef,
  confirmLoading,
  onMouseEnter,
  onMouseLeave,
  onConfirm,
  onCancel,
}) => {
  // DOM bridge: apply ConfigProvider CSS vars on mount/visible
  useEffect(() => {
    if (popupRef.current && visible) {
      applyConfigProviderVars(popupRef.current);
    }
  }, [visible, popupRef]);

  return (
    <div
      ref={popupRef as React.RefObject<HTMLDivElement>}
      className={classNames(
        'soui-popconfirm',
        `soui-popconfirm-placement-${placement}`,
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
      {arrow && <div className="soui-popconfirm-arrow" />}
      <div className="soui-popconfirm-inner">
        <div className="soui-popconfirm-message">
          <span className="soui-popconfirm-message-icon">{icon}</span>
          <div className="soui-popconfirm-message-content">
            <div className="soui-popconfirm-message-title">{title}</div>
            {description && (
              <div className="soui-popconfirm-message-description">{description}</div>
            )}
          </div>
        </div>
        <div className="soui-popconfirm-buttons">
          {showCancel && (
            <Button
              size="small"
              onClick={onCancel}
              {...cancelButtonProps}
            >
              {cancelText}
            </Button>
          )}
          <Button
            size="small"
            type={okType}
            loading={confirmLoading}
            onClick={onConfirm}
            {...okButtonProps}
          >
            {okText}
          </Button>
        </div>
      </div>
    </div>
  );
};

// ==================== Main Component ====================

const Popconfirm: React.FC<PopconfirmProps> = ({
  title,
  description,
  children,
  placement = 'top',
  trigger = 'click',
  open: controlledOpen,
  defaultOpen = false,
  disabled = false,
  destroyOnHidden = true,
  autoAdjustOverflow = true,
  arrow = true,
  zIndex = 1050,
  mouseEnterDelay = 0.1,
  mouseLeaveDelay = 0.1,
  okText = '确定',
  cancelText = '取消',
  okType = 'primary',
  okButtonProps,
  cancelButtonProps,
  icon,
  showCancel = true,
  onConfirm,
  onCancel,
  onOpenChange,
  className,
  style,
  overlayClassName,
  overlayStyle,
  getPopupContainer,
  ...props
}) => {
  const [innerOpen, setInnerOpen] = useState(defaultOpen);
  const [position, setPosition] = useState({ top: -9999, left: -9999 });
  const [confirmLoading, setConfirmLoading] = useState(false);

  const triggerRef = useRef<HTMLDivElement>(null);
  const popupRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const visible = controlledOpen !== undefined ? controlledOpen : innerOpen;
  const triggers = Array.isArray(trigger) ? trigger : [trigger];

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const changeVisible = (next: boolean) => {
    if (disabled) return;
    if (controlledOpen === undefined) {
      setInnerOpen(next);
    }
    onOpenChange?.(next);
  };

  const close = () => {
    changeVisible(false);
  };

  const handleConfirm = async (e: React.MouseEvent) => {
    if (onConfirm) {
      const result = onConfirm(e);
      if (result && typeof (result as Promise<void>).then === 'function') {
        setConfirmLoading(true);
        try {
          await result;
        } finally {
          setConfirmLoading(false);
        }
      }
    }
    close();
  };

  const handleCancel = (e: React.MouseEvent) => {
    onCancel?.(e);
    close();
  };

  // Align popup position
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
  }, [visible, align]);

  useEffect(() => {
    if (!visible) return;
    let raf = 0;
    const update = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => align());
    };
    window.addEventListener('scroll', update, true);
    window.addEventListener('resize', update);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', update, true);
      window.removeEventListener('resize', update);
    };
  }, [visible, align]);

  // ESC key to close
  useEffect(() => {
    if (!visible) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [visible]);

  // Click outside to close
  useEffect(() => {
    if (!visible) return;
    const onClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        triggerRef.current?.contains(target) ||
        popupRef.current?.contains(target)
      ) {
        return;
      }
      close();
    };
    // Use setTimeout to avoid the current click event
    const timer = setTimeout(() => {
      document.addEventListener('mousedown', onClickOutside);
    }, 0);
    return () => {
      clearTimeout(timer);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [visible]);

  useEffect(() => {
    return () => clearTimer();
  }, []);

  const openPopup = () => {
    clearTimer();
    timerRef.current = setTimeout(() => changeVisible(true), mouseEnterDelay * 1000);
  };

  const closePopup = () => {
    clearTimer();
    timerRef.current = setTimeout(() => changeVisible(false), mouseLeaveDelay * 1000);
  };

  const togglePopup = () => {
    clearTimer();
    changeVisible(!visible);
  };

  // Build trigger props
  const triggerProps: React.HTMLAttributes<HTMLDivElement> = {};

  if (triggers.includes('hover')) {
    triggerProps.onMouseEnter = openPopup;
    triggerProps.onMouseLeave = closePopup;
  }

  if (triggers.includes('click')) {
    triggerProps.onClick = (e) => {
      e.stopPropagation();
      togglePopup();
    };
  }

  if (triggers.includes('focus')) {
    triggerProps.onFocus = openPopup;
    triggerProps.onBlur = closePopup;
  }

  if (triggers.includes('contextMenu')) {
    triggerProps.onContextMenu = (e) => {
      e.preventDefault();
      togglePopup();
    };
  }

  // Default icon
  const defaultIcon = (
    <Icon name="Caution" size={16} className="soui-popconfirm-warning-icon" />
  );

  const popup = visible || !destroyOnHidden ? (
    <Popup
      visible={visible}
      title={title}
      description={description}
      placement={placement}
      arrow={arrow}
      zIndex={zIndex}
      icon={icon || defaultIcon}
      okText={okText}
      cancelText={cancelText}
      okType={okType}
      okButtonProps={okButtonProps}
      cancelButtonProps={cancelButtonProps}
      showCancel={showCancel}
      overlayClassName={overlayClassName}
      overlayStyle={overlayStyle}
      position={position}
      popupRef={popupRef}
      confirmLoading={confirmLoading}
      onMouseEnter={triggers.includes('hover') ? openPopup : undefined}
      onMouseLeave={triggers.includes('hover') ? closePopup : undefined}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  ) : null;

  const container =
    getPopupContainer && triggerRef.current
      ? getPopupContainer(triggerRef.current)
      : document.body;

  return (
    <>
      <div
        ref={triggerRef}
        className={classNames('soui-popconfirm-trigger', className)}
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

Popconfirm.displayName = 'Popconfirm';

export default Popconfirm;
