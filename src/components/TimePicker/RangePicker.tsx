import React, { useState, useEffect, useRef, useCallback, useContext } from 'react';
import classNames from 'classnames';
import dayjs, { Dayjs } from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import ConfigContext from '../ConfigProvider/context';
import Icon from '../Icon';
import './style.less';

dayjs.extend(customParseFormat);

// ==================== Types ====================

export type TimeRangeValue = [Dayjs | null, Dayjs | null];

export interface TimeRangePickerProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  /** 当前值（受控） */
  value?: TimeRangeValue;
  /** 默认值 */
  defaultValue?: TimeRangeValue;
  /** 时间变化回调 */
  onChange?: (times: TimeRangeValue, timeStrings: [string, string]) => void;
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
  /** 是否显示"此刻"按钮 */
  showNow?: boolean;
  /** 是否允许清除 */
  allowClear?: boolean;
  /** 尺寸 */
  size?: 'small' | 'middle' | 'large';
  /** 是否禁用（可传数组分别控制两端） */
  disabled?: boolean | [boolean, boolean];
  /** 占位文字 */
  placeholder?: [string, string];
  /** 面板弹出方向 */
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
  /** 输入框状态 */
  status?: 'error' | 'warning';
  /** 隐藏秒列 */
  hideSeconds?: boolean;
  /** 分隔符 */
  separator?: React.ReactNode;
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

const RangePicker: React.FC<TimeRangePickerProps> = ({
  value: controlledValue,
  defaultValue,
  onChange,
  format: userFormat,
  use12Hours = false,
  hourStep = 1,
  minuteStep = 1,
  secondStep = 1,
  showNow = true,
  allowClear = true,
  size = 'middle',
  disabled = false,
  placeholder = ['开始时间', '结束时间'],
  placement = 'bottomLeft',
  status,
  hideSeconds = false,
  separator,
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

  // ---- Disabled parsing ----
  const [disabledStart, disabledEnd] = Array.isArray(disabled) ? disabled : [disabled, disabled];

  // ---- Format ----
  const format = userFormat || (use12Hours ? 'hh:mm:ss A' : hideSeconds ? 'HH:mm' : 'HH:mm:ss');

  // ---- State ----
  const isControlled = controlledValue !== undefined;
  const [internalValue, setInternalValue] = useState<TimeRangeValue>(defaultValue || [null, null]);
  const currentValue: TimeRangeValue = isControlled ? (controlledValue ?? [null, null]) : internalValue;

  const [isOpen, setIsOpen] = useState(false);
  const [activeInput, setActiveInput] = useState<'start' | 'end'>('start');

  // Temp values for current active input
  const [tempHour, setTempHour] = useState<number | null>(null);
  const [tempMinute, setTempMinute] = useState<number | null>(null);
  const [tempSecond, setTempSecond] = useState<number | null>(null);
  const [tempAmPm, setTempAmPm] = useState<'AM' | 'PM'>('AM');

  // Refs
  const triggerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const hourColRef = useRef<HTMLDivElement>(null);
  const minuteColRef = useRef<HTMLDivElement>(null);
  const secondColRef = useRef<HTMLDivElement>(null);

  // ---- Sync temp values when active input or panel opens ----
  useEffect(() => {
    if (isOpen) {
      const idx = activeInput === 'start' ? 0 : 1;
      const base = currentValue[idx] || dayjs();
      let h = base.hour();
      if (use12Hours) {
        setTempAmPm(h >= 12 ? 'PM' : 'AM');
        h = h % 12 || 12;
      }
      setTempHour(h);
      setTempMinute(base.minute());
      setTempSecond(base.second());
    }
  }, [isOpen, activeInput]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- Scroll to selected ----
  const scrollToSelected = useCallback((colRef: React.RefObject<HTMLDivElement>, value: number | null, step: number) => {
    if (!colRef.current || value === null) return;
    const idx = Math.floor(value / step);
    const ul = colRef.current.querySelector('ul');
    if (!ul) return;
    const targetEl = ul.children[idx + 1] as HTMLElement | undefined;
    if (targetEl) {
      const colHeight = colRef.current.clientHeight;
      const itemTop = targetEl.offsetTop;
      const itemHeight = targetEl.offsetHeight;
      colRef.current.scrollTop = itemTop - (colHeight - itemHeight) / 2;
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        scrollToSelected(hourColRef, tempHour, hourStep);
        scrollToSelected(minuteColRef, tempMinute, minuteStep);
        scrollToSelected(secondColRef, tempSecond, secondStep);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen, activeInput, tempHour, tempMinute, tempSecond]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- Click outside ----
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current && !panelRef.current.contains(target) &&
        triggerRef.current && !triggerRef.current.contains(target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [isOpen]);

  // ---- Emit value ----
  const emitValue = useCallback((newValue: TimeRangeValue) => {
    if (!isControlled) setInternalValue(newValue);
    onChange?.(newValue, [
      newValue[0] ? newValue[0].format(format) : '',
      newValue[1] ? newValue[1].format(format) : '',
    ]);
  }, [isControlled, onChange, format]);

  // ---- Build time from temp ----
  const buildTimeFromTemp = useCallback((): Dayjs => {
    let h = tempHour ?? 0;
    const m = tempMinute ?? 0;
    const s = tempSecond ?? 0;
    if (use12Hours) {
      if (tempAmPm === 'PM' && h !== 12) h += 12;
      if (tempAmPm === 'AM' && h === 12) h = 0;
    }
    return (currentValue[activeInput === 'start' ? 0 : 1] || dayjs()).hour(h).minute(m).second(s);
  }, [tempHour, tempMinute, tempSecond, tempAmPm, use12Hours, currentValue, activeInput]);

  // ---- Column select ----
  const handleSelectHour = (h: number) => setTempHour(h);
  const handleSelectMinute = (m: number) => setTempMinute(m);
  const handleSelectSecond = (s: number) => setTempSecond(s);
  const handleSelectAmPm = (v: 'AM' | 'PM') => setTempAmPm(v);

  // ---- Confirm current input and switch or close ----
  const handleConfirm = useCallback(() => {
    const t = buildTimeFromTemp();
    const newVal: TimeRangeValue = [...currentValue] as TimeRangeValue;
    const idx = activeInput === 'start' ? 0 : 1;
    newVal[idx] = t;
    emitValue(newVal);

    if (activeInput === 'start') {
      // Switch to end input
      setActiveInput('end');
    } else {
      setIsOpen(false);
    }
  }, [buildTimeFromTemp, currentValue, activeInput, emitValue]);

  // ---- Now ----
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
  }, [use12Hours]);

  // ---- Clear ----
  const handleClear = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    emitValue([null, null]);
    setIsOpen(false);
  }, [emitValue]);

  // ---- Trigger clicks ----
  const handleStartClick = () => {
    if (disabledStart) return;
    setActiveInput('start');
    setIsOpen(true);
  };
  const handleEndClick = () => {
    if (disabledEnd) return;
    setActiveInput('end');
    setIsOpen(true);
  };

  // ---- Disabled sets ----
  const disabledHoursSet = new Set<number>();
  const disabledMinutesSet = new Set<number>();
  const disabledSecondsSet = new Set<number>();

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
  ) => (
    <div className="soui-time-picker-column" ref={colRef}>
      <ul className="soui-time-picker-column-list">
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
        <li className="soui-time-picker-cell soui-time-picker-cell--spacer" aria-hidden="true" />
      </ul>
    </div>
  );

  // ---- Render panel ----
  const renderPanel = () => (
    <div
      ref={panelRef}
      className={classNames('soui-time-picker-panel', `soui-time-picker-panel--${placement}`)}
    >
      <div className="soui-time-picker-range-header">
        <span className={classNames('soui-time-picker-range-tab', { 'soui-time-picker-range-tab--active': activeInput === 'start' })}>
          开始时间
        </span>
        <span className="soui-time-picker-range-sep">—</span>
        <span className={classNames('soui-time-picker-range-tab', { 'soui-time-picker-range-tab--active': activeInput === 'end' })}>
          结束时间
        </span>
      </div>
      <div className="soui-time-picker-columns">
        {renderColumn(hours, tempHour, disabledHoursSet, handleSelectHour, hourColRef)}
        {renderColumn(minutes, tempMinute, disabledMinutesSet, handleSelectMinute, minuteColRef)}
        {!hideSeconds && renderColumn(seconds, tempSecond, disabledSecondsSet, handleSelectSecond, secondColRef)}
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
      <div className="soui-time-picker-footer">
        <div className="soui-time-picker-footer-actions">
          {showNow && (
            <button type="button" className="soui-time-picker-now-btn" onClick={handleNow}>
              此刻
            </button>
          )}
          <button type="button" className="soui-time-picker-ok-btn" onClick={handleConfirm}>
            {activeInput === 'start' ? '下一步' : '确定'}
          </button>
        </div>
      </div>
    </div>
  );

  // ---- Computed display text ----
  const startText = currentValue[0] ? currentValue[0].format(format) : '';
  const endText = currentValue[1] ? currentValue[1].format(format) : '';
  const hasValue = currentValue[0] !== null || currentValue[1] !== null;

  // ---- Root class ----
  const rootCls = classNames(
    'soui-time-picker',
    'soui-time-picker-range',
    `soui-time-picker--${size}`,
    {
      'soui-time-picker--disabled': disabledStart && disabledEnd,
      'soui-time-picker--open': isOpen,
      [`soui-time-picker--${status}`]: status,
    },
    className,
  );

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  return (
    <div className={rootCls} style={componentStyle} {...rest}>
      <div ref={triggerRef} className="soui-time-picker-range-trigger">
        <input
          className={classNames('soui-time-picker-input', { 'soui-time-picker-input--active': isOpen && activeInput === 'start' })}
          value={startText}
          placeholder={placeholder[0]}
          disabled={disabledStart}
          readOnly
          onClick={handleStartClick}
        />
        <span className="soui-time-picker-range-separator">
          {separator || (
            <svg viewBox="0 0 1024 1024" width="10" height="10" fill="currentColor">
              <path d="M838.4 160.4L185.6 512l652.8 351.6c5.6 3 12.4-1.2 12.4-7.6V168c0-6.4-6.8-10.6-12.4-7.6z" transform="rotate(90 512 512)" />
            </svg>
          )}
        </span>
        <input
          className={classNames('soui-time-picker-input', { 'soui-time-picker-input--active': isOpen && activeInput === 'end' })}
          value={endText}
          placeholder={placeholder[1]}
          disabled={disabledEnd}
          readOnly
          onClick={handleEndClick}
        />
        <span className="soui-time-picker-suffix">
          {allowClear && hasValue && !(disabledStart && disabledEnd) ? (
            <span className="soui-time-picker-clear" onClick={handleClear}>
              <Icon name="Close" size={14} theme="outline" />
            </span>
          ) : (
            <svg viewBox="0 0 1024 1024" width="1em" height="1em" fill="currentColor">
              <path d="M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" />
              <path d="M686.7 638.6L544.1 535.5V288c0-4.4-3.6-8-8-8H488c-4.4 0-8 3.6-8 8v275.4c0 2.6 1.2 5 3.3 6.5l165.4 120.6c3.6 2.6 8.6 1.8 11.2-1.7l28.6-39c2.6-3.7 1.8-8.7-1.8-11.2z" />
            </svg>
          )}
        </span>
      </div>
      {isOpen && renderPanel()}
    </div>
  );
};

export default RangePicker;
