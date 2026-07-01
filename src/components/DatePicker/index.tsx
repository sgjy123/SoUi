import React, { useState, useRef, useCallback, useEffect, useLayoutEffect } from 'react';
import classNames from 'classnames';
import dayjs, { type Dayjs } from 'dayjs';
import {
  getDefaultFormat,
  getCalendarDays,
  getMonths,
  getYearRange,
  getWeekNumber,
  checkDisabled,
  WEEK_LABELS,
  MONTH_LABELS,
  type PickerMode,
  type CalendarDay,
} from './utils';
import './style.less';

// ==================== Types ====================

export type DatePickerSize = 'small' | 'middle' | 'large';
export type DatePickerPlacement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';

export interface DatePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'placeholder' | 'defaultValue'> {
  /** 当前日期值（受控） */
  value?: Date | string | null;
  /** 默认日期值（非受控） */
  defaultValue?: Date | string | null;
  /** 选择器模式 */
  picker?: PickerMode;
  /** 日期格式 */
  format?: string;
  /** 占位文字 */
  placeholder?: string;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 是否禁用 */
  disabled?: boolean;
  /** 尺寸 */
  size?: DatePickerSize;
  /** 不可选择的日期 */
  disabledDate?: (currentDate: Dayjs) => boolean;
  /** 面板弹出方向 */
  placement?: DatePickerPlacement;
  /** 是否显示时间选择器 */
  showTime?: boolean;
  /** 是否显示"此刻"按钮 */
  showNow?: boolean;
  /** 是否显示"今天"按钮 */
  showToday?: boolean;
  /** 预设快捷选项 */
  presets?: Array<{ label: React.ReactNode; value: Date | Dayjs }>;
  /** 日期变化回调 */
  onChange?: (date: Date | null, dateString: string) => void;
  /** 面板打开/关闭回调 */
  onOpenChange?: (open: boolean) => void;
  /** 面板日期变化回调 */
  onPanelChange?: (date: Date, mode: PickerMode) => void;
}

// ==================== Helper ====================

function toDayjs(val: Date | string | null | undefined): Dayjs | null {
  if (!val) return null;
  if (val instanceof Date) return dayjs(val);
  const d = dayjs(val);
  return d.isValid() ? d : null;
}

// ==================== DatePicker ====================

const DatePicker: React.FC<DatePickerProps> = ({
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
  showTime = false,
  showNow = true,
  showToday = true,
  presets,
  onChange,
  onOpenChange,
  onPanelChange,
  className,
  style,
  ...rest
}) => {
  const format = userFormat || getDefaultFormat(picker, showTime);

  // --- Value state ---
  const [internalValue, setInternalValue] = useState<Dayjs | null>(() => toDayjs(defaultValue));
  const isControlled = controlledValue !== undefined;
  const currentValue = isControlled ? toDayjs(controlledValue) : internalValue;

  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [placementClass, setPlacementClass] = useState(`soui-date-picker-panel--${placement}`);
  const [showTimePanel, setShowTimePanel] = useState(false);

  // Time state
  const [timeHour, setTimeHour] = useState(() => currentValue ? currentValue.hour() : 0);
  const [timeMinute, setTimeMinute] = useState(() => currentValue ? currentValue.minute() : 0);
  const [timeSecond, setTimeSecond] = useState(() => currentValue ? currentValue.second() : 0);

  // Panel nav state
  const [viewYear, setViewYear] = useState(() => (currentValue || dayjs()).year());
  const [viewMonth, setViewMonth] = useState(() => (currentValue || dayjs()).month());
  const [panelMode, setPanelMode] = useState<PickerMode>(picker);

  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Sync input text
  useEffect(() => {
    setInputText(currentValue ? currentValue.format(format) : '');
  }, [currentValue, format]);

  // Sync time state from value
  useEffect(() => {
    if (currentValue) {
      setTimeHour(currentValue.hour());
      setTimeMinute(currentValue.minute());
      setTimeSecond(currentValue.second());
    }
  }, [currentValue]);

  // Update view when value changes
  useEffect(() => {
    if (currentValue) {
      setViewYear(currentValue.year());
      setViewMonth(currentValue.month());
    }
  }, [currentValue]);

  // Emit value
  const emitValue = useCallback(
    (date: Dayjs | null) => {
      if (!isControlled) setInternalValue(date);
      onChange?.(date ? date.toDate() : null, date ? date.format(format) : '');
    },
    [isControlled, onChange, format],
  );

  // Select day
  const handleSelectDay = useCallback(
    (day: CalendarDay) => {
      if (day.isDisabled) return;
      if (showTime) {
        // 选日期但保留时间
        const merged = day.date.hour(timeHour).minute(timeMinute).second(timeSecond);
        emitValue(merged);
      } else {
        emitValue(day.date);
        setOpen(false);
        onOpenChange?.(false);
      }
    },
    [emitValue, showTime, timeHour, timeMinute, timeSecond, onOpenChange],
  );

  // Select month
  const handleSelectMonth = useCallback(
    (month: number) => {
      if (picker === 'month') {
        const d = dayjs().year(viewYear).month(month).startOf('month');
        emitValue(d);
        setOpen(false);
        onOpenChange?.(false);
      } else {
        setViewMonth(month);
        setPanelMode(picker);
        onPanelChange?.(dayjs().year(viewYear).month(month).startOf('month').toDate(), picker);
      }
    },
    [picker, viewYear, emitValue, onOpenChange, onPanelChange],
  );

  // Select year
  const handleSelectYear = useCallback(
    (year: number) => {
      if (picker === 'year') {
        const d = dayjs().year(year).startOf('year');
        emitValue(d);
        setOpen(false);
        onOpenChange?.(false);
      } else {
        setViewYear(year);
        setPanelMode('month');
        onPanelChange?.(dayjs().year(year).month(viewMonth).startOf('month').toDate(), 'month');
      }
    },
    [picker, viewMonth, emitValue, onOpenChange, onPanelChange],
  );

  // Navigation
  const handlePrevMonth = () => {
    if (viewMonth === 0) { setViewYear(viewYear - 1); setViewMonth(11); }
    else setViewMonth(viewMonth - 1);
  };
  const handleNextMonth = () => {
    if (viewMonth === 11) { setViewYear(viewYear + 1); setViewMonth(0); }
    else setViewMonth(viewMonth + 1);
  };
  const handlePrevYear = () => setViewYear(viewYear - 1);
  const handleNextYear = () => setViewYear(viewYear + 1);
  const handlePrevDecade = () => setViewYear(viewYear - 10);
  const handleNextDecade = () => setViewYear(viewYear + 10);

  // Today
  const handleToday = useCallback(() => {
    const now = dayjs();
    emitValue(now);
    setViewYear(now.year());
    setViewMonth(now.month());
    if (!showTime) {
      setOpen(false);
      onOpenChange?.(false);
    }
  }, [emitValue, showTime, onOpenChange]);

  // Now (with time)
  const handleNow = useCallback(() => {
    const now = dayjs();
    emitValue(now);
    setViewYear(now.year());
    setViewMonth(now.month());
    setShowTimePanel(false);
    setOpen(false);
    onOpenChange?.(false);
  }, [emitValue, onOpenChange]);

  // Preset
  const handlePreset = useCallback(
    (val: Date | Dayjs) => {
      const d = val instanceof Date ? dayjs(val) : val;
      emitValue(d);
      setShowTimePanel(false);
      setOpen(false);
      onOpenChange?.(false);
    },
    [emitValue, onOpenChange],
  );

  // Confirm time
  const handleConfirmTime = useCallback(() => {
    if (currentValue) {
      emitValue(currentValue.hour(timeHour).minute(timeMinute).second(timeSecond));
    }
    setShowTimePanel(false);
    setOpen(false);
    onOpenChange?.(false);
  }, [currentValue, emitValue, timeHour, timeMinute, timeSecond, onOpenChange]);

  // Time change
  const handleTimeChange = useCallback(
    (type: 'hour' | 'minute' | 'second', val: number) => {
      if (type === 'hour') setTimeHour(val);
      else if (type === 'minute') setTimeMinute(val);
      else setTimeSecond(val);
      // 实时更新预览
      if (currentValue) {
        const h = type === 'hour' ? val : timeHour;
        const m = type === 'minute' ? val : timeMinute;
        const s = type === 'second' ? val : timeSecond;
        const updated = currentValue.hour(h).minute(m).second(s);
        if (!isControlled) setInternalValue(updated);
        onChange?.(updated.toDate(), updated.format(format));
      }
    },
    [currentValue, timeHour, timeMinute, timeSecond, isControlled, onChange, format],
  );

  // Toggle panel
  const togglePanel = useCallback(() => {
    if (disabled) return;
    const next = !open;
    setOpen(next);
    onOpenChange?.(next);
    if (next) {
      setPanelMode(picker);
      setShowTimePanel(false);
      const v = currentValue || dayjs();
      setViewYear(v.year());
      setViewMonth(v.month());
      setPlacementClass(`soui-date-picker-panel--${placement}`);
    }
  }, [disabled, open, onOpenChange, picker, currentValue, placement]);

  // Clear
  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      emitValue(null);
    },
    [emitValue],
  );

  // Input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      setInputText(val);
      const parsed = dayjs(val, format, true);
      if (parsed.isValid()) {
        emitValue(parsed);
        setViewYear(parsed.year());
        setViewMonth(parsed.month());
      }
    },
    [emitValue, format],
  );

  const handleInputBlur = useCallback(() => {
    setInputText(currentValue ? currentValue.format(format) : '');
  }, [currentValue, format]);

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
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const PANEL_W = showTime ? 340 : 300;
    const PANEL_H = showTime ? 440 : 380;
    const gap = 8;

    const [userVAlign, userHAlign] = placement.split(/(?=[A-Z])/);
    let vAlign: 'top' | 'bottom' = userVAlign as 'top' | 'bottom';
    let hAlign: 'Left' | 'Right' = userHAlign as 'Left' | 'Right';

    const spaceBelow = vh - triggerRect.bottom - gap;
    const spaceAbove = triggerRect.top - gap;
    if (vAlign === 'bottom' && spaceBelow < PANEL_H && spaceAbove > spaceBelow) vAlign = 'top';
    else if (vAlign === 'top' && spaceAbove < PANEL_H && spaceBelow > spaceAbove) vAlign = 'bottom';

    const spaceRight = vw - triggerRect.left - gap;
    const spaceLeft = triggerRect.right - gap;
    let maxW = PANEL_W;

    if (hAlign === 'Left') {
      if (spaceRight < PANEL_W && spaceLeft >= PANEL_W) { hAlign = 'Right'; maxW = Math.min(PANEL_W, spaceLeft); }
      else maxW = Math.min(PANEL_W, spaceRight);
    } else {
      if (spaceLeft < PANEL_W && spaceRight >= PANEL_W) { hAlign = 'Left'; maxW = Math.min(PANEL_W, spaceRight); }
      else maxW = Math.min(PANEL_W, spaceLeft);
    }

    if (maxW < 200) {
      if (spaceRight >= spaceLeft) { hAlign = 'Left'; maxW = Math.max(200, spaceRight); }
      else { hAlign = 'Right'; maxW = Math.max(200, spaceLeft); }
    }

    setPlacementClass(`soui-date-picker-panel--${vAlign}${hAlign}`);
    panel.style.maxWidth = `${maxW}px`;
  }, [open, placement, showTime]);

  // Calendar grid
  const calendarDays = getCalendarDays(viewYear, viewMonth, currentValue, disabledDate);

  // Panel header
  const renderPanelHeader = () => {
    const decadeStart = Math.floor(viewYear / 10) * 10;

    if (panelMode === 'year') {
      return (
        <div className="soui-date-picker-header">
          <button type="button" className="soui-date-picker-header-btn" onClick={handlePrevDecade} aria-label="上十年">«</button>
          <span className="soui-date-picker-header-title">{decadeStart} - {decadeStart + 9}</span>
          <button type="button" className="soui-date-picker-header-btn" onClick={handleNextDecade} aria-label="下十年">»</button>
        </div>
      );
    }

    if (panelMode === 'month') {
      return (
        <div className="soui-date-picker-header">
          <button type="button" className="soui-date-picker-header-btn" onClick={handlePrevYear} aria-label="上一年">‹</button>
          <button type="button" className="soui-date-picker-header-title soui-date-picker-header-title--clickable" onClick={() => setPanelMode('year')}>{viewYear}年</button>
          <button type="button" className="soui-date-picker-header-btn" onClick={handleNextYear} aria-label="下一年">›</button>
        </div>
      );
    }

    return (
      <div className="soui-date-picker-header">
        <button type="button" className="soui-date-picker-header-btn" onClick={handlePrevYear} aria-label="上一年">«</button>
        <button type="button" className="soui-date-picker-header-btn" onClick={handlePrevMonth} aria-label="上一月">‹</button>
        <div className="soui-date-picker-header-title-group">
          <button type="button" className="soui-date-picker-header-title soui-date-picker-header-title--clickable" onClick={() => setPanelMode('year')}>{viewYear}年</button>
          <button type="button" className="soui-date-picker-header-title soui-date-picker-header-title--clickable" onClick={() => setPanelMode('month')}>{viewMonth + 1}月</button>
        </div>
        <button type="button" className="soui-date-picker-header-btn" onClick={handleNextMonth} aria-label="下一月">›</button>
        <button type="button" className="soui-date-picker-header-btn" onClick={handleNextYear} aria-label="下一年">»</button>
      </div>
    );
  };

  // Time panel
  const renderTimePanel = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const minutes = Array.from({ length: 60 }, (_, i) => i);
    const seconds = Array.from({ length: 60 }, (_, i) => i);

    return (
      <div className="soui-date-picker-time">
        <div className="soui-date-picker-time-header">选择时间</div>
        <div className="soui-date-picker-time-columns">
          <div className="soui-date-picker-time-column">
            <div className="soui-date-picker-time-label">时</div>
            <div className="soui-date-picker-time-list">
              {hours.map((h) => (
                <button
                  key={h}
                  type="button"
                  className={classNames('soui-date-picker-time-cell', { 'soui-date-picker-time-cell--selected': h === timeHour })}
                  onClick={() => handleTimeChange('hour', h)}
                >{String(h).padStart(2, '0')}</button>
              ))}
            </div>
          </div>
          <div className="soui-date-picker-time-column">
            <div className="soui-date-picker-time-label">分</div>
            <div className="soui-date-picker-time-list">
              {minutes.map((m) => (
                <button
                  key={m}
                  type="button"
                  className={classNames('soui-date-picker-time-cell', { 'soui-date-picker-time-cell--selected': m === timeMinute })}
                  onClick={() => handleTimeChange('minute', m)}
                >{String(m).padStart(2, '0')}</button>
              ))}
            </div>
          </div>
          <div className="soui-date-picker-time-column">
            <div className="soui-date-picker-time-label">秒</div>
            <div className="soui-date-picker-time-list">
              {seconds.map((s) => (
                <button
                  key={s}
                  type="button"
                  className={classNames('soui-date-picker-time-cell', { 'soui-date-picker-time-cell--selected': s === timeSecond })}
                  onClick={() => handleTimeChange('second', s)}
                >{String(s).padStart(2, '0')}</button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Panel body
  const renderPanelBody = () => {
    if (showTimePanel) return renderTimePanel();

    if (panelMode === 'year') {
      const years = getYearRange(viewYear);
      const decadeStart = Math.floor(viewYear / 10) * 10;
      return (
        <div className="soui-date-picker-year-grid">
          {years.map((y) => {
            const inRange = y >= decadeStart && y <= decadeStart + 9;
            const selected = currentValue && currentValue.year() === y;
            return (
              <button key={y} type="button"
                className={classNames('soui-date-picker-year-cell', {
                  'soui-date-picker-year-cell--out': !inRange,
                  'soui-date-picker-year-cell--selected': selected,
                })}
                onClick={() => handleSelectYear(y)}
              >{y}</button>
            );
          })}
        </div>
      );
    }

    if (panelMode === 'month') {
      return (
        <div className="soui-date-picker-month-grid">
          {getMonths().map((m) => {
            const selected = currentValue && currentValue.year() === viewYear && currentValue.month() === m;
            const isNow = dayjs().year() === viewYear && dayjs().month() === m;
            return (
              <button key={m} type="button"
                className={classNames('soui-date-picker-month-cell', {
                  'soui-date-picker-month-cell--selected': selected,
                  'soui-date-picker-month-cell--now': isNow && !selected,
                })}
                onClick={() => handleSelectMonth(m)}
              >{MONTH_LABELS[m]}</button>
            );
          })}
        </div>
      );
    }

    // date / week
    return (
      <div className="soui-date-picker-calendar">
        <div className="soui-date-picker-weekdays">
          {WEEK_LABELS.map((label) => (
            <span key={label} className="soui-date-picker-weekday">{label}</span>
          ))}
        </div>
        <div className="soui-date-picker-days">
          {calendarDays.map((day, idx) => (
            <button key={idx} type="button"
              className={classNames('soui-date-picker-day', {
                'soui-date-picker-day--other-month': !day.isCurrentMonth,
                'soui-date-picker-day--today': day.isToday && !day.isSelected,
                'soui-date-picker-day--selected': day.isSelected,
                'soui-date-picker-day--disabled': day.isDisabled,
              })}
              onClick={() => handleSelectDay(day)}
              disabled={day.isDisabled}
              aria-label={day.date.format('YYYY年M月D日')}
            >
              {picker === 'week' && day.isCurrentMonth && day.day === 1 ? (
                <span className="soui-date-picker-day-week">W{getWeekNumber(day.date)}</span>
              ) : (
                day.day
              )}
            </button>
          ))}
        </div>
      </div>
    );
  };

  // Footer
  const showFooter = showTime || showNow || showToday || presets;

  const renderFooter = () => {
    if (!showFooter) return null;
    return (
      <div className="soui-date-picker-footer">
        {presets && presets.length > 0 && (
          <div className="soui-date-picker-presets">
            {presets.map((p, i) => (
              <button key={i} type="button" className="soui-date-picker-preset-btn" onClick={() => handlePreset(p.value)}>
                {p.label}
              </button>
            ))}
          </div>
        )}
        <div className="soui-date-picker-footer-actions">
          {showToday && panelMode === 'date' && !showTimePanel && (
            <button type="button" className="soui-date-picker-footer-btn" onClick={handleToday}>今天</button>
          )}
          {showNow && showTime && !showTimePanel && (
            <button type="button" className="soui-date-picker-footer-btn" onClick={handleNow}>此刻</button>
          )}
          {showTime && (
            <button type="button" className="soui-date-picker-footer-btn" onClick={() => setShowTimePanel(!showTimePanel)}>
              {showTimePanel ? '选择日期' : '选择时间'}
            </button>
          )}
          {showTimePanel && (
            <button type="button" className="soui-date-picker-footer-btn soui-date-picker-footer-btn--primary" onClick={handleConfirmTime}>确定</button>
          )}
        </div>
      </div>
    );
  };

  // Placeholder
  const defaultPlaceholder = { date: '请选择日期', week: '请选择周', month: '请选择月份', year: '请选择年份' }[picker];

  return (
    <div
      className={classNames('soui-date-picker', `soui-date-picker--${size}`, { 'soui-date-picker--disabled': disabled }, className)}
      style={style}
      {...rest}
    >
      <div ref={triggerRef} className="soui-date-picker-trigger" onClick={togglePanel}
        role="button" aria-haspopup="dialog" aria-expanded={open} tabIndex={disabled ? -1 : 0}
      >
        <input className="soui-date-picker-input" value={inputText}
          onChange={handleInputChange} onBlur={handleInputBlur}
          placeholder={placeholder || defaultPlaceholder} disabled={disabled}
          readOnly={picker === 'week'} aria-label={placeholder || defaultPlaceholder}
        />
        {allowClear && currentValue && !disabled && (
          <button type="button" className="soui-date-picker-clear" onClick={handleClear} aria-label="清除日期" tabIndex={0}>×</button>
        )}
        <span className="soui-date-picker-icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        </span>
      </div>

      {open && (
        <div ref={panelRef} className={classNames('soui-date-picker-panel', placementClass)} role="dialog" aria-label="日期选择面板">
          {renderPanelHeader()}
          {renderPanelBody()}
          {renderFooter()}
        </div>
      )}
    </div>
  );
};

export default DatePicker;
