import React, { useState, useEffect, useCallback, useRef } from 'react';
import { createPortal } from 'react-dom';
import { createRoot, Root } from 'react-dom/client';
import classNames from 'classnames';
import * as Icons from '@icon-park/react';
import Button from '../Button';
import './style.less';

// ==================== Types ====================

export type DialogOkType = 'primary' | 'default' | 'dashed' | 'text' | 'link';

export interface DialogInstance {
  confirm: (config: DialogConfirmConfig) => DialogReturnType;
  info: (config: DialogConfirmConfig) => DialogReturnType;
  success: (config: DialogConfirmConfig) => DialogReturnType;
  warning: (config: DialogConfirmConfig) => DialogReturnType;
  error: (config: DialogConfirmConfig) => DialogReturnType;
  destroyAll: () => void;
}

export interface DialogProps {
  open?: boolean;
  title?: React.ReactNode;
  children?: React.ReactNode;
  onOk?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onCancel?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  confirmLoading?: boolean;
  footer?: React.ReactNode;
  width?: number | string;
  centered?: boolean;
  destroyOnHidden?: boolean;
  mask?: boolean;
  maskClosable?: boolean;
  closable?: boolean;
  closeIcon?: React.ReactNode;
  okText?: React.ReactNode;
  cancelText?: React.ReactNode;
  okType?: DialogOkType;
  okButtonProps?: Record<string, any>;
  cancelButtonProps?: Record<string, any>;
  keyboard?: boolean;
  maskClassName?: string;
  wrapClassName?: string;
  style?: React.CSSProperties;
  bodyStyle?: React.CSSProperties;
  zIndex?: number;
  getContainer?: () => HTMLElement;
  afterClose?: () => void;
  modalRender?: (node: React.ReactNode) => React.ReactNode;
  focusable?: boolean;
}

export interface DialogConfirmConfig extends Omit<DialogProps, 'open' | 'children'> {
  content?: React.ReactNode;
  icon?: React.ReactNode;
  type?: 'confirm' | 'info' | 'success' | 'warning' | 'error';
}

export interface DialogReturnType {
  close: () => void;
  destroy: () => void;
}

export interface DialogHookInstance {
  open: (config: DialogConfirmConfig) => DialogReturnType;
  confirm: (config: DialogConfirmConfig) => DialogReturnType;
  info: (config: DialogConfirmConfig) => DialogReturnType;
  success: (config: DialogConfirmConfig) => DialogReturnType;
  warning: (config: DialogConfirmConfig) => DialogReturnType;
  error: (config: DialogConfirmConfig) => DialogReturnType;
}

// ==================== Icon Mapping ====================

const confirmIconMap: Record<string, React.ComponentType<any>> = {
  confirm: Icons.Attention,
  info: Icons.Info,
  success: Icons.CheckOne,
  warning: Icons.Attention,
  error: Icons.CloseOne,
};

const confirmIconColorMap: Record<string, string> = {
  confirm: '#faad14',
  info: '#1677ff',
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
};

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
  '--soui-dialog-border-radius',
  '--soui-dialog-title-font-size',
  '--soui-dialog-bg-color',
  '--soui-dialog-header-padding',
  '--soui-dialog-body-padding',
  '--soui-dialog-z-index',
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

// ==================== DialogWrapper (内部组件，管理自身状态和动画) ====================

interface DialogWrapperProps extends DialogProps {
  onAnimationEnd?: () => void;
  confirmType?: 'confirm' | 'info' | 'success' | 'warning' | 'error';
  confirmIcon?: React.ReactNode;
  /** config spread 可能带入 type */
  type?: 'confirm' | 'info' | 'success' | 'warning' | 'error';
  /** config spread 可能带入 content（静态方法用） */
  content?: React.ReactNode;
  /** Hook 模式下自动关闭 */
  hookMode?: boolean;
}

const DialogWrapper: React.FC<DialogWrapperProps> = ({
  open: openProp = false,
  title,
  children,
  onOk,
  onCancel,
  confirmLoading = false,
  footer,
  width = 420,
  centered = false,
  mask = true,
  maskClosable = true,
  closable = true,
  closeIcon,
  okText = '确定',
  cancelText = '取消',
  okType = 'primary',
  okButtonProps,
  cancelButtonProps,
  keyboard = true,
  maskClassName,
  wrapClassName,
  style,
  bodyStyle,
  zIndex,
  modalRender,
  focusable = true,
  onAnimationEnd,
  confirmType,
  confirmIcon,
  type: configType,
  content,
  hookMode = false,
}) => {
  // configType 来自 DialogConfirmConfig spread，confirmType 来自显式传入
  const resolvedConfirmType = confirmType || configType;
  const [visible, setVisible] = useState(openProp);
  const [closing, setClosing] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const wasVisibleRef = useRef(false);

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
          onCancel?.(undefined as any);
          setClosing(true);
        }
      };
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [visible, closing, keyboard, onCancel]);

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

  // 确认 loading 结束后自动关闭
  useEffect(() => {
    if (wasVisibleRef.current && !confirmLoading && visible && !closing) {
      setClosing(true);
    }
    wasVisibleRef.current = confirmLoading;
  }, [confirmLoading, visible, closing]);

  const handleClose = useCallback(() => {
    onCancel?.(undefined as any);
    setClosing(true);
  }, [onCancel]);

  const handleMaskClick = useCallback(() => {
    if (maskClosable) {
      onCancel?.(undefined as any);
      setClosing(true);
    }
  }, [maskClosable, onCancel]);

  const handleOk = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      onOk?.(e);
      if (hookMode && !confirmLoading) {
        setClosing(true);
      }
    },
    [onOk, hookMode, confirmLoading],
  );

  if (!visible && !closing) return null;

  const isConfirmType = !!resolvedConfirmType;

  const renderConfirmIcon = () => {
    if (confirmIcon) return <span className="soui-dialog-confirm-icon">{confirmIcon}</span>;
    if (resolvedConfirmType) {
      const IconComp = confirmIconMap[resolvedConfirmType];
      const color = confirmIconColorMap[resolvedConfirmType];
      return (
        <span className="soui-dialog-confirm-icon">
          <IconComp size={22} fill={color} theme="filled" />
        </span>
      );
    }
    return null;
  };

  const renderFooter = () => {
    if (footer === null) return null;
    if (footer !== undefined) return <div className="soui-dialog-footer">{footer}</div>;

    if (isConfirmType) {
      return (
        <div className="soui-dialog-footer soui-dialog-confirm-footer">
          <Button onClick={handleClose} {...cancelButtonProps}>
            {cancelText}
          </Button>
          <Button
            type={okType}
            onClick={handleOk}
            loading={confirmLoading}
            {...okButtonProps}
          >
            {okText}
          </Button>
        </div>
      );
    }

    return (
      <div className="soui-dialog-footer">
        <Button onClick={handleClose} {...cancelButtonProps}>
          {cancelText}
        </Button>
        <Button
          type={okType}
          onClick={handleOk}
          loading={confirmLoading}
          {...okButtonProps}
        >
          {okText}
        </Button>
      </div>
    );
  };

  const dialogNode = (
    <div
      className={classNames('soui-dialog', {
        'soui-dialog-centered': centered,
        'soui-dialog-closing': closing,
        'soui-dialog-confirm': isConfirmType,
      })}
      style={{ width, ...style }}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? 'soui-dialog-title' : undefined}
      tabIndex={focusable ? -1 : undefined}
    >
      {closable && (
        <button
          className="soui-dialog-close"
          onClick={handleClose}
          aria-label="关闭对话框"
        >
          {closeIcon || <Icons.Close />}
        </button>
      )}

      {isConfirmType ? (
        <div className="soui-dialog-confirm-body">
          {renderConfirmIcon()}
          <div className="soui-dialog-confirm-content">
            {title && (
              <span className="soui-dialog-confirm-title" id="soui-dialog-title">
                {title}
              </span>
            )}
            {content || children}
          </div>
        </div>
      ) : (
        <>
          {title && (
            <div className="soui-dialog-header">
              <span className="soui-dialog-title" id="soui-dialog-title">
                {title}
              </span>
            </div>
          )}
          <div className="soui-dialog-body" style={bodyStyle}>
            {children}
          </div>
        </>
      )}

      {renderFooter()}
    </div>
  );

  const wrappedNode = modalRender ? modalRender(dialogNode) : dialogNode;

  return (
    <div
      className={classNames('soui-dialog-root', {
        'soui-dialog-root-visible': visible && !closing,
      })}
      style={{ zIndex }}
    >
      {mask && (
        <div
          className={classNames('soui-dialog-mask', maskClassName)}
          onClick={handleMaskClick}
        />
      )}

      <div
        ref={wrapperRef}
        className={classNames('soui-dialog-wrap', {
          'soui-dialog-centered-wrap': centered,
        }, wrapClassName)}
        onClick={(e) => {
          if (e.target === e.currentTarget && maskClosable) {
            onCancel?.(undefined as any);
            setClosing(true);
          }
        }}
      >
        {wrappedNode}
      </div>
    </div>
  );
};

// ==================== Dialog 声明式组件 ====================

const Dialog: React.FC<DialogProps> & DialogInstance & {
  useDialog: () => [DialogHookInstance, React.ReactElement];
} = ({
  open = false,
  getContainer,
  destroyOnHidden = false,
  afterClose,
  ...restProps
}) => {
  const [container, setContainer] = useState<HTMLElement | null>(null);
  const rootRef = useRef<Root | null>(null);
  const [mounted, setMounted] = useState(open);

  // 创建挂载容器
  useEffect(() => {
    const host = getContainer?.() || document.body;
    const el = document.createElement('div');
    el.className = 'soui-dialog-provider';
    host.appendChild(el);
    applyConfigProviderVars(el);
    setContainer(el);

    return () => {
      if (rootRef.current) {
        rootRef.current.unmount();
        rootRef.current = null;
      }
      el.remove();
    };
  }, [getContainer]);

  // 同步 open 属性到 mounted
  useEffect(() => {
    if (open && !mounted) {
      setMounted(true);
    }
  }, [open, mounted]);

  // destroyOnHidden：关闭后不渲染
  if (!mounted) return null;
  if (!container) return null;

  return createPortal(
    <DialogWrapper
      open={open}
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

// ==================== 静态方法实现 ====================

const staticDialogs = new Map<
  string,
  { root: Root; container: HTMLDivElement }
>();

const StaticDialogInner: React.FC<{
  config: DialogConfirmConfig;
  onClosed: () => void;
}> = ({ config, onClosed }) => {
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    setClosing(true);
  }, []);

  return (
    <DialogWrapper
      {...config}
      open={!closing}
      onCancel={(e) => {
        config.onCancel?.(e);
        handleClose();
      }}
      onOk={(e) => {
        config.onOk?.(e);
        if (!config.confirmLoading) {
          handleClose();
        }
      }}
      onAnimationEnd={() => {
        config.afterClose?.();
        onClosed();
      }}
    />
  );
};

const openStaticDialog = (config: DialogConfirmConfig): DialogReturnType => {
  const key = `soui-dialog-static-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  const host = config.getContainer?.() || document.body;

  const container = document.createElement('div');
  container.className = 'soui-dialog-static';
  host.appendChild(container);
  applyConfigProviderVars(container);

  const root = createRoot(container);
  staticDialogs.set(key, { root, container });

  const cleanup = () => {
    root.unmount();
    container.remove();
    staticDialogs.delete(key);
  };

  root.render(
    <StaticDialogInner
      config={config}
      onClosed={cleanup}
    />,
  );

  return { close: cleanup, destroy: cleanup };
};

Dialog.confirm = (config: DialogConfirmConfig) =>
  openStaticDialog({ ...config, type: 'confirm' });
Dialog.info = (config: DialogConfirmConfig) =>
  openStaticDialog({ ...config, type: 'info' });
Dialog.success = (config: DialogConfirmConfig) =>
  openStaticDialog({ ...config, type: 'success' });
Dialog.warning = (config: DialogConfirmConfig) =>
  openStaticDialog({ ...config, type: 'warning' });
Dialog.error = (config: DialogConfirmConfig) =>
  openStaticDialog({ ...config, type: 'error' });
Dialog.destroyAll = () => {
  staticDialogs.forEach(({ root, container }) => {
    root.unmount();
    container.remove();
  });
  staticDialogs.clear();
};

// ==================== useDialog Hook ====================

Dialog.useDialog = (): [DialogHookInstance, React.ReactElement] => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rootRef = useRef<Root | null>(null);
  const dialogsRef = useRef<
    Map<string, { config: DialogConfirmConfig; onClose: () => void }>
  >(new Map());

  const render = useCallback(() => {
    if (!rootRef.current) return;
    const items = Array.from(dialogsRef.current.entries());
    rootRef.current.render(
      <>
        {items.map(([key, { config, onClose }]) => (
          <DialogWrapper
            key={key}
            {...config}
            open={true}
            hookMode
            onCancel={(e) => {
              config.onCancel?.(e);
              onClose();
            }}
            onAnimationEnd={() => {
              config.afterClose?.();
              dialogsRef.current.delete(key);
              render();
            }}
          />
        ))}
      </>,
    );
  }, []);

  const addDialog = useCallback(
    (config: DialogConfirmConfig): DialogReturnType => {
      const key = `dialog-hook-${Date.now()}-${Math.random().toString(36).slice(2)}`;

      const close = () => {
        dialogsRef.current.delete(key);
        render();
      };

      dialogsRef.current.set(key, { config, onClose: close });
      render();

      return { close, destroy: close };
    },
    [render],
  );

  const holderRef = useCallback((el: HTMLDivElement | null) => {
    if (el) {
      containerRef.current = el;
      applyConfigProviderVars(el);
      const root = createRoot(el);
      rootRef.current = root;
    } else if (rootRef.current) {
      rootRef.current.unmount();
      rootRef.current = null;
      containerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      if (rootRef.current) {
        rootRef.current.unmount();
        rootRef.current = null;
      }
    };
  }, []);

  const api: DialogHookInstance = {
    open: addDialog,
    confirm: (config) => addDialog({ ...config, type: 'confirm' }),
    info: (config) => addDialog({ ...config, type: 'info' }),
    success: (config) => addDialog({ ...config, type: 'success' }),
    warning: (config) => addDialog({ ...config, type: 'warning' }),
    error: (config) => addDialog({ ...config, type: 'error' }),
  };

  return [api, <div ref={holderRef} className="soui-dialog-hook-holder" />];
};

export default Dialog;
