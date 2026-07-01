export const basicCode = `const [date, setDate] = useState(null);

<DatePicker
  value={date}
  onChange={(d) => setDate(d)}
/>`;

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

export const disabledDateCode = `const disabledDate = (current) => {
  return current.isBefore(dayjs().startOf('day'));
};

<DatePicker disabledDate={disabledDate} />`;

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

export const rangePickerBasicCode = `const [range, setRange] = useState(null);

<RangePicker
  value={range}
  onChange={(dates, strings) => setRange(dates)}
/>`;

export const rangePickerPresetsCode = `const presets = [
  { label: '今天', value: [dayjs().startOf('day'), dayjs().endOf('day')] },
  { label: '本周', value: [dayjs().startOf('week'), dayjs().endOf('week')] },
  { label: '本月', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
  { label: '最近7天', value: [dayjs().subtract(6, 'day').startOf('day'), dayjs().endOf('day')] },
];

<RangePicker presets={presets} />`;
