import React from 'react';
import classNames from 'classnames';
import { useComponentTheme, useTheme } from '../ConfigProvider';
import './style.less';

// ==================== Types ====================

/** 分割线方向 */
export type DividerType = 'horizontal' | 'vertical';

/** 文字位置 */
export type DividerOrientation = 'left' | 'right' | 'center';

export interface DividerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** 分割线方向 */
  type?: DividerType;
  /** 是否为虚线 */
  dashed?: boolean;
  /** 文字位置（仅水平分割线有效） */
  orientation?: DividerOrientation;
  /** 文字与边缘的距离（像素或百分比） */
  orientationMargin?: string | number;
  /** 自定义颜色 */
  color?: string;
  /** 子节点（文字内容） */
  children?: React.ReactNode;
}

// ==================== Main Component ====================

const Divider: React.FC<DividerProps> = ({
  type = 'horizontal',
  dashed = false,
  orientation = 'center',
  orientationMargin,
  color,
  className,
  style,
  children,
  ...props
}) => {
  // 获取组件级主题配置
  const dividerTheme = useComponentTheme('Divider');
  // 获取全局主题配置
  const globalTheme = useTheme();

  // 计算最终值（组件级优先，否则使用全局配置）
  const borderColorValue = dividerTheme?.colorBorder || globalTheme?.borderColorBase;
  const fontSizeValue = dividerTheme?.fontSize || globalTheme?.fontSize;

  // 构建 CSS 变量样式
  const dividerStyle: React.CSSProperties = {
    // 边框颜色（优先级：props.color > 组件级 > 全局）
    ...(color ? { '--soui-divider-color': color } : {}),
    ...(borderColorValue && !color ? { '--soui-divider-color': borderColorValue } : {}),
    
    // 字体大小
    ...(fontSizeValue && children ? { '--soui-divider-font-size': `${fontSizeValue}px` } : {}),
    
    // 文字边距
    ...(orientationMargin !== undefined ? { 
      '--soui-divider-orientation-margin': typeof orientationMargin === 'number' 
        ? `${orientationMargin}px` 
        : orientationMargin 
    } : {}),
    
    ...style,
  } as any;

  // 构建类名
  const dividerClassName = classNames(
    'soui-divider',
    `soui-divider-${type}`,
    {
      'soui-divider-dashed': dashed,
      'soui-divider-with-text': children && type === 'horizontal',
      [`soui-divider-${orientation}`]: children && type === 'horizontal',
    },
    className
  );

  // 渲染内容
  if (children && type === 'horizontal') {
    return (
      <div className={dividerClassName} style={dividerStyle} role="separator" {...props}>
        <span className="soui-divider-inner-text">{children}</span>
      </div>
    );
  }

  return (
    <div 
      className={dividerClassName} 
      style={dividerStyle} 
      role="separator" 
      aria-orientation={type}
      {...props}
    />
  );
};

export default Divider;
