import React, { useEffect, useState } from 'react';
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
  /** 通知类型，会覆盖 icon */
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

// ==================== Icon Mapping ====================

const iconMap: Record<NotificationType, React.ComponentType<any>> = {
  success: Icons.Success,
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
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration * 1000);
      return () => clearTimeout(timer);
    }
  }, [duration]);

  const handleClose = () => {
    setVisible(false);
    onClose?.();
    // 等待动画结束后再移除 DOM
    setTimeout(() => {
      onRemove();
    }, 300);
  };

  const handleClick = () => {
    onClick?.();
  };

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
        `soui-notification-notice-${type}`,
        {
          'soui-notification-notice-visible': visible,
        },
        className
      )}
      style={style}
      onClick={handleClick}
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
        aria-label="Close notification"
      >
        {closeIcon || <Icons.Close />}
      </button>
    </div>
  );
};

// ==================== Notification Container ====================

interface NotificationContainerProps {
  placement: NotificationPlacement;
  top?: string | number;
  bottom?: string | number;
}

class NotificationContainer {
  private static instances: Map<string, HTMLDivElement> = new Map();
  private static roots: Map<string, any> = new Map();

  static getOrCreateContainer(placement: NotificationPlacement): HTMLDivElement {
    const key = `notification-${placement}`;
    if (!this.instances.has(key)) {
      const container = document.createElement('div');
      container.className = `soui-notification soui-notification-${placement}`;
      document.body.appendChild(container);
      this.instances.set(key, container);
      
      // 创建 React root
      const root = ReactDOM.createRoot(container);
      this.roots.set(key, root);
    }
    return this.instances.get(key)!;
  }

  static addNotice(config: NotificationConfig & { onRemove: () => void }) {
    const placement = config.placement || globalConfig.placement || defaultPlacement;
    const container = this.getOrCreateContainer(placement);
    
    // 生成唯一 key
    const noticeKey = config.key || `notice-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    
    // 获取该 placement 的所有 notices
    const existingNotices = Array.from(container.children);
    const noticeElement = document.getElementById(noticeKey);
    
    if (noticeElement) {
      // 如果已存在相同 key，先移除
      noticeElement.remove();
    }

    const noticeDiv = document.createElement('div');
    noticeDiv.id = noticeKey;
    container.appendChild(noticeDiv);

    const root = ReactDOM.createRoot(noticeDiv);
    root.render(
      <NoticeItem {...config} onRemove={() => this.removeNotice(noticeKey)} />
    );
  }

  static removeNotice(key: string) {
    const element = document.getElementById(key);
    if (element) {
      element.remove();
    }
  }

  static destroyAll() {
    this.instances.forEach((container) => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    });
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
    onRemove: () => {}, // 实际在 NoticeItem 中处理
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
  destroy: () => {
    NotificationContainer.destroyAll();
  },
  config: (options: NotificationGlobalConfig) => {
    setNotificationConfig(options);
  },
};

// 别名
(api as any).warn = api.warning;

export default api;
