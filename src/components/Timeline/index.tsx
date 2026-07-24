import React, { useContext } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

// ==================== Types ====================

export type TimelineItemColor = 'blue' | 'red' | 'green' | 'gray';
export type TimelineLineType = 'solid' | 'dashed' | 'dotted';

export interface TimelineItemProps {
  /** 圆圈颜色，预设颜色或自定义色值。不设置时跟随主题色 */
  color?: TimelineItemColor | string;
  /** 自定义时间轴点（覆盖圆圈） */
  dot?: React.ReactNode;
  /** 标签内容（仅 alternate 模式生效） */
  label?: React.ReactNode;
  /** 内容 */
  children?: React.ReactNode;
  /** 指定在左侧还是右侧（仅 alternate 模式） */
  position?: 'left' | 'right';
  /** 是否为加载中状态 */
  loading?: boolean;
  /** 连接线类型（覆盖全局 lineType） */
  lineType?: TimelineLineType;
}

export type TimelineMode = 'left' | 'right' | 'alternate';
export type TimelineDirection = 'vertical' | 'horizontal';

export interface TimelineProps extends Omit<React.HTMLAttributes<HTMLUListElement>, 'children'> {
  /** 模式：left/right/alternate（仅 vertical 方向生效） */
  mode?: TimelineMode;
  /** 方向：vertical/horizontal */
  direction?: TimelineDirection;
  /** 末尾追加 pending 节点，值为 true 时使用默认 loading 点 */
  pending?: React.ReactNode | boolean;
  /** 自定义 pending 图标 */
  pendingDot?: React.ReactNode;
  /** 是否逆序排列 */
  reverse?: boolean;
  /** 连接线类型：solid/dashed/dotted */
  lineType?: TimelineLineType;
  /** 时间轴节点数据 */
  items?: TimelineItemProps[];
  /** 子节点（与 items 二选一，支持 Timeline.Item 写法） */
  children?: React.ReactNode;
}

// ==================== Color Map ====================

const PRESET_COLORS: Record<string, string> = {
  blue: '#1677ff',
  red: '#ff4d4f',
  green: '#52c41a',
  gray: 'rgba(0, 0, 0, 0.25)',
};

const isPresetColor = (color?: string): color is TimelineItemColor =>
  !!color && color in PRESET_COLORS;

// ==================== Item Component ====================

const TimelineItem: React.FC<TimelineItemProps & {
  cls?: string;
  pos?: 'left' | 'right';
  globalLineType?: TimelineLineType;
}> = ({ color, dot, label, children, position, loading, lineType, cls, pos, globalLineType }) => {
  // 仅当显式指定 color 时才写入内联样式，否则由 CSS 变量（主题色）控制
  const hasExplicitColor = color !== undefined;
  const dotColor = hasExplicitColor
    ? (isPresetColor(color) ? PRESET_COLORS[color] : color)
    : undefined;

  const mergedLineType = lineType || globalLineType;

  const dotCls = classNames('soui-timeline-item-dot', {
    'soui-timeline-item-dot-custom': !!dot,
    'soui-timeline-item-dot-loading': loading,
  });

  const dotStyle: React.CSSProperties = {};
  if (dotColor) {
    dotStyle.borderColor = dotColor;
    if (!isPresetColor(color)) {
      dotStyle.color = dotColor;
    }
  }

  const tailCls = classNames('soui-timeline-item-tail', {
    [`soui-timeline-item-tail-${mergedLineType}`]: mergedLineType && mergedLineType !== 'solid',
  });

  return (
    <li
      className={classNames(
        'soui-timeline-item',
        {
          [`soui-timeline-item-${pos}`]: pos,
        },
        cls
      )}
    >
      {label !== undefined && <div className="soui-timeline-item-label">{label}</div>}
      <div className={tailCls} />
      <div className={dotCls} style={dotStyle}>
        {loading ? <span className="soui-timeline-item-dot-loading-icon" /> : dot}
      </div>
      <div className="soui-timeline-item-content">{children}</div>
    </li>
  );
};

TimelineItem.displayName = 'TimelineItem';

// ==================== Main Component ====================

const Timeline: React.FC<TimelineProps> & { Item: typeof TimelineItem } = ({
  mode = 'left',
  direction = 'vertical',
  pending,
  pendingDot,
  reverse = false,
  lineType,
  items,
  children,
  className,
  style,
  ...rest
}) => {
  const context = useContext(ConfigContext);
  const theme = (context?.components?.Timeline || {}) as Record<string, any>;

  // 注入主题 CSS 变量
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (theme.colorPrimary !== undefined) {
    cssVars['--soui-timeline-color-primary'] = theme.colorPrimary;
  }
  if (theme.colorDot !== undefined) {
    cssVars['--soui-timeline-color-dot'] = theme.colorDot;
  }
  if (theme.colorTail !== undefined) {
    cssVars['--soui-timeline-color-tail'] = theme.colorTail;
  }
  if (theme.fontSize !== undefined) {
    cssVars['--soui-timeline-font-size'] = `${theme.fontSize}px`;
  }

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  // 收集节点：优先 items，否则从 children 中提取
  let nodeList: TimelineItemProps[];
  if (items) {
    nodeList = [...items];
  } else if (children) {
    nodeList = React.Children.map(children, (child) => {
      if (React.isValidElement<TimelineItemProps>(child)) {
        return child.props as TimelineItemProps;
      }
      return null;
    })?.filter(Boolean) || [];
  } else {
    nodeList = [];
  }

  // 逆序
  if (reverse) {
    nodeList = [...nodeList].reverse();
  }

  // pending 节点（不指定 color，跟随主题色）
  if (pending) {
    const pendingContent = pending === true ? '' : pending;
    nodeList.push({
      children: pendingContent,
      loading: !pendingDot,
      dot: pendingDot,
    });
  }

  const rootCls = classNames(
    'soui-timeline',
    {
      [`soui-timeline-${mode}`]: direction === 'vertical' && mode,
      'soui-timeline-horizontal': direction === 'horizontal',
      'soui-timeline-pending': !!pending,
      'soui-timeline-reverse': reverse,
    },
    className
  );

  return (
    <ul className={rootCls} style={componentStyle} {...rest}>
      {nodeList.map((item, index) => {
        // alternate 模式：奇偶交替左右（仅 vertical）
        let pos: 'left' | 'right' | undefined;
        if (direction === 'vertical') {
          if (mode === 'alternate') {
            pos = item.position || (index % 2 === 0 ? 'left' : 'right');
          } else if (mode === 'right') {
            pos = 'right';
          } else {
            pos = 'left';
          }
        }

        return (
          <TimelineItem
            key={index}
            color={item.color}
            dot={item.dot}
            label={item.label}
            loading={item.loading}
            lineType={item.lineType}
            globalLineType={lineType}
            pos={pos}
          >
            {item.children}
          </TimelineItem>
        );
      })}
    </ul>
  );
};

Timeline.Item = TimelineItem;
Timeline.displayName = 'Timeline';

export default Timeline;
