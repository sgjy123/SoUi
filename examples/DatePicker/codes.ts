export const basicCode = `const [date, setDate] = useState(null);

<DatePicker
  value={date}
  onChange={(d) => setDate(d)}
/>`;

export const controlledCode = `const [date, setDate] = useState(null);

<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <DatePicker value={date} onChange={(d) => setDate(d)} />
  <button onClick={() => setDate(dayjs().toDate())}>设为今天</button>
  <button onClick={() => setDate(null)}>清除</button>
</div>`;

export const sizeCode = `const [date, setDate] = useState(null);

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <DatePicker size="small" value={date} onChange={setDate} />
  <DatePicker size="middle" value={date} onChange={setDate} />
  <DatePicker size="large" value={date} onChange={setDate} />
</div>`;

export const pickerModeCode = `const modes = ['date', 'week', 'month', 'year'];

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  {modes.map((mode) => (
    <DatePicker key={mode} picker={mode} />
  ))}
</div>`;

export const variantCode = `<DatePicker value={new Date()} disabled />
<DatePicker allowClear={false} />
<DatePicker placeholder="请选择开始日期" />
<DatePicker format="YYYY/MM/DD" />`;

export const placementCode = `<DatePicker placement="bottomLeft" placeholder="bottomLeft" />
<DatePicker placement="bottomRight" placeholder="bottomRight" />
<DatePicker placement="topLeft" placeholder="topLeft" />
<DatePicker placement="topRight" placeholder="topRight" />`;

export const disabledDateCode = `// 禁用今天之前的日期
const disabledPast = (current) => current.isBefore(dayjs().startOf('day'));
<DatePicker disabledDate={disabledPast} />

// 禁用周末
const disabledWeekends = (current) => current.day() === 0 || current.day() === 6;
<DatePicker disabledDate={disabledWeekends} />

// 限制前后 30 天内
const disabledRange = (current) => {
  return current.isBefore(dayjs().subtract(30, 'day'), 'day')
      || current.isAfter(dayjs().add(30, 'day'), 'day');
};
<DatePicker disabledDate={disabledRange} />`;

export const themeConfigCode = `<ConfigProvider
  theme={{
    components: {
      DatePicker: {
        colorPrimary: '#52c41a',
        borderRadius: 8,
        colorBorder: '#b7eb8f',
      },
    },
  }}
>
  <DatePicker />
</ConfigProvider>`;

export const showTimeCode = `const [date, setDate] = useState(null);

<DatePicker
  showTime
  value={date}
  onChange={(d) => setDate(d)}
/>`;

export const presetsCode = `const presets = [
  { label: '今天', value: dayjs() },
  { label: '昨天', value: dayjs().subtract(1, 'day') },
  { label: '一周前', value: dayjs().subtract(7, 'day') },
  { label: '一个月前', value: dayjs().subtract(1, 'month') },
];

<DatePicker presets={presets} />`;

export const inputAndWeekCode = `// 手动输入（格式需与 format 一致）
<DatePicker format="YYYY/MM/DD" placeholder="输入 2026/07/02" />

// 周模式自定义格式
<DatePicker picker="week" />                          // → "2026-W27"
<DatePicker picker="week" format="YYYY年第ww周" />     // → "2026年第27周"
<DatePicker picker="week" format="YYYY/[Week] w" />   // → "2026/Week 27"
<DatePicker picker="week" format="第ww周 / YYYY" />   // → "第27周 / 2026"`;

export const rangePickerBasicCode = `const [range, setRange] = useState(null);

<RangePicker
  value={range}
  onChange={(dates, strings) => setRange(dates)}
/>`;

export const rangePickerSizeCode = `const [range, setRange] = useState(null);

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <RangePicker size="small" value={range} onChange={setRange} />
  <RangePicker size="middle" value={range} onChange={setRange} />
  <RangePicker size="large" value={range} onChange={setRange} />
</div>`;

export const rangePickerPresetsCode = `const presets = [
  { label: '今天', value: [dayjs().startOf('day'), dayjs().endOf('day')] },
  { label: '本周', value: [dayjs().startOf('week'), dayjs().endOf('week')] },
  { label: '本月', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
  { label: '最近7天', value: [dayjs().subtract(6, 'day').startOf('day'), dayjs().endOf('day')] },
];

<RangePicker presets={presets} />`;

export const rangePickerDisabledCode = `const disabledDate = (current) => {
  return current.isBefore(dayjs().startOf('day'));
};

<RangePicker disabledDate={disabledDate} />`;

export const rangePickerFormatCode = `<RangePicker format="YYYY/MM/DD" />
<RangePicker format="MM-DD-YYYY" />`;

export const rangePickerShowTimeCode = `const [range, setRange] = useState(null);

<RangePicker
  showTime
  value={range}
  onChange={(dates, strings) => setRange(dates)}
/>`;

export const rangePickerControlledCode = `const [range, setRange] = useState(null);

<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <RangePicker value={range} onChange={(dates) => setRange(dates)} />
  <button onClick={() => setRange([dayjs().startOf('day').toDate(), dayjs().endOf('day').toDate()])}>
    选择今天
  </button>
  <button onClick={() => setRange(null)}>清除</button>
</div>`;

export const rangePickerCalendarChangeCode = `const [range, setRange] = useState(null);

<RangePicker
  value={range}
  onChange={(dates, dateStrings) => {
    setRange(dates);
    console.log('最终确认:', dateStrings);
  }}
  onCalendarChange={(dates, dateStrings) => {
    console.log('面板变化:', dateStrings);
  }}
/>`;
