# DatePicker 日期选择器

输入或选择日期的控件，基于 [dayjs](https://day.js.org/) 实现日期处理，支持日期、周、月、年四种选择模式，提供可视化日历面板、时间选择、预设快捷选项等功能。

## 何时使用

- 需要用户选择或输入日期时
- 表单中需要日期字段时
- 需要日期范围限制（禁用特定日期）时
- 需要选择周、月、年等时间粒度时
- 需要同时选择日期和时间时（`showTime`）
- 需要提供快捷日期选项时（`presets`）

## 代码演示

### 基础用法

最基本的日期选择器，点击输入框打开日历面板选择日期。

```tsx
const [date, setDate] = useState(null);

<DatePicker value={date} onChange={(d) => setDate(d)} />
```

### 受控模式

通过 `value` 和 `onChange` 实现受控，支持外部设置日期、清除等操作。

```tsx
import dayjs from 'dayjs';

const [date, setDate] = useState(null);

<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
  <DatePicker value={date} onChange={(d) => setDate(d)} />
  <button onClick={() => setDate(dayjs())}>设为今天</button>
  <button onClick={() => setDate(null)}>清除</button>
</div>
```

### 尺寸

支持 `small`、`middle`、`large` 三种尺寸，与 Input 组件保持一致。

```tsx
<DatePicker size="small" />
<DatePicker size="middle" />
<DatePicker size="large" />
```

### 选择模式

通过 `picker` 属性切换日期、周、月、年四种选择模式。

```tsx
<DatePicker picker="date" />
<DatePicker picker="week" />
<DatePicker picker="month" />
<DatePicker picker="year" />
```

### 变体

支持禁用、不可清除、自定义占位文字、自定义日期格式等。

```tsx
<DatePicker disabled />
<DatePicker allowClear={false} />
<DatePicker placeholder="请选择开始日期" />
<DatePicker format="YYYY/MM/DD" />
```

### 弹出方向

通过 `placement` 控制面板弹出位置，支持四个方向。组件会自动检测视口空间，空间不足时自动翻转。

```tsx
<DatePicker placement="bottomLeft" placeholder="bottomLeft" />
<DatePicker placement="bottomRight" placeholder="bottomRight" />
<DatePicker placement="topLeft" placeholder="topLeft" />
<DatePicker placement="topRight" placeholder="topRight" />
```

### 禁用日期

通过 `disabledDate` 回调禁用指定日期，参数为 dayjs 对象。在日期和周模式下按天判断，在月模式下以每月第一天判断，在年模式下以每年第一天判断。

禁用今天之前的日期：

```tsx
import dayjs from 'dayjs';

const disabledDate = (current) => {
  return current.isBefore(dayjs().startOf('day'));
};

<DatePicker disabledDate={disabledDate} />
```

禁用周末：

```tsx
const disabledWeekends = (current) => {
  return current.day() === 0 || current.day() === 6;
};

<DatePicker disabledDate={disabledWeekends} />
```

限制可选范围（前后 30 天内）：

```tsx
const disabledRange = (current) => {
  const tooEarly = current.isBefore(dayjs().subtract(30, 'day'), 'day');
  const tooLate = current.isAfter(dayjs().add(30, 'day'), 'day');
  return tooEarly || tooLate;
};

<DatePicker disabledDate={disabledRange} />
```

### 时间选择

开启 `showTime` 后，面板底部显示"选择时间"按钮，点击可切换到时/分/秒选择面板。选中日期后可继续调整时间，点击"确定"关闭面板。

```tsx
const [date, setDate] = useState(null);

<DatePicker showTime value={date} onChange={(d) => setDate(d)} />
```

### 预设日期

通过 `presets` 属性提供快捷日期选项，显示在面板底部。

```tsx
import dayjs from 'dayjs';

const presets = [
  { label: '今天', value: dayjs() },
  { label: '昨天', value: dayjs().subtract(1, 'day') },
  { label: '一周前', value: dayjs().subtract(7, 'day') },
];

<DatePicker presets={presets} />
```

### 手动输入

除了点击面板选择日期，也可以直接在输入框中键入日期。输入内容需与 `format` 格式一致，失焦后自动解析。

```tsx
<DatePicker format="YYYY/MM/DD" placeholder="输入 2026/07/02" />
```

### 周模式自定义格式

周模式支持通过 `format` 中的 `w`（不补零）和 `ww`（补零）自定义显示格式。

```tsx
<DatePicker picker="week" />                                  // → "2026-W27"
<DatePicker picker="week" format="YYYY年第ww周" />             // → "2026年第27周"
<DatePicker picker="week" format="YYYY/[Week] w" />           // → "2026/Week 27"
<DatePicker picker="week" format="第ww周 / YYYY" />           // → "第27周 / 2026"
```

### 主题定制

通过 ConfigProvider 自定义主题样式。

```tsx
<ConfigProvider
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
</ConfigProvider>
```

---

# RangePicker 范围选择器

选择日期范围，双面板联动显示，支持范围高亮和悬停预览。

## 何时使用

- 需要选择开始和结束日期时
- 表单中需要日期范围字段时
- 需要快捷选择常用范围时（本周、本月、最近7天等）

## 代码演示

### 基础用法

基本的日期范围选择器，左右两个面板联动显示连续两个月。

```tsx
const [range, setRange] = useState(null);

<RangePicker
  value={range}
  onChange={(dates, strings) => setRange(dates)}
/>
```

### 尺寸

支持 `small`、`middle`、`large` 三种尺寸。

```tsx
<RangePicker size="small" />
<RangePicker size="middle" />
<RangePicker size="large" />
```

### 预设范围

通过 `presets` 提供快捷范围选项。

```tsx
import dayjs from 'dayjs';

const presets = [
  { label: '今天', value: [dayjs().startOf('day'), dayjs().endOf('day')] },
  { label: '本周', value: [dayjs().startOf('week'), dayjs().endOf('week')] },
  { label: '本月', value: [dayjs().startOf('month'), dayjs().endOf('month')] },
  { label: '最近7天', value: [dayjs().subtract(6, 'day').startOf('day'), dayjs().endOf('day')] },
];

<RangePicker presets={presets} />
```

### 禁用日期范围

通过 `disabledDate` 禁用不可选的日期，同样适用于范围选择器。

```tsx
import dayjs from 'dayjs';

// 禁用今天之前的日期
const disabledDate = (current) => {
  return current.isBefore(dayjs().startOf('day'));
};

<RangePicker disabledDate={disabledDate} />
```

### 自定义格式

通过 `format` 自定义日期显示格式，范围选择器同样支持。

```tsx
<RangePicker format="YYYY/MM/DD" />
<RangePicker format="MM-DD-YYYY" />
```

### 日期时间范围

开启 `showTime` 后，选择完起止日期后会进入时间选择面板，支持分别为开始和结束时间设置时、分、秒。

```tsx
<RangePicker
  showTime
  onChange={(dates, strings) => console.log('范围:', strings)}
/>
```

### 受控范围

通过 `value` 和 `onChange` 实现受控模式，支持外部操作日期范围。

```tsx
import dayjs from 'dayjs';

const [range, setRange] = useState(null);

<div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
  <RangePicker value={range} onChange={(dates) => setRange(dates)} />
  <button onClick={() => setRange([dayjs().startOf('day'), dayjs().endOf('day')])}>
    选择今天
  </button>
  <button onClick={() => setRange(null)}>清除</button>
</div>
```

### 日历变化回调

通过 `onCalendarChange` 监听面板中日期变化（不同于 `onChange` 在最终确认后才触发），适用于需要实时响应面板操作的场景。

```tsx
<RangePicker
  onCalendarChange={(dates, dateStrings) => {
    console.log('面板变化:', dateStrings);
  }}
  onChange={(dates, dateStrings) => {
    console.log('最终确认:', dateStrings);
  }}
/>
```

## API

### DatePicker 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 当前日期值（受控） | `Date \| string \| null` | - |
| defaultValue | 默认日期值 | `Date \| string \| null` | - |
| picker | 选择器模式 | `'date' \| 'week' \| 'month' \| 'year'` | `'date'` |
| format | 日期格式 | `string` | 由 picker 决定 |
| placeholder | 占位文字 | `string` | 由 picker 决定 |
| allowClear | 是否允许清除 | `boolean` | `true` |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'middle' \| 'large'` | `'middle'` |
| disabledDate | 不可选择的日期（支持日期/周/月/年模式） | `(current: Dayjs) => boolean` | - |
| placement | 面板弹出方向 | `'bottomLeft' \| 'bottomRight' \| 'topLeft' \| 'topRight'` | `'bottomLeft'` |
| showTime | 是否显示时间选择器 | `boolean` | `false` |
| showNow | 是否显示"此刻"按钮 | `boolean` | `true` |
| showToday | 是否显示"今天"按钮 | `boolean` | `true` |
| presets | 预设快捷选项 | `Array<{ label: ReactNode; value: Date \| Dayjs }>` | - |
| onChange | 日期变化回调 | `(date: Date \| null, dateString: string) => void` | - |
| onOpenChange | 面板打开/关闭回调 | `(open: boolean) => void` | - |
| onPanelChange | 面板日期变化回调 | `(date: Date, mode: PickerMode) => void` | - |

### RangePicker 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 范围值（受控） | `[Date \| null, Date \| null] \| null` | - |
| defaultValue | 默认范围值 | `[Date \| null, Date \| null] \| null` | - |
| picker | 选择器模式 | `'date' \| 'week' \| 'month' \| 'year'` | `'date'` |
| format | 日期格式 | `string` | 由 picker 决定 |
| placeholder | 占位文字 | `[string, string]` | `['开始日期', '结束日期']` |
| allowClear | 是否允许清除 | `boolean` | `true` |
| disabled | 是否禁用 | `boolean` | `false` |
| size | 尺寸 | `'small' \| 'middle' \| 'large'` | `'middle'` |
| disabledDate | 不可选择的日期（支持日期/周/月/年模式） | `(current: Dayjs) => boolean` | - |
| placement | 面板弹出方向 | `'bottomLeft' \| 'bottomRight' \| 'topLeft' \| 'topRight'` | `'bottomLeft'` |
| showTime | 是否显示时间选择器 | `boolean` | `false` |
| showNow | 是否显示"此刻"按钮 | `boolean` | `true` |
| presets | 预设快捷选项 | `Array<{ label: ReactNode; value: [Date \| Dayjs, Date \| Dayjs] }>` | - |
| onChange | 范围变化回调 | `(dates: RangeValue, dateStrings: [string, string]) => void` | - |
| onOpenChange | 面板打开/关闭回调 | `(open: boolean) => void` | - |
| onCalendarChange | 日历变化回调 | `(dates: RangeDayjsValue, dateStrings: [string, string]) => void` | - |

### 默认格式

| picker | 默认 format |
|--------|-------------|
| date | `YYYY-MM-DD` |
| date + showTime | `YYYY-MM-DD HH:mm:ss` |
| week | `YYYY-Ww` |
| month | `YYYY-MM` |
| year | `YYYY` |

**周模式 format 说明：** 由于 dayjs 原生的 `w`/`ww` format token 在某些环境下不可靠，DatePicker 对周模式做了后处理——format 字符串中的 `w` 会被替换为实际 ISO 周数（不补零），`ww` 会补零。其余 dayjs token（`YYYY`、`MM`、`DD` 等）正常工作。自定义示例：

```tsx
<DatePicker picker="week" format="YYYY年第ww周" />  // → "2026年第27周"
<DatePicker picker="week" format="YYYY/[Week] w" /> // → "2026/Week 27"
```

## 主题定制

DatePicker 和 RangePicker 组件支持通过 ConfigProvider 进行主题定制，遵循 SoUi 三层设计令牌系统。

组件作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置。

### 组件级配置

```tsx
<ConfigProvider
  theme={{
    components: {
      DatePicker: {
        colorPrimary: '#722ed1',
        borderRadius: 12,
        fontSize: 14,
        colorBorder: '#d3adf7',
        colorBg: '#fff',
        panelBg: '#fafafa',
        colorText: 'rgba(0,0,0,0.88)',
        controlHeight: 36,
      },
    },
  }}
>
  <DatePicker />
  <RangePicker />
</ConfigProvider>
```

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorPrimary | 主色 | `string` | `#1677ff` |
| borderRadius | 圆角大小（像素） | `number` | `6` |
| fontSize | 字体大小（像素） | `number` | `14` |
| colorBorder | 边框颜色 | `string` | `#d9d9d9` |
| colorBg | 背景色 | `string` | `#fff` |
| panelBg | 面板背景色 | `string` | `#fff` |
| colorText | 文本颜色 | `string` | `rgba(0,0,0,0.88)` |
| controlHeight | 控件高度（像素） | `number` | `32` |

## dayjs 集成

DatePicker 内部使用 [dayjs](https://day.js.org/) 处理日期运算，已预加载以下插件：

- `isoWeek` — ISO 周数计算
- `weekOfYear` — 年内周数
- `isBetween` — 日期范围判断
- `customParseFormat` — 自定义格式解析
- `zh-cn` locale — 中文本地化（周一为一周起始）

`disabledDate` 回调参数为 `Dayjs` 对象，可直接调用 dayjs API：

```tsx
const disabledDate = (current) => {
  // 禁用周末
  return current.day() === 0 || current.day() === 6;
};
```

## 无障碍访问

- 触发器使用 `role="button"` + `aria-haspopup="dialog"` + `aria-expanded`
- 面板使用 `role="dialog"` + `aria-label`
- 日期按钮使用 `aria-label` 提供完整日期描述
- 清除按钮使用 `aria-label="清除日期"`
- 导航按钮使用 `aria-label` 说明方向

## FAQ

### 为什么选择 dayjs 而非原生 Date？

原生 `Date` 对象的 API 设计存在诸多缺陷（月份从0开始、可变性、时区问题等），dayjs 提供了不可变、链式调用、插件化的现代日期 API，同时体积仅 2KB。

### RangePicker 如何限制结束日期不能早于开始日期？

组件内部已自动处理：当选择的结束日期早于开始日期时，会自动将两个日期交换并重新进入结束日期选择状态。

### 如何在表单中使用？

DatePicker 和 RangePicker 都支持受控模式，配合表单库使用时传入 `value` 和 `onChange` 即可。`onChange` 回调返回原生 `Date` 对象，便于序列化提交。
