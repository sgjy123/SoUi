import React from 'react';
import classNames from 'classnames';
import './style.less';

// ==================== Types ====================

/** 进度条类型 */
export type ProgressType = 'line' | 'circle' | 'dashboard';

/** 进度条状态 */
export type ProgressStatus = 'normal' | 'success' | 'exception' | 'active';

/** 进度条尺寸 */
export type ProgressSize = 'small' | 'default';

/** 渐变色配置 */
export interface ProgressGradient {
  /** 起始颜色 */
  from?: string;
  /** 结束颜色 */
  to?: string;
  /** 方向 */
  direction?: 'left' | 'right' | 'top' | 'bottom';
  /** 渐变色断点 */
  [percent: string]: string | undefined;
}

/** 成功进度配置 */
export interface ProgressSuccess {
  /** 成功百分比 */
  percent?: number;
  /** 成功颜色 */
  strokeColor?: string;
}

/** 进度条属性 */
export interface ProgressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'type'> {
  /** 进度条类型 */
  type?: ProgressType;
  /** 百分比（0-100） */
  percent?: number;
  /** 状态 */
  status?: ProgressStatus;
  /** 尺寸 */
  size?: ProgressSize | number | [number | string, number | string];
  /** 是否显示信息 */
  showInfo?: boolean;
  /** 自定义文本格式 */
  format?: (percent?: number, successPercent?: number) => React.ReactNode;
  /** 进度条颜色 */
  strokeColor?: string | ProgressGradient;
  /** 进度条轨道颜色 */
  trailColor?: string;
  /** 进度条线宽 */
  strokeWidth?: number;
  /** 步骤数量 */
  steps?: number;
  /** 成功配置 */
  success?: ProgressSuccess;
  /** Dashboard 缺口角度 */
  gapDegree?: number;
  /** Dashboard 缺口位置 */
  gapPosition?: 'top' | 'bottom' | 'left' | 'right';
}

// ==================== 工具函数 ====================

/** 限制百分比范围 */
const clampPercent = (percent: number): number => Math.max(0, Math.min(100, percent));

/** 获取状态颜色 */
const statusColorMap: Record<ProgressStatus, string> = {
  normal: 'var(--soui-progress-color-primary, #1677ff)',
  success: 'var(--soui-progress-color-success, #52c41a)',
  exception: 'var(--soui-progress-color-error, #ff4d4f)',
  active: 'var(--soui-progress-color-primary, #1677ff)',
};

/** 获取渐变字符串 */
const getGradientColor = (strokeColor: ProgressGradient): string => {
  const { from = '#1677ff', to = '#1677ff', direction = 'to right' } = strokeColor;

  // 检查是否有自定义断点
  const customStops = Object.entries(strokeColor).filter(
    ([key]) => !['from', 'to', 'direction'].includes(key) && !isNaN(Number(key))
  );

  if (customStops.length > 0) {
    const stops = customStops
      .map(([key, value]) => `${value} ${key}%`)
      .join(', ');
    return `linear-gradient(${direction}, ${stops})`;
  }

  return `linear-gradient(${direction}, ${from}, ${to})`;
};

/** 解析 strokeColor */
const parseStrokeColor = (strokeColor?: string | ProgressGradient): string => {
  if (!strokeColor) return statusColorMap.normal;
  if (typeof strokeColor === 'string') return strokeColor;
  return getGradientColor(strokeColor);
};

/** 获取实际尺寸 */
const getSize = (
  size?: ProgressSize | number | [number | string, number | string],
  type?: ProgressType
): { width: number | string; height: number | string } => {
  if (type === 'circle' || type === 'dashboard') {
    const defaultSize = 120;
    if (typeof size === 'number') return { width: size, height: size };
    if (Array.isArray(size)) {
      return {
        width: size[0],
        height: size[1],
      };
    }
    if (size === 'small') return { width: 80, height: 80 };
    return { width: defaultSize, height: defaultSize };
  }

  // Line 类型
  if (typeof size === 'number') return { width: '100%', height: size };
  if (Array.isArray(size)) {
    return {
      width: size[0],
      height: size[1],
    };
  }
  if (size === 'small') return { width: '100%', height: 6 };
  return { width: '100%', height: 8 };
};

// ==================== 信息文本组件 ====================

const ProgressInfo: React.FC<{
  percent: number;
  successPercent: number;
  status: ProgressStatus;
  format?: ProgressProps['format'];
}> = ({ percent, successPercent, status, format }) => {
  const text = format ? format(percent, successPercent) : `${percent}%`;

  const iconMap: Record<ProgressStatus, React.ReactNode> = {
    success: (
      <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
        <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
      </svg>
    ),
    exception: (
      <svg viewBox="64 64 896 896" width="1em" height="1em" fill="currentColor">
        <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L512 442.2 295.9 191.7c-3-3.6-7.5-5.7-12.3-5.7H203.8c-6.8 0-10.5 7.9-6.1 13.1L460.2 512 197.7 824.9A7.95 7.95 0 00203.8 838h79.8c4.7 0 9.2-2.1 12.3-5.7L512 581.8l215.9 250.5c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
      </svg>
    ),
    normal: null,
    active: null,
  };

  return (
    <span className={classNames('soui-progress-text', `soui-progress-status-${status}`)}>
      {iconMap[status] || text}
    </span>
  );
};

// ==================== 线形进度条 ====================

const LineProgress: React.FC<ProgressProps> = ({
  percent = 0,
  status = 'normal',
  size,
  showInfo = true,
  format,
  strokeColor,
  trailColor,
  strokeWidth,
  steps,
  success,
  className,
  style,
  ...rest
}) => {
  const clampedPercent = clampPercent(percent);
  const successPercent = success?.percent ?? 0;
  const clampedSuccessPercent = clampPercent(successPercent);
  const sizeObj = getSize(size, 'line');

  // 步骤模式
  if (steps && steps > 0) {
    const stepWidth = `calc((100% - ${(steps - 1) * 2}px) / ${steps})`;
    const activeSteps = Math.round((clampedPercent / 100) * steps);

    // 根据 status 确定激活步骤的颜色
    let activeStepColor: string;
    if (status === 'success') {
      activeStepColor = success?.strokeColor || 'var(--soui-progress-color-success, #52c41a)';
    } else if (status === 'exception') {
      activeStepColor = typeof strokeColor === 'string' ? strokeColor : parseStrokeColor(strokeColor);
      if (!activeStepColor) {
        activeStepColor = 'var(--soui-progress-color-error, #ff4d4f)';
      }
    } else {
      activeStepColor = success?.strokeColor || parseStrokeColor(strokeColor);
    }

    return (
      <div
        className={classNames('soui-progress', 'soui-progress-steps', `soui-progress-status-${status}`, className)}
        style={style}
        {...rest}
      >
        <div className="soui-progress-steps-outer">
          {Array.from({ length: steps }).map((_, index) => {
            const isActive = index < activeSteps;
            const stepColor = isActive
              ? activeStepColor
              : (trailColor || 'var(--soui-progress-trail-color, #f5f5f5)');

            return (
              <div
                key={index}
                className="soui-progress-steps-item"
                style={{
                  width: stepWidth,
                  backgroundColor: stepColor,
                  height: typeof size === 'number' ? size : size === 'small' ? 6 : 8,
                }}
              />
            );
          })}
        </div>
        {showInfo && (
          <ProgressInfo
            percent={clampedPercent}
            successPercent={clampedSuccessPercent}
            status={status}
            format={format}
          />
        )}
      </div>
    );
  }

  // 普通线形模式
  // 根据 status 确定颜色
  let barColor: string;
  if (status === 'success') {
    barColor = success?.strokeColor || 'var(--soui-progress-color-success, #52c41a)';
  } else if (status === 'exception') {
    barColor = typeof strokeColor === 'string' ? strokeColor : parseStrokeColor(strokeColor);
    if (!barColor) {
      barColor = 'var(--soui-progress-color-error, #ff4d4f)';
    }
  } else {
    barColor = parseStrokeColor(strokeColor);
  }
  
  const trackBg = trailColor || 'var(--soui-progress-trail-color, #f5f5f5)';

  const barStyle: React.CSSProperties = {
    width: `${clampedPercent}%`,
    backgroundColor: barColor.startsWith('linear-gradient') ? undefined : barColor,
    backgroundImage: barColor.startsWith('linear-gradient') ? barColor : undefined,
    height: strokeWidth || (typeof sizeObj.height === 'number' ? sizeObj.height : 8),
  };

  const trailStyle: React.CSSProperties = {
    backgroundColor: trackBg,
    borderRadius: typeof sizeObj.height === 'number' && sizeObj.height <= 8 ? sizeObj.height / 2 : 4,
  };

  return (
    <div
      className={classNames('soui-progress', 'soui-progress-line', `soui-progress-status-${status}`, className)}
      style={style}
      role="progressbar"
      aria-valuenow={clampedPercent}
      aria-valuemin={0}
      aria-valuemax={100}
      {...rest}
    >
      <div className="soui-progress-outer">
        <div className="soui-progress-inner" style={trailStyle}>
          <div className="soui-progress-bg" style={barStyle} />
          {clampedSuccessPercent > 0 && (
            <div
              className="soui-progress-success-bg"
              style={{
                width: `${clampedSuccessPercent}%`,
                backgroundColor: success?.strokeColor || 'var(--soui-progress-color-success, #52c41a)',
                height: strokeWidth || (typeof sizeObj.height === 'number' ? sizeObj.height : 8),
              }}
            />
          )}
        </div>
      </div>
      {showInfo && (
        <ProgressInfo
          percent={clampedPercent}
          successPercent={clampedSuccessPercent}
          status={status}
          format={format}
        />
      )}
    </div>
  );
};

// ==================== 圆形/仪表盘进度条 ====================

const CircleProgress: React.FC<ProgressProps> = ({
  percent = 0,
  type = 'circle',
  status = 'normal',
  size,
  showInfo = true,
  format,
  strokeColor,
  trailColor,
  strokeWidth,
  success,
  gapDegree,
  gapPosition = 'bottom',
  className,
  style,
  ...rest
}) => {
  const clampedPercent = clampPercent(percent);
  const successPercent = success?.percent ?? 0;
  const clampedSuccessPercent = clampPercent(successPercent);
  const sizeObj = getSize(size, type);

  const viewSize = typeof sizeObj.width === 'number' ? sizeObj.width : 120;
  const defaultStrokeWidth = type === 'dashboard' ? 6 : 8;
  const sw = strokeWidth ?? defaultStrokeWidth;

  // 计算 SVG 参数
  const radius = (viewSize - sw) / 2;
  const center = viewSize / 2;

  // 缺口角度
  const gap = type === 'dashboard' ? (gapDegree ?? 75) : 0;
  const totalAngle = 360 - gap;

  // 计算路径
  const circumference = 2 * Math.PI * radius;
  const arcLength = (totalAngle / 360) * circumference;

  const getRotation = (): string => {
    if (type === 'dashboard') {
      const positionAngles: Record<string, number> = {
        bottom: 90 + gap / 2,
        top: 270 + gap / 2,
        left: gap / 2,
        right: 180 + gap / 2,
      };
      return `rotate(${positionAngles[gapPosition]} ${center} ${center})`;
    }
    return `rotate(-90 ${center} ${center})`;
  };

  const trailDashOffset = arcLength - (totalAngle / 360) * circumference;
  const progressDashOffset = arcLength - (clampedPercent / 100) * (totalAngle / 360) * circumference;
  const successDashOffset = arcLength - (clampedSuccessPercent / 100) * (totalAngle / 360) * circumference;

  // 根据 status 确定颜色
  let barColor: string;
  if (status === 'success') {
    barColor = success?.strokeColor || 'var(--soui-progress-color-success, #52c41a)';
  } else if (status === 'exception') {
    barColor = typeof strokeColor === 'string' ? strokeColor : parseStrokeColor(strokeColor);
    if (!barColor) {
      barColor = 'var(--soui-progress-color-error, #ff4d4f)';
    }
  } else {
    barColor = parseStrokeColor(strokeColor);
  }
  
  const trackColor = trailColor || 'var(--soui-progress-trail-color, #f5f5f5)';
  const successColor = success?.strokeColor || 'var(--soui-progress-color-success, #52c41a)';

  // 渐变定义
  const gradientId = `soui-progress-gradient-${Math.random().toString(36).slice(2)}`;
  const hasGradient = strokeColor && typeof strokeColor === 'object';

  const renderGradientDef = () => {
    if (!hasGradient || typeof strokeColor === 'string') return null;
    const { from = '#1677ff', to = '#1677ff' } = strokeColor;
    return (
      <defs>
        <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
      </defs>
    );
  };

  const finalBarColor = hasGradient ? `url(#${gradientId})` : barColor;

  // 文本尺寸
  const textFontSize = viewSize * 0.15 + 6;
  const iconSize = viewSize * 0.14 + 4;

  const renderStatusIcon = () => {
    if (status === 'success') {
      return (
        <svg viewBox="64 64 896 896" width={iconSize} height={iconSize} fill="currentColor">
          <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z" />
        </svg>
      );
    }
    if (status === 'exception') {
      return (
        <svg viewBox="64 64 896 896" width={iconSize} height={iconSize} fill="currentColor">
          <path d="M563.8 512l262.5-312.9c4.4-5.2.7-13.1-6.1-13.1h-79.8c-4.7 0-9.2 2.1-12.3 5.7L512 442.2 295.9 191.7c-3-3.6-7.5-5.7-12.3-5.7H203.8c-6.8 0-10.5 7.9-6.1 13.1L460.2 512 197.7 824.9A7.95 7.95 0 00203.8 838h79.8c4.7 0 9.2-2.1 12.3-5.7L512 581.8l215.9 250.5c3 3.6 7.5 5.7 12.3 5.7h79.8c6.8 0 10.5-7.9 6.1-13.1L563.8 512z" />
        </svg>
      );
    }
    return format ? format(clampedPercent, clampedSuccessPercent) : `${clampedPercent}%`;
  };

  return (
    <div
      className={classNames(
        'soui-progress',
        `soui-progress-${type}`,
        `soui-progress-status-${status}`,
        className
      )}
      style={{
        width: viewSize,
        height: viewSize,
        ...style,
      }}
      role="progressbar"
      aria-valuenow={clampedPercent}
      aria-valuemin={0}
      aria-valuemax={100}
      {...rest}
    >
      <svg
        viewBox={`0 0 ${viewSize} ${viewSize}`}
        width={viewSize}
        height={viewSize}
      >
        {renderGradientDef()}
        {/* 轨道 */}
        <circle
          className="soui-progress-circle-trail"
          cx={center}
          cy={center}
          r={radius}
          stroke={trackColor}
          strokeWidth={sw}
          fill="none"
          strokeDasharray={arcLength}
          strokeDashoffset={trailDashOffset}
          strokeLinecap="round"
          transform={getRotation()}
        />
        {/* 进度 */}
        <circle
          className="soui-progress-circle-path"
          cx={center}
          cy={center}
          r={radius}
          stroke={finalBarColor}
          strokeWidth={sw}
          fill="none"
          strokeDasharray={arcLength}
          strokeDashoffset={progressDashOffset}
          strokeLinecap="round"
          transform={getRotation()}
          style={{ transition: 'stroke-dashoffset 0.3s ease-in-out' }}
        />
        {/* 成功进度 */}
        {clampedSuccessPercent > 0 && (
          <circle
            className="soui-progress-circle-success-path"
            cx={center}
            cy={center}
            r={radius}
            stroke={successColor}
            strokeWidth={sw}
            fill="none"
            strokeDasharray={arcLength}
            strokeDashoffset={successDashOffset}
            strokeLinecap="round"
            transform={getRotation()}
            style={{ transition: 'stroke-dashoffset 0.3s ease-in-out' }}
          />
        )}
      </svg>
      {showInfo && (
        <span
          className={classNames('soui-progress-text', `soui-progress-status-${status}`)}
          style={{ fontSize: textFontSize }}
        >
          {renderStatusIcon()}
        </span>
      )}
    </div>
  );
};

// ==================== 主组件 ====================

/**
 * Progress 进度条
 *
 * 展示操作的当前进度，支持线形、圆形和仪表盘三种类型。
 */
const Progress: React.FC<ProgressProps> = ({
  type = 'line',
  ...rest
}) => {
  if (type === 'circle' || type === 'dashboard') {
    return <CircleProgress type={type} {...rest} />;
  }
  return <LineProgress type={type} {...rest} />;
};

export default Progress;
