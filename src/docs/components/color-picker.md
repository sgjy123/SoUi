# ColorPicker 颜色选择器

提供可视化颜色选择面板，支持 hex、rgb、hsb 三种格式输出，可调节饱和度、色相和透明度。

## 何时使用

- 需要用户从调色板中选择颜色时（主题定制、样式配置）
- 需要精确控制颜色值（含透明度）时
- 表单中需要颜色输入控件时

## 代码演示

### 基础用法

最基本的颜色选择器，点击触发器打开面板，支持 hex/rgb/hsb 格式切换。

```tsx
const [color, setColor] = useState('#1677ff');

<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <ColorPicker value={color} onChange={setColor} />
  <span>{color}</span>
</div>
```

### 尺寸

支持 `small`、`middle`、`large` 三种尺寸。

```tsx
const [color, setColor] = useState('#1677ff');

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div>
    <span>小号：</span>
    <ColorPicker size="small" value={color} onChange={setColor} />
  </div>
  <div>
    <span>中号：</span>
    <ColorPicker size="middle" value={color} onChange={setColor} />
  </div>
  <div>
    <span>大号：</span>
    <ColorPicker size="large" value={color} onChange={setColor} />
  </div>
</div>
```

### 变体

支持可清除、显示颜色文本、禁用、禁用透明度等多种状态。

```tsx
const [color, setColor] = useState('');

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div>
    <span>可清除：</span>
    <ColorPicker value={color} onChange={setColor} allowClear />
  </div>
  <div>
    <span>显示文本：</span>
    <ColorPicker value="#52c41a" showText />
  </div>
  <div>
    <span>禁用：</span>
    <ColorPicker value="#1677ff" disabled />
  </div>
  <div>
    <span>无透明度：</span>
    <ColorPicker value="#1677ff" disabledAlpha />
  </div>
</div>
```

### 指定格式

通过 `format` 属性指定默认颜色格式。

```tsx
const [color, setColor] = useState('#1677ff');

<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <ColorPicker value={color} onChange={setColor} format="rgb" showText />
  <span>{color}</span>
</div>
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 当前颜色值（受控模式） | `string` | - |
| defaultValue | 默认颜色值（非受控模式） | `string` | `'#1677ff'` |
| format | 受控颜色格式 | `'hex' \| 'rgb' \| 'hsb'` | - |
| defaultFormat | 默认颜色格式 | `'hex' \| 'rgb' \| 'hsb'` | `'hex'` |
| disabled | 是否禁用 | `boolean` | `false` |
| disabledAlpha | 是否禁用透明度滑块 | `boolean` | `false` |
| allowClear | 是否允许清除颜色 | `boolean` | `false` |
| presets | 预设颜色分组 | `PresetColorGroup[]` | 内置预设 |
| showText | 触发器旁显示颜色文本 | `boolean` | `false` |
| size | 触发器尺寸 | `'small' \| 'middle' \| 'large'` | `'middle'` |
| placement | 弹出面板方向 | `'bottomLeft' \| 'bottomRight' \| 'topLeft' \| 'topRight'` | `'bottomLeft'` |
| children | 自定义触发器内容 | `ReactNode` | - |

### 事件

| 事件名 | 说明 | 类型 |
|--------|------|------|
| onChange | 颜色变化时触发（拖拽中持续触发） | `(color: string) => void` |
| onChangeComplete | 颜色选择完成时触发（鼠标释放） | `(color: string) => void` |
| onFormatChange | 格式切换时触发 | `(format: ColorFormat) => void` |
| onOpenChange | 面板打开/关闭时触发 | `(open: boolean) => void` |
| onClear | 清除颜色时触发 | `() => void` |

### PresetColorGroup

| 参数 | 说明 | 类型 |
|------|------|------|
| label | 分组标签 | `string` |
| colors | 颜色值数组 | `string[]` |

## 主题定制

ColorPicker 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.ColorPicker` 进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      ColorPicker: {
        colorPrimary: '#1677ff',
        borderRadius: 8,
        fontSize: 14,
        colorBorder: '#d9d9d9',
        colorBg: '#ffffff',
      },
    },
  }}
>
  <ColorPicker />
</ConfigProvider>
```

### 配置优先级

从高到低：Props (style/className) > 组件级配置 (theme.components.ColorPicker) > CSS 变量 > Less 变量

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorPrimary | 主色（格式按钮激活色、聚焦环） | `string` | `#1677ff` |
| borderRadius | 圆角大小（像素） | `number` | `6` |
| fontSize | 字体大小（像素） | `number` | `14` |
| colorBorder | 触发器边框颜色 | `string` | `#d9d9d9` |
| colorBg | 面板背景色 | `string` | `#ffffff` |
| panelWidth | 面板宽度（像素） | `number` | `280` |

### 自定义 CSS 变量

```tsx
<ColorPicker
  style={{
    '--soui-color-picker-color-primary': '#52c41a',
    '--soui-color-picker-border-radius': '10px',
  }}
/>
```

## 无障碍访问

组件遵循 WAI-ARIA 规范：

- 触发器设置 `role="button"` + `aria-haspopup="dialog"` + `aria-expanded`
- 面板设置 `role="dialog"` + `aria-label="颜色选择面板"`
- 格式按钮使用 `aria-pressed` 标识当前激活格式
- 预设色块设置 `aria-label` 描述颜色值
- 清除按钮设置 `aria-label="清除颜色值"`
- 禁用状态下触发器 `tabIndex={-1}`，不可键盘聚焦

## FAQ

### 如何获取带透明度的颜色值？

默认支持透明度调节，输出格式如 `rgba(22, 119, 255, 0.5)` 或 `#1677ff80`。关闭透明度使用 `disabledAlpha` 属性。

### 支持哪些颜色格式输入？

支持 hex（`#1677ff`、`#1677ff80`）、rgb/rgba、hsl/hsla、CSS 命名颜色（如 `red`、`transparent`）作为输入。输出格式由 `format` 属性决定。

### 如何自定义预设颜色？

```tsx
<ColorPicker
  presets={[
    { label: '品牌色', colors: ['#1677ff', '#52c41a', '#fa8c16'] },
    { label: '灰阶', colors: ['#000', '#333', '#666', '#999', '#ccc', '#fff'] },
  ]}
/>
```

## 相关资源

- [Rate 评分](/components/rate)
- [Switch 开关](/components/switch)
- [ConfigProvider 全局配置](/components/config-provider)
