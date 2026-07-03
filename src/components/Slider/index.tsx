import React, { useState, useCallback, useRef, useContext } from 'react';
import classNames from 'classnames';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

// ==================== Types ====================

export type SliderOrientation = 'horizontal' | 'vertical';

export interface SliderMark {
  style?: React.CSSProperties;
  label: React.ReactNode;
}

export type SliderMarks = Record<number, React.ReactNode | SliderMark>;

export interface SliderTooltipConfig {
  /** 是否始终显示 */
  open?: boolean;
  /** 格式化显示内容，null 则隐藏 */
  formatter?: ((value: number) => React.ReactNode) | null;
}

export interface SliderRangeConfig {
  /** 允许拖拽整个选中区间 */
  draggableTrack?: boolean;
}

export interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** 最小值 */
  min?: number;
  /** 最大值 */
  max?: number;
  /** 步长，设为 null 时仅可选 marks/min/max */
  step?: number | null;
  /** 当前值（受控）。单滑块为 number，range 为 [number, number] */
  value?: number | [number, number];
  /** 默认值 */
  defaultValue?: number | [number, number];
  /** 是否禁用 */
  disabled?: boolean;
  /** 是否启用双滑块范围选择 */
  range?: boolean | SliderRangeConfig;
  /** 布局方向 */
  orientation?: SliderOrientation;
  /** 反转坐标轴方向 */
  reverse?: boolean;
  /** 刻度标记 */
  marks?: SliderMarks;
  /** 是否显示刻度点 */
  dots?: boolean;
  /** 是否包含在轨道区间内 */
  included?: boolean;
  /** 悬浮提示配置 */
  tooltip?: SliderTooltipConfig;
  /** 是否允许键盘操作 */
  keyboard?: boolean;
  /** 值变化回调 */
  onChange?: (value: number | [number, number]) => void;
  /** 值变化完成回调（鼠标释放/键盘松开） */
  onChangeComplete?: (value: number | [number, number]) => void;
}

// ==================== Helpers ====================

function clamp(val: number, min: number, max: number): number {
  return Math.min(Math.max(val, min), max);
}

function snapToStep(val: number, min: number, max: number, step: number | null, marks?: SliderMarks): number {
  if (step === null) {
    const points = [min, max, ...Object.keys(marks || {}).map(Number)];
    let closest = points[0];
    let minDist = Math.abs(val - closest);
    for (let i = 1; i < points.length; i++) {
      const dist = Math.abs(val - points[i]);
      if (dist < minDist) {
        minDist = dist;
        closest = points[i];
      }
    }
    return clamp(closest, min, max);
  }
  const steps = Math.round((val - min) / step);
  return clamp(min + steps * step, min, max);
}

function toPercent(val: number, min: number, max: number): number {
  if (max === min) return 0;
  return ((val - min) / (max - min)) * 100;
}

function fromPercent(pct: number, min: number, max: number): number {
  return min + (pct / 100) * (max - min);
}

// ==================== Slider ====================

const Slider: React.FC<SliderProps> = ({
  min = 0,
  max = 100,
  step = 1,
  value: valueProp,
  defaultValue,
  disabled = false,
  range = false,
  orientation = 'horizontal',
  reverse = false,
  marks,
  dots = false,
  included = true,
  tooltip,
  keyboard = true,
  onChange,
  onChangeComplete,
  className,
  style,
  ...rest
}) => {
  const context = useContext(ConfigContext);
  const sliderTheme = (context?.components?.Slider || {}) as Record<string, any>;

  // CSS variable injection
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (sliderTheme.colorPrimary !== undefined) cssVars['--soui-slider-color-primary'] = sliderTheme.colorPrimary;
  if (sliderTheme.colorPrimaryHover !== undefined) cssVars['--soui-slider-color-primary-hover'] = sliderTheme.colorPrimaryHover;
  if (sliderTheme.handleSize !== undefined) cssVars['--soui-slider-handle-size'] = `${sliderTheme.handleSize}px`;
  if (sliderTheme.railSize !== undefined) cssVars['--soui-slider-rail-size'] = `${sliderTheme.railSize}px`;
  if (sliderTheme.dotSize !== undefined) cssVars['--soui-slider-dot-size'] = `${sliderTheme.dotSize}px`;
  if (sliderTheme.railBg !== undefined) cssVars['--soui-slider-rail-bg'] = sliderTheme.railBg;
  if (sliderTheme.trackBg !== undefined) cssVars['--soui-slider-track-bg'] = sliderTheme.trackBg;
  if (sliderTheme.handleColor !== undefined) cssVars['--soui-slider-handle-color'] = sliderTheme.handleColor;
  if (sliderTheme.handleActiveColor !== undefined) cssVars['--soui-slider-handle-active-color'] = sliderTheme.handleActiveColor;

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  const isRange = !!range;
  const isVertical = orientation === 'vertical';

  // State
  const isControlled = valueProp !== undefined;
  const initVal: number | [number, number] = isRange
    ? (Array.isArray(defaultValue) ? defaultValue as [number, number] : [min, min] as [number, number])
    : (typeof defaultValue === 'number' ? defaultValue : min);

  const [innerValue, setInnerValue] = useState<number | [number, number]>(initVal);
  const currentValue = isControlled ? valueProp! : innerValue;
  const currentValueRef = useRef(currentValue);
  currentValueRef.current = currentValue;

  // Refs
  const railRef = useRef<HTMLDivElement>(null);
  const wasDragged = useRef(false);

  // Helpers
  const getValues = (): number[] => {
    if (isRange && Array.isArray(currentValue)) return [...currentValue];
    return [typeof currentValue === 'number' ? currentValue : min];
  };

  const setValues = useCallback(
    (vals: number[]) => {
      const newVal = isRange ? [vals[0], vals[1]] as [number, number] : vals[0];
      if (!isControlled) setInnerValue(newVal);
      onChange?.(newVal);
    },
    [isRange, isControlled, onChange],
  );

  // Get percent from mouse/touch position
  const getPercent = useCallback(
    (clientX: number, clientY: number): number => {
      if (!railRef.current) return 0;
      const rect = railRef.current.getBoundingClientRect();
      let pct: number;
      if (isVertical) {
        pct = ((rect.bottom - clientY) / rect.height) * 100;
      } else {
        pct = ((clientX - rect.left) / rect.width) * 100;
      }
      if (reverse) pct = 100 - pct;
      return clamp(pct, 0, 100);
    },
    [isVertical, reverse],
  );

  // Update value from percent
  const updateValue = useCallback(
    (pct: number, index: number) => {
      const raw = fromPercent(pct, min, max);
      const snapped = snapToStep(raw, min, max, step, marks);
      const vals = getValues();
      vals[index] = snapped;
      if (isRange && vals.length === 2) {
        if (index === 0 && vals[0] > vals[1]) vals[0] = vals[1];
        if (index === 1 && vals[1] < vals[0]) vals[1] = vals[0];
      }
      setValues(vals);
    },
    [min, max, step, marks, isRange, setValues],
  );

  // ---- Handle drag (mouse) ----
  const startDragMouse = useCallback(
    (index: number) => (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      e.stopPropagation();
      wasDragged.current = false;

      const onMove = (ev: MouseEvent) => {
        wasDragged.current = true;
        updateValue(getPercent(ev.clientX, ev.clientY), index);
      };
      const onUp = () => {
        if (wasDragged.current) onChangeComplete?.(currentValueRef.current);
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
      };
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    },
    [disabled, updateValue, getPercent, onChangeComplete],
  );

  // ---- Handle drag (touch) ----
  const startDragTouch = useCallback(
    (index: number) => (e: React.TouchEvent) => {
      if (disabled) return;
      e.stopPropagation();
      wasDragged.current = false;

      const onMove = (ev: TouchEvent) => {
        wasDragged.current = true;
        const t = ev.touches[0];
        updateValue(getPercent(t.clientX, t.clientY), index);
      };
      const onEnd = () => {
        if (wasDragged.current) onChangeComplete?.(currentValueRef.current);
        document.removeEventListener('touchmove', onMove);
        document.removeEventListener('touchend', onEnd);
      };
      document.addEventListener('touchmove', onMove, { passive: false });
      document.addEventListener('touchend', onEnd);
    },
    [disabled, updateValue, getPercent, onChangeComplete],
  );

  // ---- Rail click (on container, bubbles from rail/track) ----
  const handleRailClick = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || wasDragged.current) {
        wasDragged.current = false;
        return;
      }
      const pct = getPercent(e.clientX, e.clientY);
      const raw = fromPercent(pct, min, max);
      const snapped = snapToStep(raw, min, max, step, marks);
      const vals = getValues();

      if (isRange && vals.length === 2) {
        const d0 = Math.abs(vals[0] - snapped);
        const d1 = Math.abs(vals[1] - snapped);
        if (d0 <= d1) {
          vals[0] = snapped;
          if (vals[0] > vals[1]) vals[0] = vals[1];
        } else {
          vals[1] = snapped;
          if (vals[1] < vals[0]) vals[1] = vals[0];
        }
      } else {
        vals[0] = snapped;
      }
      setValues(vals);
      onChangeComplete?.(isRange ? [vals[0], vals[1]] as [number, number] : vals[0]);
    },
    [disabled, getPercent, min, max, step, marks, isRange, setValues, onChangeComplete],
  );

  // ---- Keyboard ----
  const handleKeyDown = useCallback(
    (index: number) => (e: React.KeyboardEvent) => {
      if (!keyboard || disabled) return;
      const vals = getValues();
      let newVal = vals[index];
      const stepVal = step || 1;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowUp':
          e.preventDefault();
          newVal = clamp(newVal + stepVal, min, max);
          break;
        case 'ArrowLeft':
        case 'ArrowDown':
          e.preventDefault();
          newVal = clamp(newVal - stepVal, min, max);
          break;
        case 'Home':
          e.preventDefault();
          newVal = min;
          break;
        case 'End':
          e.preventDefault();
          newVal = max;
          break;
        default:
          return;
      }

      if (step !== null) newVal = snapToStep(newVal, min, max, step, marks);
      vals[index] = newVal;
      if (isRange && vals.length === 2) {
        if (index === 0 && vals[0] > vals[1]) vals[0] = vals[1];
        if (index === 1 && vals[1] < vals[0]) vals[1] = vals[0];
      }
      setValues(vals);
      onChangeComplete?.(isRange ? [vals[0], vals[1]] as [number, number] : vals[0]);
    },
    [keyboard, disabled, step, min, max, marks, isRange, setValues, onChangeComplete],
  );

  // ---- Compute percents ----
  const vals = getValues();
  const percents = vals.map((v) => toPercent(v, min, max));

  // Track inline style
  const trackStyle: React.CSSProperties = (() => {
    if (isRange && percents.length === 2) {
      const lo = Math.min(percents[0], percents[1]);
      const hi = Math.max(percents[0], percents[1]);
      return isVertical
        ? { bottom: `${lo}%`, height: `${hi - lo}%` }
        : { left: `${lo}%`, width: `${hi - lo}%` };
    }
    const p = percents[0];
    return isVertical
      ? { bottom: '0%', height: `${p}%` }
      : { left: '0%', width: `${p}%` };
  })();

  // Handle position style
  const handlePos = (pct: number): React.CSSProperties => {
    if (isVertical) return { bottom: reverse ? `${100 - pct}%` : `${pct}%` };
    return { left: reverse ? `${100 - pct}%` : `${pct}%` };
  };

  // Tooltip config
  const tooltipAlwaysOpen = tooltip?.open;
  const tooltipFormatter = tooltip?.formatter;

  // Marks
  const markEntries = marks
    ? Object.entries(marks).map(([k, v]) => {
        const key = Number(k);
        const isObj = v !== null && typeof v === 'object' && !Array.isArray(v);
        const config = isObj && 'label' in (v as object) ? (v as SliderMark) : { label: v as React.ReactNode };
        return { key, config };
      })
    : [];

  // Class
  const sliderCls = classNames(
    'soui-slider',
    {
      'soui-slider-vertical': isVertical,
      'soui-slider-horizontal': !isVertical,
      'soui-slider-disabled': disabled,
      'soui-slider-with-marks': !!marks,
    },
    className,
  );

  return (
    <div className={sliderCls} style={componentStyle} onClick={handleRailClick} {...rest}>
      {/* Rail (background bar + click target) */}
      <div ref={railRef} className="soui-slider-rail">
        {/* Track (colored portion) */}
        {included && <div className="soui-slider-track" style={trackStyle} />}
      </div>

      {/* Handles (outside rail, positioned relative to slider container) */}
      {percents.map((pct, i) => {
        const val = vals[i];
        const fmtVal = tooltipFormatter === null
          ? null
          : tooltipFormatter
            ? tooltipFormatter(val)
            : val;
        const forceShow = tooltipAlwaysOpen === true;
        const forceHide = tooltipAlwaysOpen === false || tooltipFormatter === null;

        return (
          <div
            key={i}
            className={classNames('soui-slider-handle', { 'soui-slider-handle-disabled': disabled })}
            style={handlePos(pct)}
            role="slider"
            tabIndex={disabled ? -1 : 0}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuenow={val}
            aria-label={isRange ? `Slider handle ${i + 1}` : 'Slider'}
            aria-disabled={disabled}
            onMouseDown={startDragMouse(i)}
            onTouchStart={startDragTouch(i)}
            onKeyDown={handleKeyDown(i)}
          >
            {!forceHide && fmtVal !== null && (
              <div className={classNames('soui-slider-tooltip', { 'soui-slider-tooltip-always': forceShow })}>
                {fmtVal}
              </div>
            )}
          </div>
        );
      })}

      {/* Dots */}
      {dots && step !== null && step > 0 &&
        Array.from({ length: Math.round((max - min) / step) + 1 }).map((_, i) => {
          const dotVal = min + i * step;
          const dotPct = toPercent(dotVal, min, max);
          const isDotStart = dotPct === 0;
          const isDotEnd = dotPct === 100;
          const active = included && (
            isRange && percents.length === 2
              ? dotPct >= Math.min(percents[0], percents[1]) && dotPct <= Math.max(percents[0], percents[1])
              : dotPct <= percents[0]
          );
          let dotStyle: React.CSSProperties;
          if (isVertical) {
            dotStyle = isDotStart
              ? { bottom: 0 }
              : isDotEnd
                ? { top: 0 }
                : { bottom: `${dotPct}%` };
          } else {
            dotStyle = isDotStart
              ? { left: 0 }
              : isDotEnd
                ? { right: 0 }
                : { left: `${dotPct}%` };
          }
          return (
            <div
              key={i}
              className={classNames('soui-slider-dot', {
                'soui-slider-dot-active': active,
                'soui-slider-dot-start': isDotStart,
                'soui-slider-dot-end': isDotEnd,
              })}
              style={dotStyle}
            />
          );
        })
      }

      {/* Marks */}
      {markEntries.length > 0 && (
        <div className="soui-slider-marks">
          {markEntries.map(({ key, config }) => {
            const markPct = toPercent(key, min, max);
            return (
              <div
                key={key}
                className="soui-slider-mark"
                style={{
                  ...(isVertical ? { bottom: `${markPct}%` } : { left: `${markPct}%` }),
                  ...(config.style || {}),
                }}
              >
                <div className="soui-slider-mark-dot" />
                <div className="soui-slider-mark-text">{config.label}</div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Slider;
