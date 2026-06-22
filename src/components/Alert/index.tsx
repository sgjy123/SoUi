import React, { useState, useCallback, useContext } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import ConfigContext from '../ConfigProvider/context';
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
  /** 关闭动画（300ms）结束后触发的回调 */
  afterClose?: () => void;
  /** 是否为 banner 模式 */
  banner?: boolean;
  /** 自定义操作元素 */
  action?: React.ReactNode;
}

// ==================== 默认图标映射 ====================

const defaultIconMap: Record<AlertType, string> = {
  success: 'CheckOne',
  info: 'Info',
  warning: 'Attention',
  error: 'CloseOne',
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
  const [closing, setClosing] = useState(false);

  // 直接从 Context 读取主题，不强制要求 ConfigProvider
  const context = useContext(ConfigContext);
  const alertTheme = (context?.components?.Alert || {}) as Record<string, any>;

  // banner 模式下默认为 warning 类型
  const effectiveType: AlertType = banner && type === 'info' ? 'warning' : type;

  // 主题 CSS 变量
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (alertTheme.borderRadius !== undefined) {
    cssVars['--soui-alert-border-radius'] = `${alertTheme.borderRadius}px`;
  }
  if (alertTheme.fontSize !== undefined) {
    cssVars['--soui-alert-font-size'] = `${alertTheme.fontSize}px`;
  }
  if (alertTheme.titleFontSize !== undefined) {
    cssVars['--soui-alert-title-font-size'] = `${alertTheme.titleFontSize}px`;
  }
  if (alertTheme.iconSize !== undefined) {
    cssVars['--soui-alert-icon-size'] = `${alertTheme.iconSize}px`;
  }
  if (alertTheme.colorSuccessBg) cssVars['--soui-alert-success-bg'] = alertTheme.colorSuccessBg;
  if (alertTheme.colorSuccessBorder) cssVars['--soui-alert-success-border'] = alertTheme.colorSuccessBorder;
  if (alertTheme.colorInfoBg) cssVars['--soui-alert-info-bg'] = alertTheme.colorInfoBg;
  if (alertTheme.colorInfoBorder) cssVars['--soui-alert-info-border'] = alertTheme.colorInfoBorder;
  if (alertTheme.colorWarningBg) cssVars['--soui-alert-warning-bg'] = alertTheme.colorWarningBg;
  if (alertTheme.colorWarningBorder) cssVars['--soui-alert-warning-border'] = alertTheme.colorWarningBorder;
  if (alertTheme.colorErrorBg) cssVars['--soui-alert-error-bg'] = alertTheme.colorErrorBg;
  if (alertTheme.colorErrorBorder) cssVars['--soui-alert-error-border'] = alertTheme.colorErrorBorder;

  const alertStyle = { ...cssVars, ...style } as React.CSSProperties;

  // 关闭处理：先触发退出动画，过渡结束后再移除 DOM
  const handleClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
    setTimeout(() => {
      setClosed(true);
      afterClose?.();
    }, 300); // 与 style.less 中 transition-duration 保持一致
  }, [afterClose, closing]);

  // 已关闭时不渲染
  if (closed) return null;

  const hasDescription = !!description;

  // 图标大小：主题配置 > 描述模式默认 24 > 普通模式默认 16
  const iconSize = alertTheme.iconSize ?? (hasDescription ? 24 : 16);

  const alertClassName = classNames(
    'soui-alert',
    `soui-alert-${effectiveType}`,
    {
      'soui-alert-with-description': hasDescription,
      'soui-alert-banner': banner,
      'soui-alert-closable': closable,
      'soui-alert-closing': closing,
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
          <Icon name={iconName} size={iconSize} color={effectiveType === 'info' ? 'primary' : effectiveType} />
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
