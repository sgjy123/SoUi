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
  /** 是否为块级元素（占据整行） */
  block?: boolean;
  /** 分隔符 */
  split?: React.ReactNode;
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
  block = false,
  split,
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

  // 处理分隔符逻辑
  const renderItems = () => {
    if (!children) return null;
    
    const childArray = React.Children.toArray(children).filter(
      (child) => child !== null && child !== undefined
    );
    
    if (childArray.length === 0) return null;

    return childArray.map((child, index) => {
      const key = (child as React.ReactElement)?.key || `space-item-${index}`;
      
      return (
        <React.Fragment key={key}>
          <div className="soui-space-item">{child}</div>
          {index < childArray.length - 1 && split && (
            <span className="soui-space-split">{split}</span>
          )}
        </React.Fragment>
      );
    });
  };

  const spaceClassName = classNames(
    'soui-space',
    `soui-space-${direction}`,
    {
      'soui-space-wrap': wrap,
      'soui-space-block': block,
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
      {renderItems()}
    </div>
  );
};

export default Space;
