import React, { useContext } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

// ==================== Types ====================

/** 结果状态类型 */
export type ResultStatus = 'success' | 'error' | 'info' | 'warning' | '404' | '403' | '500';

/** Result Props */
export interface ResultProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 结果状态，决定默认图标和颜色 */
  status?: ResultStatus;
  /** 标题 */
  title?: React.ReactNode;
  /** 副标题 */
  subTitle?: React.ReactNode;
  /** 自定义图标，优先级高于 status 对应的默认图标 */
  icon?: React.ReactNode;
  /** 操作区域，通常放置按钮 */
  extra?: React.ReactNode;
  /** 内容区域，在 subTitle 下方 */
  children?: React.ReactNode;
}

// ==================== Status Icon Maps ====================

const iconMap: Record<string, string> = {
  success: 'CheckOne',
  error: 'CloseOne',
  info: 'Info',
  warning: 'Attention',
};

// ==================== Status SVG Icons for 403/404/500 ====================

const StatusSvg403: React.FC = () => (
  <svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" width="160" height="120">
    <g fill="none" fillRule="evenodd">
      <path d="M20 90h120v4H20z" fill="#F5F5F5"/>
      <path d="M50 50h60v40H50z" fill="#E8E8E8" rx="4"/>
      <path d="M60 60h40v4H60zm0 10h40v4H60zm0 10h24v4H60z" fill="#BFBFBF"/>
      <circle cx="80" cy="30" r="16" fill="#FF4D4F" opacity=".15"/>
      <path d="M74 24l12 12m0-12L74 36" stroke="#FF4D4F" strokeWidth="3" strokeLinecap="round"/>
    </g>
  </svg>
);

const StatusSvg404: React.FC = () => (
  <svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" width="160" height="120">
    <g fill="none" fillRule="evenodd">
      <path d="M20 90h120v4H20z" fill="#F5F5F5"/>
      <path d="M50 50h60v40H50z" fill="#E8E8E8" rx="4"/>
      <path d="M60 60h40v4H60zm0 10h40v4H60zm0 10h24v4H60z" fill="#BFBFBF"/>
      <circle cx="80" cy="30" r="16" fill="#1677FF" opacity=".15"/>
      <text x="80" y="36" textAnchor="middle" fill="#1677FF" fontSize="18" fontWeight="bold">?</text>
    </g>
  </svg>
);

const StatusSvg500: React.FC = () => (
  <svg viewBox="0 0 160 120" xmlns="http://www.w3.org/2000/svg" width="160" height="120">
    <g fill="none" fillRule="evenodd">
      <path d="M20 90h120v4H20z" fill="#F5F5F5"/>
      <path d="M50 50h60v40H50z" fill="#E8E8E8" rx="4"/>
      <path d="M60 60h40v4H60zm0 10h40v4H60zm0 10h24v4H60z" fill="#BFBFBF"/>
      <circle cx="80" cy="30" r="16" fill="#FAAD14" opacity=".15"/>
      <path d="M72 30h16M80 22v16" stroke="#FAAD14" strokeWidth="3" strokeLinecap="round"/>
    </g>
  </svg>
);

const statusSvgMap: Record<string, React.FC> = {
  '403': StatusSvg403,
  '404': StatusSvg404,
  '500': StatusSvg500,
};

// ==================== Component ====================

const Result: React.FC<ResultProps> = ({
  status = 'info',
  title,
  subTitle,
  icon,
  extra,
  className,
  style,
  children,
  ...rest
}) => {
  // 从 ConfigContext 读取主题
  const context = useContext(ConfigContext);
  const resultTheme = (context?.components?.Result || {}) as Record<string, any>;

  // 将主题配置注入为 CSS 变量
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (resultTheme.borderRadius !== undefined) {
    cssVars['--soui-result-border-radius'] = `${resultTheme.borderRadius}px`;
  }
  if (resultTheme.fontSize !== undefined) {
    cssVars['--soui-result-font-size'] = `${resultTheme.fontSize}px`;
  }
  if (resultTheme.titleFontSize !== undefined) {
    cssVars['--soui-result-title-font-size'] = `${resultTheme.titleFontSize}px`;
  }
  if (resultTheme.subTitleFontSize !== undefined) {
    cssVars['--soui-result-subtitle-font-size'] = `${resultTheme.subTitleFontSize}px`;
  }
  if (resultTheme.iconSize !== undefined) {
    cssVars['--soui-result-icon-size'] = `${resultTheme.iconSize}px`;
  }
  if (resultTheme.colorSuccess) cssVars['--soui-result-color-success'] = resultTheme.colorSuccess;
  if (resultTheme.colorError) cssVars['--soui-result-color-error'] = resultTheme.colorError;
  if (resultTheme.colorWarning) cssVars['--soui-result-color-warning'] = resultTheme.colorWarning;
  if (resultTheme.colorInfo) cssVars['--soui-result-color-info'] = resultTheme.colorInfo;

  const resultStyle = { ...cssVars, ...style } as React.CSSProperties;

  const isHttpStatus = ['403', '404', '500'].includes(status);

  const resultClassName = classNames(
    'soui-result',
    `soui-result-${status}`,
    {
      'soui-result-with-extra': !!extra,
    },
    className,
  );

  // 渲染图标
  const renderIcon = () => {
    if (icon) {
      return <span className="soui-result-icon">{icon}</span>;
    }

    if (isHttpStatus) {
      const SvgComponent = statusSvgMap[status];
      return (
        <span className="soui-result-icon soui-result-icon-svg">
          <SvgComponent />
        </span>
      );
    }

    const iconName = iconMap[status] || 'Info';
    const colorTypeMap: Record<string, 'success' | 'error' | 'warning' | 'info' | 'primary'> = {
      success: 'success',
      error: 'error',
      warning: 'warning',
      info: 'primary',
    };

    return (
      <span className="soui-result-icon soui-result-icon-status">
        <Icon
          name={iconName}
          size={64}
          theme="filled"
          color={colorTypeMap[status] || 'primary'}
        />
      </span>
    );
  };

  return (
    <div className={resultClassName} style={resultStyle} {...rest}>
      {renderIcon()}
      {title && <div className="soui-result-title">{title}</div>}
      {subTitle && <div className="soui-result-subtitle">{subTitle}</div>}
      {extra && <div className="soui-result-extra">{extra}</div>}
      {children && <div className="soui-result-content">{children}</div>}
    </div>
  );
};

export default Result;
