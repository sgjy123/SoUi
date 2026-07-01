import React, { useState, useCallback, useRef, useEffect, useContext } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import type { ComponentThemeConfig } from '../ConfigProvider/types';
import './style.less';

// ==================== Types ====================

/** 评分尺寸 */
export type RateSize = 'small' | 'medium' | 'large';

/** 评分属性 */
export interface RateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** 当前分数（受控） */
  value?: number;
  /** 默认分数（非受控） */
  defaultValue?: number;
  /** 星星总数 */
  count?: number;
  /** 是否允许半星 */
  allowHalf?: boolean;
  /** 是否允许再次点击清除 */
  allowClear?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 自定义字符 */
  character?: React.ReactNode;
  /** 每项的提示文字 */
  tooltips?: string[];
  /** 尺寸 */
  size?: RateSize;
  /** 分数改变时触发 */
  onChange?: (value: number) => void;
  /** 鼠标悬停变化时触发 */
  onHoverChange?: (value: number) => void;
}

// ==================== Star SVG ====================

const StarSVG: React.FC<{
  filled: boolean;
  half: boolean;
  size: number;
  color: string;
  bgColor: string;
  character?: React.ReactNode;
}> = ({ filled, half, size, color, bgColor, character }) => {
  if (character) {
    return (
      <span
        className="soui-rate-character"
        style={{
          fontSize: size,
          color: filled ? color : bgColor,
          opacity: half ? 0.5 : 1,
        }}
      >
        {character}
      </span>
    );
  }

  return (
    <svg
      viewBox="0 0 1024 1024"
      width={size}
      height={size}
      className={classNames('soui-rate-star-svg', {
        'soui-rate-star-filled': filled,
        'soui-rate-star-half': half,
      })}
    >
      {half ? (
        <>
          {/* 背景星（未选中色） */}
          <path
            d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.8 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 730.5l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.4z"
            fill={bgColor}
          />
          {/* 前景星（选中色），左半部分 */}
          <defs>
            <clipPath id="half-star-clip">
              <rect x="0" y="0" width="512" height="1024" />
            </clipPath>
          </defs>
          <path
            d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.8 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 730.5l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.4z"
            fill={color}
            clipPath="url(#half-star-clip)"
          />
        </>
      ) : (
        <path
          d="M908.1 353.1l-253.9-36.9L540.7 86.1c-3.1-6.3-8.2-11.4-14.5-14.5-15.8-7.8-35-1.3-42.8 14.5L369.8 316.2l-253.9 36.9c-7 1-13.4 4.3-18.3 9.3a32.05 32.05 0 00.6 45.3l183.7 179.1-43.4 252.9a31.95 31.95 0 0046.4 33.7L512 730.5l227.1 119.4c6.2 3.3 13.4 4.4 20.3 3.2 17.4-3 29.1-19.5 26.1-36.9l-43.4-252.9 183.7-179.1c5-4.9 8.3-11.3 9.3-18.3 2.7-17.5-9.5-33.7-27-36.4z"
          fill={filled ? color : bgColor}
        />
      )}
    </svg>
  );
};

// ==================== 尺寸映射 ====================

const sizeMap: Record<RateSize, number> = {
  small: 16,
  medium: 20,
  large: 25,
};

// ==================== 主组件 ====================

/**
 * Rate 评分
 *
 * 评分组件，用于对事物进行评级或打分。
 */
const Rate: React.FC<RateProps> = ({
  value: controlledValue,
  defaultValue = 0,
  count = 5,
  allowHalf = false,
  allowClear = true,
  disabled = false,
  character,
  tooltips,
  size = 'medium',
  onChange,
  onHoverChange,
  className,
  style,
  ...rest
}) => {
  const context = useContext(ConfigContext);
  const rateTheme = (context?.components?.Rate || {}) as Record<string, any>;

  // 受控 / 非受控
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [hoverValue, setHoverValue] = useState(0);
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? controlledValue : internalValue;

  const starRefs = useRef<(HTMLDivElement | null)[]>([]);

  // 主题 → CSS 变量
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (rateTheme.fontSize !== undefined) {
    cssVars['--soui-rate-font-size'] = `${rateTheme.fontSize}px`;
  }
  if (rateTheme.starColor) {
    cssVars['--soui-rate-star-color'] = rateTheme.starColor;
  }
  if (rateTheme.starBg) {
    cssVars['--soui-rate-star-bg'] = rateTheme.starBg;
  }
  if (rateTheme.starSizeSM !== undefined) {
    cssVars['--soui-rate-star-size-sm'] = `${rateTheme.starSizeSM}px`;
  }
  if (rateTheme.starSize !== undefined) {
    cssVars['--soui-rate-star-size'] = `${rateTheme.starSize}px`;
  }
  if (rateTheme.starSizeLG !== undefined) {
    cssVars['--soui-rate-star-size-lg'] = `${rateTheme.starSizeLG}px`;
  }

  const starSize = sizeMap[size];

  // 计算每个星星的填充状态
  const getStarState = useCallback(
    (index: number) => {
      const displayValue = hoverValue || currentValue;
      const starIndex = index + 1; // 1-based

      if (allowHalf) {
        if (displayValue >= starIndex) return 'full';
        if (displayValue >= starIndex - 0.5) return 'half';
        return 'empty';
      }
      return displayValue >= starIndex ? 'full' : 'empty';
    },
    [hoverValue, currentValue, allowHalf]
  );

  // 获取点击值
  const getValueFromEvent = useCallback(
    (index: number, e: React.MouseEvent): number => {
      if (!allowHalf) return index + 1;

      const el = starRefs.current[index];
      if (!el) return index + 1;

      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      return x < rect.width / 2 ? index + 0.5 : index + 1;
    },
    [allowHalf]
  );

  const handleClick = useCallback(
    (index: number, e: React.MouseEvent) => {
      if (disabled) return;

      const newValue = getValueFromEvent(index, e);

      // allowClear: 再次点击相同值时清除
      if (allowClear && newValue === currentValue) {
        const clearedValue = 0;
        if (!isControlled) setInternalValue(clearedValue);
        onChange?.(clearedValue);
      } else {
        if (!isControlled) setInternalValue(newValue);
        onChange?.(newValue);
      }
    },
    [disabled, allowClear, currentValue, isControlled, onChange, getValueFromEvent]
  );

  const handleMouseMove = useCallback(
    (index: number, e: React.MouseEvent) => {
      if (disabled) return;
      const newValue = getValueFromEvent(index, e);
      setHoverValue(newValue);
      onHoverChange?.(newValue);
    },
    [disabled, getValueFromEvent, onHoverChange]
  );

  const handleMouseLeave = useCallback(() => {
    if (disabled) return;
    setHoverValue(0);
    onHoverChange?.(0);
  }, [disabled, onHoverChange]);

  // 键盘支持
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
        e.preventDefault();
        const step = allowHalf ? 0.5 : 1;
        const newValue = Math.min(currentValue + step, count);
        if (!isControlled) setInternalValue(newValue);
        onChange?.(newValue);
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
        e.preventDefault();
        const step = allowHalf ? 0.5 : 1;
        const newValue = Math.max(currentValue - step, 0);
        if (!isControlled) setInternalValue(newValue);
        onChange?.(newValue);
      }
    },
    [disabled, allowHalf, currentValue, count, isControlled, onChange]
  );

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  return (
    <div
      className={classNames(
        'soui-rate',
        {
          'soui-rate-disabled': disabled,
          'soui-rate-readonly': disabled,
        },
        className
      )}
      style={componentStyle}
      role="slider"
      aria-valuemin={0}
      aria-valuemax={count}
      aria-valuenow={currentValue}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      onKeyDown={handleKeyDown}
      onMouseLeave={handleMouseLeave}
      {...rest}
    >
      {Array.from({ length: count }).map((_, index) => {
        const state = getStarState(index);
        const tooltip = tooltips?.[index];

        return (
          <div
            key={index}
            ref={(el) => { starRefs.current[index] = el; }}
            className={classNames('soui-rate-star', {
              'soui-rate-star-full': state === 'full',
              'soui-rate-star-half': state === 'half',
              'soui-rate-star-empty': state === 'empty',
              'soui-rate-star-hover': hoverValue > 0 && (
                allowHalf
                  ? hoverValue >= index + 0.5
                  : hoverValue >= index + 1
              ),
            })}
            onClick={(e) => handleClick(index, e)}
            onMouseMove={(e) => handleMouseMove(index, e)}
            title={tooltip}
          >
            <StarSVG
              filled={state === 'full'}
              half={state === 'half'}
              size={starSize}
              color="var(--soui-rate-star-color, #fadb14)"
              bgColor="var(--soui-rate-star-bg, rgba(0, 0, 0, 0.12))"
              character={character}
            />
          </div>
        );
      })}
    </div>
  );
};

export default Rate;
