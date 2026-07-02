# TimePicker 时间选择器

用于选择或输入时间。

## 何时使用

- 当用户需要选择一个具体的时间（时、分、秒）时
- 当用户需要选择时间范围中的一个时间点时
- 常用于表单中的时间字段、日程安排、定时任务等场景

## 代码演示

### 基础用法

基本的时间选择器，支持滚动列选择和手动输入。

```tsx
<TimePicker />
<TimePicker placeholder="选择时间" />
<TimePicker defaultValue={dayjs('09:30:00', 'HH:mm:ss')} />
```

### 尺寸

提供小、中、大三种尺寸。

```tsx
<TimePicker size="small" />
<TimePicker size="middle" />
<TimePicker size="large" />
```

### 受控模式

通过 `value` 和 `onChange` 实现受控，支持外部按钮操作。

```tsx
const [value, setValue] = useState(dayjs('14:30:00', 'HH:mm:ss'));

<TimePicker value={value} onChange={(time) => setValue(time)} />
<Button onClick={() => setValue(dayjs())}>设为当前时间</Button>
```

### 禁用时间

通过 `disabledHours`、`disabledMinutes`、`disabledSeconds` 禁用特定时间值。同时支持 `hideSeconds` 隐藏秒列，以及 `disabled` 禁用整个组件。

```tsx
const disabledHours = () => [0, 1, 2, 3, 4, 5, 6, 7, 8];
const disabledMinutes = (h) => h === 9 ? Array.from({ length: 30 }, (_, i) => i) : [];

<TimePicker disabledHours={disabledHours} disabledMinutes={disabledMinutes} />
<TimePicker hideSeconds />
<TimePicker disabled />
```

### 格式与步长

支持 `format` 自定义显示格式、`use12Hours` 开启 12 小时制、以及 `hourStep`/`minuteStep`/`secondStep` 自定义列步长。

```tsx
<TimePicker format="HH:mm" hideSeconds />
<TimePicker use12Hours format="hh:mm A" hideSeconds />
<TimePicker hourStep={2} minuteStep={15} secondStep={10} />
```

### 主题定制

通过 `ConfigProvider` 自定义主题样式，修改主色、圆角、边框等属性。

```tsx
<ConfigProvider theme={{ components: { TimePicker: { colorPrimary: '#722ed1', borderRadius: 8 } }}}>
  <TimePicker placeholder="紫色主题" />
</ConfigProvider>
```

### 自定义后缀图标

通过 `suffixIcon` 属性自定义输入框右侧的图标。

```tsx
import Icon from 'soui/Icon';

<TimePicker suffixIcon={<Icon name="Clock" size={14} />} />
<TimePicker suffixIcon={<span>⏰</span>} />
```

## API

### TimePicker Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 当前值（受控） | `Dayjs \| null` | - |
| defaultValue | 默认值 | `Dayjs \| null` | - |
| onChange | 时间变化回调 | `(time: Dayjs \| null, timeString: string) => void` | - |
| format | 展示格式 | `string` | `'HH:mm:ss'` |
| use12Hours | 是否使用 12 小时制 | `boolean` | `false` |
| hourStep | 小时步长 | `number` | `1` |
| minuteStep | 分钟步长 | `number` | `1` |
| secondStep | 秒步长 | `number` | `1` |
| disabledHours | 禁用小时 | `() => number[]` | - |
| disabledMinutes | 禁用分钟 | `(selectedHour: number) => number[]` | - |
| disabledSeconds | 禁用秒 | `(selectedHour: number, selectedMinute: number) => number[]` | - |
| showNow | 是否显示"此刻"按钮 | `boolean` | `true` |
| allowClear | 是否允许清除 | `boolean` | `true` |
| size | 尺寸 | `'small' \| 'middle' \| 'large'` | `'middle'` |
| disabled | 是否禁用 | `boolean` | `false` |
| placeholder | 占位文字 | `string` | - |
| placement | 面板弹出方向 | `'bottomLeft' \| 'bottomRight' \| 'topLeft' \| 'topRight'` | `'bottomLeft'` |
| open | 是否显示面板（受控） | `boolean` | - |
| onOpenChange | 面板显隐回调 | `(open: boolean) => void` | - |
| status | 输入框状态 | `'error' \| 'warning'` | - |
| needConfirm | 是否需要点击确定 | `boolean` | `true` |
| suffixIcon | 自定义后缀图标 | `ReactNode` | - |
| renderExtraFooter | 自定义底部渲染 | `() => ReactNode` | - |
| hideSeconds | 隐藏秒列 | `boolean` | `false` |

## TimePicker.RangePicker 时间范围选择

选择开始时间和结束时间的范围。

### 基础用法

```tsx
const RangePicker = TimePicker.RangePicker;

<RangePicker />
<RangePicker
  value={[dayjs('09:00', 'HH:mm'), dayjs('18:00', 'HH:mm')]}
  onChange={(times, strings) => console.log(strings[0], '~', strings[1])}
/>
```

### 变体

```tsx
<RangePicker hideSeconds placeholder={['上班', '下班']} />
<RangePicker disabled />
<RangePicker disabled={[false, true]} />
<RangePicker use12Hours format="hh:mm A" hideSeconds />
```

### 自定义分隔符和后缀图标

通过 `separator` 属性自定义开始和结束时间之间的分隔符，通过 `suffixIcon` 自定义后缀图标。

```tsx
import Icon from 'soui/Icon';

<RangePicker separator="至" />
<RangePicker separator={<span>→</span>} />
<RangePicker suffixIcon={<Icon name="Clock" size={14} />} />
<RangePicker separator="到" suffixIcon={<span>⏰</span>} />
```

### RangePicker Props

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 当前值（受控） | `[Dayjs \| null, Dayjs \| null]` | - |
| defaultValue | 默认值 | `[Dayjs \| null, Dayjs \| null]` | - |
| onChange | 时间变化回调 | `(times: [Dayjs \| null, Dayjs \| null], timeStrings: [string, string]) => void` | - |
| format | 展示格式 | `string` | `'HH:mm:ss'` |
| use12Hours | 是否使用 12 小时制 | `boolean` | `false` |
| hourStep | 小时步长 | `number` | `1` |
| minuteStep | 分钟步长 | `number` | `1` |
| secondStep | 秒步长 | `number` | `1` |
| showNow | 是否显示"此刻"按钮 | `boolean` | `true` |
| allowClear | 是否允许清除 | `boolean` | `true` |
| size | 尺寸 | `'small' \| 'middle' \| 'large'` | `'middle'` |
| disabled | 是否禁用（可传数组） | `boolean \| [boolean, boolean]` | `false` |
| placeholder | 占位文字 | `[string, string]` | `['开始时间', '结束时间']` |
| placement | 面板弹出方向 | `'bottomLeft' \| 'bottomRight' \| 'topLeft' \| 'topRight'` | `'bottomLeft'` |
| hideSeconds | 隐藏秒列 | `boolean` | `false` |
| separator | 自定义分隔符 | `ReactNode` | `'~'` |
| suffixIcon | 自定义后缀图标 | `ReactNode` | - |

## 主题定制

TimePicker 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置。

### 组件级配置

通过 `theme.components.TimePicker` 进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      TimePicker: {
        borderRadius: 8,
        fontSize: 14,
        colorPrimary: '#722ed1',
        colorPrimaryHover: '#9254de',
        colorBorderHover: '#9254de',
      },
    },
  }}
>
  <YourApp />
</ConfigProvider>
```

### 配置优先级

配置优先级从高到低：

1. **Props (style/className)** - 直接传入的样式属性
2. **组件级配置** - `theme.components.TimePicker` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorPrimary | 主色 | `string` | `'#1677ff'` |
| colorPrimaryHover | hover 主色 | `string` | `'#4096ff'` |
| borderRadius | 圆角大小（像素） | `number` | `6` |
| fontSize | 字体大小（像素） | `number` | `14` |
| colorBorder | 边框颜色 | `string` | `'#d9d9d9'` |
| colorBorderHover | hover 边框颜色 | `string` | `'#4096ff'` |
| colorBorderFocus | focus 边框颜色 | `string` | `'#1677ff'` |
| colorBg | 触发器背景色 | `string` | `'#fff'` |
| panelBg | 面板背景色 | `string` | `'#fff'` |
| colorText | 文本颜色 | `string` | `'rgba(0,0,0,0.88)'` |
| controlHeight | 控件高度（像素） | `number` | `32` |

## 无障碍访问

- 输入框支持键盘操作（Enter 确认，Escape 关闭）
- 面板使用 `z-index` 确保浮层层级正确
- 支持 Tab 键焦点管理

## FAQ

### TimePicker 和 DatePicker showTime 有什么区别？

`TimePicker` 专注于纯时间选择（时、分、秒），不涉及日期。`DatePicker` 的 `showTime` 是在日期选择基础上附加时间选择功能。如果只需要时间，使用 `TimePicker` 更轻量。

### 如何实现时间范围选择？

使用 `TimePicker.RangePicker` 子组件，它提供了完整的时间范围选择功能，包括开始/结束时间联动、独立禁用控制等。

## 相关资源

- [DatePicker 日期选择器](/components/date-picker)
