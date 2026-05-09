# Grid 栅格

24 栅格系统，提供灵活且强大的布局能力。

## 何时使用

- 需要进行页面布局时
- 需要响应式布局适配不同屏幕尺寸
- 需要精确控制元素的位置和间距

## 代码演示

### 基础用法

从堆叠到水平排列，使用单一的一组 Row 和 Col 栅格组件，就可以创建一个基本的栅格系统。

```tsx
import { Row, Col } from '@soui/ui';

export default () => (
  <>
    <Row>
      <Col span={12}>col-12</Col>
      <Col span={12}>col-12</Col>
    </Row>
    <Row>
      <Col span={8}>col-8</Col>
      <Col span={8}>col-8</Col>
      <Col span={8}>col-8</Col>
    </Row>
    <Row>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
      <Col span={6}>col-6</Col>
    </Row>
  </>
);
```

### 栅格间距

通过 `gutter` 属性设置栅格之间的间距，支持水平和垂直两个方向。

```tsx
import { Row, Col } from '@soui/ui';

export default () => (
  <Row gutter={16}>
    <Col span={6}>
      <div style={{ background: '#f5f5f5', padding: '8px' }}>col-6</div>
    </Col>
    <Col span={6}>
      <div style={{ background: '#f5f5f5', padding: '8px' }}>col-6</div>
    </Col>
    <Col span={6}>
      <div style={{ background: '#f5f5f5', padding: '8px' }}>col-6</div>
    </Col>
    <Col span={6}>
      <div style={{ background: '#f5f5f5', padding: '8px' }}>col-6</div>
    </Col>
  </Row>
);
```

### 偏移

使用 `offset` 属性实现列的左侧偏移。

```tsx
import { Row, Col } from '@soui/ui';

export default () => (
  <>
    <Row>
      <Col span={6}>col-6</Col>
      <Col span={6} offset={6}>col-6 offset-6</Col>
    </Row>
    <Row>
      <Col span={6} offset={6}>col-6 offset-6</Col>
      <Col span={6} offset={6}>col-6 offset-6</Col>
    </Row>
  </>
);
```

### 响应式布局

参照 Bootstrap 的响应式设计，预设六个响应尺寸：xs、sm、md、lg、xl、xxl。

```tsx
import { Row, Col } from '@soui/ui';

export default () => (
  <Row>
    <Col xs={2} sm={4} md={6} lg={8} xl={10}>
      <div style={{ background: '#f5f5f5', padding: '8px' }}>col</div>
    </Col>
    <Col xs={20} sm={16} md={12} lg={8} xl={4}>
      <div style={{ background: '#f5f5f5', padding: '8px' }}>col</div>
    </Col>
    <Col xs={2} sm={4} md={6} lg={8} xl={10}>
      <div style={{ background: '#f5f5f5', padding: '8px' }}>col</div>
    </Col>
  </Row>
);
```

### 对齐方式

通过 `justify` 和 `align` 属性设置 Flex 布局的对齐方式。

```tsx
import { Row, Col } from '@soui/ui';

export default () => (
  <>
    <Row justify="center">
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
    </Row>
    <Row align="middle" style={{ height: '100px' }}>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
      <Col span={4}>col-4</Col>
    </Row>
  </>
);
```

## API

### Row

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| gutter | 栅格间隔，可以写成像素值或数组 [水平, 垂直] | `number \| [number, number]` | 0 | - |
| justify | 水平排列方式 | `'start' \| 'end' \| 'center' \| 'space-around' \| 'space-between' \| 'space-evenly'` | `'start'` | - |
| align | 垂直对齐方式 | `'top' \| 'middle' \| 'bottom' \| 'stretch'` | `'top'` | - |
| className | 自定义类名 | `string` | - | - |
| style | 自定义样式 | `CSSProperties` | - | - |

### Col

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| span | 栅格占位格数，为 0 时相当于 display: none | `number` | - | - |
| offset | 栅格左侧的间隔格数 | `number` | 0 | - |
| push | 栅格向右移动格数 | `number` | - | - |
| pull | 栅格向左移动格数 | `number` | - | - |
| xs | `<576px` 响应式栅格数 | `number` | - | - |
| sm | `≥576px` 响应式栅格数 | `number` | - | - |
| md | `≥768px` 响应式栅格数 | `number` | - | - |
| lg | `≥992px` 响应式栅格数 | `number` | - | - |
| xl | `≥1200px` 响应式栅格数 | `number` | - | - |
| xxl | `≥1600px` 响应式栅格数 | `number` | - | - |
| className | 自定义类名 | `string` | - | - |
| style | 自定义样式 | `CSSProperties` | - | - |

## 设计原则

### ✅ 推荐用法

```tsx
// 使用 Row 包裹 Col
<Row>
  <Col span={12}>内容1</Col>
  <Col span={12}>内容2</Col>
</Row>

// 响应式布局
<Col xs={24} sm={12} md={8} lg={6}>内容</Col>
```

### ❌ 避免使用

```tsx
// 不要将 Col 放在 Row 之外
<Col span={12}>内容</Col>  // ❌ 错误

// 不要在 Col 中直接放置其他 Row
<Col span={12}>
  <Row>...</Row>  // ⚠️ 建议添加适当的间距
</Col>
```

## 无障碍访问

- 栅格系统基于语义化的 div 元素
- 确保内容顺序在视觉上和有意义的阅读顺序一致
- 使用适当的 ARIA 属性增强可访问性

## FAQ

### 为什么我的栅格没有正确显示？

确保 Col 组件是 Row 的直接子元素，并且所有 Col 的 span 总和不超过 24（在同一行内）。

### 如何设置垂直间距？

使用 `gutter={[horizontal, vertical]}` 数组形式同时设置水平和垂直间距：

```tsx
<Row gutter={[16, 24]}>
  <Col span={12}>内容</Col>
</Row>
```

### 响应式断点是如何工作的？

当屏幕宽度达到某个断点时，对应的栅格配置会生效。例如 `xs={24} md={12}` 表示：
- 手机竖屏（<576px）：占满整行
- 平板及以上（≥768px）：占半行

### 如何实现列排序？

使用 `push` 和 `pull` 属性：

```tsx
<Row>
  <Col span={12} push={12}>右侧内容</Col>
  <Col span={12} pull={12}>左侧内容</Col>
</Row>
```

## 相关资源

- [Space 间距](/components/space) - 用于控制组件之间的间距
- [Layout 布局](/components/layout) - 页面级布局组件（待开发）
