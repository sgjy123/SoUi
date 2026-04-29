import React, { useRef, useEffect, MouseEvent, useState } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
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

  // 渲染图标
  const renderIcon = () => {
    if (isLoading) {
      return <Icon name="Loading" className="soui-button-loading-icon" size={16} theme="outline" />;
    }
    if (typeof icon === 'string') {
      return <span className="soui-button-icon"><Icon name={icon} size={16} theme="outline" /></span>;
    }
    if (icon) {
      return <span className="soui-button-icon">{icon}</span>;
    }
    return null;
  };

  return (
    <button
      ref={buttonRef}
      className={buttonClassName}
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
