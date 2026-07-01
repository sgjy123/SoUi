# ColorPicker 颜色选择器

用于选择颜色，支持 hex、rgb、hsb 格式切换，可调节饱和度、色相和透明度。

## 何时使用

- 需要用户从调色板中选择颜色时
- 主题定制、样式配置等场景
- 需要精确控制颜色值（含透明度）时

## 代码演示

### 基础用法

最基本的颜色选择器，点击触发器打开颜色面板，支持 hex/rgb/hsb 格式切换。

```tsx
const [color, setColor] = useState('#1677FF');

<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <ColorPicker value={color} onChange={setColor} />
  <span>{color}</span>
</div>
```

### 尺寸

支持 `small`、`medium`、`large` 三种尺寸。

```tsx
const [color, setColor] = useState('#1677FF');

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div>
    <span>小号：</span>
    <ColorPicker size="small" value={color} onChange={setColor} />
  </div>
  <div>
    <span>中号：</span>
    <ColorPicker size="medium" value={color} onChange={setColor} />
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
    <ColorPicker value="#52C41A" showText />
  </div>
  <div>
    <span>禁用：</span>
    <ColorPicker value="#1677FF" disabled />
  </div>
  <div>
    <span>无透明度：</span>
    <ColorPicker value="#1677FF" disabledAlpha />
  </div>
</div>
```

### 指定格式

通过 `format` 属性指定默认颜色格式。

```tsx
const [color, setColor] = useState('#1677FF');

<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <ColorPicker value={color} onChange={setColor} format="rgb" showText />
  <span>{color}</span>
</div>
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 当前颜色值（受控） | `string` | - |
| defaultValue | 默认颜色值（非受控） | `string` | `'#1677FF'` |
| format | 颜色格式 | `'hex' \| 'rgb' \| 'hsb'` | - |
| defaultFormat | 默认颜色格式 | `'hex' \| 'rgb' \| 'hsb'` | `'hex'` |
| disabled | 是否禁用 | `boolean` | `false` |
| disabledAlpha | 是否禁用透明度 | `boolean` | `false` |
| allowClear | 是否允许清除 | `boolean` | `false` |
| presets | 预设颜色面板 | `PresetColorGroup[]` | 内置预设 |
| showText | 是否显示颜色文本 | `boolean` | `false` |
| size | 触发器尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| placement | 弹出位置 | `ColorPickerPlacement` | `'bottomLeft'` |
| children | 自定义触发器内容 | `ReactNode` | - |

### 事件

| 事件名 | 说明 | 类型 |
|--------|------|------|
| onChange | 颜色改变时触发 | `(color: string) => void` |
| onChangeComplete | 颜色选择完成时触发 | `(color: string) => void` |
| onFormatChange | 格式改变时触发 | `(format: ColorFormat) => void` |
| onOpenChange | 弹出面板显隐变化 | `(open: boolean) => void` |
| onClear | 清除时触发 | `() => void` |

## 主题定制

ColorPicker 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.ColorPicker` 针对组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      ColorPicker: {
        colorPrimary: '#1677ff',
        borderRadius: 6,
        fontSize: 14,
        colorBorder: '#d9d9d9',
        colorBg: '#ffffff',
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
2. **组件级配置** - `theme.components.ColorPicker` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorPrimary | 主色（选中态、按钮） | `string` | `#1677ff` |
| borderRadius | 圆角大小（像素） | `number` | `6` |
| fontSize | 字体大小（像素） | `number` | `14` |
| colorBorder | 触发器边框颜色 | `string` | `#d9d9d9` |
| colorBg | 面板背景色 | `string` | `#ffffff` |

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<ColorPicker 
  style={{
    '--soui-color-picker-color-primary': '#52c41a',
    '--soui-color-picker-border-radius': '8px',
  }}
/>
```

## 无障碍访问

组件遵循 WAI-ARIA 规范：

- 清除按钮使用 `aria-label="清除颜色"`
- 禁用状态正确设置不可交互
- 键盘可访问触发器

## FAQ

### 如何获取带透明度的颜色值？

默认支持透明度调节。关闭透明度使用 `disabledAlpha` 属性，此时颜色值不含 alpha 通道。

### 支持哪些颜色格式？

支持 `hex`（如 `#1677FF`）、`rgb`（如 `rgb(22, 119, 255)`）、`hsb`（如 `hsb(215, 91%, 100%)`）三种格式，可在面板中切换。

### 如何自定义预设颜色？

通过 `presets` 属性传入自定义预设颜色分组：

```tsx
<ColorPicker
  presets={[
    { label: '品牌色', colors: ['#1677FF', '#52C41A', '#FA8C16'] },
  ]}
/>
```

## 相关资源

- [Rate 评分](/components/rate)
- [Switch 开关](/components/switch)
