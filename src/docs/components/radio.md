# Radio 单选框

单选框，用于在一组互斥的选项中选择一项。

## 何时使用

- 需要从一组选项中选择一个且仅一个值时
- 选项数量较少（通常不超过 5 个），适合全部展示给用户
- 需要用户明确感知所有可选项时

## 代码演示

### 基础用法

最简单的单选框，支持默认选中、禁用状态和受控模式。

```tsx
import { useState } from 'react';
import { Radio } from '@soui/ui';

export default () => {
  const [value, setValue] = useState('apple');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Radio>选项 A</Radio>
      <Radio defaultChecked>默认选中</Radio>
      <Radio.Group value={value} onChange={(e) => setValue(e.target.value)}>
        <Radio value="apple">苹果</Radio>
        <Radio value="banana">香蕉</Radio>
        <Radio value="orange">橙子</Radio>
      </Radio.Group>
      <div>
        <Radio disabled>禁用未选</Radio>
        <Radio disabled checked style={{ marginLeft: 16 }}>禁用已选</Radio>
      </div>
    </div>
  );
};
```

### 单选组

通过 `Radio.Group` 管理一组互斥选项。支持 `options` 数据驱动和子组件两种方式，以及按钮风格（`outline` / `solid`）。

```tsx
import { useState } from 'react';
import { Radio } from '@soui/ui';

export default () => {
  const [val, setVal] = useState('react');

  const options = [
    { label: 'React', value: 'react' },
    { label: 'Vue', value: 'vue' },
    { label: 'Angular', value: 'angular' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Radio.Group options={options} value={val} onChange={(e) => setVal(e.target.value)} />
      <Radio.Group optionType="button" options={options} value={val} onChange={(e) => setVal(e.target.value)} />
      <Radio.Group optionType="button" buttonStyle="solid" options={options} defaultValue="react" />
      <Radio.Group defaultValue="a">
        <Radio value="a">选项 A</Radio>
        <Radio value="b">选项 B</Radio>
        <Radio value="c">选项 C</Radio>
        <Radio value="d" disabled>选项 D</Radio>
      </Radio.Group>
    </div>
  );
};
```

### 尺寸

通过 `size` 控制按钮风格的尺寸，支持 `small`、`middle`（默认）、`large`。

```tsx
import { Radio } from '@soui/ui';

const options = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
];

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
    <Radio.Group optionType="button" size="small" options={options} defaultValue="react" />
    <Radio.Group optionType="button" size="middle" options={options} defaultValue="react" />
    <Radio.Group optionType="button" size="large" options={options} defaultValue="react" />
    <Radio.Group size="small" options={options} defaultValue="react" />
    <Radio.Group size="middle" options={options} defaultValue="react" />
    <Radio.Group size="large" options={options} defaultValue="react" />
  </div>
);
```

### 主题定制

通过 `ConfigProvider` 自定义 Radio 的主题样式。

```tsx
import { Radio, ConfigProvider } from '@soui/ui';

const options = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
];

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <ConfigProvider theme={{ components: { Radio: { colorPrimary: '#52c41a' } } }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Radio.Group options={options} defaultValue="react" />
        <Radio.Group optionType="button" buttonStyle="solid" options={options} defaultValue="react" />
      </div>
    </ConfigProvider>
    <ConfigProvider theme={{ components: { Radio: { colorPrimary: '#722ed1', borderRadius: 10 } } }}>
      <Radio.Group optionType="button" buttonStyle="solid" options={options} defaultValue="vue" />
    </ConfigProvider>
  </div>
);
```

## API

### Radio

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| checked | 是否选中（受控） | `boolean` | - |
| defaultChecked | 默认是否选中 | `boolean` | `false` |
| disabled | 是否禁用 | `boolean` | `false` |
| value | 选项值 | `string \| number \| boolean` | - |
| onChange | 选中变化回调 | `(e: RadioChangeEvent) => void` | - |
| name | 原生 name 属性 | `string` | - |

### Radio.Group

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 当前选中的值（受控） | `string \| number \| boolean` | - |
| defaultValue | 默认选中的值 | `string \| number \| boolean` | - |
| onChange | 选中变化回调 | `(e: RadioGroupChangeEvent) => void` | - |
| options | 选项数据 | `Array<{ label: ReactNode; value: string \| number; disabled?: boolean }>` | - |
| disabled | 是否禁用整组 | `boolean` | `false` |
| name | 单选框组名称 | `string` | - |
| size | 尺寸（按钮风格有效） | `'large' \| 'middle' \| 'small'` | `'middle'` |
| optionType | 选项类型 | `'default' \| 'button'` | `'default'` |
| buttonStyle | 按钮风格 | `'outline' \| 'solid'` | `'outline'` |

### Radio.Button

与 `Radio` 属性相同，以按钮样式渲染。通常在 `Radio.Group` 内配合 `optionType="button"` 使用。

### RadioChangeEvent

```ts
interface RadioChangeEvent {
  target: { value: any; checked: boolean };
  nativeEvent: React.ChangeEvent<HTMLInputElement>;
}
```

### RadioGroupChangeEvent

```ts
interface RadioGroupChangeEvent {
  target: { value: any };
  nativeEvent: React.ChangeEvent<HTMLInputElement>;
}
```

## 主题定制

Radio 组件支持全局主题和组件级主题定制，通过 CSS 变量实现样式覆盖。

Radio 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置。

### 组件级主题

通过 `ConfigProvider` 的 `theme.components.Radio` 配置：

```tsx
import { ConfigProvider, Radio } from '@soui/ui';

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Radio: {
            colorPrimary: '#52c41a',
            colorPrimaryHover: '#73d13d',
            borderRadius: 8,
            fontSize: 14,
            controlHeight: 32,
            colorBorder: '#d9d9d9',
            colorBg: '#ffffff',
            colorText: '#000000',
          },
        },
      }}
    >
      <Radio.Group
        optionType="button"
        buttonStyle="solid"
        options={[
          { label: '选项一', value: '1' },
          { label: '选项二', value: '2' },
        ]}
        defaultValue="1"
      />
    </ConfigProvider>
  );
}
```

### 组件级主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorPrimary | 主色 | `string` | 继承全局 `primaryColor`（#1677ff） |
| colorPrimaryHover | 悬停主色 | `string` | 继承全局 `primaryHoverColor`（#4096ff） |
| colorBorder | 边框颜色 | `string` | 继承全局 `borderColorBase`（#d9d9d9） |
| borderRadius | 圆角（用于 button 模式，单位 px） | `number` | 继承全局 `borderRadius`（6） |
| fontSize | 字体大小（单位 px） | `number` | 继承全局 `fontSize`（14） |
| controlHeight | 控件高度（button 模式，单位 px） | `number` | 32 |
| colorBg | 背景颜色 | `string` | `#ffffff` |
| colorText | 文本颜色 | `string` | `rgba(0, 0, 0, 0.88)` |
| colorBgDisabled | 禁用背景颜色 | `string` | `#f5f5f5` |

### 优先级

CSS 变量的优先级从高到低：

1. **组件级主题** (`theme.components.Radio.*`) — 通过 `--soui-radio-*` CSS 变量注入
2. **全局主题** (`theme.*`) — `primaryColor`、`borderRadius` 等可从全局继承
3. **Less 变量** (`variables.less`) — 最终回退值

## 设计原则

### 推荐用法

```tsx
// 1. 互斥选项使用 Radio.Group
<Radio.Group value={val} onChange={setVal} options={options} />

// 2. 选项少于 3 个时可用 Radio，超过 5 个考虑 Select
<Radio.Group>
  <Radio value="a">选项 A</Radio>
  <Radio value="b">选项 B</Radio>
</Radio.Group>

// 3. 工具栏等紧凑场景使用 button 风格
<Radio.Group optionType="button" buttonStyle="solid" options={viewOptions} />

// 4. 受控模式下始终提供 value 和 onChange
<Radio.Group value={value} onChange={handleChange} options={options} />
```

### 避免使用

```tsx
// 1. 不要手动同步多个独立 Radio 的选中状态，使用 Radio.Group
<Radio checked={val === 'a'} onChange={() => setVal('a')} />
<Radio checked={val === 'b'} onChange={() => setVal('b')} />
// 应改为：
<Radio.Group value={val} onChange={setVal}>
  <Radio value="a" />
  <Radio value="b" />
</Radio.Group>

// 2. 不要将 Radio 用于多选场景（应使用 Checkbox）
```

## 无障碍访问

Radio 组件遵循 WAI-ARIA 规范：

- 使用原生 `<input type="radio">` 确保浏览器默认行为
- `Radio.Group` 带有 `role="radiogroup"` 属性
- 支持 Tab 键聚焦和方向键在选项间切换
- 禁用状态通过 `disabled` 属性传达给屏幕阅读器
- 标签文字通过 `<label>` 关联到对应的 input，确保点击标签也能触发选择

## FAQ

### Radio 和 Radio.Group 的关系？

`Radio` 是单个单选框，可以独立使用（受控/非受控）。`Radio.Group` 是单选框组，通过 Context 统一管理选中状态，子 `Radio` 自动从 Group 获取 `checked`、`disabled`、`name` 等属性。

### 如何使用 options 数据驱动？

```tsx
const options = [
  { label: '选项 A', value: 'a' },
  { label: '选项 B', value: 'b', disabled: true },
];

<Radio.Group options={options} value={val} onChange={handleChange} />
```

### outline 和 solid 按钮风格的区别？

`outline`（默认）：选中时边框变为主色，背景保持白色。适合轻量场景。
`solid`：选中时背景填充主色、文字变白。适合需要强调当前选择的场景。

## 相关资源

- [Select 选择器](/components/select) — 选项较多或需要搜索时
- [Input 输入框](/components/input) — 需要文本输入时
