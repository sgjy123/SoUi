import React, { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import dayjs, { type Dayjs } from 'dayjs';
import {
  getDefaultFormat,
  getCalendarDays,
  checkDisabled,
  WEEK_LABELS,
  type PickerMode,
  type CalendarDay,
} from './utils';

// ==================== Types ====================

export type RangeValue = [Date | null, Date | null] | null;
export type RangeDayjsValue = [Dayjs | null, Dayjs | null] | null;

export interface RangePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'placeholder' | 'defaultValue'> {
  /** 范围值（受控） */
  value?: RangeValue;
  /** 默认范围值 */
  defaultValue?: RangeValue;
  /** 选择器模式 */
  picker?: PickerMode;
  /** 日期格式 */
  format?: string;
  /** 占位文字 */
  placeholder?: [string, string];
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 尺寸 */
  size?: 'small' | 'middle' | 'large';
  /** 不可选择的日期 */
  disabledDate?: (currentDate: Dayjs) => boolean;
  /** 面板弹出方向 */
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  /** 预设快捷选项 */
  presets?: Array<{ label: React.ReactNode; value: [Date | Dayjs, Date | Dayjs] }>;
  /** 范围变化回调 */
  onChange?: (dates: RangeValue, dateStrings: [string, string]) => void;
  /** 面板打开/关闭回调 */
  onOpenChange?: (open: boolean) => void;
  /** 日历变化回调 */
  onCalendarChange?: (dates: RangeDayjsValue, dateStrings: [string, string]) => void;
}

// ==================== Helper ====================

function toDayjsRange(val: RangeValue): RangeDayjsValue {
  if (!val) return null;
  const [s, e] = val;
  const start = s ? (s instanceof Date ? dayjs(s) : dayjs(s)) : null;
  const end = e ? (e instanceof Date ? dayjs(e) : dayjs(e)) : null;
  return [start?.isValid() ? start : null, end?.isValid() ? end : null];
}

function toNativeRange(val: RangeDayjsValue): RangeValue {
  if (!val) return null;
  const [s, e] = val;
  return [s ? s.toDate() : null, e ? e.toDate() : null];
}

// ==================== RangePicker ====================

const RangePicker: React.FC<RangePickerProps> = ({
  value: controlledValue,
  defaultValue,
  picker = 'date',
  format: userFormat,
  placeholder,
  allowClear = true,
  disabled = false,
  size = 'middle',
  disabledDate,
  placement = 'bottomLeft',
  presets,
  onChange,
  onOpenChange,
  onCalendarChange,
  className,
  style,
  ...rest
}) => {
  const format = userFormat || getDefaultFormat(picker);

  // Range value
  const [internalRange, setInternalRange] = useState<RangeDayjsValue>(() => toDayjsRange(defaultValue ?? null));
  const isControlled = controlledValue !== undefined;
  const currentRange = isControlled ? toDayjsRange(controlledValue) : internalRange;
  const [startDate, endDate] = currentRange || [null, null];

  const [open, setOpen] = useState(false);
  const [activeInput, setActiveInput] = useState<'start' | 'end'>('start');
  const [startText, setStartText] = useState('');
  const [endText, setEndText] = useState('');
  const [hoverDate, setHoverDate] = useState<Dayjs | null>(null);
  const [placementClass, setPlacementClass] = useState(`soui-date-picker-panel--${placement}`);

  // Left panel view state
  const [leftYear, setLeftYear] = useState(() => (startDate || dayjs()).year());
  const [leftMonth, setLeftMonth] = useState(() => (startDate || dayjs()).month());

  // Right panel = left + 1 month
  const rightYear = leftMonth === 11 ? leftYear + 1 : leftYear;
  const rightMonth = (leftMonth + 1) % 12;

  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Sync input texts
  useEffect(() => {
    setStartText(startDate ? startDate.format(format) : '');
    setEndText(endDate ? endDate.format(format) : '');
  }, [startDate, endDate, format]);

  // Emit value
  const emitValue = useCallback(
    (range: RangeDayjsValue) => {
      if (!isControlled) setInternalRange(range);
      const native = toNativeRange(range);
      const strings: [string, string] = [
        range?.[0] ? range[0].format(format) : '',
        range?.[1] ? range[1].format(format) : '',
      ];
      onChange?.(native, strings);
      onCalendarChange?.(range, strings);
    },
    [isControlled, onChange, onCalendarChange, format],
  );

  // Select day for range
  const handleSelectDay = useCallback(
    (day: CalendarDay) => {
      if (day.isDisabled) return;
      const d = day.date;

      if (activeInput === 'start') {
        // 选起点
        if (endDate && d.isAfter(endDate, 'day')) {
          // 起点晚于终点，交换
          emitValue([d, null]);
          setActiveInput('end');
        } else {
          emitValue([d, endDate]);
          setActiveInput('end');
        }
      } else {
        // 选终点
        if (startDate && d.isBefore(startDate, 'day')) {
          // 终点早于起点，交换
          emitValue([d, null]);
          setActiveInput('end');
        } else {
          emitValue([startDate, d]);
          setOpen(false);
          onOpenChange?.(false);
        }
      }
    },
    [activeInput, startDate, endDate, emitValue, onOpenChange],
  );

  // Navigation
  const handlePrevMonth = () => {
    if (leftMonth === 0) { setLeftYear(leftYear - 1); setLeftMonth(11); }
    else setLeftMonth(leftMonth - 1);
  };
  const handleNextMonth = () => {
    if (leftMonth === 11) { setLeftYear(leftYear + 1); setLeftMonth(0); }
    else setLeftMonth(leftMonth + 1);
  };
  const handlePrevYear = () => setLeftYear(leftYear - 1);
  const handleNextYear = () => setLeftYear(leftYear + 1);

  // Toggle panel
  const togglePanel = useCallback(
    (input?: 'start' | 'end') => {
      if (disabled) return;
      const next = !open;
      setOpen(next);
      onOpenChange?.(next);
      if (next) {
        setActiveInput(input || 'start');
        const v = startDate || dayjs();
        setLeftYear(v.year());
        setLeftMonth(v.month());
        setPlacementClass(`soui-date-picker-panel--${placement}`);
        setHoverDate(null);
      }
    },
    [disabled, open, onOpenChange, startDate, placement],
  );

  // Clear
  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      emitValue(null);
      setActiveInput('start');
    },
    [emitValue],
  );

  // Input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, type: 'start' | 'end') => {
      const val = e.target.value;
      if (type === 'start') setStartText(val);
      else setEndText(val);

      const parsed = dayjs(val, format, true);
      if (parsed.isValid()) {
        if (type === 'start') {
          if (endDate && parsed.isAfter(endDate, 'day')) {
            emitValue([parsed, null]);
            setActiveInput('end');
          } else {
            emitValue([parsed, endDate]);
          }
          setLeftYear(parsed.year());
          setLeftMonth(parsed.month());
        } else {
          if (startDate && parsed.isBefore(startDate, 'day')) {
            emitValue([parsed, null]);
          } else {
            emitValue([startDate, parsed]);
          }
        }
      }
    },
    [emitValue, endDate, startDate, format],
  );

  const handleInputBlur = useCallback(
    (type: 'start' | 'end') => {
      if (type === 'start') setStartText(startDate ? startDate.format(format) : '');
      else setEndText(endDate ? endDate.format(format) : '');
    },
    [startDate, endDate, format],
  );

  const handleInputFocus = useCallback(
    (type: 'start' | 'end') => {
      setActiveInput(type);
      const v = type === 'start' ? startDate : endDate;
      if (v) {
        setLeftYear(v.year());
        setLeftMonth(v.month());
      }
    },
    [startDate, endDate],
  );

  // Preset
  const handlePreset = useCallback(
    (val: [Date | Dayjs, Date | Dayjs]) => {
      const s = val[0] instanceof Date ? dayjs(val[0]) : val[0];
      const e = val[1] instanceof Date ? dayjs(val[1]) : val[1];
      emitValue([s, e]);
      setOpen(false);
      onOpenChange?.(false);
    },
    [emitValue, onOpenChange],
  );

  // Outside click
  useEffect(() => {
    if (!open) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current && !panelRef.current.contains(target) &&
        triggerRef.current && !triggerRef.current.contains(target)
      ) {
        setOpen(false);
        onOpenChange?.(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [open, onOpenChange]);

  // Viewport overflow
  useLayoutEffect(() => {
    if (!open || !triggerRef.current || !panelRef.current) return;
    const panel = panelRef.current;
    const triggerRect = triggerRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    const PANEL_H = 400;
    const gap = 8;

    const [userVAlign, userHAlign] = placement.split(/(?=[A-Z])/);
    let vAlign: 'top' | 'bottom' = userVAlign as 'top' | 'bottom';
    const hAlign: 'Left' | 'Right' = userHAlign as 'Left' | 'Right';

    const spaceBelow = vh - triggerRect.bottom - gap;
    const spaceAbove = triggerRect.top - gap;
    if (vAlign === 'bottom' && spaceBelow < PANEL_H && spaceAbove > spaceBelow) vAlign = 'top';
    else if (vAlign === 'top' && spaceAbove < PANEL_H && spaceBelow > spaceAbove) vAlign = 'bottom';

    setPlacementClass(`soui-date-picker-panel--${vAlign}${hAlign}`);
  }, [open, placement]);

  // Render one panel
  const renderPanel = (year: number, month: number, label: string) => {
    const calendarDays = getCalendarDays(year, month, null, disabledDate, startDate, endDate, hoverDate);

    return (
      <div className="soui-date-picker-range-panel">
        <div className="soui-date-picker-header">
          <span className="soui-date-picker-header-title">{label}</span>
        </div>
        <div className="soui-date-picker-calendar">
          <div className="soui-date-picker-weekdays">
            {WEEK_LABELS.map((l) => (
              <span key={l} className="soui-date-picker-weekday">{l}</span>
            ))}
          </div>
          <div className="soui-date-picker-days">
            {calendarDays.map((day, idx) => (
              <button key={idx} type="button"
                className={classNames('soui-date-picker-day', {
                  'soui-date-picker-day--other-month': !day.isCurrentMonth,
                  'soui-date-picker-day--today': day.isToday,
                  'soui-date-picker-day--selected': day.isRangeStart || day.isRangeEnd,
                  'soui-date-picker-day--in-range': day.isInRange && !day.isRangeStart && !day.isRangeEnd,
                  'soui-date-picker-day--range-hover': day.isRangeHover,
                  'soui-date-picker-day--disabled': day.isDisabled,
                })}
                onClick={() => handleSelectDay(day)}
                onMouseEnter={() => {
                  if (startDate && !endDate) setHoverDate(day.date);
                }}
                onMouseLeave={() => setHoverDate(null)}
                disabled={day.isDisabled}
                aria-label={day.date.format('YYYY年M月D日')}
              >
                {day.day}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const defaultPlaceholder: [string, string] = ['开始日期', '结束日期'];
  const ph = placeholder || defaultPlaceholder;

  return (
    <div
      className={classNames('soui-date-picker', 'soui-date-picker--range', `soui-date-picker--${size}`, { 'soui-date-picker--disabled': disabled, 'soui-date-picker--open': open }, className)}
      style={style}
      {...rest}
    >
      <div ref={triggerRef} className="soui-date-picker-trigger soui-date-picker-range-trigger"
        role="button" aria-haspopup="dialog" aria-expanded={open} tabIndex={disabled ? -1 : 0}
      >
        <input className="soui-date-picker-input" value={startText}
          onChange={(e) => handleInputChange(e, 'start')}
          onBlur={() => handleInputBlur('start')}
          onFocus={() => { if (!open) togglePanel('start'); else handleInputFocus('start'); }}
          onClick={() => { if (!open) togglePanel('start'); else setActiveInput('start'); }}
          placeholder={ph[0]} disabled={disabled}
          aria-label={ph[0]}
        />
        <span className="soui-date-picker-range-separator">~</span>
        <input className="soui-date-picker-input" value={endText}
          onChange={(e) => handleInputChange(e, 'end')}
          onBlur={() => handleInputBlur('end')}
          onFocus={() => { if (!open) togglePanel('end'); else handleInputFocus('end'); }}
          onClick={() => { if (!open) togglePanel('end'); else setActiveInput('end'); }}
          placeholder={ph[1]} disabled={disabled}
          aria-label={ph[1]}
        />
        {allowClear && (startDate || endDate) && !disabled && (
          <span className="soui-date-picker-clear" onClick={handleClear}
            onMouseDown={(e) => e.preventDefault()}
            role="button" aria-label="清除" tabIndex={-1}
          >
            <Icon name="Close" size={12} theme="outline" />
          </span>
        )}
        <span className="soui-date-picker-icon" aria-hidden="true">
          <Icon name="Calendar" size={16} theme="outline" />
        </span>
      </div>

      {open && (
        <div ref={panelRef} className={classNames('soui-date-picker-panel', 'soui-date-picker-range-panels', placementClass)} role="dialog" aria-label="范围选择面板">
          <div className="soui-date-picker-range-nav">
            <button type="button" className="soui-date-picker-header-btn" onClick={handlePrevYear} aria-label="上一年">«</button>
            <button type="button" className="soui-date-picker-header-btn" onClick={handlePrevMonth} aria-label="上一月">‹</button>
            <span className="soui-date-picker-range-nav-spacer" />
            <button type="button" className="soui-date-picker-header-btn" onClick={handleNextMonth} aria-label="下一月">›</button>
            <button type="button" className="soui-date-picker-header-btn" onClick={handleNextYear} aria-label="下一年">»</button>
          </div>
          <div className="soui-date-picker-range-panels-body">
            {renderPanel(leftYear, leftMonth, `${leftYear}年 ${leftMonth + 1}月`)}
            {renderPanel(rightYear, rightMonth, `${rightYear}年 ${rightMonth + 1}月`)}
          </div>
          {presets && presets.length > 0 && (
            <div className="soui-date-picker-footer">
              <div className="soui-date-picker-presets">
                {presets.map((p, i) => (
                  <button key={i} type="button" className="soui-date-picker-preset-btn" onClick={() => handlePreset(p.value)}>
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RangePicker;
