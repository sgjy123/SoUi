---
title: GlowBorder 流光边框
---

# GlowBorder 流光边框

装饰性流光边框组件，通过旋转 conic-gradient 实现流光动画效果，可自定义颜色、速度、外发光等。

## 何时使用

- 需要为卡片、按钮、图片等元素添加流光装饰效果
- 活动入口、重点区域的视觉强调

## 代码示例

### 基础用法

<code src="../../examples/GlowBorder/Basic.tsx"></code>

### 自定义颜色

<code src="../../examples/GlowBorder/Colors.tsx"></code>

### 旋转速度与方向

<code src="../../examples/GlowBorder/Duration.tsx"></code>

### 外发光效果

<code src="../../examples/GlowBorder/Glow.tsx"></code>

### 深色/透明背景

<code src="../../examples/GlowBorder/Background.tsx"></code>

### 主题定制

<code src="../../examples/GlowBorder/Theme.tsx"></code>

## API

### GlowBorder

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| children | 内容 | ReactNode | - |
| colors | 流光渐变颜色数组 | string[] | `['#1677ff', '#36cfc9']` |
| borderWidth | 边框宽度（像素） | number | `2` |
| radius | 圆角（像素） | number | `8` |
| duration | 旋转一圈耗时（秒） | number | `3` |
| reverse | 是否反向旋转 | boolean | `false` |
| paused | 是否暂停动画 | boolean | `false` |
| glow | 外发光模糊半径（像素），0 为不发光 | number | `0` |
| background | 内容区背景色 | string | `'#fff'` |
| className | 自定义类名 | string | - |
| style | 自定义样式 | CSSProperties | - |

## 主题定制

通过 `ConfigProvider` 的 `theme.components.GlowBorder` 配置：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colorPrimary | 主色（流光渐变色1） | string | `'#1677ff'` |
| colorSecondary | 副色（流光渐变色2） | string | `'#36cfc9'` |
| background | 内容区背景色 | string | `'#fff'` |
| borderRadius | 圆角（像素） | number | `8` |
