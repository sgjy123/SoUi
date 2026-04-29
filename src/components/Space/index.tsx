import React from 'react';
import classNames from 'classnames';
import './style.less';

export type SpaceSize = 'small' | 'middle' | 'large' | number;
export type SpaceDirection = 'horizontal' | 'vertical';
export type SpaceAlign = 'start' | 'end' | 'center' | 'baseline';

export interface SpaceProps {
  /** 间距大小 */
  size?: SpaceSize;
  /** 间距方向 */
  direction?: SpaceDirection;
  /** 对齐方式 */
  align?: SpaceAlign;
  /** 是否自动换行 */
  wrap?: boolean;
  /** 子节点 */
  children?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
}

const Space: React.FC<SpaceProps> = ({
  size = 'middle',
  direction = 'horizontal',
  align,
  wrap = false,
  children,
  className,
  style,
}) => {
  // 处理 size
  const getSizeValue = (s: SpaceSize): string => {
    if (typeof s === 'number') {
      return `${s}px`;
    }
    const sizeMap: Record<string, string> = {
      small: '8px',
      middle: '16px',
      large: '24px',
    };
    return sizeMap[s] || '16px';
  };

  const gap = getSizeValue(size);

  const spaceClassName = classNames(
    'soui-space',
    `soui-space-${direction}`,
    {
      'soui-space-wrap': wrap,
    },
    className
  );

  const spaceStyle: React.CSSProperties = {
    gap,
    flexDirection: direction === 'vertical' ? 'column' : 'row',
    alignItems: align,
    ...style,
  };

  return (
    <div className={spaceClassName} style={spaceStyle}>
      {children}
    </div>
  );
};

export default Space;
