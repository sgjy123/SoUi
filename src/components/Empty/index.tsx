import React, { useContext } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

// ==================== Types ====================

export interface EmptyProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 自定义图片，支持 URL 字符串或 React 节点 */
  image?: React.ReactNode;
  /** 图片区域样式 */
  imageStyle?: React.CSSProperties;
  /** 自定义描述内容，传入 null 隐藏描述 */
  description?: React.ReactNode;
  /** 底部操作区内容（如按钮） */
  children?: React.ReactNode;
}

// ==================== SVG Illustrations ====================

/** 默认插图 - 现代风格 */
const DefaultEmptyImg: React.FC = () => (
    <svg width="200" height="160" viewBox="0 0 200 160" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient gradientUnits="objectBoundingBox" id="box-top" spreadMethod="pad" x1="-0.5" x2="0.5" y1="-0.5" y2="0.5">
          <stop offset="0.001198948" stop-color="#e9f0f1" />
          <stop offset="0.9279" stop-color="#c0d5d5" />
        </linearGradient>
        <linearGradient gradientUnits="objectBoundingBox" id="box-side" spreadMethod="pad" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0.001198948" stop-color="#ffffff" />
          <stop offset="0.9279" stop-color="#dee9e9" />
        </linearGradient>
      </defs>
      {/* 居中容器 */}
      <g transform="translate(-90, -35) scale(1)">
        {/* 盒子底部 */}
        <path
            d="M 120.70 86.10 L 187.50 92.70 L 187.50 177.20 L 120.70 161.00 Z"
            fill="url(#box-side)"
            fill-rule="nonzero"
            stroke="var(--soui-empty-border-color, #d9d9d9)"
            strokeWidth="1.5"
            strokeLinejoin="round"
        />
        {/* 盒子右侧面 */}
        <path
            d="M 187.50 92.70 L 247.80 83.10 L 247.80 158.80 L 187.50 177.20 Z"
            fill="url(#box-top)"
            fill-rule="nonzero"
            stroke="var(--soui-empty-border-color, #d9d9d9)"
            strokeWidth="1.5"
            strokeLinejoin="round"
        />
        {/* 盒子左侧面 */}
        <path
            d="M 120.70 86.10 L 177.30 73.70 L 177.30 92.60 Z"
            fill="var(--soui-empty-panel-bg, #ffffff)"
            fill-rule="nonzero"
            stroke="var(--soui-empty-border-color, #d9d9d9)"
            strokeWidth="1.5"
            strokeLinejoin="round"
        />
        {/* 盒子顶面 */}
        <path
            d="M 177.30 73.60 L 176.80 104.60 L 247.80 83.10 Z"
            fill="var(--soui-empty-panel-bg, #ffffff)"
            fill-rule="nonzero"
            stroke="var(--soui-empty-border-color, #d9d9d9)"
            strokeWidth="1.5"
            strokeLinejoin="round"
        />
        {/* 盒子前盖 */}
        <path
            d="M 120.70 86.10 L 104.70 113.20 L 172.10 126.10 L 187.50 92.70 Z"
            fill="var(--soui-empty-panel-bg, #ffffff)"
            fill-rule="nonzero"
            stroke="var(--soui-empty-border-color, #d9d9d9)"
            strokeWidth="1.5"
            strokeLinejoin="round"
        />
        {/* 盒子后盖 */}
        <path
            d="M 187.50 92.70 L 206.40 126.10 L 267.20 110.90 L 247.80 83.10 Z"
            fill="url(#box-side)"
            fill-rule="nonzero"
            stroke="var(--soui-empty-border-color, #d9d9d9)"
            strokeWidth="1.5"
            strokeLinejoin="round"
        />
        {/* 右上角装饰图标 */}
        <g transform="translate(230, 60)">
          <rect x="0" y="0" width="24" height="28" rx="2" fill="var(--soui-empty-icon-bg, rgba(22, 119, 255, 0.08))" stroke="var(--soui-empty-icon-color, #1677ff)" strokeWidth="1.5" />
          <line x1="6" y1="8" x2="18" y2="8" stroke="var(--soui-empty-icon-color, #1677ff)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="6" y1="14" x2="14" y2="14" stroke="var(--soui-empty-icon-color, #1677ff)" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="6" y1="20" x2="18" y2="20" stroke="var(--soui-empty-icon-color, #1677ff)" strokeWidth="1.5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
);

/** 简约插图 */
const SimpleEmptyImg: React.FC = () => (
    <svg width="64" height="120" viewBox="0 0 64 12" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
      <g fill="none" fillRule="evenodd" transform="translate(0, 0)">
        {/* 底部阴影 */}
        <ellipse
            cx="32" cy="37" rx="24" ry="3"
            fill="var(--soui-empty-shadow-color, rgba(0, 0, 0, 0.06))"
        />
        {/* 盒子轮廓 */}
        <path
            d="M10 30h44V16c0-2.2-1.8-4-4-4H14c-2.2 0-4 1.8-4 4v14z"
            fill="var(--soui-empty-content-bg, #fafafa)"
            stroke="var(--soui-empty-border-color, #d9d9d9)"
            strokeWidth="1.5"
            strokeLinejoin="round"
        />
        {/* 盒子顶部 */}
        <path
            d="M6 16h52v4c0 2.2-1.8 4-4 4H10c-2.2 0-4-1.8-4-4v-4z"
            fill="var(--soui-empty-content-bg, #fafafa)"
            stroke="var(--soui-empty-border-color, #d9d9d9)"
            strokeWidth="1.5"
            strokeLinejoin="round"
        />
        {/* 内部线条 */}
        <line x1="18" y1="22" x2="46" y2="22" stroke="var(--soui-empty-detail-color, #e8e8e8)" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="18" y1="27" x2="36" y2="27" stroke="var(--soui-empty-detail-color, #e8e8e8)" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    </svg>
);

// ==================== Preset Images ====================

const PRESENTED_IMAGE_DEFAULT = <DefaultEmptyImg />;
const PRESENTED_IMAGE_SIMPLE = <SimpleEmptyImg />;

// ==================== Empty Component ====================

const EmptyInner: React.FC<EmptyProps> = ({
  image,
  imageStyle,
  description,
  children,
  className,
  style,
  ...rest
}) => {
  const context = useContext(ConfigContext);
  const componentTheme = (context?.components?.Empty || {}) as Record<string, any>;

  // CSS variable injection from theme
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (componentTheme.fontSize !== undefined) {
    cssVars['--soui-empty-font-size'] = `${componentTheme.fontSize}px`;
  }
  if (componentTheme.descriptionColor) {
    cssVars['--soui-empty-description-color'] = componentTheme.descriptionColor;
  }
  if (componentTheme.imageHeight !== undefined) {
    cssVars['--soui-empty-image-height'] = `${componentTheme.imageHeight}px`;
  }
  if (componentTheme.iconColor) {
    cssVars['--soui-empty-icon-color'] = componentTheme.iconColor;
  }
  if (componentTheme.iconBg) {
    cssVars['--soui-empty-icon-bg'] = componentTheme.iconBg;
  }
  if (componentTheme.borderColor) {
    cssVars['--soui-empty-border-color'] = componentTheme.borderColor;
  }
  if (componentTheme.panelBg) {
    cssVars['--soui-empty-panel-bg'] = componentTheme.panelBg;
  }
  if (componentTheme.detailColor) {
    cssVars['--soui-empty-detail-color'] = componentTheme.detailColor;
  }
  if (componentTheme.shadowColor) {
    cssVars['--soui-empty-shadow-color'] = componentTheme.shadowColor;
  }

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  // Determine image node
  const isSimple = image === PRESENTED_IMAGE_SIMPLE;
  let imageNode: React.ReactNode;

  if (image === undefined) {
    imageNode = PRESENTED_IMAGE_DEFAULT;
  } else if (typeof image === 'string') {
    imageNode = <img src={image} alt={typeof description === 'string' ? description : 'empty'} draggable={false} />;
  } else {
    imageNode = image;
  }

  // Determine description
  const mergedDescription = description !== undefined ? description : '暂无数据';

  const emptyCls = classNames(
    'soui-empty',
    {
      'soui-empty-simple': isSimple,
    },
    className,
  );

  return (
    <div className={emptyCls} style={componentStyle} {...rest}>
      <div className="soui-empty-image" style={imageStyle}>
        {imageNode}
      </div>

      {mergedDescription && (
        <div className="soui-empty-description">
          {mergedDescription}
        </div>
      )}

      {children && (
        <div className="soui-empty-footer">
          {children}
        </div>
      )}
    </div>
  );
};

// ==================== Compound Export ====================

type EmptyComponent = typeof EmptyInner & {
  PRESENTED_IMAGE_DEFAULT: React.ReactNode;
  PRESENTED_IMAGE_SIMPLE: React.ReactNode;
};

const Empty = EmptyInner as EmptyComponent;
Empty.PRESENTED_IMAGE_DEFAULT = PRESENTED_IMAGE_DEFAULT;
Empty.PRESENTED_IMAGE_SIMPLE = PRESENTED_IMAGE_SIMPLE;

export default Empty;
