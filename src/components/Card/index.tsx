import React, { useContext } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import Skeleton from '../Skeleton';
import './style.less';

// ==================== Types ====================

/** 卡片尺寸 */
export type CardSize = 'default' | 'small';

/** 卡片类型 */
export type CardType = 'inner';

export interface CardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** 卡片标题 */
  title?: React.ReactNode;
  /** 头部右侧操作区 */
  extra?: React.ReactNode;
  /** 是否有边框 */
  bordered?: boolean;
  /** 鼠标移入时浮起阴影 */
  hoverable?: boolean;
  /** 卡片尺寸 */
  size?: CardSize;
  /** 卡片类型（inner 内嵌卡片） */
  type?: CardType;
  /** 封面区域 */
  cover?: React.ReactNode;
  /** 底部操作按钮组 */
  actions?: React.ReactNode[];
  /** 是否加载中 */
  loading?: boolean;
  /** 内容区域自定义样式 */
  bodyStyle?: React.CSSProperties;
  /** 头部区域自定义样式 */
  headStyle?: React.CSSProperties;
  /** 卡片内容 */
  children?: React.ReactNode;
}

export interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 鼠标移入时浮起阴影 */
  hoverable?: boolean;
  /** 内容 */
  children?: React.ReactNode;
}

export interface CardMetaProps extends React.HTMLAttributes<HTMLDivElement> {
  /** 头像 */
  avatar?: React.ReactNode;
  /** 标题 */
  title?: React.ReactNode;
  /** 描述 */
  description?: React.ReactNode;
  /** 内容 */
  children?: React.ReactNode;
}

// ==================== Card.Grid ====================

const CardGrid: React.FC<CardGridProps> = ({
  hoverable = true,
  className,
  children,
  ...rest
}) => {
  return (
    <div
      className={classNames('soui-card-grid', { 'soui-card-grid-hoverable': hoverable }, className)}
      {...rest}
    >
      {children}
    </div>
  );
};

// ==================== Card.Meta ====================

const CardMeta: React.FC<CardMetaProps> = ({
  avatar,
  title,
  description,
  className,
  children,
  ...rest
}) => {
  const hasDetail = title || description;

  return (
    <div className={classNames('soui-card-meta', className)} {...rest}>
      {avatar && <div className="soui-card-meta-avatar">{avatar}</div>}
      {hasDetail && (
        <div className="soui-card-meta-detail">
          {title && <div className="soui-card-meta-title">{title}</div>}
          {description && <div className="soui-card-meta-description">{description}</div>}
        </div>
      )}
      {children}
    </div>
  );
};

// ==================== Card ====================

interface CardComponent extends React.FC<CardProps> {
  Grid: typeof CardGrid;
  Meta: typeof CardMeta;
}

const Card: CardComponent = ({
  title,
  extra,
  bordered = true,
  hoverable = false,
  size = 'default',
  type,
  cover,
  actions,
  loading = false,
  bodyStyle,
  headStyle,
  children,
  className,
  style,
  ...rest
}) => {
  const context = useContext(ConfigContext);
  const componentTheme = (context?.components?.Card || {}) as Record<string, any>;

  // 主题 CSS 变量
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (componentTheme.colorPrimary !== undefined) {
    cssVars['--soui-card-color-primary'] = componentTheme.colorPrimary;
  }
  if (componentTheme.colorBg !== undefined) {
    cssVars['--soui-card-color-bg'] = componentTheme.colorBg;
  }
  if (componentTheme.headerBg !== undefined) {
    cssVars['--soui-card-header-bg'] = componentTheme.headerBg;
  }
  if (componentTheme.borderColor !== undefined) {
    cssVars['--soui-card-border-color'] = componentTheme.borderColor;
  }
  if (componentTheme.borderRadius !== undefined) {
    cssVars['--soui-card-border-radius'] = `${componentTheme.borderRadius}px`;
  }
  if (componentTheme.headerFontSize !== undefined) {
    cssVars['--soui-card-header-font-size'] = `${componentTheme.headerFontSize}px`;
  }
  if (componentTheme.hoverShadow !== undefined) {
    cssVars['--soui-card-hover-shadow'] = componentTheme.hoverShadow;
  }

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  const cardClassName = classNames(
    'soui-card',
    {
      'soui-card-bordered': bordered,
      'soui-card-hoverable': hoverable,
      'soui-card-small': size === 'small',
      'soui-card-inner': type === 'inner',
      'soui-card-loading': loading,
      'soui-card-contain-actions': actions && actions.length > 0,
    },
    className,
  );

  const hasHead = title || extra;

  return (
    <div className={cardClassName} style={componentStyle} {...rest}>
      {hasHead && (
        <div className="soui-card-head" style={headStyle}>
          <div className="soui-card-head-wrapper">
            {title && <div className="soui-card-head-title">{title}</div>}
            {extra && <div className="soui-card-extra">{extra}</div>}
          </div>
        </div>
      )}
      {cover && <div className="soui-card-cover">{cover}</div>}
      <div className="soui-card-body" style={bodyStyle}>
        {loading ? (
          <Skeleton active title paragraph={{ rows: 3 }} />
        ) : (
          children
        )}
      </div>
      {actions && actions.length > 0 && (
        <ul className="soui-card-actions">
          {actions.map((action, index) => (
            <li
              key={index}
              className="soui-card-actions-item"
              style={{ width: `${100 / actions.length}%` }}
            >
              <span className="soui-card-actions-item-inner">{action}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

Card.Grid = CardGrid;
Card.Meta = CardMeta;

export default Card;
