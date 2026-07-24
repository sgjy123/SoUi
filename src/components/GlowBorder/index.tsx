import React, { useRef, useState, useEffect, useContext } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

// ==================== Types ====================

export interface GlowBorderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 内容 */
  children?: React.ReactNode;
  /** 流光渐变颜色数组 */
  colors?: string[];
  /** 边框宽度（像素） */
  borderWidth?: number;
  /** 圆角（像素） */
  radius?: number;
  /** 旋转一圈耗时（秒），越小越快 */
  duration?: number;
  /** 是否反向旋转 */
  reverse?: boolean;
  /** 是否暂停动画 */
  paused?: boolean;
  /** 外发光模糊半径（像素），0 为不发光 */
  glow?: number;
  /** 内容区背景色 */
  background?: string;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

// ==================== Utils ====================

/** 由颜色数组生成旋转 conic-gradient（形成流光段） */
const buildGradient = (colors: string[]): string =>
  `conic-gradient(from 0deg, transparent 0%, ${colors.join(', ')}, transparent 100%)`;

// ==================== Component ====================

const GlowBorder: React.FC<GlowBorderProps> = ({
  children,
  colors,
  borderWidth = 2,
  radius,
  duration = 3,
  reverse = false,
  paused = false,
  glow = 0,
  background,
  className,
  style,
  ...rest
}) => {
  // 组件级主题配置作为默认值兜底
  const context = useContext(ConfigContext);
  const theme = (context?.components?.GlowBorder || {}) as Record<string, any>;
  const mergedColors =
    colors ?? [
      theme.colorPrimary || context?.theme?.primaryColor || '#1677ff',
      theme.colorSecondary || '#36cfc9',
    ];
  const mergedRadius = radius ?? theme.borderRadius ?? 8;
  const mergedBackground = background ?? theme.background ?? '#fff';

  const rootRef = useRef<HTMLDivElement>(null);
  // 旋转光层尺寸：取容器对角线，保证任意宽高比旋转时都能完全覆盖
  const [lightSize, setLightSize] = useState(0);

  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const measure = () => {
      const { offsetWidth, offsetHeight } = node;
      const diagonal = Math.ceil(
        Math.sqrt(offsetWidth * offsetWidth + offsetHeight * offsetHeight)
      );
      setLightSize((prev) => (prev === diagonal ? prev : diagonal));
    };
    measure();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  const gradient = buildGradient(mergedColors);

  const lightStyle: React.CSSProperties = {
    width: lightSize,
    height: lightSize,
    marginTop: -lightSize / 2,
    marginLeft: -lightSize / 2,
    background: gradient,
    animation: `soui-glow-border-spin ${duration}s linear infinite${reverse ? ' reverse' : ''}`,
    animationPlayState: paused ? 'paused' : 'running',
  };

  const rootStyle: React.CSSProperties & Record<string, any> = {
    padding: borderWidth,
    borderRadius: mergedRadius,
    ...style,
  };

  const innerStyle: React.CSSProperties = {
    background: mergedBackground,
    borderRadius: Math.max(mergedRadius - borderWidth, 0),
  };

  const rootCls = classNames('soui-glow-border', className);

  return (
    <div ref={rootRef} className={rootCls} style={rootStyle} {...rest}>
      {glow > 0 && (
        <div
          className="soui-glow-border-glow"
          style={{ ...lightStyle, filter: `blur(${glow}px)` }}
          aria-hidden
        />
      )}
      <div className="soui-glow-border-light" style={lightStyle} aria-hidden />
      <div className="soui-glow-border-inner" style={innerStyle}>
        {children}
      </div>
    </div>
  );
};

GlowBorder.displayName = 'GlowBorder';

export default GlowBorder;
