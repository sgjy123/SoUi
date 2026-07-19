import React, { useState, useMemo, useCallback, useContext } from 'react';
import classNames from 'classnames';
import dayjs, { type Dayjs } from 'dayjs';
import 'dayjs/locale/zh-cn';
import ConfigContext from '../ConfigProvider/context';
import './style.less';

// ==================== Types ====================

export type CalendarMode = 'month' | 'year';

export interface CalendarLocale {
  /** 年份后缀 */
  yearSuffix?: string;
  /** 月份名称 */
  months?: string[];
  /** 月份短名称 */
  monthsShort?: string[];
  /** 星期名称（从周一开始） */
  weekdays?: string[];
  /** 星期短名称 */
  weekdaysShort?: string[];
  /** 月视图标签 */
  monthLabel?: string;
  /** 年视图标签 */
  yearLabel?: string;
}

export interface HeaderRenderConfig {
  /** 当前显示日期 */
  value: Dayjs;
  /** 当前面板类型 */
  mode: CalendarMode;
  /** 变更日期 */
  onChange: (date: Dayjs) => void;
  /** 切换面板类型 */
  onModeChange: (mode: CalendarMode) => void;
}

export interface CellRenderInfo {
  /** 单元格类型 */
  type: 'date' | 'month';
  /** 今天 */
  today: Dayjs;
}

export interface CalendarProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'onSelect' | 'defaultValue'> {
  /** 受控日期值 */
  value?: Dayjs;
  /** 默认日期值 */
  defaultValue?: Dayjs;
  /** 日期变化回调 */
  onChange?: (date: Dayjs) => void;
  /** 面板变化回调 */
  onPanelChange?: (date: Dayjs, mode: CalendarMode) => void;
  /** 受控面板模式 */
  mode?: CalendarMode;
  /** 默认面板模式 */
  defaultMode?: CalendarMode;
  /** 是否全屏展示（false 为卡片模式） */
  fullscreen?: boolean;
  /** 自定义头部渲染 */
  headerRender?: (config: HeaderRenderConfig) => React.ReactNode;
  /** 自定义单元格内容（追加在日期数字下方） */
  cellRender?: (current: Dayjs, info: CellRenderInfo) => React.ReactNode;
  /** 自定义完整单元格（替换整个单元格内容） */
  fullCellRender?: (current: Dayjs, info: CellRenderInfo) => React.ReactNode;
  /** 禁用日期 */
  disabledDate?: (current: Dayjs) => boolean;
  /** 国际化配置 */
  locale?: CalendarLocale;
}

// ==================== Constants ====================

const DEFAULT_LOCALE: Required<CalendarLocale> = {
  yearSuffix: '年',
  months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  monthsShort: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  weekdays: ['一', '二', '三', '四', '五', '六', '日'],
  weekdaysShort: ['一', '二', '三', '四', '五', '六', '日'],
  monthLabel: '月',
  yearLabel: '年',
};

// ==================== Helpers ====================

/** 获取月视图的 42 个日期格子（6行×7列） */
function getMonthCells(current: Dayjs): Dayjs[] {
  const start = current.startOf('month');
  // 周一为一周起始
  const dayOfWeek = start.day() === 0 ? 6 : start.day() - 1;
  const firstCell = start.subtract(dayOfWeek, 'day');
  return Array.from({ length: 42 }, (_, i) => firstCell.add(i, 'day'));
}

/** 获取年视图的 12 个月 */
function getYearMonths(current: Dayjs): Dayjs[] {
  const start = current.startOf('year');
  return Array.from({ length: 12 }, (_, i) => start.add(i, 'month'));
}

/** 生成年份选项（前后各 10 年） */
function getYearOptions(current: Dayjs): number[] {
  const year = current.year();
  const years: number[] = [];
  for (let y = year - 10; y <= year + 10; y++) {
    years.push(y);
  }
  return years;
}

// ==================== Component ====================

const Calendar: React.FC<CalendarProps> = ({
  value: controlledValue,
  defaultValue,
  onChange,
  onPanelChange,
  mode: controlledMode,
  defaultMode = 'month',
  fullscreen = true,
  headerRender,
  cellRender,
  fullCellRender,
  disabledDate,
  locale: localeProp,
  className,
  style,
  ...rest
}) => {
  const context = useContext(ConfigContext);
  const componentTheme = (context?.components?.Calendar || {}) as Record<string, any>;

  // 主题 CSS 变量
  const cssVars: React.CSSProperties & Record<string, any> = {};
  if (componentTheme.fontSize !== undefined) {
    cssVars['--soui-calendar-font-size'] = `${componentTheme.fontSize}px`;
  }
  if (componentTheme.colorPrimary !== undefined) {
    cssVars['--soui-calendar-color-primary'] = componentTheme.colorPrimary;
  }
  if (componentTheme.borderRadius !== undefined) {
    cssVars['--soui-calendar-border-radius'] = `${componentTheme.borderRadius}px`;
  }
  if (componentTheme.cellHeight !== undefined) {
    cssVars['--soui-calendar-cell-height'] = `${componentTheme.cellHeight}px`;
  }
  if (componentTheme.headerBg !== undefined) {
    cssVars['--soui-calendar-header-bg'] = componentTheme.headerBg;
  }

  const componentStyle = { ...cssVars, ...style } as React.CSSProperties;

  const locale = { ...DEFAULT_LOCALE, ...localeProp };
  const today = useMemo(() => dayjs(), []);

  // ==================== State ====================
  const [innerValue, setInnerValue] = useState<Dayjs>(defaultValue || dayjs());
  const selectedDate = controlledValue !== undefined ? controlledValue : innerValue;

  const [innerMode, setInnerMode] = useState<CalendarMode>(defaultMode);
  const mode = controlledMode !== undefined ? controlledMode : innerMode;

  // 面板显示日期（用于导航）
  const [panelDate, setPanelDate] = useState<Dayjs>(selectedDate);

  // ==================== Handlers ====================

  const handleSelect = useCallback((date: Dayjs) => {
    if (disabledDate?.(date)) return;

    if (controlledValue === undefined) {
      setInnerValue(date);
    }
    setPanelDate(date);
    onChange?.(date);
  }, [controlledValue, disabledDate, onChange]);

  const handleModeChange = useCallback((newMode: CalendarMode) => {
    if (controlledMode === undefined) {
      setInnerMode(newMode);
    }
    onPanelChange?.(panelDate, newMode);
  }, [controlledMode, panelDate, onPanelChange]);

  const handlePanelDateChange = useCallback((date: Dayjs) => {
    setPanelDate(date);
    onPanelChange?.(date, mode);
  }, [mode, onPanelChange]);

  const handleYearChange = useCallback((year: number) => {
    const newDate = panelDate.year(year);
    handlePanelDateChange(newDate);
  }, [panelDate, handlePanelDateChange]);

  const handleMonthChange = useCallback((month: number) => {
    const newDate = panelDate.month(month);
    handlePanelDateChange(newDate);
  }, [panelDate, handlePanelDateChange]);

  // ==================== Render: Header ====================

  const renderHeader = () => {
    if (headerRender) {
      return headerRender({
        value: panelDate,
        mode,
        onChange: handlePanelDateChange,
        onModeChange: handleModeChange,
      });
    }

    const yearOptions = getYearOptions(panelDate);

    return (
      <div className="soui-calendar-header">
        <div className="soui-calendar-header-selects">
          <select
            className="soui-calendar-year-select"
            value={panelDate.year()}
            onChange={(e) => handleYearChange(Number(e.target.value))}
            aria-label="选择年份"
          >
            {yearOptions.map((y) => (
              <option key={y} value={y}>{y}{locale.yearSuffix}</option>
            ))}
          </select>

          {mode === 'month' && (
            <select
              className="soui-calendar-month-select"
              value={panelDate.month()}
              onChange={(e) => handleMonthChange(Number(e.target.value))}
              aria-label="选择月份"
            >
              {locale.months.map((m, i) => (
                <option key={i} value={i}>{m}</option>
              ))}
            </select>
          )}
        </div>

        <div className="soui-calendar-header-mode" role="radiogroup" aria-label="视图切换">
          <button
            type="button"
            className={classNames('soui-calendar-mode-btn', { 'soui-calendar-mode-btn-active': mode === 'month' })}
            onClick={() => handleModeChange('month')}
            role="radio"
            aria-checked={mode === 'month'}
          >
            {locale.monthLabel}
          </button>
          <button
            type="button"
            className={classNames('soui-calendar-mode-btn', { 'soui-calendar-mode-btn-active': mode === 'year' })}
            onClick={() => handleModeChange('year')}
            role="radio"
            aria-checked={mode === 'year'}
          >
            {locale.yearLabel}
          </button>
        </div>
      </div>
    );
  };

  // ==================== Render: Month View ====================

  const renderMonthView = () => {
    const cells = getMonthCells(panelDate);
    const currentMonth = panelDate.month();

    return (
      <div className="soui-calendar-body">
        <table className="soui-calendar-table" role="grid" aria-label="月视图">
          <thead>
            <tr>
              {locale.weekdays.map((day, i) => (
                <th key={i} className="soui-calendar-th" scope="col">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 6 }, (_, row) => (
              <tr key={row}>
                {Array.from({ length: 7 }, (_, col) => {
                  const date = cells[row * 7 + col];
                  const isCurrentMonth = date.month() === currentMonth;
                  const isToday = date.isSame(today, 'day');
                  const isSelected = date.isSame(selectedDate, 'day');
                  const isDisabled = disabledDate?.(date) ?? false;

                  const cellCls = classNames('soui-calendar-cell', {
                    'soui-calendar-cell-current': isCurrentMonth,
                    'soui-calendar-cell-today': isToday,
                    'soui-calendar-cell-selected': isSelected,
                    'soui-calendar-cell-disabled': isDisabled,
                  });

                  const cellContent = fullCellRender ? (
                    fullCellRender(date, { type: 'date', today })
                  ) : (
                    <div className="soui-calendar-cell-inner">
                      <span className="soui-calendar-date-value">{date.date()}</span>
                      {cellRender && (
                        <div className="soui-calendar-cell-extra">
                          {cellRender(date, { type: 'date', today })}
                        </div>
                      )}
                    </div>
                  );

                  return (
                    <td
                      key={col}
                      className={cellCls}
                      role="gridcell"
                      aria-selected={isSelected}
                      aria-disabled={isDisabled}
                      onClick={() => {
                        if (!isDisabled) handleSelect(date);
                      }}
                    >
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // ==================== Render: Year View ====================

  const renderYearView = () => {
    const months = getYearMonths(panelDate);

    return (
      <div className="soui-calendar-body">
        <table className="soui-calendar-table soui-calendar-table-year" role="grid" aria-label="年视图">
          <tbody>
            {Array.from({ length: 3 }, (_, row) => (
              <tr key={row}>
                {Array.from({ length: 4 }, (_, col) => {
                  const monthDate = months[row * 4 + col];
                  const isCurrent = monthDate.isSame(today, 'month');
                  const isSelected = monthDate.isSame(selectedDate, 'month');
                  const isDisabled = disabledDate?.(monthDate) ?? false;

                  const cellCls = classNames('soui-calendar-cell', 'soui-calendar-cell-month', {
                    'soui-calendar-cell-today': isCurrent,
                    'soui-calendar-cell-selected': isSelected,
                    'soui-calendar-cell-disabled': isDisabled,
                  });

                  const cellContent = fullCellRender ? (
                    fullCellRender(monthDate, { type: 'month', today })
                  ) : (
                    <div className="soui-calendar-cell-inner">
                      <span className="soui-calendar-month-value">
                        {locale.months[monthDate.month()]}
                      </span>
                      {cellRender && (
                        <div className="soui-calendar-cell-extra">
                          {cellRender(monthDate, { type: 'month', today })}
                        </div>
                      )}
                    </div>
                  );

                  return (
                    <td
                      key={col}
                      className={cellCls}
                      role="gridcell"
                      aria-selected={isSelected}
                      aria-disabled={isDisabled}
                      onClick={() => {
                        if (!isDisabled) {
                          handleSelect(monthDate.date(Math.min(selectedDate.date(), monthDate.daysInMonth())));
                        }
                      }}
                    >
                      {cellContent}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // ==================== Main Render ====================

  const calendarCls = classNames(
    'soui-calendar',
    {
      'soui-calendar-fullscreen': fullscreen,
      'soui-calendar-card': !fullscreen,
    },
    className,
  );

  return (
    <div className={calendarCls} style={componentStyle} {...rest}>
      {renderHeader()}
      {mode === 'month' ? renderMonthView() : renderYearView()}
    </div>
  );
};

export default Calendar;
