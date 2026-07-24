---
title: Statistic 数值统计
---

# Statistic 数值统计

展示统计数据，支持数值格式化、千分位、精度控制、倒计时等。

## 何时使用

- 需要突出展示某个数字（如用户数、金额、转化率）
- 数据看板、Dashboard 页面
- 活动倒计时场景

## 代码示例

### 基础用法

<code src="../../examples/Statistic/Basic.tsx"></code>

### 前缀和后缀

<code src="../../examples/Statistic/PrefixSuffix.tsx"></code>

### 精度与千分位

<code src="../../examples/Statistic/Precision.tsx"></code>

### 倒计时

<code src="../../examples/Statistic/Countdown.tsx"></code>

### 加载中状态

<code src="../../examples/Statistic/Loading.tsx"></code>

### 主题定制

<code src="../../examples/Statistic/Theme.tsx"></code>

## API

### Statistic

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | ReactNode | - |
| value | 数值 | number \| string | - |
| precision | 精度（小数位数） | number | - |
| prefix | 前缀 | ReactNode | - |
| suffix | 后缀 | ReactNode | - |
| groupSeparator | 千分位分隔符 | string | `','` |
| formatter | 自定义格式化函数 | `(value: number \| string) => ReactNode` | - |
| valueStyle | 数值区域自定义样式 | CSSProperties | - |
| loading | 加载中状态 | boolean | `false` |
| className | 自定义类名 | string | - |
| style | 自定义样式 | CSSProperties | - |

### Statistic.Countdown

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | ReactNode | - |
| value | 目标时间戳（毫秒） | number | - |
| format | 时间格式 | string | `'HH:mm:ss'` |
| prefix | 前缀 | ReactNode | - |
| suffix | 后缀 | ReactNode | - |
| valueStyle | 数值区域自定义样式 | CSSProperties | - |
| onFinish | 倒计时结束回调 | `() => void` | - |
| onChange | 倒计时变化回调 | `(value: number) => void` | - |

**format 格式说明：**

| 占位符 | 说明 |
| --- | --- |
| DD | 天数（补零） |
| D | 天数 |
| HH | 小时（累计，补零） |
| H | 小时（累计） |
| mm | 分钟（补零） |
| m | 分钟 |
| ss | 秒（补零） |
| s | 秒 |
| SSS | 毫秒（3位） |
| SS | 毫秒（2位） |
| S | 毫秒（1位） |

## 主题定制

通过 `ConfigProvider` 的 `theme.components.Statistic` 配置：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colorTextHeading | 标题文本颜色 | string | `'rgba(0, 0, 0, 0.65)'` |
| colorText | 数值文本颜色 | string | `'rgba(0, 0, 0, 0.88)'` |
| fontSizeHeading | 标题字号（像素） | number | `14` |
| fontSize | 数值字号（像素） | number | `24` |
