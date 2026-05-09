import React from 'react';
import classNames from 'classnames';
import './style.less';

// ==================== Types ====================

/** 水平对齐方式 */
export type RowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between' | 'space-evenly';

/** 垂直对齐方式 */
export type RowAlign = 'top' | 'middle' | 'bottom' | 'stretch';

export interface RowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'align'> {
  /** 栅格间隔，可以写成像素值或支持响应式的对象写法 { xs: 8, sm: 16, md: 24 } */
  gutter?: number | [number, number] | { xs?: number; sm?: number; md?: number; lg?: number; xl?: number; xxl?: number };
  /** 水平排列方式，可选为 `start` `end` `center` `space-around` `space-between` `space-evenly` */
  justify?: RowJustify;
  /** 垂直对齐方式，可选为 `top` `middle` `bottom` `stretch` */
  align?: RowAlign;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 子节点 */
  children?: React.ReactNode;
}

// ==================== Main Component ====================

const Row: React.FC<RowProps> = ({
  gutter,
  justify = 'start',
  align = 'top',
  className,
  style,
  children,
  ...props
}) => {
  // 处理 gutter
  const getGutterStyle = () => {
    if (!gutter) return {};

    let horizontalGutter = 0;
    let verticalGutter = 0;

    if (typeof gutter === 'number') {
      horizontalGutter = gutter;
      verticalGutter = 0;
    } else if (Array.isArray(gutter)) {
      horizontalGutter = gutter[0];
      verticalGutter = gutter[1] || 0;
    }

    return {
      marginLeft: horizontalGutter / -2,
      marginRight: horizontalGutter / -2,
      '--soui-row-gutter-horizontal': `${horizontalGutter}px`,
      '--soui-row-gutter-vertical': `${verticalGutter}px`,
    } as any;
  };

  // 构建类名
  const rowClassName = classNames(
    'soui-row',
    `soui-row-justify-${justify}`,
    `soui-row-align-${align}`,
    {
      'soui-row-gutter': gutter,
    },
    className
  );

  const rowStyle = {
    ...getGutterStyle(),
    ...style,
  };

  return (
    <div className={rowClassName} style={rowStyle} {...props}>
      {children}
    </div>
  );
};

export default Row;
