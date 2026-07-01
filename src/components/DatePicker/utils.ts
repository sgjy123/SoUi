/** DatePicker 日期工具函数（基于 dayjs） */

import dayjs, { type Dayjs } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import weekOfYear from 'dayjs/plugin/weekOfYear';
import isBetween from 'dayjs/plugin/isBetween';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'dayjs/locale/zh-cn';

// 加载插件
dayjs.extend(isoWeek);
dayjs.extend(weekOfYear);
dayjs.extend(isBetween);
dayjs.extend(customParseFormat);
dayjs.locale('zh-cn');

// ==================== 类型 ====================

export type PickerMode = 'date' | 'week' | 'month' | 'year';

export interface CalendarDay {
  /** dayjs 日期对象 */
  date: Dayjs;
  /** 日 */
  day: number;
  /** 是否当月 */
  isCurrentMonth: boolean;
  /** 是否今天 */
  isToday: boolean;
  /** 是否选中 */
  isSelected: boolean;
  /** 是否禁用 */
  isDisabled: boolean;
  /** 是否在范围内（RangePicker） */
  isInRange?: boolean;
  /** 是否范围起点 */
  isRangeStart?: boolean;
  /** 是否范围终点 */
  isRangeEnd?: boolean;
  /** 是否范围悬停预览 */
  isRangeHover?: boolean;
}

// ==================== 常量 ====================

export const WEEK_LABELS = ['一', '二', '三', '四', '五', '六', '日'];
export const MONTH_LABELS = [
  '1月', '2月', '3月', '4月', '5月', '6月',
  '7月', '8月', '9月', '10月', '11月', '12月',
];

// ==================== 工具函数 ====================

/** 获取 picker 模式对应的默认 format */
export function getDefaultFormat(mode: PickerMode, showTime?: boolean): string {
  if (showTime && mode === 'date') return 'YYYY-MM-DD HH:mm:ss';
  switch (mode) {
    case 'date': return 'YYYY-MM-DD';
    case 'week': return 'YYYY-wo';
    case 'month': return 'YYYY-MM';
    case 'year': return 'YYYY';
  }
}

/** 检查 disabledDate 是否禁用某天 */
export function checkDisabled(date: Dayjs, disabledDate?: (d: Dayjs) => boolean): boolean {
  return disabledDate ? disabledDate(date) : false;
}

/**
 * 生成某月的日历网格（6行7列 = 42天）
 * 周一为一周的第一天（dayjs zh-cn locale 默认）
 */
export function getCalendarDays(
  year: number,
  month: number, // 0-indexed
  selected: Dayjs | null,
  disabledDate?: (d: Dayjs) => boolean,
  rangeStart?: Dayjs | null,
  rangeEnd?: Dayjs | null,
  hoverDate?: Dayjs | null,
): CalendarDay[] {
  const today = dayjs();
  const firstDay = dayjs().year(year).month(month).startOf('month');
  // isoWeekday: 周一=1, 周日=7; 转换为 0-indexed
  const startWeekDay = firstDay.isoWeekday() - 1;

  const days: CalendarDay[] = [];

  // 上月填充
  for (let i = startWeekDay - 1; i >= 0; i--) {
    const d = firstDay.subtract(i + 1, 'day');
    days.push(buildCalendarDay(d, false, today, selected, disabledDate, rangeStart, rangeEnd, hoverDate));
  }

  // 当月
  const daysInMonth = firstDay.daysInMonth();
  for (let i = 0; i < daysInMonth; i++) {
    const d = firstDay.add(i, 'day');
    days.push(buildCalendarDay(d, true, today, selected, disabledDate, rangeStart, rangeEnd, hoverDate));
  }

  // 下月填充至 42 天
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    const d = firstDay.endOf('month').add(i, 'day');
    days.push(buildCalendarDay(d, false, today, selected, disabledDate, rangeStart, rangeEnd, hoverDate));
  }

  return days;
}

function buildCalendarDay(
  d: Dayjs,
  isCurrentMonth: boolean,
  today: Dayjs,
  selected: Dayjs | null,
  disabledDate?: (d: Dayjs) => boolean,
  rangeStart?: Dayjs | null,
  rangeEnd?: Dayjs | null,
  hoverDate?: Dayjs | null,
): CalendarDay {
  const day: CalendarDay = {
    date: d,
    day: d.date(),
    isCurrentMonth,
    isToday: d.isSame(today, 'day'),
    isSelected: selected ? d.isSame(selected, 'day') : false,
    isDisabled: checkDisabled(d, disabledDate),
  };

  // 范围相关
  if (rangeStart || rangeEnd || hoverDate) {
    const start = rangeStart || null;
    const end = rangeEnd || null;
    const hover = hoverDate || null;

    day.isRangeStart = start ? d.isSame(start, 'day') : false;
    day.isRangeEnd = end ? d.isSame(end, 'day') : false;

    if (start && end) {
      day.isInRange = d.isBetween(start, end, 'day', '[]');
    } else if (start && hover) {
      const [lo, hi] = start.isBefore(hover) ? [start, hover] : [hover, start];
      day.isInRange = d.isBetween(lo, hi, 'day', '[]');
      day.isRangeHover = !end && day.isInRange;
    } else if (end && hover) {
      const [lo, hi] = end.isBefore(hover) ? [end, hover] : [hover, end];
      day.isInRange = d.isBetween(lo, hi, 'day', '[]');
      day.isRangeHover = !start && day.isInRange;
    }
  }

  return day;
}

/** 获取月份数组（0-11） */
export function getMonths(): number[] {
  return Array.from({ length: 12 }, (_, i) => i);
}

/** 获取某十年的年份范围（前后各扩展1年） */
export function getYearRange(year: number): number[] {
  const start = Math.floor(year / 10) * 10;
  return Array.from({ length: 12 }, (_, i) => start - 1 + i);
}

/** 获取 ISO 周数 */
export function getWeekNumber(date: Dayjs): number {
  return date.isoWeek();
}

/** 获取两个日期之间的所有天（含两端），用于周选择器高亮 */
export function getDaysBetween(start: Dayjs, end: Dayjs): Dayjs[] {
  const days: Dayjs[] = [];
  let cur = start.startOf('day');
  const e = end.startOf('day');
  while (cur.isBefore(e) || cur.isSame(e)) {
    days.push(cur);
    cur = cur.add(1, 'day');
  }
  return days;
}
