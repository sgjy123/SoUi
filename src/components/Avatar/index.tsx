import React, {
  useState,
  useRef,
  useLayoutEffect,
  useContext,
  createContext,
} from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import './style.less';

// ==================== Types ====================

export type AvatarShape = 'circle' | 'square';
export type AvatarSize = 'large' | 'middle' | 'small' | number;

export interface AvatarProps
  extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'onError'> {
  /** 头像形状 */
  shape?: AvatarShape;
  /** 头像尺寸，可为预设值或像素数值 */
  size?: AvatarSize;
  /** 图片头像地址 */
  src?: string;
  /** 图片 srcSet */
  srcSet?: string;
  /** 图片 alt */
  alt?: string;
  /** 图标头像 */
  icon?: React.ReactNode;
  /** 文本与边框的左右间距 */
  gap?: number;
  /** 图片加载失败回调，返回 false 可阻止默认回退 */
  onError?: () => boolean | void;
  /** 文本内容 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

export interface AvatarGroupProps {
  /** 形状（统一作用于组内头像） */
  shape?: AvatarShape;
  /** 尺寸（统一作用于组内头像） */
  size?: AvatarSize;
  /** 最多展示的头像数量，超出以 +N 收起 */
  maxCount?: number;
  /** +N 收起头像的样式 */
  maxStyle?: React.CSSProperties;
  /** +N 收起头像弹出层位置 */
  maxPopoverPlacement?: 'top' | 'bottom';
  /** 子元素 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ==================== Context ====================

interface AvatarGroupContextValue {
  shape?: AvatarShape;
  size?: AvatarSize;
}

const AvatarGroupContext = createContext<AvatarGroupContextValue | null>(null);

// ==================== Utils ====================

const SIZE_MAP: Record<string, number> = {
  large: 40,
  middle: 32,
  small: 24,
};

const resolveSize = (size: AvatarSize): number =>
  typeof size === 'number' ? size : SIZE_MAP[size] ?? SIZE_MAP.middle;

// ==================== Avatar ====================

const Avatar: React.FC<AvatarProps> = ({
  shape,
  size,
  src,
  srcSet,
  alt,
  icon,
  gap = 4,
  onError,
  children,
  className,
  style,
  ...rest
}) => {
  const groupCtx = useContext(AvatarGroupContext);
  const mergedShape = shape ?? groupCtx?.shape ?? 'circle';
  const mergedSize = size ?? groupCtx?.size ?? 'middle';
  const px = resolveSize(mergedSize);

  const [imgError, setImgError] = useState(false);
  const [scale, setScale] = useState(1);

  const textRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLSpanElement>(null);

  // 图片 src 变化时重置错误状态
  useLayoutEffect(() => {
    setImgError(false);
  }, [src]);

  // 文本自适应缩放
  useLayoutEffect(() => {
    const textEl = textRef.current;
    const rootEl = rootRef.current;
    if (!textEl || !rootEl) return;
    const textWidth = textEl.offsetWidth;
    const availWidth = rootEl.offsetWidth - gap * 2;
    if (textWidth > availWidth && availWidth > 0) {
      setScale(availWidth / textWidth);
    } else {
      setScale(1);
    }
  }, [children, gap, px]);

  const handleImgError = () => {
    const ret = onError?.();
    if (ret !== false) setImgError(true);
  };

  const sizeStyle: React.CSSProperties = {
    width: px,
    height: px,
    lineHeight: `${px}px`,
    fontSize: icon ? px / 2 : 14,
  };

  const cls = classNames(
    'soui-avatar',
    `soui-avatar-${mergedShape}`,
    {
      'soui-avatar-image': src && !imgError,
      [`soui-avatar-${mergedSize}`]: typeof mergedSize === 'string',
    },
    className
  );

  // 内容优先级：图片 > 图标 > 文本
  let content: React.ReactNode;
  if (src && !imgError) {
    content = (
      <img
        className="soui-avatar-img"
        src={src}
        srcSet={srcSet}
        alt={alt}
        onError={handleImgError}
      />
    );
  } else if (icon) {
    content = <span className="soui-avatar-icon">{icon}</span>;
  } else if (children !== undefined && children !== null) {
    content = (
      <span
        ref={textRef}
        className="soui-avatar-string"
        style={{ transform: `translate(-50%, -50%) scale(${scale})` }}
      >
        {children}
      </span>
    );
  } else {
    content = (
      <span className="soui-avatar-icon">
        <Icon name="User" />
      </span>
    );
  }

  return (
    <span ref={rootRef} className={cls} style={{ ...sizeStyle, ...style }} {...rest}>
      {content}
    </span>
  );
};

// ==================== Avatar.Group ====================

const AvatarGroup: React.FC<AvatarGroupProps> = ({
  shape = 'circle',
  size = 'middle',
  maxCount,
  maxStyle,
  maxPopoverPlacement = 'top',
  children,
  className,
  style,
}) => {
  const items = React.Children.toArray(children);

  let visible = items;
  let hiddenCount = 0;
  if (typeof maxCount === 'number' && maxCount >= 0 && items.length > maxCount) {
    visible = items.slice(0, maxCount);
    hiddenCount = items.length - maxCount;
  }

  const px = resolveSize(size);

  const groupCls = classNames('soui-avatar-group', className);

  return (
    <AvatarGroupContext.Provider value={{ shape, size }}>
      <div className={groupCls} style={style}>
        {visible}
        {hiddenCount > 0 && (
          <span
            className={classNames('soui-avatar', `soui-avatar-${shape}`, 'soui-avatar-group-rest')}
            title={`${hiddenCount} 个`}
            data-placement={maxPopoverPlacement}
            style={{
              width: px,
              height: px,
              lineHeight: `${px}px`,
              fontSize: 14,
              ...maxStyle,
            }}
          >
            <span className="soui-avatar-string" style={{ transform: 'translate(-50%, -50%)' }}>
              +{hiddenCount}
            </span>
          </span>
        )}
      </div>
    </AvatarGroupContext.Provider>
  );
};

// ==================== Compose ====================

type AvatarComponent = typeof Avatar & {
  Group: typeof AvatarGroup;
};

const ComposedAvatar = Avatar as AvatarComponent;
ComposedAvatar.Group = AvatarGroup;

export default ComposedAvatar;
