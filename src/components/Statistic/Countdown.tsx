import React, { useState, useEffect, useRef, useContext } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';

// ==================== Types ====================

export interface CountdownProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title' | 'prefix' | 'onChange'> {
  /** 标题 */
  title?: React.ReactNode;
  /** 目标时间戳（毫秒） */
  value?: number;
  /** 时间格式 */
  format?: string;
  /** 前缀 */
  prefix?: React.ReactNode;
  /** 后缀 */
  suffix?: React.ReactNode;
  /** 数值区域自定义样式 */
  valueStyle?: React.CSSProperties;
  /** 倒计时结束回调 */
  onFinish?: () => void;
  /** 倒计时变化回调 */
  onChange?: (value: number) => void;
}

// ==================== Utils ====================

const padZero = (n: number, len: number = 2): string => String(n).padStart(len, '0');

/** 将剩余毫秒数格式化为指定格式字符串（token 映射避免贪婪匹配冲突） */
const formatCountdown = (diff: number, format: string): string => {
  const totalSeconds = Math.floor(Math.max(diff, 0) / 1000);
  const ms = Math.max(diff, 0) % 1000;
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600) % 24;
  const days = Math.floor(totalSeconds / 86400);
  const totalHours = hours + days * 24;

  // 长 token 优先，避免 SS 吃掉 SSS 的一部分
  const tokens: Record<string, string> = {
    SSS: padZero(ms, 3),
    SS: padZero(Math.floor(ms / 10)),
    S: String(Math.floor(ms / 100)),
    DD: padZero(days),
    D: String(days),
    HH: padZero(totalHours),
    H: String(totalHours),
    mm: padZero(minutes),
    m: String(minutes),
    ss: padZero(seconds),
    s: String(seconds),
  };

  return format.replace(/SSS|SS|S|DD|D|HH|H|mm|m|ss|s/g, (match) => tokens[match] ?? match);
};

// ==================== Component ====================

const Countdown: React.FC<CountdownProps> = ({
  title,
  value: target,
  format = 'HH:mm:ss',
  prefix,
  suffix,
  valueStyle,
  onFinish,
  onChange,
  className,
  style,
  ...rest
}) => {
  const context = useContext(ConfigContext);
  const theme = (context?.components?.Statistic || {}) as Record<string, any>;

  const [now, setNow] = useState(() => Date.now());
  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const finishedRef = useRef(false);

  // 是否包含毫秒级格式
  const hasMs = /S/.test(format);
  const interval = hasMs ? 33 : 1000;

  useEffect(() => {
    finishedRef.current = false;

    timerRef.current = setInterval(() => {
      const current = Date.now();
      setNow(current);

      const diff = (target ?? 0) - current;
      onChange?.(diff > 0 ? diff : 0);

      if (diff <= 0 && !finishedRef.current) {
        finishedRef.current = true;
        clearInterval(timerRef.current);
        onFinish?.();
      }
    }, interval);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, interval]);

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

  const diff = Math.max((target ?? 0) - now, 0);
  const displayValue = formatCountdown(diff, format);

  return (
    <div
      className={classNames('soui-statistic', 'soui-statistic-countdown', className)}
      style={componentStyle}
      {...rest}
    >
      {title && <div className="soui-statistic-title">{title}</div>}
      <div className="soui-statistic-content" style={valueStyle}>
        {prefix && <span className="soui-statistic-prefix">{prefix}</span>}
        <span className="soui-statistic-value">{displayValue}</span>
        {suffix && <span className="soui-statistic-suffix">{suffix}</span>}
      </div>
    </div>
  );
};

Countdown.displayName = 'Countdown';

export default Countdown;
