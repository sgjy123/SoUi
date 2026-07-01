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

支持 `small`、`middle`、`large` 三种尺寸，影响触发器高度、内边距、字体大小和色块宽度。

| 尺寸 | 触发器高度 | 字体大小 | 色块宽度 |
|------|-----------|---------|---------|
| small | 24px | 12px | 18px |
| middle | 32px | 14px | 24px |
| large | 40px | 16px | 28px |

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

通过 `format` 属性指定颜色格式。受控模式下（传入 `format` 属性），未选中的格式按钮会禁用，防止用户切换格式。

```tsx
const [color, setColor] = useState('#1677ff');

<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <ColorPicker value={color} onChange={setColor} format="rgb" showText />
  <span>{color}</span>
</div>
```

### 自定义预设色板

通过 `presets` 属性自定义预设颜色分组，方便用户快速选择常用颜色。

```tsx
const brandPresets = [
  { label: '品牌色', colors: ['#1677ff', '#52c41a', '#fa8c16', '#f5222d', '#722ed1'] },
  { label: '柔和色', colors: ['#ff9a9e', '#fad0c4', '#a18cd1', '#fbc2eb', '#84fab0'] },
  { label: '灰阶', colors: ['#000', '#333', '#666', '#999', '#ccc', '#fff'] },
];

<ColorPicker presets={brandPresets} />
```

### 自定义触发器

通过 `children` 属性替换默认触发器，可以使用任意 React 节点作为触发器。

```tsx
const [color, setColor] = useState('#1677ff');

{/* 自定义按钮触发器 */}
<ColorPicker value={color} onChange={setColor}>
  <button style={{ background: color, color: '#fff', borderRadius: 6 }}>
    选择颜色
  </button>
</ColorPicker>

{/* 自定义色块触发器 */}
<ColorPicker value={color} onChange={setColor}>
  <div style={{ width: 32, height: 32, borderRadius: 6, background: color }} />
</ColorPicker>
```

### 弹出方向

通过 `placement` 属性控制面板弹出方向，支持 `bottomLeft`、`bottomRight`、`topLeft`、`topRight` 四个方位。组件会自动检测视口溢出并调整面板位置和最大宽度。

```tsx
const placements = ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'];

<div style={{ display: 'flex', gap: 16, padding: '80px 20px' }}>
  {placements.map((p) => (
    <ColorPicker key={p} placement={p} />
  ))}
</div>
```

### 主题定制

通过 `ConfigProvider` 的 `theme.components.ColorPicker` 统一配置颜色选择器样式，支持主色、圆角、边框颜色等。

```tsx
<ConfigProvider
  theme={{
    components: {
      ColorPicker: {
        colorPrimary: '#52c41a',
        borderRadius: 10,
        colorBorder: '#b7eb8f',
      },
    },
  }}
>
  <ColorPicker />
</ConfigProvider>
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 当前颜色值（受控模式） | `string` | - |
| defaultValue | 默认颜色值（非受控模式） | `string` | `'#1677ff'` |
| format | 受控颜色格式，设置后格式按钮不可切换 | `'hex' \| 'rgb' \| 'hsb'` | - |
| defaultFormat | 默认颜色格式 | `'hex' \| 'rgb' \| 'hsb'` | `'hex'` |
| disabled | 是否禁用 | `boolean` | `false` |
| disabledAlpha | 是否禁用透明度滑块 | `boolean` | `false` |
| allowClear | 是否允许清除颜色（显示清除按钮） | `boolean` | `false` |
| presets | 预设颜色分组 | `PresetColorGroup[]` | 内置预设 |
| showText | 触发器旁显示颜色文本 | `boolean` | `false` |
| size | 触发器尺寸 | `'small' \| 'middle' \| 'large'` | `'middle'` |
| placement | 弹出面板方向 | `'bottomLeft' \| 'bottomRight' \| 'topLeft' \| 'topRight'` | `'bottomLeft'` |
| children | 自定义触发器内容，替换默认色块触发器 | `ReactNode` | - |

### 事件

| 事件名 | 说明 | 类型 |
|--------|------|------|
| onChange | 颜色变化时触发（拖拽中持续触发） | `(color: string) => void` |
| onChangeComplete | 颜色选择完成时触发（鼠标释放） | `(color: string) => void` |
| onFormatChange | 格式切换时触发 | `(format: ColorFormat) => void` |
| onOpenChange | 面板打开/关闭时触发 | `(open: boolean) => void` |
| onClear | 清除颜色时触发 | `() => void` |

### 类型定义

#### ColorPickerSize

```typescript
type ColorPickerSize = 'small' | 'middle' | 'large';
```

#### ColorPickerPlacement

```typescript
type ColorPickerPlacement = 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topRight';
```

#### ColorFormat

```typescript
type ColorFormat = 'hex' | 'rgb' | 'hsb';
```

#### PresetColorGroup

```typescript
interface PresetColorGroup {
  /** 分组标签 */
  label: string;
  /** 颜色值数组 */
  colors: string[];
}
```

## 主题定制

ColorPicker 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 三层 CSS 变量体系

ColorPicker 遵循 SoUi 的三层 CSS 变量设计令牌体系：

1. **第1层：设计令牌**（`global.less` 中的 `:root`）
   - 全局基础变量：`--soui-primary-color`、`--soui-border-radius` 等
   - 组件配置点：`--soui-color-picker-font-size`、`--soui-color-picker-border-radius` 等

2. **第2层：组件配置点**（`global.less` 中引用设计令牌）
   - `--soui-color-picker-font-size: var(--soui-font-size)`
   - `--soui-color-picker-border-radius: var(--soui-border-radius)`
   - `--soui-color-picker-color-primary: var(--soui-primary-color)`
   - `--soui-color-picker-border-color: var(--soui-border-color-base)`
   - `--soui-color-picker-panel-bg: @bg-color-base`

3. **第3层：组件级覆盖**（ConfigProvider 生成，带 `-component` 后缀）
   - `--soui-color-picker-font-size-component`
   - `--soui-color-picker-border-radius-component`
   - `--soui-color-picker-color-primary-component`
   - `--soui-color-picker-border-color-component`
   - `--soui-color-picker-panel-bg-component`

组件样式使用三层回退链：`var(--xxx-component, var(--xxx, @less变量))`，确保优先级正确。

### 组件级配置

通过 `theme.components.ColorPicker` 进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      ColorPicker: {
        colorPrimary: '#1677ff',      // 主色（格式按钮激活色、聚焦环）
        borderRadius: 8,              // 圆角大小（像素）
        fontSize: 14,                 // 字体大小（像素）
        colorBorder: '#d9d9d9',       // 触发器边框颜色
        colorBg: '#ffffff',           // 面板背景色
        panelWidth: 280,              // 面板宽度（像素）
      },
    },
  }}
>
  <ColorPicker />
</ConfigProvider>
```

### 配置优先级

从高到低：

1. Props（style/className）
2. 组件级配置（`theme.components.ColorPicker`，第3层 `-component` 变量）
3. CSS 变量（第2层组件配置点）
4. Less 变量（设计令牌默认值）

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorPrimary | 主色（格式按钮激活色、聚焦环、预设色块选中框） | `string` | `#1677ff` |
| borderRadius | 圆角大小（触发器、面板、色块） | `number` | `6` |
| fontSize | 字体大小（触发器文本） | `number` | `14` |
| colorBorder | 触发器和输入框边框颜色 | `string` | `#d9d9d9` |
| colorBg | 面板和触发器背景色 | `string` | `#ffffff` |
| panelWidth | 面板最大宽度（像素，实际宽度受视口限制） | `number` | `280` |

### 自定义 CSS 变量

可以通过 `style` 属性直接覆盖 CSS 变量：

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
- 受控格式时，未选中的格式按钮设置 `disabled` 属性

## FAQ

### 如何获取带透明度的颜色值？

默认支持透明度调节，输出格式如 `rgba(22, 119, 255, 0.5)` 或 `#1677ff80`。关闭透明度使用 `disabledAlpha` 属性。

### 支持哪些颜色格式输入？

支持 hex（`#1677ff`、`#1677ff80`）、rgb/rgba、hsl/hsla、CSS 命名颜色（如 `red`、`transparent`）作为输入。输出格式由 `format` 属性决定。

### 如何锁定格式不让用户切换？

传入 `format` 属性进入受控模式，此时格式按钮会禁用未选中的格式：

```tsx
<ColorPicker format="hex" />  // 只能输出 hex 格式
```

### 如何自定义预设颜色？

```tsx
<ColorPicker
  presets={[
    { label: '品牌色', colors: ['#1677ff', '#52c41a', '#fa8c16'] },
    { label: '灰阶', colors: ['#000', '#333', '#666', '#999', '#ccc', '#fff'] },
  ]}
/>
```

### 面板超出屏幕怎么办？

组件内置视口溢出检测，会自动调整面板位置（上/下、左/右对齐）和最大宽度，确保面板始终在可视区域内。

## 相关资源

- [Rate 评分](/components/rate)
- [Switch 开关](/components/switch)
- [ConfigProvider 全局配置](/components/config-provider)
