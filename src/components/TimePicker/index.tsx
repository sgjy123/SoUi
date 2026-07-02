import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ConfigContext from '../ConfigProvider/context';
import Icon from '../Icon';
import RangePicker from './RangePicker';
import './style.less';

dayjs.extend(customParseFormat);

// ==================== Types ====================

export type TimePickerSize = 'small' | 'middle' | 'large';
export type TimePickerPlacement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
export type TimePickerStatus = 'error' | 'warning';

export interface TimePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** 当前值（受控） */
  value?: Dayjs | null;
  /** 默认值 */
  defaultValue?: Dayjs | null;
  /** 时间变化回调 */
  onChange?: (time: Dayjs | null, timeString: string) => void;
  /** 展示格式 */
  format?: string;
  /** 是否使用 12 小时制 */
  use12Hours?: boolean;
  /** 小时步长 */
  hourStep?: number;
  /** 分钟步长 */
  minuteStep?: number;
  /** 秒步长 */
  secondStep?: number;
  /** 禁用小时 */
  disabledHours?: () => number[];
  /** 禁用分钟 */
  disabledMinutes?: (selectedHour: number) => number[];
  /** 禁用秒 */
  disabledSeconds?: (selectedHour: number, selectedMinute: number) => number[];
  /** 是否显示"此刻"按钮 */
  showNow?: boolean;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 尺寸 */
  size?: TimePickerSize;
  /** 是否禁用 */
  disabled?: boolean;
  /** 占位文字 */
  placeholder?: string;
  /** 面板弹出方向 */
  placement?: TimePickerPlacement;
  /** 是否显示面板（受控） */
  open?: boolean;
  /** 面板显隐回调 */
  onOpenChange?: (open: boolean) => void;
  /** 输入框状态 */
  status?: TimePickerStatus;
  /** 是否需要点击确定按钮 */
  needConfirm?: boolean;
  /** 自定义后缀图标 */
  suffixIcon?: React.ReactNode;
  /** 自定义底部渲染 */
  renderExtraFooter?: () => React.ReactNode;
  /** 隐藏秒列 */
  hideSeconds?: boolean;
}

// ==================== Helpers ====================

function pad(n: number): string {
  return n < 10 ? `0${n}` : `${n}`;
}

function generateRange(start: number, end: number, step: number): number[] {
  const result: number[] = [];
  for (let i = start; i <= end; i += step) {
    result.push(i);
  }
  return result;
}

// ==================== Component ====================

const TimePicker: React.FC<TimePickerProps> = ({
  value: controlledValue,
  defaultValue,
  onChange,
  format: userFormat,
  use12Hours = false,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  disabledHours,
  disabledMinutes,
  disabledSeconds,
  showNow = true,
  allowClear = true,
  size = 'middle',
  disabled = false,
  placeholder,
  placement = 'bottomLeft',
  open: controlledOpen,
  onOpenChange,
  status,
  needConfirm = true,
  suffixIcon,
  renderExtraFooter,
  hideSeconds = false,
  className,
  style,
  ...rest
}) => {
  // ---- ConfigProvider theme ----
  const context = useContext(ConfigContext);
  const tpTheme = (context?.components?.TimePicker || {}) as Record<string, any>;

  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (tpTheme.borderRadius !== undefined) cssVars['--soui-time-picker-border-radius'] = `${tpTheme.borderRadius}px`;
  if (tpTheme.fontSize !== undefined) cssVars['--soui-time-picker-font-size'] = `${tpTheme.fontSize}px`;
  if (tpTheme.colorPrimary) cssVars['--soui-time-picker-color-primary'] = tpTheme.colorPrimary;
  if (tpTheme.colorPrimaryHover) cssVars['--soui-time-picker-color-primary-hover'] = tpTheme.colorPrimaryHover;
  if (tpTheme.colorBorder) cssVars['--soui-time-picker-border-color'] = tpTheme.colorBorder;
  if (tpTheme.colorBorderHover) cssVars['--soui-time-picker-color-border-hover'] = tpTheme.colorBorderHover;
  if (tpTheme.colorBorderFocus) cssVars['--soui-time-picker-color-border-focus'] = tpTheme.colorBorderFocus;
  if (tpTheme.colorBg) cssVars['--soui-time-picker-bg'] = tpTheme.colorBg;
  if (tpTheme.panelBg) cssVars['--soui-time-picker-panel-bg'] = tpTheme.panelBg;
  if (tpTheme.colorText) cssVars['--soui-time-picker-text-color'] = tpTheme.colorText;
  if (tpTheme.controlHeight !== undefined) cssVars['--soui-time-picker-control-height'] = `${tpTheme.controlHeight}px`;

  // ---- Format ----
  const format = userFormat || (use12Hours ? 'hh:mm:ss A' : hideSeconds ? 'HH:mm' : 'HH:mm:ss');

  // ---- State ----
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<Dayjs | null>(defaultValue || null);
  const currentValue = isControlled ? (controlledValue ?? null) : internalValue;

  const isControlledOpen = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isControlledOpen ? controlledOpen! : internalOpen;

  // Temporary value while panel is open (before confirm)
  const [tempHour, setTempHour] = useState<number | null>(null);
  const [tempMinute, setTempMinute] = useState<number | null>(null);
  const [tempSecond, setTempSecond] = useState<number | null>(null);
  const [tempAmPm, setTempAmPm] = useState<'AM' | 'PM'>('AM');

  // Input text
  const [inputText, setInputText] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  // Placement
  const [placementClass, setPlacementClass] = useState(`soui-time-picker-panel--${placement}`);

  // Refs
  const wrapperRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hourColRef = useRef<HTMLDivElement>(null);
  const minuteColRef = useRef<HTMLDivElement>(null);
  const secondColRef = useRef<HTMLDivElement>(null);

  // ---- Sync display text ----
  useEffect(() => {
    if (!isEditing) {
      setInputText(currentValue ? currentValue.format(format) : '');
    }
  }, [currentValue, format, isEditing]);

  // ---- Sync temp values when panel opens ----
  useEffect(() => {
    if (isOpen) {
      const base = currentValue || dayjs();
      let h = base.hour();
      if (use12Hours) {
        setTempAmPm(h >= 12 ? 'PM' : 'AM');
        h = h % 12 || 12;
      }
      setTempHour(h);
      setTempMinute(base.minute());
      setTempSecond(base.second());
    }
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- Scroll to selected ----
  const scrollToSelected = useCallback((colRef: React.RefObject<HTMLDivElement>, value: number | null, step: number) => {
    if (!colRef.current || value === null) return;
    const idx = Math.floor(value / step);
    // colRef.current contains a <ul>, whose children are: spacer, items..., spacer
    // So the target item is at index idx + 1 (after the top spacer)
    const ul = colRef.current.querySelector('ul');
    if (!ul) return;
    const targetEl = ul.children[idx + 1] as HTMLElement | undefined;
    if (targetEl) {
      // Center the selected item in the visible area
      const colHeight = colRef.current.clientHeight;
      const itemTop = targetEl.offsetTop;
      const itemHeight = targetEl.offsetHeight;
      colRef.current.scrollTop = itemTop - (colHeight - itemHeight) / 2;
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      // Small delay to ensure DOM is rendered
      const timer = setTimeout(() => {
        scrollToSelected(hourColRef, tempHour, hourStep);
        scrollToSelected(minuteColRef, tempMinute, minuteStep);
        scrollToSelected(secondColRef, tempSecond, secondStep);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, tempHour, tempMinute, tempSecond]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- Click outside ----
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current && !panelRef.current.contains(target) &&
        triggerRef.current && !triggerRef.current.contains(target)
      ) {
        handleClose();
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- Placement overflow detection ----
  useEffect(() => {
    if (!isOpen || !triggerRef.current) return;
    const rect = triggerRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    let cls = `soui-time-picker-panel--${placement}`;
    if (placement.startsWith('bottom') && rect.bottom + 320 > vh && rect.top > 320) {
      cls = cls.replace('bottom', 'top');
    } else if (placement.startsWith('top') && rect.top < 320 && rect.bottom + 320 <= vh) {
      cls = cls.replace('top', 'bottom');
    }
    setPlacementClass(cls);
  }, [isOpen, placement]);

  // ---- Open/Close ----
  const setOpen = useCallback((val: boolean) => {
    if (!isControlledOpen) setInternalOpen(val);
    onOpenChange?.(val);
  }, [isControlledOpen, onOpenChange]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setIsEditing(false);
    // If needConfirm, revert temp values
    if (needConfirm && currentValue) {
      setInputText(currentValue.format(format));
    }
  }, [setOpen, needConfirm, currentValue, format]);

  // ---- Emit value ----
  const emitValue = useCallback((time: Dayjs | null) => {
    if (!isControlled) setInternalValue(time);
    onChange?.(time, time ? time.format(format) : '');
  }, [isControlled, onChange, format]);

  // ---- Build a Dayjs from temp values ----
  const buildTimeFromTemp = useCallback((): Dayjs => {
    let h = tempHour ?? 0;
    const m = tempMinute ?? 0;
    const s = tempSecond ?? 0;
    if (use12Hours) {
      if (tempAmPm === 'PM' && h !== 12) h += 12;
      if (tempAmPm === 'AM' && h === 12) h = 0;
    }
    return (currentValue || dayjs()).hour(h).minute(m).second(s);
  }, [tempHour, tempMinute, tempSecond, tempAmPm, use12Hours, currentValue]);

  // ---- Column select handlers ----
  const handleSelectHour = useCallback((h: number) => {
    setTempHour(h);
    if (!needConfirm) {
      const t = buildTimeFromTemp().hour(use12Hours ? (tempAmPm === 'PM' && h !== 12 ? h + 12 : tempAmPm === 'AM' && h === 12 ? 0 : h) : h);
      emitValue(t);
    }
  }, [needConfirm, buildTimeFromTemp, use12Hours, tempAmPm, emitValue]);

  const handleSelectMinute = useCallback((m: number) => {
    setTempMinute(m);
    if (!needConfirm) {
      const t = buildTimeFromTemp().minute(m);
      emitValue(t);
    }
  }, [needConfirm, buildTimeFromTemp, emitValue]);

  const handleSelectSecond = useCallback((s: number) => {
    setTempSecond(s);
    if (!needConfirm) {
      const t = buildTimeFromTemp().second(s);
      emitValue(t);
    }
  }, [needConfirm, buildTimeFromTemp, emitValue]);

  const handleSelectAmPm = useCallback((v: 'AM' | 'PM') => {
    setTempAmPm(v);
    if (!needConfirm) {
      let h = tempHour ?? 0;
      if (v === 'PM' && h !== 12) h += 12;
      if (v === 'AM' && h === 12) h = 0;
      const t = buildTimeFromTemp().hour(h);
      emitValue(t);
    }
  }, [needConfirm, buildTimeFromTemp, tempHour, emitValue]);

  // ---- Confirm / Now / Clear ----
  const handleConfirm = useCallback(() => {
    const t = buildTimeFromTemp();
    emitValue(t);
    setOpen(false);
    setIsEditing(false);
  }, [buildTimeFromTemp, emitValue, setOpen]);

  const handleNow = useCallback(() => {
    const now = dayjs();
    let h = now.hour();
    if (use12Hours) {
      setTempAmPm(h >= 12 ? 'PM' : 'AM');
      h = h % 12 || 12;
    }
    setTempHour(h);
    setTempMinute(now.minute());
    setTempSecond(now.second());
    if (!needConfirm) {
      emitValue(now);
      setOpen(false);
    }
  }, [use12Hours, needConfirm, emitValue, setOpen]);

  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    emitValue(null);
    setInputText('');
    setTempHour(null);
    setTempMinute(null);
    setTempSecond(null);
  }, [emitValue]);

  // ---- Input handling ----
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setIsEditing(true);
    setInputText(e.target.value);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsEditing(false);
    if (!inputText.trim()) {
      emitValue(null);
      return;
    }
    const parsed = dayjs(inputText, format, true);
    if (parsed.isValid()) {
      emitValue(parsed);
      let h = parsed.hour();
      if (use12Hours) {
        setTempAmPm(h >= 12 ? 'PM' : 'AM');
        h = h % 12 || 12;
      }
      setTempHour(h);
      setTempMinute(parsed.minute());
      setTempSecond(parsed.second());
    } else {
      setInputText(currentValue ? currentValue.format(format) : '');
    }
  }, [inputText, format, emitValue, use12Hours, currentValue]);

  const handleInputKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      (e.target as HTMLInputElement).blur();
    }
    if (e.key === 'Escape') {
      handleClose();
    }
  }, [handleClose]);

  // ---- Trigger click ----
  const handleTriggerClick = useCallback(() => {
    if (disabled) return;
    setOpen(!isOpen);
  }, [disabled, isOpen, setOpen]);

  // ---- Disabled sets ----
  const disabledHoursSet = disabledHours ? new Set(disabledHours()) : new Set<number>();
  const disabledMinutesSet = disabledMinutes && tempHour !== null ? new Set(disabledMinutes(use12Hours ? (tempAmPm === 'PM' && tempHour !== 12 ? tempHour + 12 : tempAmPm === 'AM' && tempHour === 12 ? 0 : tempHour) : tempHour ?? 0)) : new Set<number>();
  const disabledSecondsSet = disabledSeconds && tempHour !== null && tempMinute !== null ? new Set(disabledSeconds(use12Hours ? (tempAmPm === 'PM' && tempHour !== 12 ? tempHour + 12 : tempAmPm === 'AM' && tempHour === 12 ? 0 : tempHour) : tempHour ?? 0, tempMinute ?? 0)) : new Set<number>();

  // ---- Column data ----
  const maxHour = use12Hours ? 12 : 23;
  const startHour = use12Hours ? 1 : 0;
  const hours = generateRange(startHour, maxHour, hourStep);
  const minutes = generateRange(0, 59, minuteStep);
  const seconds = generateRange(0, 59, secondStep);

  // ---- Render column ----
  const renderColumn = (
    items: number[],
    selectedValue: number | null,
    disabledSet: Set<number>,
    onSelect: (v: number) => void,
    colRef: React.RefObject<HTMLDivElement>,
    step: number,
  ) => (
    <div className="soui-time-picker-column" ref={colRef}>
      <ul className="soui-time-picker-column-list">
        {/* Spacer to allow first item to scroll to top */}
        <li className="soui-time-picker-cell soui-time-picker-cell--spacer" aria-hidden="true" />
        {items.map((v) => {
          const isDisabled = disabledSet.has(v);
          const isSelected = selectedValue === v;
          return (
            <li
              key={v}
              className={classNames('soui-time-picker-cell', {
                'soui-time-picker-cell--selected': isSelected,
                'soui-time-picker-cell--disabled': isDisabled,
              })}
              onClick={() => !isDisabled && onSelect(v)}
            >
              {pad(v)}
            </li>
          );
        })}
        {/* Spacer to allow last item to scroll to bottom */}
        <li className="soui-time-picker-cell soui-time-picker-cell--spacer" aria-hidden="true" />
      </ul>
    </div>
  );

  // ---- Render panel ----
  const renderPanel = () => (
    <div
      ref={panelRef}
      className={classNames('soui-time-picker-panel', placementClass)}
    >
      <div className="soui-time-picker-columns">
        {renderColumn(hours, tempHour, disabledHoursSet, handleSelectHour, hourColRef, hourStep)}
        {renderColumn(minutes, tempMinute, disabledMinutesSet, handleSelectMinute, minuteColRef, minuteStep)}
        {!hideSeconds && renderColumn(seconds, tempSecond, disabledSecondsSet, handleSelectSecond, secondColRef, secondStep)}
        {use12Hours && (
          <div className="soui-time-picker-column soui-time-picker-column--ampm">
            <ul className="soui-time-picker-column-list">
              <li className="soui-time-picker-cell soui-time-picker-cell--spacer" aria-hidden="true" />
              {(['AM', 'PM'] as const).map((v) => (
                <li
                  key={v}
                  className={classNames('soui-time-picker-cell', {
                    'soui-time-picker-cell--selected': tempAmPm === v,
                  })}
                  onClick={() => handleSelectAmPm(v)}
                >
                  {v}
                </li>
              ))}
              <li className="soui-time-picker-cell soui-time-picker-cell--spacer" aria-hidden="true" />
            </ul>
          </div>
        )}
      </div>
      {(showNow || needConfirm || renderExtraFooter) && (
        <div className="soui-time-picker-footer">
          {renderExtraFooter?.()}
          <div className="soui-time-picker-footer-actions">
            {showNow && (
              <button type="button" className="soui-time-picker-now-btn" onClick={handleNow}>
                此刻
              </button>
            )}
            {needConfirm && (
              <button type="button" className="soui-time-picker-ok-btn" onClick={handleConfirm}>
                确定
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );

  // ---- Root class ----
  const rootCls = classNames(
    'soui-time-picker',
    `soui-time-picker--${size}`,
    {
      'soui-time-picker--disabled': disabled,
      'soui-time-picker--open': isOpen,
      [`soui-time-picker--${status}`]: status,
    },
    className,
  );

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  return (
    <div ref={wrapperRef} className={rootCls} style={componentStyle} {...rest}>
      <div
        ref={triggerRef}
        className="soui-time-picker-trigger"
        onClick={handleTriggerClick}
      >
        <input
          className="soui-time-picker-input"
          value={inputText}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          placeholder={placeholder || (use12Hours ? 'hh:mm:ss A' : 'HH:mm:ss')}
          disabled={disabled}
          readOnly={false}
        />
        <span className="soui-time-picker-suffix">
          {allowClear && currentValue && !disabled ? (
            <span className="soui-time-picker-clear" onClick={handleClear}>
              <Icon name="Close" size={14} theme="outline" />
            </span>
          ) : (
            suffixIcon || (
              <Icon name="Time" size={14} theme="outline" />
            )
          )}
        </span>
      </div>
      {isOpen && renderPanel()}
    </div>
  );
};

// Attach RangePicker as a static property for TimePicker.RangePicker usage
type TimePickerWithRange = typeof TimePicker & { RangePicker: typeof RangePicker };
const TimePickerCompound = TimePicker as TimePickerWithRange;
TimePickerCompound.RangePicker = RangePicker;

export default TimePickerCompound;
export { RangePicker };
export type { TimeRangePickerProps, TimeRangeValue } from './RangePicker';
