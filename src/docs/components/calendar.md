# Calendar 日历

按照日历形式展示数据的容器，支持月视图和年视图切换、日期选择、自定义单元格渲染。

## 何时使用

- 需要展示日程安排、事件列表等与日期相关的数据时。
- 需要以月/年为单位浏览和选择日期时。
- 需要在日期格子中渲染自定义内容（如事件标记、统计信息）时。

## 代码演示

### 基础用法

基本的日历组件，支持月/年视图切换和日期选择。通过 `value` 和 `mode` 实现受控模式。

```tsx
import { Calendar } from '@soui/ui';
import type { CalendarMode } from '@soui/ui';
import dayjs, { type Dayjs } from 'dayjs';
import { useState } from 'react';

export default () => {
  const [value, setValue] = useState<Dayjs>(dayjs());
  const [mode, setMode] = useState<CalendarMode>('month');

  return (
    <Calendar
      value={value}
      mode={mode}
      onChange={setValue}
      onPanelChange={(date, newMode) => setMode(newMode)}
    />
  );
};
```

### 卡片模式

设置 `fullscreen={false}` 切换为紧凑的卡片式日历，适用于侧边栏、弹出层等空间有限的场景。

```tsx
import { Calendar } from '@soui/ui';
import dayjs from 'dayjs';

export default () => (
  <div style={{ width: 320 }}>
    <Calendar
      fullscreen={false}
      onChange={(date) => console.log('选中:', date.format('YYYY-MM-DD'))}
    />
  </div>
);
```

### 自定义渲染

通过 `cellRender` 在日期单元格中追加自定义内容，如事件列表、标记等。`info.type` 区分当前渲染的是日期格子还是月份格子。

```tsx
import { Calendar } from '@soui/ui';
import type { CellRenderInfo } from '@soui/ui';
import dayjs, { type Dayjs } from 'dayjs';

const events: Record<string, { type: string; content: string }[]> = {};
const today = dayjs();
events[today.format('YYYY-MM-DD')] = [
  { type: 'success', content: '团队周会' },
  { type: 'warning', content: '代码评审' },
];

export default () => (
  <Calendar
    cellRender={(current: Dayjs, info: CellRenderInfo) => {
      if (info.type === 'date') {
        const dayEvents = events[current.format('YYYY-MM-DD')] || [];
        return dayEvents.map((evt, i) => (
          <div key={i} style={{ fontSize: 12 }}>{evt.content}</div>
        ));
      }
      return null;
    }}
  />
);
```

### 禁用日期

通过 `disabledDate` 禁用特定日期。返回 `true` 的日期将不可选中，样式置灰。

```tsx
import { Calendar } from '@soui/ui';
import dayjs, { type Dayjs } from 'dayjs';

export default () => (
  <Calendar
    disabledDate={(current: Dayjs) => {
      const isBefore = current.isBefore(dayjs(), 'day');
      const isWeekend = current.day() === 0 || current.day() === 6;
      return isBefore || isWeekend;
    }}
  />
);
```

### 农历显示

通过 `showLunar` 属性在每个日期下方显示对应的农历信息，包含节气提示。适用于需要展示传统农历的场景。

```tsx
import { Calendar } from '@soui/ui';

export default () => <Calendar showLunar />;
```

### 自定义头部

通过 `headerRender` 完全自定义日历头部区域，可以实现前后翻页、快捷跳转等交互。

```tsx
import { Calendar } from '@soui/ui';
import type { HeaderRenderConfig } from '@soui/ui';
import { Button, Space } from '@soui/ui';

export default () => (
  <Calendar
    headerRender={({ value, mode, onChange, onModeChange }: HeaderRenderConfig) => (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px' }}>
        <Space>
          <Button size="small" onClick={() => onChange(value.subtract(1, 'month'))}>上月</Button>
          <Button size="small" onClick={() => onChange(value.add(1, 'month'))}>下月</Button>
          <Button size="small" onClick={() => onChange(value.subtract(1, 'year'))}>去年</Button>
          <Button size="small" onClick={() => onChange(value.add(1, 'year'))}>明年</Button>
        </Space>
        <span style={{ fontWeight: 600 }}>{value.format('YYYY年M月')}</span>
        <Space>
          <Button size="small" type={mode === 'month' ? 'primary' : 'default'} onClick={() => onModeChange('month')}>月</Button>
          <Button size="small" type={mode === 'year' ? 'primary' : 'default'} onClick={() => onModeChange('year')}>年</Button>
        </Space>
      </div>
    )}
  />
);
```

## API

### Calendar

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| value | 受控日期值 | `Dayjs` | `-` | - |
| defaultValue | 默认日期值 | `Dayjs` | `dayjs()` | - |
| onChange | 日期变化回调 | `(date: Dayjs) => void` | `-` | - |
| onPanelChange | 面板变化回调（切换月份/年份/视图模式） | `(date: Dayjs, mode: CalendarMode) => void` | `-` | - |
| mode | 受控面板模式 | `'month' \| 'year'` | `-` | - |
| defaultMode | 默认面板模式 | `'month' \| 'year'` | `'month'` | - |
| fullscreen | 是否全屏展示（false 为卡片模式） | `boolean` | `true` | - |
| headerRender | 自定义头部渲染 | `(config: HeaderRenderConfig) => ReactNode` | `-` | - |
| cellRender | 自定义单元格内容（追加在日期数字下方） | `(current: Dayjs, info: CellRenderInfo) => ReactNode` | `-` | - |
| fullCellRender | 自定义完整单元格（替换整个单元格） | `(current: Dayjs, info: CellRenderInfo) => ReactNode` | `-` | - |
| disabledDate | 禁用日期，返回 true 则不可选 | `(current: Dayjs) => boolean` | `-` | - |
| showLunar | 是否显示农历信息 | `boolean` | `false` | - |
| yearRange | 年份选择器显示当前年份前后各多少年，有效范围 1~50，非整数自动取整，越界自动修正 | `number` | `10` | - |

### HeaderRenderConfig

| 参数 | 说明 | 类型 |
|------|------|------|
| value | 当前显示日期 | `Dayjs` |
| mode | 当前面板类型 | `'month' \| 'year'` |
| onChange | 变更日期 | `(date: Dayjs) => void` |
| onModeChange | 切换面板类型 | `(mode: CalendarMode) => void` |

### CellRenderInfo

| 参数 | 说明 | 类型 |
|------|------|------|
| type | 单元格类型（日期或月份） | `'date' \| 'month'` |
| today | 今天的日期 | `Dayjs` |

## 主题定制

Calendar 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.Calendar` 针对组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Calendar: {
        fontSize: 14,
        colorPrimary: '#1677ff',
        borderRadius: 8,
        cellHeight: 100,
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
2. **组件级配置** - `theme.components.Calendar` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| fontSize | 字体大小（像素） | `number` | `14` |
| colorPrimary | 主色（选中/今天高亮） | `string` | `#1677ff` |
| borderRadius | 边框圆角（像素） | `number` | `6` |
| cellHeight | 单元格高度（像素，全屏模式） | `number` | `80` |
| headerBg | 头部背景色 | `string` | `-` |

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<Calendar
  style={{
    '--soui-calendar-color-primary': '#722ed1',
    '--soui-calendar-cell-height': '100px',
    '--soui-calendar-border-radius': '8px',
  }}
/>
```

## 设计原则

### 推荐用法

```tsx
// 受控模式：配合 onPanelChange 同步 mode 状态
<Calendar value={value} mode={mode} onChange={setValue} onPanelChange={(d, m) => setMode(m)} />

// 使用 cellRender 展示事件
<Calendar cellRender={(date, { type }) => type === 'date' ? renderEvents(date) : null} />
```

### 避免使用

```tsx
// 避免在 disabledDate 中修改传入的日期对象
<Calendar disabledDate={(current) => { current.add(1, 'day'); return false; }} />

// 避免在 cellRender 中返回过重的组件，影响渲染性能
<Calendar cellRender={() => <HeavyChartComponent />} />
```

## 无障碍访问

组件遵循 WAI-ARIA 规范：

- 日历表格使用 `role="grid"` 语义化标签
- 日期单元格使用 `role="gridcell"` 标识
- 选中状态通过 `aria-selected` 属性标识
- 禁用状态通过 `aria-disabled` 属性标识
- 视图切换按钮使用 `role="radiogroup"` 和 `role="radio"`
- 年份/月份选择器提供 `aria-label` 标签
