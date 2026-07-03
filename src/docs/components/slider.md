# Slider 滑块选择器

滑块选择器，用于在固定区间内选择一个值或一个范围值。

## 何时使用

- 需要一个数值在固定区间内选择时
- 需要选择一个数值范围时

## 代码演示

### 基础用法

最基本的滑块，支持受控和禁用。

```tsx
import React, { useState } from 'react';
import Slider from 'soui/Slider';

const App = () => {
  const [value, setValue] = useState(30);
  return (
    <div style={{ width: 400 }}>
      <p>当前值: {value}</p>
      <Slider value={value} onChange={(v) => setValue(v)} />
      <Slider defaultValue={50} disabled style={{ marginTop: 24 }} />
    </div>
  );
};
```

### 范围选择

开启 `range` 后变为双滑块模式，选择一个数值范围。

```tsx
import React, { useState } from 'react';
import Slider from 'soui/Slider';

const App = () => {
  const [value, setValue] = useState([20, 60]);
  return (
    <div style={{ width: 400 }}>
      <p>当前范围: {value[0]} - {value[1]}</p>
      <Slider range value={value} onChange={(v) => setValue(v)} />
    </div>
  );
};
```

### 刻度标记

通过 `marks` 设置刻度标记，`dots` 显示刻度点。`step={null}` 时仅可选标记点。

> **注意**：位于 0% 和 100% 的刻度标记与刻度点会自动贴边对齐，避免文本或圆点超出 rail 范围。

```tsx
import React from 'react';
import Slider from 'soui/Slider';

const marks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: { label: '100°C', style: { color: '#f50' } },
};

const App = () => (
  <div style={{ width: 400 }}>
    <Slider marks={marks} defaultValue={37} dots />
    <Slider marks={marks} step={null} defaultValue={26} style={{ marginTop: 32 }} />
  </div>
);
```

### 垂直模式

设置 `orientation="vertical"` 切换为垂直方向，支持刻度标记、范围选择等。

```tsx
import React, { useState } from 'react';
import Slider from 'soui/Slider';

const marks = {
  0: '0',
  25: '25',
  50: '50',
  75: '75',
  100: '100',
};

const temperatureMarks = {
  0: '0°C',
  26: '26°C',
  37: '37°C',
  100: { label: '100°C', style: { color: '#f50' } },
};

const App = () => (
  <div style={{ display: 'flex', gap: 48, height: 300 }}>
    <Slider orientation="vertical" defaultValue={30} />
    <Slider orientation="vertical" range defaultValue={[20, 70]} />
    <Slider orientation="vertical" marks={marks} defaultValue={50} dots />
    <Slider orientation="vertical" marks={temperatureMarks} defaultValue={37} />
    <Slider orientation="vertical" defaultValue={50} disabled />
  </div>
);
```

### 主题定制

通过 ConfigProvider 自定义滑块主题样式。

```tsx
import React from 'react';
import Slider from 'soui/Slider';
import ConfigProvider from 'soui/ConfigProvider';

const App = () => (
  <div style={{ width: 400 }}>
    <ConfigProvider
      theme={{
        components: {
          Slider: {
            colorPrimary: '#722ed1',
            colorPrimaryHover: '#9254de',
            handleSize: 18,
            railSize: 6,
            trackBg: '#722ed1',
            handleColor: '#f9f0ff',
          },
        },
      }}
    >
      <Slider defaultValue={40} />
      <Slider range defaultValue={[20, 70]} style={{ marginTop: 24 }} />
    </ConfigProvider>
  </div>
);
```

### 提示气泡

通过 `tooltip` 配置悬浮提示，可自定义格式化内容。

```tsx
import React, { useState } from 'react';
import Slider from 'soui/Slider';

const App = () => {
  const [value, setValue] = useState(30);
  return (
    <div style={{ width: 400 }}>
      <Slider
        value={value}
        onChange={(v) => setValue(v as number)}
        tooltip={{ open: true, formatter: (v) => `${v}%` }}
      />
      <Slider
        defaultValue={60}
        tooltip={{ formatter: (v) => `温度: ${v}°C` }}
        style={{ marginTop: 24 }}
      />
    </div>
  );
};
```

### 反向坐标轴

设置 `reverse` 反转坐标轴方向。

```tsx
import React, { useState } from 'react';
import Slider from 'soui/Slider';

const App = () => {
  const [value, setValue] = useState(30);
  return (
    <div style={{ width: 400 }}>
      <Slider value={value} onChange={(v) => setValue(v as number)} reverse />
      <Slider range defaultValue={[20, 80]} reverse style={{ marginTop: 24 }} />
    </div>
  );
};
```

### 事件回调

`onChange` 在值变化时实时触发，`onChangeComplete` 在拖拽或键盘操作结束时触发。

```tsx
import React, { useState } from 'react';
import Slider from 'soui/Slider';

const App = () => {
  const [changeValue, setChangeValue] = useState(30);
  const [completeValue, setCompleteValue] = useState(30);
  return (
    <div style={{ width: 400 }}>
      <p>onChange: {changeValue}</p>
      <p>onChangeComplete: {completeValue}</p>
      <Slider
        value={changeValue}
        onChange={(v) => setChangeValue(v as number)}
        onChangeComplete={(v) => setCompleteValue(v as number)}
      />
    </div>
  );
};
```

## API

### SliderProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| min | 最小值 | number | 0 |
| max | 最大值 | number | 100 |
| step | 步长，为 null 时仅可选 marks/min/max | number \| null | 1 |
| value | 当前值（受控） | number \| [number, number] | - |
| defaultValue | 默认值 | number \| [number, number] | - |
| disabled | 是否禁用 | boolean | false |
| range | 是否启用双滑块范围选择 | boolean \| { draggableTrack?: boolean } | false |
| orientation | 布局方向 | 'horizontal' \| 'vertical' | 'horizontal' |
| reverse | 反转坐标轴方向 | boolean | false |
| marks | 刻度标记 | Record<number, ReactNode \| { label: ReactNode; style?: CSSProperties }> | - |
| dots | 是否只能停在刻度点上 | boolean | false |
| included | 值是否包含在轨道区间内 | boolean | true |
| tooltip | 悬浮提示配置 | { open?: boolean; formatter?: ((value: number) => ReactNode) \| null } | - |
| keyboard | 是否允许键盘操作 | boolean | true |
| onChange | 值变化回调 | (value: number \| [number, number]) => void | - |
| onChangeComplete | 值变化完成回调 | (value: number \| [number, number]) => void | - |

## 主题变量

| CSS 变量 | 说明 | 默认值 |
| --- | --- | --- |
| --soui-slider-color-primary | 主色 | 全局主色 |
| --soui-slider-color-primary-hover | 主色悬停 | 全局主色hover |
| --soui-slider-handle-size | 滑块尺寸 | 14px |
| --soui-slider-rail-size | 轨道粗细 | 4px |
| --soui-slider-dot-size | 刻度点尺寸 | 6px |
| --soui-slider-rail-bg | 轨道背景色 | 分割线色 |
| --soui-slider-track-bg | 已选轨道背景色 | 全局主色 |
| --soui-slider-handle-color | 滑块手柄背景色 | #fff |
| --soui-slider-handle-active-color | 滑块激活态背景色 | 全局主色hover |
