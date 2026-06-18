import React, { useState, useCallback } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import { useComponentTheme, useTheme } from '../ConfigProvider';
import './style.less';

// ==================== Types ====================

/** 警告提示类型 */
export type AlertType = 'success' | 'info' | 'warning' | 'error';

/** Alert Props */
export interface AlertProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 警告提示类型 */
  type?: AlertType;
  /** 警告提示内容 */
  message: React.ReactNode;
  /** 辅助性文字（第二行描述） */
  description?: React.ReactNode;
  /** 是否可关闭 */
  closable?: boolean;
  /** 自定义关闭按钮 */
  closeIcon?: React.ReactNode;
  /** 自定义图标 */
  icon?: React.ReactNode;
  /** 是否显示图标 */
  showIcon?: boolean;
  /** 关闭动画 */
  afterClose?: () => void;
  /** 是否为 banner 模式 */
  banner?: boolean;
  /** 自定义操作元素 */
  action?: React.ReactNode;
}

// ==================== 默认图标映射 ====================

const defaultIconMap: Record<AlertType, string> = {
  success: 'CheckCircle',
  info: 'Info',
  warning: 'AttentionTriangle',
  error: 'CloseCircle',
};

// ==================== Component ====================

const Alert: React.FC<AlertProps> = ({
  type = 'info',
  message,
  description,
  closable = false,
  closeIcon,
  icon,
  showIcon = false,
  afterClose,
  banner = false,
  action,
  className,
  style,
  children,
  ...rest
}) => {
  const [closed, setClosed] = useState(false);

  // 获取主题配置
  const alertTheme = useComponentTheme('Alert');
  const globalTheme = useTheme();

  // banner 模式下默认为 warning 类型
  const effectiveType: AlertType = banner && type === 'info' ? 'warning' : type;

  // 主题 CSS 变量
  const alertStyle: React.CSSProperties = {
    ...(alertTheme?.borderRadius ? { '--soui-alert-border-radius': `${alertTheme.borderRadius}px` } : {}),
    ...(alertTheme?.fontSize ? { '--soui-alert-font-size': `${alertTheme.fontSize}px` } : {}),
    ...(alertTheme?.titleFontSize ? { '--soui-alert-title-font-size': `${alertTheme.titleFontSize}px` } : {}),
    ...(alertTheme?.iconSize ? { '--soui-alert-icon-size': `${alertTheme.iconSize}px` } : {}),
    // 状态颜色覆盖
    ...(alertTheme?.colorSuccessBg ? { '--soui-alert-success-bg': alertTheme.colorSuccessBg } : {}),
    ...(alertTheme?.colorSuccessBorder ? { '--soui-alert-success-border': alertTheme.colorSuccessBorder } : {}),
    ...(alertTheme?.colorInfoBg ? { '--soui-alert-info-bg': alertTheme.colorInfoBg } : {}),
    ...(alertTheme?.colorInfoBorder ? { '--soui-alert-info-border': alertTheme.colorInfoBorder } : {}),
    ...(alertTheme?.colorWarningBg ? { '--soui-alert-warning-bg': alertTheme.colorWarningBg } : {}),
    ...(alertTheme?.colorWarningBorder ? { '--soui-alert-warning-border': alertTheme.colorWarningBorder } : {}),
    ...(alertTheme?.colorErrorBg ? { '--soui-alert-error-bg': alertTheme.colorErrorBg } : {}),
    ...(alertTheme?.colorErrorBorder ? { '--soui-alert-error-border': alertTheme.colorErrorBorder } : {}),
    ...style,
  } as any;

  // 关闭处理
  const handleClose = useCallback(() => {
    setClosed(true);
    afterClose?.();
  }, [afterClose]);

  // 已关闭时不渲染
  if (closed) return null;

  const hasDescription = !!description;

  const alertClassName = classNames(
    'soui-alert',
    `soui-alert-${effectiveType}`,
    {
      'soui-alert-with-description': hasDescription,
      'soui-alert-banner': banner,
      'soui-alert-closable': closable,
    },
    className,
  );

  // 渲染图标
  const renderIcon = () => {
    if (icon) return <span className="soui-alert-icon">{icon}</span>;
    if (showIcon) {
      const iconName = defaultIconMap[effectiveType];
      return (
        <span className="soui-alert-icon">
          <Icon name={iconName} size={hasDescription ? 24 : 16} color={effectiveType === 'info' ? 'primary' : effectiveType} />
        </span>
      );
    }
    return null;
  };

  // 渲染关闭按钮
  const renderCloseIcon = () => {
    if (!closable) return null;
    return (
      <button className="soui-alert-close-btn" onClick={handleClose} aria-label="关闭">
        {closeIcon || <Icon name="Close" size={12} />}
      </button>
    );
  };

  return (
    <div className={alertClassName} style={alertStyle} role="alert" {...rest}>
      {renderIcon()}
      <div className="soui-alert-content">
        <div className="soui-alert-message">{message}</div>
        {hasDescription && <div className="soui-alert-description">{description}</div>}
      </div>
      {action && <div className="soui-alert-action">{action}</div>}
      {renderCloseIcon()}
    </div>
  );
};

export default Alert;
