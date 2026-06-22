import React, { useContext } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

// ==================== Types ====================

/** Skeleton 尺寸 */
export type SkeletonSize = 'small' | 'default' | 'large';

/** Skeleton 头像形状 */
export type SkeletonAvatarShape = 'circle' | 'square';

/** Skeleton 按钮形状 */
export type SkeletonButtonShape = 'default' | 'round' | 'circle' | 'square';

/** 标题配置 */
export interface SkeletonTitleProps {
  /** 标题占位图宽度 */
  width?: number | string;
}

/** 段落配置 */
export interface SkeletonParagraphProps {
  /** 段落占位图行数 */
  rows?: number;
  /** 段落占位图宽度，若为数组则为每行宽度，否则为最后一行宽度 */
  width?: number | string | Array<number | string>;
}

/** 头像配置 */
export interface SkeletonAvatarProps {
  /** 头像形状 */
  shape?: SkeletonAvatarShape;
  /** 头像大小 */
  size?: SkeletonSize | number;
}

/** Skeleton 主组件属性 */
export interface SkeletonProps {
  /** 是否展示动画效果 */
  active?: boolean;
  /** 为 true 时显示占位图，反之则展示子组件 */
  loading?: boolean;
  /** 是否显示头像占位图 */
  avatar?: boolean | SkeletonAvatarProps;
  /** 是否显示标题占位图 */
  title?: boolean | SkeletonTitleProps;
  /** 是否显示段落占位图 */
  paragraph?: boolean | SkeletonParagraphProps;
  /** 为 true 时段落和标题显示圆角 */
  round?: boolean;
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

/** 共享 active 属性 */
interface SkeletonElementProps {
  /** 是否展示动画效果 */
  active?: boolean;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

/** Skeleton.Button 属性 */
export interface SkeletonButtonProps extends SkeletonElementProps {
  /** 按钮大小 */
  size?: SkeletonSize;
  /** 按钮形状 */
  shape?: SkeletonButtonShape;
  /** 是否撑满父容器 */
  block?: boolean;
}

/** Skeleton.Input 属性 */
export interface SkeletonInputProps extends SkeletonElementProps {
  /** 输入框大小 */
  size?: SkeletonSize;
}

/** Skeleton.Image 属性 */
export interface SkeletonImageProps extends SkeletonElementProps {}

// ==================== Sub-components ====================

/** Skeleton.Avatar 头像占位 */
const SkeletonAvatar: React.FC<SkeletonAvatarProps & SkeletonElementProps> = ({
  shape = 'circle',
  size = 'default',
  active,
  className,
  style,
}) => {
  const context = useContext(ConfigContext);
  const skeletonTheme = context?.components?.Skeleton || {};

  const sizeMap: Record<SkeletonSize, number> = {
    small: 24,
    default: 32,
    large: 40,
  };

  const actualSize = typeof size === 'number' ? size : sizeMap[size];

  const avatarClassName = classNames(
    'soui-skeleton-avatar',
    `soui-skeleton-avatar-${shape}`,
    {
      'soui-skeleton-active': active,
    },
    className
  );

  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (skeletonTheme.borderRadius !== undefined) {
    cssVars['--soui-skeleton-border-radius'] = `${skeletonTheme.borderRadius}px`;
  }
  if (skeletonTheme.colorBg) {
    cssVars['--soui-skeleton-color-bg'] = skeletonTheme.colorBg;
  }

  return (
    <div
      className={avatarClassName}
      style={{
        width: actualSize,
        height: actualSize,
        borderRadius: shape === 'circle' ? '50%' : undefined,
        ...cssVars,
        ...style,
      }}
    />
  );
};

/** Skeleton.Button 按钮占位 */
const SkeletonButton: React.FC<SkeletonButtonProps> = ({
  size = 'default',
  shape = 'default',
  block = false,
  active,
  className,
  style,
}) => {
  const context = useContext(ConfigContext);
  const skeletonTheme = context?.components?.Skeleton || {};

  const sizeMap: Record<SkeletonSize, { width: number; height: number }> = {
    small: { width: 64, height: 24 },
    default: { width: 80, height: 32 },
    large: { width: 100, height: 40 },
  };

  const sizeConfig = sizeMap[size];

  const buttonClassName = classNames(
    'soui-skeleton-button',
    {
      'soui-skeleton-active': active,
      'soui-skeleton-button-block': block,
      [`soui-skeleton-button-${shape}`]: shape,
    },
    className
  );

  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (skeletonTheme.borderRadius !== undefined) {
    cssVars['--soui-skeleton-border-radius'] = `${skeletonTheme.borderRadius}px`;
  }
  if (skeletonTheme.colorBg) {
    cssVars['--soui-skeleton-color-bg'] = skeletonTheme.colorBg;
  }

  return (
    <div
      className={buttonClassName}
      style={{
        width: shape === 'circle' ? sizeConfig.height : sizeConfig.width,
        height: sizeConfig.height,
        borderRadius: shape === 'circle' ? '50%' : shape === 'round' ? sizeConfig.height / 2 : undefined,
        ...cssVars,
        ...style,
      }}
    />
  );
};

/** Skeleton.Input 输入框占位 */
const SkeletonInput: React.FC<SkeletonInputProps> = ({
  size = 'default',
  active,
  className,
  style,
}) => {
  const context = useContext(ConfigContext);
  const skeletonTheme = context?.components?.Skeleton || {};

  const sizeMap: Record<SkeletonSize, { width: number; height: number }> = {
    small: { width: 160, height: 24 },
    default: { width: 200, height: 32 },
    large: { width: 240, height: 40 },
  };

  const sizeConfig = sizeMap[size];

  const inputClassName = classNames(
    'soui-skeleton-input',
    {
      'soui-skeleton-active': active,
    },
    className
  );

  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (skeletonTheme.borderRadius !== undefined) {
    cssVars['--soui-skeleton-border-radius'] = `${skeletonTheme.borderRadius}px`;
  }
  if (skeletonTheme.colorBg) {
    cssVars['--soui-skeleton-color-bg'] = skeletonTheme.colorBg;
  }

  return (
    <div
      className={inputClassName}
      style={{
        width: sizeConfig.width,
        height: sizeConfig.height,
        ...cssVars,
        ...style,
      }}
    />
  );
};

/** Skeleton.Image 图片占位 */
const SkeletonImage: React.FC<SkeletonImageProps> = ({
  active,
  className,
  style,
}) => {
  const context = useContext(ConfigContext);
  const skeletonTheme = context?.components?.Skeleton || {};

  const imageClassName = classNames(
    'soui-skeleton-image',
    {
      'soui-skeleton-active': active,
    },
    className
  );

  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (skeletonTheme.borderRadius !== undefined) {
    cssVars['--soui-skeleton-border-radius'] = `${skeletonTheme.borderRadius}px`;
  }
  if (skeletonTheme.colorBg) {
    cssVars['--soui-skeleton-color-bg'] = skeletonTheme.colorBg;
  }

  return (
    <div className={imageClassName} style={{ ...cssVars, ...style }}>
      <svg
        className="soui-skeleton-image-icon"
        viewBox="0 0 1098 1024"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M365.714286 256a73.142857 73.142857 0 1 0 0-146.285714 73.142857 73.142857 0 0 0 0 146.285714zM950.857143 512l-146.285714 182.857143-256-292.571429L182.857143 768V146.285714h768v365.714286z" />
      </svg>
    </div>
  );
};

// ==================== Main Component ====================

const Skeleton: React.FC<SkeletonProps> & {
  Avatar: typeof SkeletonAvatar;
  Button: typeof SkeletonButton;
  Input: typeof SkeletonInput;
  Image: typeof SkeletonImage;
} = ({
  active = false,
  loading,
  avatar = false,
  title: titleProp = true,
  paragraph: paragraphProp = true,
  round = false,
  children,
  className,
  style,
}) => {
  const context = useContext(ConfigContext);
  const skeletonTheme = context?.components?.Skeleton || {};

  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (skeletonTheme.borderRadius !== undefined) {
    cssVars['--soui-skeleton-border-radius'] = `${skeletonTheme.borderRadius}px`;
    cssVars['--soui-skeleton-border-radius-lg'] = `${skeletonTheme.borderRadius}px`;
  }
  if (skeletonTheme.colorBg) {
    cssVars['--soui-skeleton-color-bg'] = skeletonTheme.colorBg;
  }
  if (skeletonTheme.colorHighlight) {
    cssVars['--soui-skeleton-color-highlight'] = skeletonTheme.colorHighlight;
  }

  // 如果有 children 且 loading 为 false，直接显示子组件
  if (loading !== undefined) {
    if (!loading && children) {
      return <>{children}</>;
    }
  }

  // 解析 title 配置
  const showTitle = !!titleProp;
  const titleConfig: SkeletonTitleProps = typeof titleProp === 'object' ? titleProp : {};
  const titleWidth = titleConfig.width !== undefined
    ? (typeof titleConfig.width === 'number' ? `${titleConfig.width}px` : titleConfig.width)
    : '38%';

  // 解析 paragraph 配置
  const showParagraph = !!paragraphProp;
  const paragraphConfig: SkeletonParagraphProps = typeof paragraphProp === 'object' ? paragraphProp : {};
  const paragraphRows = paragraphConfig.rows || 3;
  const paragraphWidths = paragraphConfig.width;

  // 解析 avatar 配置
  const showAvatar = !!avatar;
  const avatarConfig: SkeletonAvatarProps = typeof avatar === 'object' ? avatar : {};

  // 生成段落行
  const renderParagraphRows = () => {
    const rows: React.ReactNode[] = [];
    for (let i = 0; i < paragraphRows; i++) {
      let width: string | number = '100%';

      if (Array.isArray(paragraphWidths)) {
        if (i < paragraphWidths.length) {
          width = typeof paragraphWidths[i] === 'number' ? `${paragraphWidths[i]}px` : paragraphWidths[i];
        } else if (i === paragraphRows - 1) {
          width = '61%';
        }
      } else if (paragraphWidths !== undefined) {
        if (i === paragraphRows - 1) {
          width = typeof paragraphWidths === 'number' ? `${paragraphWidths}px` : paragraphWidths;
        }
      } else if (i === paragraphRows - 1) {
        width = '61%';
      }

      rows.push(
        <li
          key={i}
          className="soui-skeleton-paragraph-row"
          style={{ width: typeof width === 'number' ? `${width}px` : width }}
        />
      );
    }
    return rows;
  };

  const skeletonClassName = classNames(
    'soui-skeleton',
    {
      'soui-skeleton-active': active,
      'soui-skeleton-round': round,
      'soui-skeleton-with-avatar': showAvatar,
    },
    className
  );

  return (
    <div className={skeletonClassName} style={{ ...cssVars, ...style }}>
      {showAvatar && (
        <div className="soui-skeleton-header">
          <SkeletonAvatar
            shape={avatarConfig.shape || 'circle'}
            size={avatarConfig.size || 'default'}
            active={active}
          />
        </div>
      )}
      <div className="soui-skeleton-content">
        {showTitle && (
          <div className="soui-skeleton-title" style={{ width: titleWidth }} />
        )}
        {showParagraph && (
          <ul className="soui-skeleton-paragraph">
            {renderParagraphRows()}
          </ul>
        )}
      </div>
    </div>
  );
};

// 附加子组件
Skeleton.Avatar = SkeletonAvatar;
Skeleton.Button = SkeletonButton;
Skeleton.Input = SkeletonInput;
Skeleton.Image = SkeletonImage;

export default Skeleton;
