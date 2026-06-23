import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import * as Icons from '@icon-park/react';
import './style.less';

// ==================== Types ====================

/** 抽屉弹出方向 */
export type DrawerPlacement = 'top' | 'right' | 'bottom' | 'left';

/** 抽屉预设尺寸 */
export type DrawerSize = 'default' | 'large';

export interface DrawerProps {
  /** 抽屉是否可见（受控模式） */
  open?: boolean;
  /** 抽屉弹出方向 */
  placement?: DrawerPlacement;
  /** 抽屉宽度（placement 为 left/right 时生效）或高度（placement 为 top/bottom 时生效），支持预设尺寸或自定义值 */
  size?: DrawerSize | number | string;
  /** 抽屉标题 */
  title?: React.ReactNode;
  /** 抽屉右上角额外操作区 */
  extra?: React.ReactNode;
  /** 抽屉底部内容 */
  footer?: React.ReactNode;
  /** 抽屉内容 */
  children?: React.ReactNode;
  /** 是否显示关闭按钮 */
  closable?: boolean;
  /** 自定义关闭图标 */
  closeIcon?: React.ReactNode;
  /** 是否显示遮罩层 */
  mask?: boolean;
  /** 点击遮罩层是否关闭抽屉 */
  maskClosable?: boolean;
  /** 是否支持 ESC 键关闭 */
  keyboard?: boolean;
  /** 关闭后销毁子元素 */
  destroyOnHidden?: boolean;
  /** 预渲染内容（即使隐藏时也保留 DOM） */
  forceRender?: boolean;
  /** 设置 Drawer 的 z-index */
  zIndex?: number;
  /** 指定 Drawer 挂载的 HTML 节点 */
  getContainer?: () => HTMLElement;
  /** 关闭抽屉时的回调 */
  onClose?: (e: React.MouseEvent | KeyboardEvent) => void;
  /** 抽屉关闭动画结束后的回调 */
  afterClose?: () => void;
  /** 自定义抽屉内容区样式 */
  bodyStyle?: React.CSSProperties;
  /** 自定义抽屉头部样式 */
  headerStyle?: React.CSSProperties;
  /** 自定义抽屉底部样式 */
  footerStyle?: React.CSSProperties;
  /** 自定义抽屉面板样式 */
  style?: React.CSSProperties;
  /** 自定义抽屉面板类名 */
  className?: string;
  /** 自定义遮罩层类名 */
  maskClassName?: string;
  /** 自定义包裹层类名 */
  wrapClassName?: string;
  /** 自定义渲染包装函数 */
  drawerRender?: (node: React.ReactNode) => React.ReactNode;
}

// ==================== ConfigProvider DOM Bridge ====================

const CONFIG_PROVIDER_VARS = [
  '--soui-primary-color',
  '--soui-primary-hover-color',
  '--soui-success-color',
  '--soui-warning-color',
  '--soui-error-color',
  '--soui-border-radius',
  '--soui-font-size',
  '--soui-text-color',
  '--soui-text-color-secondary',
  '--soui-drawer-border-radius',
  '--soui-drawer-title-font-size',
  '--soui-drawer-bg-color',
  '--soui-drawer-mask-bg-color',
  '--soui-drawer-header-padding',
  '--soui-drawer-body-padding',
  '--soui-drawer-footer-padding',
  '--soui-drawer-z-index',
  '--soui-drawer-box-shadow',
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

// ==================== Size Helpers ====================

/** 默认宽度（left/right 方向） */
const DEFAULT_WIDTH = 378;
/** 大尺寸宽度 */
const LARGE_WIDTH = 736;
/** 默认高度（top/bottom 方向） */
const DEFAULT_HEIGHT = 378;
/** 大尺寸高度 */
const LARGE_HEIGHT = 736;

function resolveSizeValue(
  size: DrawerSize | number | string | undefined,
  placement: DrawerPlacement,
): number | string {
  if (size === undefined || size === 'default') {
    return placement === 'left' || placement === 'right' ? DEFAULT_WIDTH : DEFAULT_HEIGHT;
  }
  if (size === 'large') {
    return placement === 'left' || placement === 'right' ? LARGE_WIDTH : LARGE_HEIGHT;
  }
  return size;
}

// ==================== DrawerWrapper (内部组件，管理动画状态) ====================

interface DrawerWrapperProps extends DrawerProps {
  onAnimationEnd?: () => void;
}

const DrawerWrapper: React.FC<DrawerWrapperProps> = ({
  open: openProp = false,
  placement = 'right',
  size,
  title,
  extra,
  footer,
  children,
  closable = true,
  closeIcon,
  mask = true,
  maskClosable = true,
  keyboard = true,
  zIndex,
  onClose,
  afterClose,
  bodyStyle,
  headerStyle,
  footerStyle,
  style,
  className,
  maskClassName,
  wrapClassName,
  drawerRender,
  forceRender = false,
  onAnimationEnd,
}) => {
  const [visible, setVisible] = useState(openProp || forceRender);
  const [closing, setClosing] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const hasOpenedRef = useRef(openProp);

  // 追踪是否曾经打开过（用于 forceRender）
  if (openProp) {
    hasOpenedRef.current = true;
  }

  // 同步 open 属性变化
  useEffect(() => {
    if (openProp && !visible && !closing) {
      setVisible(true);
    } else if (!openProp && visible && !closing) {
      setClosing(true);
    }
  }, [openProp]); // eslint-disable-line react-hooks/exhaustive-deps

  // ESC 键监听
  useEffect(() => {
    if (visible && !closing && keyboard) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose?.(e);
          setClosing(true);
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [visible, closing, keyboard, onClose]);

  // 关闭动画结束后处理
  useEffect(() => {
    if (closing) {
      const timer = setTimeout(() => {
        setVisible(false);
        setClosing(false);
        onAnimationEnd?.();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [closing, onAnimationEnd]);

  // 锁定 body 滚动
  useEffect(() => {
    if (visible && !closing) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [visible, closing]);

  const handleClose = useCallback(
    (e: React.MouseEvent) => {
      onClose?.(e);
      setClosing(true);
    },
    [onClose],
  );

  const handleMaskClick = useCallback(() => {
    if (maskClosable) {
      onClose?.(undefined as any);
      setClosing(true);
    }
  }, [maskClosable, onClose]);

  // 计算尺寸样式
  const sizeValue = resolveSizeValue(size, placement);
  const isHorizontal = placement === 'left' || placement === 'right';
  const sizeStyle: React.CSSProperties = isHorizontal
    ? { width: typeof sizeValue === 'number' ? `${sizeValue}px` : sizeValue }
    : { height: typeof sizeValue === 'number' ? `${sizeValue}px` : sizeValue };

  // forceRender 模式下，未打开过也不渲染内容
  if (!visible && !closing && !forceRender) return null;
  // forceRender 但从未打开过：渲染但隐藏
  if (!visible && !closing && forceRender && !hasOpenedRef.current) return null;

  const drawerPanel = (
    <div
      ref={drawerRef}
      className={classNames('soui-drawer', `soui-drawer-${placement}`, {
        'soui-drawer-closing': closing,
      }, className)}
      style={{ ...sizeStyle, ...style }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'soui-drawer-title' : undefined}
    >
      {/* 关闭按钮 */}
      {closable && (
        <button
          className="soui-drawer-close"
          onClick={handleClose}
          aria-label="关闭抽屉"
        >
          {closeIcon || <Icons.Close />}
        </button>
      )}

      {/* 头部 */}
      {(title || extra) && (
        <div className="soui-drawer-header" style={headerStyle}>
          <div className="soui-drawer-header-row">
            {title && (
              <span className="soui-drawer-title" id="soui-drawer-title">
                {title}
              </span>
            )}
          </div>
          {extra && <div className="soui-drawer-extra">{extra}</div>}
        </div>
      )}

      {/* 内容区 */}
      <div className="soui-drawer-body" style={bodyStyle}>
        {children}
      </div>

      {/* 底部 */}
      {footer && (
        <div className="soui-drawer-footer" style={footerStyle}>
          {footer}
        </div>
      )}
    </div>
  );

  const wrappedPanel = drawerRender ? drawerRender(drawerPanel) : drawerPanel;

  return (
    <div
      className={classNames('soui-drawer-root', `soui-drawer-root-${placement}`, {
        'soui-drawer-root-visible': visible || closing,
        'soui-drawer-root-closing': closing,
      })}
      style={{ zIndex }}
    >
      {/* 遮罩层 */}
      {mask && (
        <div
          className={classNames('soui-drawer-mask', maskClassName)}
          onClick={handleMaskClick}
        />
      )}

      {/* 包裹层 */}
      <div
        className={classNames('soui-drawer-wrap', `soui-drawer-wrap-${placement}`, wrapClassName)}
        onClick={(e) => {
          if (e.target === e.currentTarget && maskClosable) {
            onClose?.(undefined as any);
            setClosing(true);
          }
        }}
      >
        {wrappedPanel}
      </div>
    </div>
  );
};

// ==================== Drawer 声明式组件 ====================

const Drawer: React.FC<DrawerProps> = ({
  open = false,
  getContainer,
  destroyOnHidden = false,
  afterClose,
  forceRender = false,
  ...restProps
}) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(open || forceRender);

  // 创建挂载容器
  useEffect(() => {
    const host = getContainer?.() || document.body;
    const el = document.createElement('div');
    el.className = 'soui-drawer-provider';
    host.appendChild(el);
    applyConfigProviderVars(el);
    setContainer(el);

    return () => {
      el.remove();
    };
  }, [getContainer]);

  // 同步 open 属性到 mounted
  useEffect(() => {
    if (open && !mounted) {
      setMounted(true);
    }
  }, [open, mounted]);

  // destroyOnHidden：关闭动画结束后不再渲染
  if (!mounted) return null;
  if (!container) return null;

  return createPortal(
    <DrawerWrapper
      open={open}
      forceRender={forceRender}
      {...restProps}
      onAnimationEnd={() => {
        afterClose?.();
        if (destroyOnHidden && !open) {
          setMounted(false);
        }
      }}
    />,
    container,
  );
};

export default Drawer;
