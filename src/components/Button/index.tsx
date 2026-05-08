import React, { useRef, useEffect, MouseEvent, useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import { useComponentTheme, useTheme } from '../ConfigProvider';
import './style.less';

export type ButtonType = 'default' | 'primary' | 'dashed' | 'text' | 'link';
export type ButtonSize = 'large' | 'middle' | 'small';
export type ButtonShape = 'default' | 'circle' | 'round';
export type ButtonHTMLType = 'button' | 'submit' | 'reset';

export interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** 按钮类型 */
  type?: ButtonType;
  /** 按钮尺寸 */
  size?: ButtonSize;
  /** 按钮形状 */
  shape?: ButtonShape;
  /** 是否禁用 */
  disabled?: boolean;
  /** 加载状态 */
  loading?: boolean | { delay?: number };
  /** 图标 */
  icon?: string | React.ReactNode;
  /** 图标位置 */
  iconPosition?: 'start' | 'end';
  /** 幽灵按钮 */
  ghost?: boolean;
  /** 危险按钮 */
  danger?: boolean;
  /** 块级按钮 */
  block?: boolean;
  /** 波纹效果 */
  rippleEffect?: boolean;
  /** HTML 类型 */
  htmlType?: ButtonHTMLType;
  /** 点击回调 */
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

// ButtonGroup 组件
interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  vertical?: boolean;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  className,
  vertical = false,
}) => {
  const groupClassName = classNames(
    'soui-button-group',
    {
      'soui-button-group-vertical': vertical,
    },
    className
  );

  return (
    <div className={groupClassName} role="group">
      {children}
    </div>
  );
};

const Button: React.FC<ButtonProps> & {
  Group: typeof ButtonGroup;
} = ({
  children,
  type = 'default',
  size = 'middle',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'start',
  className,
  ghost = false,
  danger = false,
  block = false,
  shape = 'default',
  rippleEffect = true,
  htmlType = 'button',
  onClick,
  ...props
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [loadingState, setLoadingState] = useState(false);

  // 获取组件级主题配置
  const buttonTheme = useComponentTheme('Button');
  // 获取全局主题配置
  const globalTheme = useTheme();

  // 确定当前尺寸
  const currentSize = size || 'middle';

  // 应用组件级主题到样式（优先使用组件级配置，否则使用全局配置）
  const borderRadiusValue = buttonTheme?.borderRadius || globalTheme?.borderRadius;
  const fontSizeValue = buttonTheme?.fontSize || globalTheme?.fontSize;
  const controlHeightValue = buttonTheme?.controlHeight;
  
  const buttonStyle: React.CSSProperties = {
    // 颜色配置（组件级优先，否则使用全局主题）
    ...(buttonTheme?.colorPrimary ? {
      '--soui-button-color-primary': buttonTheme.colorPrimary,
    } : globalTheme?.primaryColor ? {
      '--soui-button-color-primary': globalTheme.primaryColor,
    } : {}),
    ...(buttonTheme?.colorPrimaryHover ? {
      '--soui-button-color-primary-hover': buttonTheme.colorPrimaryHover,
    } : globalTheme?.primaryHoverColor ? {
      '--soui-button-color-primary-hover': globalTheme.primaryHoverColor,
    } : {}),
    ...(buttonTheme?.colorPrimaryActive ? {
      '--soui-button-color-primary-active': buttonTheme.colorPrimaryActive,
    } : globalTheme?.primaryActiveColor ? {
      '--soui-button-color-primary-active': globalTheme.primaryActiveColor,
    } : {}),
    // Danger 按钮颜色配置
    ...(globalTheme?.errorColor && {
      '--soui-error-color': globalTheme.errorColor,
    }),
    // 圆角配置
    ...(borderRadiusValue && {
      '--soui-button-border-radius': `${borderRadiusValue}px`,
    }),
    // 根据当前按钮尺寸设置对应的 CSS 变量
    ...(controlHeightValue && {
      [`--soui-button-control-height${currentSize === 'middle' ? '' : `-${currentSize}`}`]: `${controlHeightValue}px`,
    }),
    // 根据当前按钮尺寸设置对应的字体大小
    ...(fontSizeValue && {
      [`--soui-button-font-size${currentSize === 'middle' ? '-middle' : currentSize === 'small' ? '-sm' : '-large'}`]: `${fontSizeValue}px`,
    }),
  } as any;

  // 计算 hover 和 active 颜色（如果没有手动配置）
  const getHoverColor = (baseColor: string): string => {
    // 简单的颜色变亮逻辑
    return baseColor.replace(/ff$/, 'cc');
  };

  const getActiveColor = (baseColor: string): string => {
    // 简单的颜色变暗逻辑
    return baseColor.replace(/ff$/, '99');
  };

  // 如果设置了组件级主色，且没有手动配置 hover/active 颜色，则自动计算
  // 注意：全局主题的颜色已经在上面设置了，这里只处理组件级覆盖的情况
  if (buttonTheme?.colorPrimary) {
    const styleAny = buttonStyle as any;
    if (!buttonTheme.colorPrimaryHover && !styleAny['--soui-button-color-primary-hover']) {
      styleAny['--soui-button-color-primary-hover'] = getHoverColor(buttonTheme.colorPrimary);
    }
    if (!buttonTheme.colorPrimaryActive && !styleAny['--soui-button-color-primary-active']) {
      styleAny['--soui-button-color-primary-active'] = getActiveColor(buttonTheme.colorPrimary);
    }
  } 

  // 处理加载延迟
  useEffect(() => {
    if (typeof loading === 'object' && loading.delay) {
      const timer = setTimeout(() => {
        setLoadingState(true);
      }, loading.delay);
      return () => clearTimeout(timer);
    } else {
      setLoadingState(!!loading);
    }
  }, [loading]);

  const isLoading = loadingState;

  // 创建波纹效果
  const createRipple = (e: MouseEvent<HTMLButtonElement>) => {
    if (!rippleEffect || disabled || isLoading || !buttonRef.current) return;

    const button = buttonRef.current;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.className = 'soui-button-ripple';
    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  // 处理点击事件
  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (disabled || isLoading) return;

    createRipple(e);
    onClick?.(e);
  };

  // 构建按钮类名
  const buttonClassName = classNames(
    'soui-button',
    `soui-button-${type}`,
    `soui-button-${size}`,
    `soui-button-shape-${shape}`,
    {
      'soui-button-disabled': disabled,
      'soui-button-loading': isLoading,
      'soui-button-ghost': ghost,
      'soui-button-danger': danger,
      'soui-button-block': block,
      'soui-button-icon-only': (icon || isLoading) && !children,
    },
    className
  );

  // 判断是否需要白色图标
  const needsWhiteIcon = type === 'primary' || (type === 'default' && danger) || (ghost && !danger);

  // 渲染图标
  const renderIcon = () => {
    if (isLoading) {
      // loading图标颜色根据按钮类型决定
      const loadingIconFill = needsWhiteIcon ? '#fff' : undefined;
      return <Icon name="Loading" className="soui-button-loading-icon" size={16} theme="outline" fill={loadingIconFill} />;
    }
    if (typeof icon === 'string') {
      // 对于 primary、danger 类型的按钮，图标颜色应该是白色
      const iconFill = needsWhiteIcon ? '#fff' : undefined;
      return <span className="soui-button-icon"><Icon name={icon} size={16} theme="outline" fill={iconFill} /></span>;
    }
    if (icon) {
      // 如果是 ReactNode，检查是否是 Icon 组件并自动设置颜色
      if (React.isValidElement(icon) && (icon.type as any).name === 'Icon') {
        return (
          <span className="soui-button-icon">
            {React.cloneElement(icon as any, {
              fill: (icon.props as any).fill || (needsWhiteIcon ? '#fff' : undefined),
            })}
          </span>
        );
      }
      return <span className="soui-button-icon">{icon}</span>;
    }
    return null;
  };

  return (
    <button
      ref={buttonRef}
      className={buttonClassName}
      style={buttonStyle}
      disabled={disabled || isLoading}
      type={htmlType as ButtonHTMLType}
      onClick={handleClick}
      aria-disabled={disabled || isLoading}
      aria-busy={isLoading}
      role="button"
      tabIndex={disabled || isLoading ? -1 : 0}
      {...props}
    >
      <span className="soui-button-inner">
        {iconPosition === 'start' && renderIcon()}
        {children && <span className="soui-button-content">{children}</span>}
        {iconPosition === 'end' && renderIcon()}
      </span>
    </button>
  );
};

Button.Group = ButtonGroup;

export default Button;
