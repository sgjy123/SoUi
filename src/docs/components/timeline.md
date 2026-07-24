---
title: Timeline 时间轴
---

# Timeline 时间轴

垂直展示时间流信息，支持左右交替、自定义节点、pending 状态。

## 何时使用

- 按时间顺序展示操作记录、日志、流程节点
- 需要体现时间先后关系的场景

## 代码示例

### 基础用法

<code src="../../examples/Timeline/Basic.tsx"></code>

### 圆圈颜色

<code src="../../examples/Timeline/Color.tsx"></code>

### 交替显示

<code src="../../examples/Timeline/Alternate.tsx"></code>

### 自定义时间轴点

<code src="../../examples/Timeline/CustomDot.tsx"></code>

### Pending 加载中

<code src="../../examples/Timeline/Pending.tsx"></code>

### 连接线类型

<code src="../../examples/Timeline/LineType.tsx"></code>

### 主题定制

<code src="../../examples/Timeline/Theme.tsx"></code>

## API

### Timeline

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| mode | 模式 | `'left' \| 'right' \| 'alternate'` | `'left'` |
| pending | 末尾追加 pending 节点，`true` 显示默认 loading 点 | ReactNode \| boolean | - |
| pendingDot | 自定义 pending 图标 | ReactNode | - |
| reverse | 逆序排列 | boolean | `false` |
| lineType | 连接线类型 | `'solid' \| 'dashed' \| 'dotted'` | `'solid'` |
| items | 时间轴节点数据 | TimelineItemProps[] | - |
| children | 子节点（与 items 二选一，支持 Timeline.Item 写法） | ReactNode | - |

### TimelineItemProps

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| color | 圆圈颜色，不设置时跟随主题色 | `'blue' \| 'red' \| 'green' \| 'gray' \| string` | - |
| dot | 自定义时间轴点 | ReactNode | - |
| label | 标签（仅 alternate 模式生效） | ReactNode | - |
| children | 内容 | ReactNode | - |
| position | 指定位置（仅 alternate 模式） | `'left' \| 'right'` | - |
| loading | 加载中状态 | boolean | `false` |
| lineType | 连接线类型（覆盖全局） | `'solid' \| 'dashed' \| 'dotted'` | - |

## 主题定制

通过 `ConfigProvider` 的 `theme.components.Timeline` 配置：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colorPrimary | 主色（loading 动画颜色） | string | `'#1677ff'` |
| colorDot | 圆圈默认颜色 | string | `'#1677ff'` |
| colorTail | 尾巴线条颜色 | string | `'#f0f0f0'` |
| fontSize | 字体大小（像素） | number | `14` |
