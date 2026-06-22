import React, { useEffect, useState, useCallback } from 'react';
import ReactDOM from 'react-dom/client';
import classNames from 'classnames';
import * as Icons from '@icon-park/react';
import './style.less';

// ==================== Types ====================

export type NotificationPlacement = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';

export type NotificationType = 'success' | 'info' | 'warning' | 'error';

export interface NotificationConfig {
  /** 通知标题 */
  message?: React.ReactNode;
  /** 通知内容 */
  description?: React.ReactNode;
  /** 自动关闭的延时，单位秒。设为 0 时不自动关闭 */
  duration?: number;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 通知类型，会显示对应图标 */
  type?: NotificationType;
  /** 唯一标识符 */
  key?: string;
  /** 弹出位置 */
  placement?: NotificationPlacement;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
  /** 点击通知时的回调 */
  onClick?: () => void;
  /** 关闭通知时的回调 */
  onClose?: () => void;
  /** 自定义关闭按钮 */
  closeIcon?: React.ReactNode;
}

export interface NotificationApi {
  open: (config: NotificationConfig) => void;
  success: (config: NotificationConfig) => void;
  info: (config: NotificationConfig) => void;
  warning: (config: NotificationConfig) => void;
  error: (config: NotificationConfig) => void;
  close: (key: string) => void;
  destroy: () => void;
  config: (options: NotificationGlobalConfig) => void;
}

export interface NotificationGlobalConfig {
  /** 默认自动关闭延时，单位秒 */
  duration?: number;
  /** 配置渲染节点的输出位置 */
  getContainer?: () => HTMLElement;
  /** 弹出位置 */
  placement?: NotificationPlacement;
  /** 消息从顶部弹出时，距离顶部的位置 */
  top?: string | number;
  /** 消息从底部弹出时，距离底部的位置 */
  bottom?: string | number;
}

// ==================== Global Config ====================

const defaultDuration = 4.5;
const defaultPlacement: NotificationPlacement = 'topRight';
let globalConfig: NotificationGlobalConfig = {};

const setNotificationConfig = (options: NotificationGlobalConfig) => {
  globalConfig = { ...globalConfig, ...options };
};

// ==================== ConfigProvider DOM Bridge ====================

const CONFIG_PROVIDER_VARS = [
  '--soui-notification-border-radius',
  '--soui-notification-font-size',
  '--soui-notification-description-font-size',
  '--soui-notification-icon-size',
  '--soui-notification-close-icon-size',
  '--soui-notification-padding',
  '--soui-notification-z-index',
  '--soui-notification-bg-color',
  '--soui-primary-color',
  '--soui-success-color',
  '--soui-warning-color',
  '--soui-error-color',
  '--soui-border-radius',
  '--soui-font-size',
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

// ==================== Icon Mapping ====================

const iconMap: Record<NotificationType, React.ComponentType<any>> = {
  success: Icons.CheckOne,
  info: Icons.Info,
  warning: Icons.Attention,
  error: Icons.CloseOne,
};

// ==================== Notice Item ====================

interface NoticeItemProps extends NotificationConfig {
  onRemove: () => void;
}

const NoticeItem: React.FC<NoticeItemProps> = ({
  message,
  description,
  duration = defaultDuration,
  icon,
  type,
  style,
  className,
  onClick,
  onClose,
  closeIcon,
  onRemove,
}) => {
  const [closing, setClosing] = useState(false);

  const handleClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    onClose?.();
    // 等待退出动画结束后再移除 DOM
    setTimeout(() => {
      onRemove();
    }, 300);
  }, [closing, onClose, onRemove]);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(handleClose, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [duration, handleClose]);

  // 根据 type 或 icon 确定显示的图标
  let displayIcon: React.ReactNode = null;
  if (icon) {
    displayIcon = icon;
  } else if (type) {
    const IconComponent = iconMap[type];
    displayIcon = <IconComponent />;
  }

  return (
    <div
      className={classNames(
        'soui-notification-notice',
        type && `soui-notification-notice-${type}`,
        'soui-notification-notice-visible',
        {
          'soui-notification-notice-closing': closing,
        },
        className,
      )}
      style={style}
      onClick={onClick}
      role="alert"
    >
      <div className="soui-notification-notice-content">
        {displayIcon && (
          <span className="soui-notification-notice-icon">{displayIcon}</span>
        )}
        <div className="soui-notification-notice-message">{message}</div>
        {description && (
          <div className="soui-notification-notice-description">{description}</div>
        )}
      </div>
      <button
        className="soui-notification-notice-close"
        onClick={(e) => {
          e.stopPropagation();
          handleClose();
        }}
        aria-label="关闭"
      >
        {closeIcon || <Icons.Close />}
      </button>
    </div>
  );
};

// ==================== Notification Container ====================

class NotificationContainer {
  /** 各 placement 对应的容器 DOM */
  private static containers: Map<string, HTMLDivElement> = new Map();
  /** 各 placement 对应的 React root（当前未用于渲染，保留供将来批量渲染） */
  private static containerRoots: Map<string, ReactDOM.Root> = new Map();
  /** 各 notice 的 React root，key 为 notice id */
  private static noticeRoots: Map<string, ReactDOM.Root> = new Map();

  static getOrCreateContainer(placement: NotificationPlacement): HTMLDivElement {
    const key = `notification-${placement}`;
    if (!this.containers.has(key)) {
      const container = document.createElement('div');
      container.className = `soui-notification soui-notification-${placement}`;

      // 应用位置样式
      const posStyle: Record<string, string> = {};
      if (placement.includes('top')) {
        posStyle.top = globalConfig.top !== undefined
          ? (typeof globalConfig.top === 'number' ? `${globalConfig.top}px` : globalConfig.top)
          : '';
      }
      if (placement.includes('bottom')) {
        posStyle.bottom = globalConfig.bottom !== undefined
          ? (typeof globalConfig.bottom === 'number' ? `${globalConfig.bottom}px` : globalConfig.bottom)
          : '';
      }
      if (placement.includes('Left')) {
        posStyle.left = '24px';
      }
      if (placement.includes('Right')) {
        posStyle.right = '24px';
      }
      Object.entries(posStyle).forEach(([k, v]) => {
        if (v) container.style.setProperty(k, v);
      });

      // DOM 桥接：从 ConfigProvider 复制 CSS 变量
      applyConfigProviderVars(container);

      const host = globalConfig.getContainer?.() || document.body;
      host.appendChild(container);
      this.containers.set(key, container);
    }
    return this.containers.get(key)!;
  }

  static addNotice(config: NotificationConfig & { onRemove: () => void }) {
    const placement = config.placement || globalConfig.placement || defaultPlacement;
    const container = this.getOrCreateContainer(placement);

    // 每次调用时刷新 ConfigProvider CSS 变量（支持动态主题切换）
    applyConfigProviderVars(container);

    // 生成唯一 key
    const noticeKey = config.key || `notice-${Date.now()}-${Math.random().toString(36).slice(2)}`;

    // 如果已存在相同 key，先清理
    if (this.noticeRoots.has(noticeKey)) {
      const existing = document.getElementById(noticeKey);
      if (existing) {
        this.noticeRoots.get(noticeKey)!.unmount();
        existing.remove();
      }
      this.noticeRoots.delete(noticeKey);
    }

    const noticeDiv = document.createElement('div');
    noticeDiv.id = noticeKey;
    container.appendChild(noticeDiv);

    const root = ReactDOM.createRoot(noticeDiv);
    this.noticeRoots.set(noticeKey, root);
    root.render(
      <NoticeItem
        {...config}
        onRemove={() => this.removeNotice(noticeKey)}
      />,
    );
  }

  static removeNotice(key: string) {
    const root = this.noticeRoots.get(key);
    const element = document.getElementById(key);
    if (root) {
      root.unmount();
      this.noticeRoots.delete(key);
    }
    if (element) {
      element.remove();
    }
  }

  static destroyAll() {
    // 卸载所有 notice root
    this.noticeRoots.forEach((root) => root.unmount());
    this.noticeRoots.clear();

    // 卸载所有 container root（预留）
    this.containerRoots.forEach((root) => root.unmount());
    this.containerRoots.clear();

    // 移除所有容器 DOM
    this.containers.forEach((container) => container.remove());
    this.containers.clear();
  }
}

// ==================== API Implementation ====================

const createNotice = (config: NotificationConfig) => {
  const mergedConfig = {
    ...globalConfig,
    ...config,
    duration: config.duration !== undefined ? config.duration : globalConfig.duration ?? defaultDuration,
  };

  NotificationContainer.addNotice({
    ...mergedConfig,
    onRemove: () => {}, // 实际在 NoticeItem 内部处理
  });
};

const api: NotificationApi = {
  open: (config: NotificationConfig) => {
    createNotice(config);
  },
  success: (config: NotificationConfig) => {
    createNotice({ ...config, type: 'success' });
  },
  info: (config: NotificationConfig) => {
    createNotice({ ...config, type: 'info' });
  },
  warning: (config: NotificationConfig) => {
    createNotice({ ...config, type: 'warning' });
  },
  error: (config: NotificationConfig) => {
    createNotice({ ...config, type: 'error' });
  },
  close: (key: string) => {
    NotificationContainer.removeNotice(key);
  },
  destroy: () => {
    NotificationContainer.destroyAll();
  },
  config: (options: NotificationGlobalConfig) => {
    setNotificationConfig(options);
  },
};

export default api;
