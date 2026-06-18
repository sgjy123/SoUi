import React, { useState, useEffect, useCallback, useRef } from 'react';
import classNames from 'classnames';
import { createRoot, Root } from 'react-dom/client';
import * as Icons from '@icon-park/react';
import './style.less';

// ==================== Types ====================

/** 消息提示类型 */
export type MessageType = 'success' | 'info' | 'warning' | 'error' | 'loading';

/** 消息配置项 */
export interface MessageConfig {
  /** 消息内容 */
  content: React.ReactNode;
  /** 消息类型 */
  type?: MessageType;
  /** 显示时长（毫秒），0 表示不自动关闭 */
  duration?: number;
  /** 关闭时的回调 */
  onClose?: (key: React.Key) => void;
  /** 唯一标识 */
  key?: React.Key;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 自定义类名 */
  className?: string;
}

/** MessageInstance 实例方法接口 */
export interface MessageInstance {
  /** 打开消息 */
  open: (config: MessageConfig) => void;
  /** 成功消息 */
  success: (content: React.ReactNode, duration?: number) => void;
  /** 信息消息 */
  info: (content: React.ReactNode, duration?: number) => void;
  /** 警告消息 */
  warning: (content: React.ReactNode, duration?: number) => void;
  /** 错误消息 */
  error: (content: React.ReactNode, duration?: number) => void;
  /** 加载中消息 */
  loading: (content: React.ReactNode, duration?: number) => void;
  /** 销毁所有消息 */
  destroy: () => void;
}

// ==================== 默认图标映射 ====================

const iconComponentMap: Record<MessageType, React.ComponentType<any>> = {
  success: Icons.CheckOne,
  info: Icons.Info,
  warning: Icons.Attention,
  error: Icons.CloseOne,
  loading: Icons.LoadingThree,
};

const iconColorMap: Record<MessageType, string> = {
  success: '#52c41a',
  info: '#1677ff',
  warning: '#faad14',
  error: '#ff4d4f',
  loading: '#1677ff',
};

// ==================== 内部消息项组件 ====================

interface NoticeItemProps {
  config: MessageConfig;
  /** 移除自身 */
  onRemove: (key: React.Key) => void;
  /** 是否正在移除（用于动画） */
  removing?: boolean;
}

let messageCount = 0;

const genKey = () => `soui-message-${++messageCount}-${Date.now()}`;

const NoticeItem: React.FC<NoticeItemProps> = ({ config, onRemove, removing }) => {
  const timerRef = useRef<ReturnType<typeof setTimeout>>();

  const {
    content,
    type = 'info',
    duration = 3,
    onClose,
    key,
    icon: customIcon,
    style,
    className,
  } = config;

  const handleClose = useCallback(() => {
    onRemove(key || '');
    onClose?.(key || '');
  }, [onRemove, key, onClose]);

  // 自动关闭逻辑
  useEffect(() => {
    if (duration > 0) {
      timerRef.current = setTimeout(() => {
        handleClose();
      }, duration * 1000);
    }
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [duration, handleClose]);

  // 渲染图标（直接使用 @icon-park/react，避免依赖 ConfigContext）
  const renderIcon = () => {
    if (customIcon) return <span className="soui-message-icon">{customIcon}</span>;
    
    const IconComponent = iconComponentMap[type];
    return (
      <span className="soui-message-icon">
        <IconComponent
          size={16}
          fill={iconColorMap[type]}
          theme={type === 'loading' ? 'filled' : 'outline'}
        />
      </span>
    );
  };

  const itemClassName = classNames(
    'soui-message-notice',
    `soui-message-notice-${type}`,
    {
      'soui-message-notice-removing': removing,
    },
    className
  );

  return (
    <div className={itemClassName} style={style} role="alert">
      {renderIcon()}
      <span className="soui-message-content">{content}</span>
    </div>
  );
};

// ==================== Message 容器组件 ====================

interface MessageContainerProps {
  /** 消息列表 */
  notices: MessageConfig[];
  /** 移除消息 */
  onRemove: (key: React.Key) => void;
}

const MessageContainer: React.FC<MessageContainerProps> = ({ notices, onRemove }) => {
  const [removingKeys, setRemovingKeys] = useState<Set<React.Key>>(new Set());

  const handleRemove = useCallback((key: React.Key) => {
    // 先标记为移除中（触发出场动画）
    setRemovingKeys((prev) => new Set(prev).add(key));
    // 动画结束后从列表中移除
    setTimeout(() => {
      onRemove(key);
      setRemovingKeys((prev) => {
        const next = new Set(prev);
        next.delete(key);
        return next;
      });
    }, 300);
  }, [onRemove]);

  if (notices.length === 0) return null;

  return (
    <div className="soui-message-wrapper">
      <div className="soui-message-container">
        {notices.map((notice) => (
          <NoticeItem
            key={notice.key || ''}
            config={notice}
            onRemove={handleRemove}
            removing={removingKeys.has(notice.key || '')}
          />
        ))}
      </div>
    </div>
  );
};

// ==================== 静态方法实现 ====================

let root: Root | null = null;
let container: HTMLDivElement | null = null;
let messageInstance: MessageInstance | null = null;

/**
 * 创建或获取 Message 实例
 */
function getInstance(
  callback: (instance: MessageInstance) => void,
  parentElement?: HTMLElement
): void {
  // 如果已有实例且容器存在，直接使用
  if (messageInstance && container && document.body.contains(container)) {
    callback(messageInstance);
    return;
  }

  // 创建容器
  const targetContainer = parentElement || document.body;
  
  if (!container) {
    container = document.createElement('div');
    container.className = 'soui-message-provider';
    targetContainer.appendChild(container);
  }

  if (!root) {
    root = createRoot(container);
  }

  let notices: MessageConfig[] = [];

  /**
   * 添加消息并重新渲染
   */
  function addNotice(config: MessageConfig): void {
    const noticeKey = config.key || genKey();
    notices = [...notices, { ...config, key: noticeKey }];
    rerender();
  }

  /**
   * 移除指定消息
   */
  function removeNotice(key: React.Key): void {
    notices = notices.filter((item) => item.key !== key);
    rerender();
  }

  /**
   * 销毁所有消息
   */
  function destroyAll(): void {
    notices = [];
    rerender();
  }

  /**
   * 重新渲染容器
   */
  function rerender(): void {
    if (!root) return;
    root.render(
      <MessageContainer notices={notices} onRemove={removeNotice} />
    );
  }

  // 创建实例对象
  const instance: MessageInstance = {
    open(config) {
      addNotice(config);
    },
    success(content, duration) {
      addNotice({ content, type: 'success', duration });
    },
    info(content, duration) {
      addNotice({ content, type: 'info', duration });
    },
    warning(content, duration) {
      addNotice({ content, type: 'warning', duration });
    },
    error(content, duration) {
      addNotice({ content, type: 'error', duration });
    },
    loading(content, duration) {
      addNotice({ content, type: 'loading', duration: duration ?? 0 });
    },
    destroy() {
      destroyAll();
    },
  };

  messageInstance = instance;
  callback(instance);
}

// ==================== Message 组件（静态调用方式） ====================

/**
 * Message 全局提示
 * 
 * 使用静态方法调用：
 * ```tsx
 * Message.success('操作成功');
 * Message.error('操作失败');
 * Message.info('这是一条信息');
 * Message.warning('请注意');
 * Message.loading('加载中...');
 * 
 * // 高级用法
 * Message.open({
 *   content: '自定义内容',
 *   type: 'success',
 *   duration: 5,
 *   icon: <MyIcon />,
 * });
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-empty-object-type
const Message = (() => {
  // 默认配置
  let defaultOptions: {
    top?: number;
    duration?: number;
    maxCount?: number;
    getContainer?: () => HTMLElement;
  } = {};

  function openMessage(config: MessageConfig): void {
    const mergedDuration = config.duration ?? defaultOptions.duration ?? 3;
    getInstance((instance) => {
      instance.open({ ...config, duration: mergedDuration });
    }, defaultOptions.getContainer?.());
  }

  return {
    // 静态方法
    success(content: React.ReactNode, duration?: number) {
      openMessage({ content, type: 'success', duration });
    },
    info(content: React.ReactNode, duration?: number) {
      openMessage({ content, type: 'info', duration });
    },
    warning(content: React.ReactNode, duration?: number) {
      openMessage({ content, type: 'warning', duration });
    },
    error(content: React.ReactNode, duration?: number) {
      openMessage({ content, type: 'error', duration });
    },
    loading(content: React.ReactNode, duration?: number) {
      openMessage({ content, type: 'loading', duration: duration ?? 0 });
    },
    open(config: MessageConfig) {
      openMessage(config);
    },
    destroy() {
      getInstance((instance) => {
        instance.destroy();
      });
    },

    /**
     * Hook 方式使用 Message
     * @returns [api, contextHolder]
     */
    useMessage() {
      const [holder, setHolder] = useState<React.ReactElement | null>(null);
      const instanceRef = useRef<MessageInstance | null>(null);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const holderRootRef = useRef<any>(null);

      useEffect(() => {
        if (!holder) {
          // 创建一个占位 div 用于渲染消息
          const placeholder = document.createElement('div');
          holderRootRef.current = createRoot(placeholder);
          
          let notices: MessageConfig[] = [];

          const api: MessageInstance = {
            open(config) {
              const noticeKey = config.key || genKey();
              notices = [...notices, { ...config, key: noticeKey }];
              renderMessages();
            },
            success(content, duration) {
              notices = [...notices, { content, type: 'success' as MessageType, key: genKey(), duration }];
              renderMessages();
            },
            info(content, duration) {
              notices = [...notices, { content, type: 'info' as MessageType, key: genKey(), duration }];
              renderMessages();
            },
            warning(content, duration) {
              notices = [...notices, { content, type: 'warning' as MessageType, key: genKey(), duration }];
              renderMessages();
            },
            error(content, duration) {
              notices = [...notices, { content, type: 'error' as MessageType, key: genKey(), duration }];
              renderMessages();
            },
            loading(content, duration) {
              notices = [...notices, { content, type: 'loading' as MessageType, key: genKey(), duration: duration ?? 0 }];
              renderMessages();
            },
            destroy() {
              notices = [];
              renderMessages();
            },
          };

          function removeNotice(key: React.Key) {
            notices = notices.filter((item) => item.key !== key);
            renderMessages();
          }

          function renderMessages() {
            holderRootRef.current?.render(
              <MessageContainer notices={notices} onRemove={removeNotice} />
            );
          }

          instanceRef.current = api;
          setHolder(<>{renderMessages()}</> as any);
        }
        return () => {
          holderRootRef.current?.unmount();
        };
      }, []);

      return [instanceRef.current || {} as MessageInstance, holder || <></>];
    },

    /**
     * 配置全局默认选项
     */
    config(options: typeof defaultOptions) {
      defaultOptions = options;
    },
  };
})();

export default Message;
