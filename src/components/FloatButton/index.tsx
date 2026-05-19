import React, { useState, useRef, useEffect } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import Tooltip from '../Tooltip';
import { useComponentTheme, useTheme } from '../ConfigProvider';
import './style.less';

export type FloatButtonType = 'default' | 'primary';
export type FloatButtonShape = 'circle' | 'square';
export type FloatButtonSize = 'large' | 'middle' | 'small';

export interface FloatButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> {
  /** 按钮类型 */
  type?: FloatButtonType;
  /** 按钮形状 */
  shape?: FloatButtonShape;
  /** 按钮尺寸 */
  size?: FloatButtonSize;
  /** 是否禁用 */
  disabled?: boolean;
  /** 图标 */
  icon?: string | React.ReactNode;
  /** 危险按钮 */
  danger?: boolean;
  /** Tooltip 文本 */
  tooltip?: string;
}

// FloatButtonGroup 组件
export type FloatButtonTriggerType = 'click' | 'hover';

interface FloatButtonGroupProps {
  children: React.ReactNode;
  className?: string;
  /** 垂直排列 */
  vertical?: boolean;
  /** 是否默认展开 */
  defaultOpen?: boolean;
  /** 受控展开状态 */
  open?: boolean;
  /** 展开/收起变化回调 */
  onOpenChange?: (open: boolean) => void;
  /** 触发方式 */
  trigger?: FloatButtonTriggerType;
  /** 主按钮图标（展开时显示） */
  icon?: string | React.ReactNode;
  /** 主按钮 Tooltip */
  tooltip?: string;
}

const FloatButtonGroup: React.FC<FloatButtonGroupProps> = ({
  children,
  className,
  vertical = false,
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
  trigger = 'click',
  icon = 'Plus',
  tooltip,
}) => {
  // 内部状态管理
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const groupRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout>();

  // 确定当前展开状态（受控或非受控）
  const isOpen = controlledOpen !== undefined ? controlledOpen : internalOpen;

  // 处理展开/收起切换
  const handleToggle = () => {
    const newOpen = !isOpen;
    if (controlledOpen === undefined) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  // 处理鼠标悬停（trigger='hover'）
  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
      if (!isOpen) {
        handleToggle();
      }
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      hoverTimerRef.current = setTimeout(() => {
        if (isOpen) {
          handleToggle();
        }
      }, 100); // 延迟关闭，避免快速移动时闪烁
    }
  };

  // 清理定时器
  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  // 渲染主按钮图标
  const renderMainIcon = () => {
    if (typeof icon === 'string') {
      return <span className="soui-float-button-icon"><Icon name={icon} size={16} theme="outline" fill="#fff" /></span>;
    }
    if (icon) {
      if (React.isValidElement(icon) && (icon.type as any).name === 'Icon') {
        return (
          <span className="soui-float-button-icon">
            {React.cloneElement(icon as any, {
              fill: (icon.props as any).fill || '#fff',
            })}
          </span>
        );
      }
      return <span className="soui-float-button-icon">{icon}</span>;
    }
    return null;
  };

  const groupClassName = classNames(
    'soui-float-button-group',
    {
      'soui-float-button-group-vertical': vertical,
      'soui-float-button-group-open': isOpen,
    },
    className
  );

  return (
    <div
      ref={groupRef}
      className={groupClassName}
      role="group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 子按钮列表 - 直接渲染 children，每个 child 都是 FloatButton 组件 */}
      <div className="soui-float-button-group-list">
        {children}
      </div>
      
      {/* 主触发按钮 */}
      {tooltip ? (
        <Tooltip title={tooltip} placement="left">
          <button
            className={classNames('soui-float-button', 'soui-float-button-primary', 'soui-float-button-middle', 'soui-float-button-shape-circle', 'soui-float-button-trigger')}
            onClick={trigger === 'click' ? handleToggle : undefined}
            aria-expanded={isOpen}
            aria-label={isOpen ? '收起' : '展开'}
          >
            <span className="soui-float-button-inner">
              {renderMainIcon()}
            </span>
          </button>
        </Tooltip>
      ) : (
        <button
          className={classNames('soui-float-button', 'soui-float-button-primary', 'soui-float-button-middle', 'soui-float-button-shape-circle', 'soui-float-button-trigger')}
          onClick={trigger === 'click' ? handleToggle : undefined}
          aria-expanded={isOpen}
          aria-label={isOpen ? '收起' : '展开'}
        >
          <span className="soui-float-button-inner">
            {renderMainIcon()}
          </span>
        </button>
      )}
    </div>
  );
};

const FloatButton: React.FC<FloatButtonProps> & {
  Group: typeof FloatButtonGroup;
} = ({
  children,
  type = 'default',
  shape = 'circle',
  size = 'middle',
  disabled = false,
  icon,
  className,
  danger = false,
  tooltip,
  onClick,
  ...props
}) => {
  // 获取组件级主题配置
  const floatButtonTheme = useComponentTheme('FloatButton');
  // 获取全局主题配置
  const globalTheme = useTheme();

  // 应用组件级主题到样式（优先使用组件级配置，否则使用全局配置）
  const borderRadiusValue = floatButtonTheme?.borderRadius || globalTheme?.borderRadius;
  const fontSizeValue = floatButtonTheme?.fontSize || globalTheme?.fontSize;
  
  const buttonStyle: React.CSSProperties = {
    // 颜色配置（组件级优先，否则使用全局主题）
    ...(floatButtonTheme?.colorPrimary ? {
      '--soui-float-button-color-primary': floatButtonTheme.colorPrimary,
    } : globalTheme?.primaryColor ? {
      '--soui-float-button-color-primary': globalTheme.primaryColor,
    } : {}),
    ...(floatButtonTheme?.colorPrimaryHover ? {
      '--soui-float-button-color-primary-hover': floatButtonTheme.colorPrimaryHover,
    } : globalTheme?.primaryHoverColor ? {
      '--soui-float-button-color-primary-hover': globalTheme.primaryHoverColor,
    } : {}),
    ...(floatButtonTheme?.colorPrimaryActive ? {
      '--soui-float-button-color-primary-active': floatButtonTheme.colorPrimaryActive,
    } : globalTheme?.primaryActiveColor ? {
      '--soui-float-button-color-primary-active': globalTheme.primaryActiveColor,
    } : {}),
    // Danger 按钮颜色配置
    ...(globalTheme?.errorColor && {
      '--soui-error-color': globalTheme.errorColor,
    }),
    // 圆角配置
    ...(borderRadiusValue && {
      '--soui-float-button-border-radius': `${borderRadiusValue}px`,
    }),
    // 字体大小配置
    ...(fontSizeValue && {
      '--soui-float-button-font-size': `${fontSizeValue}px`,
    }),
  } as any;

  // 构建按钮类名
  const buttonClassName = classNames(
    'soui-float-button',
    `soui-float-button-${type}`,
    `soui-float-button-${size}`,
    `soui-float-button-shape-${shape}`,
    {
      'soui-float-button-disabled': disabled,
      'soui-float-button-danger': danger,
      'soui-float-button-icon-only': icon && !children,
    },
    className
  );

  // 判断是否需要白色图标
  const needsWhiteIcon = type === 'primary' || (type === 'default' && danger);

  // 渲染图标
  const renderIcon = () => {
    if (typeof icon === 'string') {
      // 对于 primary、danger 类型的按钮，图标颜色应该是白色
      const iconFill = needsWhiteIcon ? '#fff' : undefined;
      return <span className="soui-float-button-icon"><Icon name={icon} size={16} theme="outline" fill={iconFill} /></span>;
    }
    if (icon) {
      // 如果是 ReactNode，检查是否是 Icon 组件并自动设置颜色
      if (React.isValidElement(icon) && (icon.type as any).name === 'Icon') {
        return (
          <span className="soui-float-button-icon">
            {React.cloneElement(icon as any, {
              fill: (icon.props as any).fill || (needsWhiteIcon ? '#fff' : undefined),
            })}
          </span>
        );
      }
      return <span className="soui-float-button-icon">{icon}</span>;
    }
    return null;
  };

  // 处理点击事件
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onClick?.(e);
  };

  // 包装 Tooltip（如果有）
  const renderButton = () => (
    <button
      className={buttonClassName}
      style={buttonStyle}
      disabled={disabled}
      onClick={handleClick}
      aria-disabled={disabled}
      role="button"
      tabIndex={disabled ? -1 : 0}
      {...props}
    >
      <span className="soui-float-button-inner">
        {renderIcon()}
        {children && <span className="soui-float-button-content">{children}</span>}
      </span>
    </button>
  );

  // 如果有 tooltip，使用 Tooltip 组件包裹
  if (tooltip) {
    return (
      <Tooltip title={tooltip} placement="left">
        {renderButton()}
      </Tooltip>
    );
  }

  return renderButton();
};

FloatButton.Group = FloatButtonGroup;

export default FloatButton;
