import React, { useContext } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import Countdown from './Countdown';
import './style.less';

// ==================== Types ====================

export interface StatisticProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'prefix'> {
  /** 标题 */
  title?: React.ReactNode;
  /** 数值 */
  value?: number | string;
  /** 精度（小数位数） */
  precision?: number;
  /** 前缀 */
  prefix?: React.ReactNode;
  /** 后缀 */
  suffix?: React.ReactNode;
  /** 千分位分隔符 */
  groupSeparator?: string;
  /** 自定义格式化函数 */
  formatter?: (value: number | string) => React.ReactNode;
  /** 数值区域自定义样式 */
  valueStyle?: React.CSSProperties;
  /** 加载中状态 */
  loading?: boolean;
}

// ==================== Utils ====================

/** 格式化数值：千分位 + 精度 */
const formatValue = (
  value: number | string | undefined,
  precision: number | undefined,
  groupSeparator: string
): string => {
  if (value === undefined || value === null) return '';
  if (typeof value === 'string') return value;

  let num = value;
  if (precision !== undefined && precision >= 0) {
    num = Number(num.toFixed(precision));
  }

  const [intPart, decimalPart] = String(num).split('.');
  const formattedInt = groupSeparator
    ? intPart.replace(/\B(?=(\d{3})+(?!\d))/g, groupSeparator)
    : intPart;

  return decimalPart !== undefined ? `${formattedInt}.${decimalPart}` : formattedInt;
};

// ==================== Component ====================

const Statistic: React.FC<StatisticProps> & {
  Countdown: typeof Countdown;
} = ({
  title,
  value,
  precision,
  prefix,
  suffix,
  groupSeparator = ',',
  formatter,
  valueStyle,
  loading = false,
  className,
  style,
  ...rest
}) => {
  const context = useContext(ConfigContext);
  const theme = (context?.components?.Statistic || {}) as Record<string, any>;

  // 注入主题 CSS 变量
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (theme.colorTextHeading !== undefined) {
    cssVars['--soui-statistic-color-text-heading'] = theme.colorTextHeading;
  }
  if (theme.colorText !== undefined) {
    cssVars['--soui-statistic-color-text'] = theme.colorText;
  }
  if (theme.fontSizeHeading !== undefined) {
    cssVars['--soui-statistic-font-size-heading'] = `${theme.fontSizeHeading}px`;
  }
  if (theme.fontSize !== undefined) {
    cssVars['--soui-statistic-font-size'] = `${theme.fontSize}px`;
  }

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  const displayValue = formatter
    ? formatter(value ?? '')
    : formatValue(value, precision, groupSeparator);

  return (
    <div
      className={classNames('soui-statistic', { 'soui-statistic-loading': loading }, className)}
      style={componentStyle}
      {...rest}
    >
      {title && <div className="soui-statistic-title">{title}</div>}
      <div className="soui-statistic-content" style={valueStyle}>
        {prefix && <span className="soui-statistic-prefix">{prefix}</span>}
        <span className="soui-statistic-value">
          {loading ? (
            <span className="soui-statistic-skeleton" />
          ) : (
            displayValue
          )}
        </span>
        {suffix && <span className="soui-statistic-suffix">{suffix}</span>}
      </div>
    </div>
  );
};

Statistic.Countdown = Countdown;
Statistic.displayName = 'Statistic';

export default Statistic;
