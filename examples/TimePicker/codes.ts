export const basicCode = `<div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
  <TimePicker />
  <TimePicker placeholder="选择时间" />
  <TimePicker defaultValue={dayjs('09:30:00', 'HH:mm:ss')} />
</div>`;

export const sizeCode = `<div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
  <TimePicker size="small" />
  <TimePicker size="middle" />
  <TimePicker size="large" />
</div>`;

export const controlledCode = `const [value, setValue] = useState(dayjs('14:30:00', 'HH:mm:ss'));

<Space direction="vertical">
  <TimePicker
    value={value}
    onChange={(time) => setValue(time)}
  />
  <Space>
    <Button onClick={() => setValue(dayjs())}>设为当前时间</Button>
    <Button onClick={() => setValue(null)}>清空</Button>
  </Space>
</Space>`;

export const disabledTimeCode = `// 禁用上午 9 点之前的所有小时
const disabledHours = () => {
  const hours = [];
  for (let i = 0; i < 9; i++) hours.push(i);
  return hours;
};

// 根据选中小时禁用分钟
const disabledMinutes = (selectedHour) => {
  if (selectedHour === 9) {
    const minutes = [];
    for (let i = 0; i < 30; i++) minutes.push(i);
    return minutes;
  }
  return [];
};

<div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
  <TimePicker
    disabledHours={disabledHours}
    disabledMinutes={disabledMinutes}
    placeholder="9点后，9:30前不可选"
  />
  <TimePicker hideSeconds placeholder="隐藏秒列" />
  <TimePicker disabled placeholder="禁用状态" />
</div>`;

export const formatCode = `<div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
  <TimePicker format="HH:mm" hideSeconds placeholder="时:分" />
  <TimePicker use12Hours format="hh:mm A" hideSeconds placeholder="12小时制" />
  <TimePicker hourStep={2} minuteStep={15} secondStep={10} placeholder="自定义步长" />
</div>`;

export const themeConfigCode = `<div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
  <ConfigProvider
    theme={{
      primaryColor: '#722ed1',
      primaryHoverColor: '#9254de',
      components: {
        TimePicker: {
          borderRadius: 8,
          colorPrimary: '#722ed1',
          colorPrimaryHover: '#9254de',
          colorBorderHover: '#9254de',
        },
      },
    }}
  >
    <TimePicker placeholder="紫色主题" />
  </ConfigProvider>
  <ConfigProvider
    theme={{
      components: {
        TimePicker: {
          borderRadius: 12,
          colorPrimary: '#13c2c2',
          colorPrimaryHover: '#36cfc9',
          colorBorderHover: '#36cfc9',
        },
      },
    }}
  >
    <TimePicker placeholder="青色主题" />
  </ConfigProvider>
</div>`;

export const rangeBasicCode = `const RangePicker = TimePicker.RangePicker;
const [value, setValue] = useState([
  dayjs('09:00:00', 'HH:mm:ss'),
  dayjs('18:00:00', 'HH:mm:ss'),
]);

<div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
  <RangePicker />
  <RangePicker
    value={value}
    onChange={(times, strings) => {
      setValue(times);
      console.log('时间范围:', strings[0], '~', strings[1]);
    }}
  />
</div>`;

export const rangeSizeCode = `const RangePicker = TimePicker.RangePicker;

<div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
  <RangePicker size="small" />
  <RangePicker size="middle" />
  <RangePicker size="large" />
</div>`;

export const rangeVariantCode = `const RangePicker = TimePicker.RangePicker;

<div style={{ display: 'flex', gap: 16, flexDirection: 'column' }}>
  <RangePicker hideSeconds placeholder={['上班', '下班']} />
  <RangePicker disabled />
  <RangePicker disabled={[false, true]} placeholder={['开始时间', '结束（已禁用）']} />
  <RangePicker use12Hours format="hh:mm A" hideSeconds />
</div>`;
