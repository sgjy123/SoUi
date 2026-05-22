import React from 'react';
import classNames from 'classnames';
import { useTheme, useComponentTheme } from '../ConfigProvider';
import Icon from '../Icon';
import './style.less';

// ==================== Types ====================

/** 步骤状态 */
export type StepStatus = 'wait' | 'process' | 'finish' | 'error';

/** 步骤条方向 */
export type StepsDirection = 'horizontal' | 'vertical';

/** 步骤条尺寸 */
export type StepsSize = 'default' | 'small';

/** 标签位置 */
export type StepsLabelPlacement = 'horizontal' | 'vertical';

/** 单个步骤项属性 */
export interface StepItemProps {
  /** 标题 */
  title?: React.ReactNode;
  /** 描述内容 */
  description?: React.ReactNode;
  /** 图标 */
  icon?: React.ReactNode;
  /** 当前步骤的状态 */
  status?: StepStatus;
  /** 是否禁用点击 */
  disabled?: boolean;
  /** 子标题 */
  subTitle?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

/** Steps 组件属性 */
export interface StepsProps {
  /** 当前步骤，从 0 开始计数 */
  current?: number;
  /** 步骤条方向 */
  direction?: StepsDirection;
  /** 步骤条尺寸 */
  size?: StepsSize;
  /** 标签放置位置 */
  labelPlacement?: StepsLabelPlacement;
  /** 是否启用进度点状态 */
  progressDot?: boolean | ((dot: React.ReactNode, info: { index: number; status: StepStatus; title: React.ReactNode }) => React.ReactNode);
  /** 步骤变化回调 */
  onChange?: (current: number) => void;
  /** 步骤项列表 */
  items?: StepItemProps[];
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子节点（优先于 items） */
  children?: React.ReactNode;
}

// ==================== Helper Functions ====================

/**
 * 获取步骤状态对应的图标
 */
const getStatusIcon = (status: StepStatus, index: number, current: number): React.ReactNode => {
  if (status === 'finish') {
    return <Icon name="Check" size={14} />;
  }
  if (status === 'error') {
    return <Icon name="Close" size={14} />;
  }
  return index + 1;
};

// ==================== Step Item Component ====================

const StepItem: React.FC<StepItemProps & {
  index?: number;
  status?: StepStatus;
  direction?: StepsDirection;
  size?: StepsSize;
  labelPlacement?: StepsLabelPlacement;
  progressDot?: boolean | ((dot: React.ReactNode, info: { index: number; status: StepStatus; title: React.ReactNode }) => React.ReactNode);
}> = ({
  title,
  description,
  icon,
  subTitle,
  status = 'wait',
  disabled = false,
  index = 0,
  direction = 'horizontal',
  size = 'default',
  labelPlacement = 'horizontal',
  progressDot = false,
  className,
  style,
}) => {
  const globalTheme = useTheme();
  const stepsTheme = useComponentTheme('Steps');

  // 计算最终值
  const fontSizeValue = stepsTheme?.fontSize || globalTheme?.fontSize;
  const borderRadiusValue = stepsTheme?.borderRadius || globalTheme?.borderRadius;
  
  // 根据 size 属性计算图标大小
  const iconSizeValue = size === 'small' ? 24 : (stepsTheme?.iconSize || 32);

  // 应用主题样式
  const stepStyle: React.CSSProperties = {
    ...(fontSizeValue && {
      '--soui-steps-font-size': `${fontSizeValue}px`,
    }),
    ...(borderRadiusValue && {
      '--soui-steps-border-radius': `${borderRadiusValue}px`,
    }),
    ...style,
  };

  const stepClassName = classNames(
    'soui-steps-item',
    `soui-steps-item-${status}`,
    {
      'soui-steps-item-active': status === 'process',
      'soui-steps-item-finish': status === 'finish',
      'soui-steps-item-error': status === 'error',
      'soui-steps-item-wait': status === 'wait',
      'soui-steps-item-with-description': !!description,
      'soui-steps-item-disabled': disabled,
      'soui-steps-item-progress-dot': progressDot !== false,
      [`soui-steps-label-${labelPlacement}`]: true,
    },
    className
  );

  // 渲染图标或序号
  const renderIcon = () => {
    // 如果是进度点模式
    if (progressDot) {
      const dotContent = typeof progressDot === 'function' 
        ? progressDot(
            <span className="soui-steps-icon-dot" />, 
            { index, status, title }
          )
        : <span className="soui-steps-icon-dot" />;
      return <span className="soui-steps-icon soui-steps-icon-progress-dot">{dotContent}</span>;
    }

    if (icon) {
      return <span className="soui-steps-icon">{icon}</span>;
    }

    const iconContent = getStatusIcon(status, index, -1);
    const isNumber = typeof iconContent === 'number';

    return (
      <span
        className={classNames('soui-steps-icon', {
          'soui-steps-icon-number': isNumber,
        })}
        style={{
          width: `${iconSizeValue}px`,
          height: `${iconSizeValue}px`,
          lineHeight: `${iconSizeValue}px`,
          fontSize: isNumber ? `${fontSizeValue || 14}px` : undefined,
        }}
      >
        {iconContent}
      </span>
    );
  };

  return (
    <div className={stepClassName} style={stepStyle as any}>
      {/* 图标容器 */}
      <div className="soui-steps-item-icon-wrapper">
        {renderIcon()}
      </div>

      {/* 内容容器 */}
      <div className="soui-steps-item-content">
        {title && <div className="soui-steps-item-title">{title}</div>}
        {subTitle && <div className="soui-steps-item-subtitle">{subTitle}</div>}
        {description && (
          <div className="soui-steps-item-description">{description}</div>
        )}

        {/* 连接线（水平方向） */}
        {direction === 'horizontal' && (
          <div className="soui-steps-item-tail" />
        )}
      </div>

      {/* 连接线（垂直方向） */}
      {direction === 'vertical' && (
        <div className="soui-steps-item-tail" />
      )}
    </div>
  );
};

// ==================== Main Steps Component ====================

const Steps: React.FC<StepsProps> & {
  Step: typeof StepItem;
} = ({
  current = 0,
  direction = 'horizontal',
  size = 'default',
  labelPlacement = 'horizontal',
  progressDot = false,
  onChange,
  items,
  className,
  style,
  children,
}) => {
  const globalTheme = useTheme();
  const stepsTheme = useComponentTheme('Steps');

  // 应用主题样式
  const stepsStyle: React.CSSProperties = {
    ...(stepsTheme?.colorPrimary && {
      '--soui-steps-color-primary': stepsTheme.colorPrimary,
    }),
    ...(stepsTheme?.colorSuccess && {
      '--soui-steps-color-success': stepsTheme.colorSuccess,
    }),
    ...(stepsTheme?.colorError && {
      '--soui-steps-color-error': stepsTheme.colorError,
    }),
    ...(stepsTheme?.colorBorder && {
      '--soui-steps-color-border': stepsTheme.colorBorder,
    }),
    ...(stepsTheme?.colorText && {
      '--soui-steps-color-text': stepsTheme.colorText,
    }),
    ...(stepsTheme?.colorTextSecondary && {
      '--soui-steps-color-text-secondary': stepsTheme.colorTextSecondary,
    }),
    ...(globalTheme?.primaryColor && !stepsTheme?.colorPrimary && {
      '--soui-steps-color-primary': globalTheme.primaryColor,
    }),
    ...(globalTheme?.successColor && !stepsTheme?.colorSuccess && {
      '--soui-steps-color-success': globalTheme.successColor,
    }),
    ...(globalTheme?.errorColor && !stepsTheme?.colorError && {
      '--soui-steps-color-error': globalTheme.errorColor,
    }),
    ...style,
  } as any;

  const stepsClassName = classNames(
    'soui-steps',
    `soui-steps-${direction}`,
    `soui-steps-${size}`,
    `soui-steps-label-${labelPlacement}`,
    className
  );

  // 处理点击事件
  const handleStepClick = (index: number, status: StepStatus) => {
    if (onChange && status !== 'error') {
      onChange(index);
    }
  };

  // 如果提供了 children，直接渲染 children
  if (children) {
    const childrenArray = React.Children.toArray(children).filter(
      (child) => React.isValidElement(child)
    ) as React.ReactElement<StepItemProps>[];

    return (
      <div className={stepsClassName} style={stepsStyle}>
        <div className="soui-steps-items">
          {childrenArray.map((child, index) => {
            const status: StepStatus =
              index < current ? 'finish' : index === current ? 'process' : 'wait';

            return React.cloneElement(child, {
              ...child.props,
              index,
              status,
              direction,
              size,
              labelPlacement,
              progressDot,
              key: index,
            } as any);
          })}
        </div>
      </div>
    );
  }

  // 如果提供了 items，渲染 items
  if (items && items.length > 0) {
    return (
      <div className={stepsClassName} style={stepsStyle}>
        <div className="soui-steps-items">
          {items.map((item, index) => {
            const status: StepStatus =
              index < current ? 'finish' : index === current ? 'process' : 'wait';

            return (
              <div
                key={index}
                onClick={() => !item.disabled && handleStepClick(index, status)}
                style={{ cursor: onChange && !item.disabled ? 'pointer' : 'default' }}
              >
                <StepItem
                  {...item}
                  index={index}
                  status={status}
                  direction={direction}
                  size={size}
                  labelPlacement={labelPlacement}
                  progressDot={progressDot}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return null;
};

// 附加子组件
Steps.Step = StepItem;

export default Steps;
