# Rate 评分

评分组件，用于对事物进行评级或打分。

## 何时使用

- 需要对物品、服务、内容等进行评价打分时
- 收集用户满意度反馈时
- 展示评分结果（只读模式）时

## 代码演示

### 基础用法

最基本的评分组件，支持受控和非受控模式。再次点击相同评分可清除（`allowClear`）。

```tsx
const [value, setValue] = useState(3);

<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Rate value={value} onChange={setValue} />
  <span>{value} 星</span>
</div>
```

### 半星

开启 `allowHalf` 后支持选择半星，实现更精确的评分。

```tsx
const [value, setValue] = useState(2.5);

<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Rate allowHalf value={value} onChange={setValue} />
  <span>{value} 星</span>
</div>
```

### 自定义字符

通过 `character` 属性替换默认的星星图标，支持任意 ReactNode。

```tsx
const [value, setValue] = useState(3);

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div>
    <span>心形：</span>
    <Rate character="❤" value={value} onChange={setValue} />
  </div>
  <div>
    <span>拇指：</span>
    <Rate character="👍" value={value} onChange={setValue} />
  </div>
  <div>
    <span>字母：</span>
    <Rate character="A" value={value} onChange={setValue} />
  </div>
</div>
```

### 禁用状态

设置 `disabled` 属性进入禁用/只读状态，常用于展示评分结果。

```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div>
    <span>默认：</span>
    <Rate defaultValue={3} />
  </div>
  <div>
    <span>禁用：</span>
    <Rate defaultValue={3} disabled />
  </div>
  <div>
    <span>只读：</span>
    <Rate defaultValue={4} allowHalf disabled />
  </div>
</div>
```

### 尺寸

支持 `small`、`medium`、`large` 三种尺寸。

```tsx
const [value, setValue] = useState(3);

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div>
    <span>小号：</span>
    <Rate size="small" value={value} onChange={setValue} />
  </div>
  <div>
    <span>中号：</span>
    <Rate size="medium" value={value} onChange={setValue} />
  </div>
  <div>
    <span>大号：</span>
    <Rate size="large" value={value} onChange={setValue} />
  </div>
</div>
```

### 提示文字

通过 `tooltips` 数组为每个评分项添加提示文字，鼠标悬停时显示。

```tsx
const descriptions = ['极差', '差', '一般', '好', '极好'];
const [value, setValue] = useState(0);

<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <Rate tooltips={descriptions} value={value} onChange={setValue} />
  {value ? <span>{descriptions[value - 1]}</span> : null}
</div>
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| value | 当前分数（受控） | `number` | - |
| defaultValue | 默认分数（非受控） | `number` | `0` |
| count | 星星总数 | `number` | `5` |
| allowHalf | 是否允许半星 | `boolean` | `false` |
| allowClear | 是否允许再次点击清除 | `boolean` | `true` |
| disabled | 是否禁用 | `boolean` | `false` |
| character | 自定义字符 | `ReactNode` | 星星图标 |
| tooltips | 每项的提示文字 | `string[]` | - |
| size | 尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |

### 事件

| 事件名 | 说明 | 类型 |
|--------|------|------|
| onChange | 分数改变时触发 | `(value: number) => void` |
| onHoverChange | 鼠标悬停变化时触发 | `(value: number) => void` |

## 主题定制

Rate 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.Rate` 针对组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Rate: {
        starColor: '#fadb14',
        starBg: 'rgba(0, 0, 0, 0.12)',
        fontSize: 14,
        starSizeSM: 16,
        starSize: 20,
        starSizeLG: 25,
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
2. **组件级配置** - `theme.components.Rate` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| starColor | 选中时的星星颜色 | `string` | `#fadb14` |
| starBg | 未选中时的星星颜色 | `string` | `rgba(0, 0, 0, 0.12)` |
| fontSize | 字体大小（像素） | `number` | `14` |
| starSizeSM | 小号星星尺寸（像素） | `number` | `16` |
| starSize | 中号星星尺寸（像素） | `number` | `20` |
| starSizeLG | 大号星星尺寸（像素） | `number` | `25` |

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<Rate 
  style={{
    '--soui-rate-star-color': '#ff6b35',
    '--soui-rate-star-bg': '#e0e0e0',
  }}
/>
```

## 无障碍访问

组件遵循 WAI-ARIA 规范：

- 使用 `role="slider"` 语义角色
- 支持 `aria-valuemin`、`aria-valuemax`、`aria-valuenow` 属性
- 支持键盘操作：方向键增减评分
- 禁用状态设置 `aria-disabled` 和 `tabIndex={-1}`

## FAQ

### 如何实现只读展示？

设置 `disabled` 属性即可进入只读状态，常用于展示已有评分结果。

### 如何自定义星星总数？

通过 `count` 属性设置，例如 `<Rate count={10} />` 展示 10 颗星。

### 半星模式下如何精确控制？

开启 `allowHalf` 后，点击星星左半部分选择半星，右半部分选择整星。

## 相关资源

- [Progress 进度条](/components/progress)
