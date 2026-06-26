# InputNumber 数字输入框

通过鼠标或键盘输入数字，支持步进按钮、范围限制、精度控制和自定义格式化。

## 何时使用

- 需要输入标准数值时
- 需要带步进增减按钮的数字输入
- 需要对数值范围、精度进行限制
- 需要自定义数字显示格式（如百分比、千分位）

## 代码演示

### 基础用法

基本的数字输入框，支持最小值、最大值限制，步进和精度控制。

```tsx
import { InputNumber } from '@soui/ui';

export default () => (
  <InputNumber defaultValue={3} min={1} max={10} />
);
```

### 尺寸与附加

支持三种尺寸（small / middle / large），可添加前缀、前后置标签，也可隐藏控制按钮。

```tsx
import { InputNumber } from '@soui/ui';

export default () => (
  <div>
    <InputNumber size="small" defaultValue={1} />
    <InputNumber size="large" defaultValue={100} />
    <InputNumber prefix="¥" defaultValue={100} />
    <InputNumber addonBefore="价格" addonAfter="元" defaultValue={99} />
  </div>
);
```

### 状态与格式化

支持 error / warning 状态提示，通过 formatter 和 parser 实现自定义显示格式。

```tsx
import { InputNumber } from '@soui/ui';

export default () => (
  <div>
    <InputNumber status="error" placeholder="请输入正数" />
    <InputNumber
      formatter={(v) => `${v}%`}
      parser={(v) => parseFloat((v || '').replace('%', ''))}
    />
  </div>
);
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| value | 当前值（受控） | `number \| null` | - | - |
| defaultValue | 默认值 | `number \| null` | `null` | - |
| min | 最小值 | `number` | `-Infinity` | - |
| max | 最大值 | `number` | `Infinity` | - |
| step | 步进值 | `number` | `1` | - |
| precision | 精度（小数位数） | `number` | - | - |
| disabled | 是否禁用 | `boolean` | `false` | - |
| readOnly | 是否只读 | `boolean` | `false` | - |
| size | 尺寸 | `'large' \| 'middle' \| 'small'` | `'middle'` | - |
| status | 状态 | `'error' \| 'warning'` | - | - |
| controls | 是否显示加减按钮 | `boolean` | `true` | - |
| keyboard | 是否启用键盘上下键控制 | `boolean` | `true` | - |
| prefix | 前缀内容 | `ReactNode` | - | - |
| addonBefore | 前置标签 | `ReactNode` | - | - |
| addonAfter | 后置标签 | `ReactNode` | - | - |
| placeholder | 占位文字 | `string` | - | - |
| formatter | 格式化显示值 | `(value: number \| string \| undefined) => string` | - | - |
| parser | 解析格式化后的值 | `(displayValue: string \| undefined) => number` | - | - |

### 事件

| 事件名 | 说明 | 类型 |
|--------|------|------|
| onChange | 值变化回调 | `(value: number \| null) => void` |
| onBlur | 失焦回调 | `(e: FocusEvent) => void` |
| onFocus | 聚焦回调 | `(e: FocusEvent) => void` |
| onPressEnter | 回车回调 | `(e: KeyboardEvent) => void` |

## 主题定制

InputNumber 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.InputNumber` 针对组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      InputNumber: {
        borderRadius: 8,
        controlHeight: 36,
        colorBorder: '#d3adf7',
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
2. **组件级配置** - `theme.components.InputNumber` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorPrimary | 主色（控制按钮悬停色） | `string` | `#1677ff` |
| colorBorder | 边框颜色 | `string` | `#d9d9d9` |
| colorBorderHover | 悬停边框颜色 | `string` | `#4096ff` |
| colorBorderFocus | 聚焦边框颜色 | `string` | `#1677ff` |
| borderRadius | 圆角大小（像素） | `number` | `6` |
| fontSize | 字体大小（像素） | `number` | `14` |
| controlHeight | 控件高度（像素） | `number` | `32` |
| colorBg | 背景色 | `string` | `#fff` |
| colorText | 文本颜色 | `string` | `rgba(0, 0, 0, 0.88)` |
| colorBgDisabled | 禁用背景色 | `string` | `#f5f5f5` |
| colorError | 错误状态颜色 | `string` | `#ff4d4f` |
| colorWarning | 警告状态颜色 | `string` | `#faad14` |

### 自定义 CSS 变量

```tsx
<InputNumber
  style={{
    '--soui-input-number-border-radius': '10px',
    '--soui-input-number-control-height': '40px',
  }}
/>
```

## 设计原则

### 推荐用法

```tsx
// 设置合理的范围限制
<InputNumber min={0} max={100} defaultValue={50} />

// 使用 precision 控制小数位
<InputNumber step={0.01} precision={2} defaultValue={9.99} />

// 使用 formatter 显示友好格式
<InputNumber
  formatter={(v) => `¥ ${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
  parser={(v) => parseFloat((v || '').replace(/¥\s?|(,*)/g, ''))}
/>
```

### 避免使用

```tsx
// 避免无范围限制导致异常值
<InputNumber />

// 避免精度不一致
<InputNumber step={0.1} /> // 未设置 precision 可能显示过多小数位
```

## 无障碍访问

- 使用 `role="spinbutton"` 标识数字输入角色
- 支持 `aria-valuemin`、`aria-valuemax`、`aria-valuenow` 属性
- 控制按钮使用 `aria-label="增加"` / `aria-label="减少"`
- 支持键盘操作：Tab 聚焦、上下箭头增减、Enter 确认

## FAQ

### formatter 和 parser 的关系？

`formatter` 将数值转为显示字符串（如添加千分位逗号），`parser` 将显示字符串还原为数值。两者必须配合使用。

### 键盘控制如何禁用？

设置 `keyboard={false}` 即可禁用键盘上下箭头的增减功能。

### 如何隐藏加减按钮？

设置 `controls={false}` 可以隐藏右侧的加减按钮，只保留纯输入功能。

## 相关资源

- [Input 输入框](/components/input)
- [Select 选择器](/components/select)
