import React from 'react';
import classNames from 'classnames';
import './style.less';

// ==================== Types ====================

/** 响应式断点配置 */
export interface BreakpointObject {
  xs?: number;
  sm?: number;
  md?: number;
  lg?: number;
  xl?: number;
  xxl?: number;
}

export interface ColProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'offset'> {
  /** 栅格占位格数，为 0 时相当于 display: none */
  span?: number;
  /** 栅格左侧的间隔格数，间隔内不可以有栅格 */
  offset?: number;
  /** 栅格向右移动格数 */
  push?: number;
  /** 栅格向左移动格数 */
  pull?: number;
  /** <576px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  xs?: number | BreakpointObject;
  /** ≥576px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  sm?: number | BreakpointObject;
  /** ≥768px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  md?: number | BreakpointObject;
  /** ≥992px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  lg?: number | BreakpointObject;
  /** ≥1200px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  xl?: number | BreakpointObject;
  /** ≥1600px 响应式栅格，可为栅格数或一个包含其他属性的对象 */
  xxl?: number | BreakpointObject;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子节点 */
  children?: React.ReactNode;
}

// ==================== Main Component ====================

const Col: React.FC<ColProps> = ({
  span = 24,
  offset = 0,
  push,
  pull,
  xs,
  sm,
  md,
  lg,
  xl,
  xxl,
  className,
  style,
  children,
  ...props
}) => {
  // 构建类名
  const colClassName = classNames(
    'soui-col',
    `soui-col-${span}`,
    {
      [`soui-col-offset-${offset}`]: offset && offset > 0,
      [`soui-col-push-${push}`]: push !== undefined && push >= 0,
      [`soui-col-pull-${pull}`]: pull !== undefined && pull >= 0,
      // 响应式类名
      ...(typeof xs === 'number' ? { [`soui-col-xs-${xs}`]: true } : {}),
      ...(typeof sm === 'number' ? { [`soui-col-sm-${sm}`]: true } : {}),
      ...(typeof md === 'number' ? { [`soui-col-md-${md}`]: true } : {}),
      ...(typeof lg === 'number' ? { [`soui-col-lg-${lg}`]: true } : {}),
      ...(typeof xl === 'number' ? { [`soui-col-xl-${xl}`]: true } : {}),
      ...(typeof xxl === 'number' ? { [`soui-col-xxl-${xxl}`]: true } : {}),
    },
    className
  );

  return (
    <div className={colClassName} style={style} {...props}>
      {children}
    </div>
  );
};

export default Col;
