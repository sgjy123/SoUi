import React, { useContext } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

// ==================== Types ====================

/** 状态类型 */
export type BadgeStatus = 'success' | 'processing' | 'default' | 'error' | 'warning';

/** 徽章尺寸 */
export type BadgeSize = 'default' | 'small';

/** 缎带位置 */
export type RibbonPlacement = 'start' | 'end';

/** 预设颜色 */
const PRESET_COLORS: Record<string, string> = {
  blue: '#1677ff',
  geekblue: '#2f54eb',
  purple: '#722ed1',
  cyan: '#13c2c2',
  green: '#52c41a',
  lime: '#a0d911',
  gold: '#faad14',
  yellow: '#fadb14',
  orange: '#fa8c16',
  red: '#ff4d4f',
  volcano: '#fa541c',
  magenta: '#eb2f96',
  pink: '#eb2f96',
};

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'color'> {
  /** 展示的数字或内容 */
  count?: React.ReactNode;
  /** 不展示数字，只有一个小红点 */
  dot?: boolean;
  /** 最大数值，超过显示为 `${overflowCount}+` */
  overflowCount?: number;
  /** 数值为 0 时是否展示 */
  showZero?: boolean;
  /** 状态点类型 */
  status?: BadgeStatus;
  /** 状态点文字 */
  text?: React.ReactNode;
  /** 自定义颜色（预设色名或色值） */
  color?: string;
  /** 徽章尺寸 */
  size?: BadgeSize;
  /** 位置偏移 [水平, 垂直] */
  offset?: [number, number];
  /** 鼠标悬停提示文字 */
  title?: string;
  /** 是否有白色描边 */
  bordered?: boolean;
  /** 包裹的内容 */
  children?: React.ReactNode;
}

export interface RibbonProps {
  /** 缎带颜色（预设色名或色值） */
  color?: string;
  /** 缎带位置 */
  placement?: RibbonPlacement;
  /** 缎带文字 */
  text?: React.ReactNode;
  /** 自定义类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 包裹的内容 */
  children?: React.ReactNode;
}

// ==================== Utils ====================

/** 解析颜色：预设色名 → 色值，其他原样返回 */
const resolveColor = (color?: string): string | undefined =>
  color ? PRESET_COLORS[color] || color : undefined;

/** 是否为数字类型 */
const isNumeric = (val: unknown): val is number => typeof val === 'number' && !Number.isNaN(val);

// ==================== Badge.Ribbon ====================

const Ribbon: React.FC<RibbonProps> = ({
  color = 'red',
  placement = 'end',
  text,
  className,
  style,
  children,
}) => {
  const resolved = resolveColor(color);

  const ribbonStyle: React.CSSProperties = {
    background: resolved,
    ...style,
  };

  return (
    <div className={classNames('soui-ribbon-wrapper', className)}>
      {children}
      <div
        className={classNames('soui-ribbon', `soui-ribbon-placement-${placement}`)}
        style={ribbonStyle}
      >
        <span className="soui-ribbon-text">{text}</span>
        <div className="soui-ribbon-corner" style={{ color: resolved }} />
      </div>
    </div>
  );
};

// ==================== Badge ====================

interface BadgeComponent extends React.FC<BadgeProps> {
  Ribbon: typeof Ribbon;
}

const Badge: BadgeComponent = ({
  count,
  dot = false,
  overflowCount = 99,
  showZero = false,
  status,
  text,
  color,
  size = 'default',
  offset,
  title,
  bordered = false,
  children,
  className,
  style,
  ...rest
}) => {
  const context = useContext(ConfigContext);
  const componentTheme = (context?.components?.Badge || {}) as Record<string, any>;

  // 主题 CSS 变量
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (componentTheme.colorError !== undefined) {
    cssVars['--soui-badge-color-error'] = componentTheme.colorError;
  }
  if (componentTheme.colorPrimary !== undefined) {
    cssVars['--soui-badge-color-primary'] = componentTheme.colorPrimary;
  }
  if (componentTheme.fontSize !== undefined) {
    cssVars['--soui-badge-font-size'] = `${componentTheme.fontSize}px`;
  }

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  // ==================== 状态点模式（status 或 纯 color+text） ====================
  if (status || (text !== undefined && !children)) {
    const statusColor = resolveColor(color);
    const dotStyle: React.CSSProperties = statusColor ? { background: statusColor } : {};

    return (
      <span className={classNames('soui-badge soui-badge-status', className)} style={componentStyle} {...rest}>
        <span
          className={classNames('soui-badge-status-dot', status && `soui-badge-status-${status}`)}
          style={dotStyle}
        />
        {text && <span className="soui-badge-status-text">{text}</span>}
      </span>
    );
  }

  // ==================== 计算展示内容 ====================
  let displayCount: React.ReactNode = count;
  if (isNumeric(count)) {
    if (count > overflowCount) {
      displayCount = `${overflowCount}+`;
    } else if (count === 0 && !showZero) {
      displayCount = null;
    }
  }

  const hasIndicator = dot || (displayCount !== null && displayCount !== undefined);
  const resolvedColor = resolveColor(color);
  const indicatorStyle: React.CSSProperties = {};
  if (resolvedColor) {
    indicatorStyle.background = resolvedColor;
  }
  if (offset) {
    indicatorStyle.marginTop = offset[1];
    indicatorStyle.right = -offset[0];
  }

  // ==================== 独立徽章（无 children） ====================
  if (!children) {
    if (!hasIndicator) return null;

    return (
      <span className={classNames('soui-badge soui-badge-alone', className)} style={componentStyle} {...rest}>
        {dot ? (
          <span
            className={classNames('soui-badge-dot', {
              'soui-badge-dot-small': size === 'small',
              'soui-badge-bordered': bordered,
            })}
            style={indicatorStyle}
          />
        ) : (
          <sup
            className={classNames('soui-badge-count', 'soui-badge-count-alone', {
              'soui-badge-count-small': size === 'small',
              'soui-badge-bordered': bordered,
            })}
            style={indicatorStyle}
            title={title}
          >
            {displayCount}
          </sup>
        )}
      </span>
    );
  }

  // ==================== 包裹内容的徽章 ====================
  return (
    <span className={classNames('soui-badge', className)} style={componentStyle} {...rest}>
      {children}
      {hasIndicator &&
        (dot ? (
          <span
            className={classNames('soui-badge-dot', {
              'soui-badge-dot-small': size === 'small',
              'soui-badge-bordered': bordered,
            })}
            style={indicatorStyle}
          />
        ) : (
          <sup
            className={classNames('soui-badge-count', {
              'soui-badge-count-small': size === 'small',
              'soui-badge-bordered': bordered,
            })}
            style={indicatorStyle}
            title={title}
          >
            {displayCount}
          </sup>
        ))}
    </span>
  );
};

Badge.Ribbon = Ribbon;

export default Badge;
