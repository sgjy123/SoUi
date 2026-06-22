# Progress 进度条

展示操作的当前进度，用于反馈操作的当前状态。

## 何时使用

- 当操作需要较长时间完成时，向用户展示当前进度
- 当需要直观展示任务完成百分比时
- 用于文件上传、数据加载等场景的进度反馈

## 代码演示

### 基础用法

线形进度条，支持不同状态：`normal`（默认）、`active`（激活动画）、`exception`（异常）、`success`（成功）。

```tsx
<Space direction="vertical" style={{ width: '100%' }}>
  <Progress percent={30} />
  <Progress percent={50} status="active" />
  <Progress percent={70} status="exception" />
  <Progress percent={100} />
  <Progress percent={50} showInfo={false} />
</Space>
```

### 圆形进度条

使用 `type="circle"` 展示圆形进度条。

```tsx
<Space size={24} wrap>
  <Progress type="circle" percent={75} />
  <Progress type="circle" percent={70} status="exception" />
  <Progress type="circle" percent={100} />
  <Progress type="circle" percent={50} status="active" />
</Space>
```

### 动态进度

通过按钮控制进度值的增减。

```tsx
const [percent, setPercent] = useState(0);

<Space direction="vertical" style={{ width: '100%' }}>
  <Progress percent={percent} />
  <Progress type="circle" percent={percent} />
  <Space>
    <Button onClick={() => setPercent(Math.max(0, percent - 10))} disabled={percent === 0}>
      减少
    </Button>
    <Button onClick={() => setPercent(Math.min(100, percent + 10))} type="primary" disabled={percent === 100}>
      增加
    </Button>
  </Space>
</Space>
```

### 步骤进度条

使用 `steps` 属性展示分段式步骤进度。

```tsx
<Space direction="vertical" style={{ width: '100%' }}>
  <Progress percent={30} steps={5} />
  <Progress percent={50} steps={5} status="active" />
  <Progress percent={70} steps={5} status="exception" />
  <Progress percent={100} steps={5} />
  <Progress percent={60} steps={8} />
</Space>
```

### 自定义颜色

通过 `strokeColor` 属性自定义进度条颜色，支持渐变色。

```tsx
<Space direction="vertical" style={{ width: '100%' }}>
  <Progress percent={50} strokeColor="#13c2c2" />
  <Progress percent={70} strokeColor={{ from: '#108ee9', to: '#87d068' }} />
</Space>
```

### 仪表盘

使用 `type="dashboard"` 展示仪表盘形式的进度条。

```tsx
<Space size={24} wrap>
  <Progress type="dashboard" percent={75} />
  <Progress type="dashboard" percent={70} status="exception" />
  <Progress type="dashboard" percent={100} />
</Space>
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| type | 进度条类型 | `'line' \| 'circle' \| 'dashboard'` | `'line'` | - |
| percent | 百分比（0-100） | `number` | `0` | - |
| status | 状态 | `'normal' \| 'success' \| 'exception' \| 'active'` | `'normal'` | - |
| size | 尺寸。线形时为进度条高度，圆形/仪表盘时为直径；传入数组时线形为 `[宽度, 高度]`，圆形取首个数值作为直径 | `'small' \| 'default' \| number \| [number, number]` | `'default'` | - |
| showInfo | 是否显示进度信息 | `boolean` | `true` | - |
| format | 自定义文本格式 | `(percent?, successPercent?) => ReactNode` | - | - |
| strokeColor | 进度条颜色，支持纯色字符串或渐变对象；设置后将覆盖 `status` 对应的默认颜色 | `string \| ProgressGradient` | - | - |
| trailColor | 进度条轨道颜色 | `string` | `#f5f5f5` | - |
| strokeWidth | 进度条线宽，会覆盖 `size` 属性计算出的高度 | `number` | `8` | - |
| steps | 步骤数量，仅线形进度条支持 | `number` | - | - |
| success | 成功进度配置，`success.percent` 不会超过当前 `percent` 值 | `ProgressSuccess` | - | - |
| gapDegree | 仪表盘缺口角度 | `number` | `75` | - |
| gapPosition | 仪表盘缺口位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | - |

### ProgressGradient

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| from | 渐变起始颜色 | `string` | `#1677ff` |
| to | 渐变结束颜色 | `string` | `#1677ff` |
| direction | 渐变方向 | `'left' \| 'right' \| 'top' \| 'bottom'` | `'right'` |

### ProgressSuccess

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| percent | 成功百分比 | `number` | `0` |
| strokeColor | 成功进度颜色 | `string` | `#52c41a` |

## 主题定制

Progress 组件支持通过 ConfigProvider 进行主题定制，遵循 SoUi 三层设计令牌系统。主题配置会同时作用于线形、圆形和仪表盘三种类型。

### 组件级配置

通过 `theme.components.Progress` 针对 Progress 组件进行精细化配置：

```tsx
import { ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Progress: {
          borderRadius: 10,             // 线形进度条圆角（px）
          fontSize: 16,                 // 文本字号（px）
          colorPrimary: '#722ed1',      // 主色（normal / active 状态）
          colorSuccess: '#389e0d',      // 成功色
          colorError: '#cf1322',        // 异常色
          colorTrail: '#f0f0f0',        // 轨道背景色
        },
      },
    }}
  >
    <YourApp />
  </ConfigProvider>
);
```

> **注意**：配置项对线形进度条（包括步骤模式）和圆形/仪表盘进度条均生效，无需分别配置。

### 配置优先级

SoUi 采用以下优先级规则（从高到低）：

```
Props 属性（strokeColor / trailColor / style）> 组件级配置 > CSS 变量 > Less 变量
```

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| `borderRadius` | 线形进度条圆角大小（px） | `number` | 继承 `@border-radius-base`（`6px`） |
| `fontSize` | 进度文本字号（px） | `number` | 继承 `@font-size-base`（`14px`） |
| `colorPrimary` | 主色，用于 normal 和 active 状态 | `string` | `#1677ff` |
| `colorSuccess` | 成功状态颜色 | `string` | `#52c41a` |
| `colorError` | 异常状态颜色 | `string` | `#ff4d4f` |
| `colorTrail` | 轨道背景色 | `string` | `#f5f5f5` |

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<Progress
  percent={60}
  style={{
    '--soui-progress-color-primary': '#722ed1',
    '--soui-progress-border-radius': '10px',
  }}
/>
```

**可用的 CSS 变量：**

| CSS 变量 | 说明 | 默认值 |
|----------|------|--------|
| `--soui-progress-border-radius` | 线形圆角 | 继承 `--soui-border-radius` |
| `--soui-progress-font-size` | 文本字号 | 继承 `--soui-font-size` |
| `--soui-progress-color-primary` | 主色（normal / active） | `#1677ff` |
| `--soui-progress-color-success` | 成功色 | `#52c41a` |
| `--soui-progress-color-error` | 异常色 | `#ff4d4f` |
| `--soui-progress-trail-color` | 轨道背景色 | `#f5f5f5` |

## 无障碍访问

- 进度条使用 `role="progressbar"` 属性，屏幕阅读器可识别
- 通过 `aria-valuenow`、`aria-valuemin`、`aria-valuemax` 属性传达进度值
- 百分比信息同时以文本形式展示，便于辅助技术读取

## FAQ

### 如何自定义进度条颜色？

可以通过 `strokeColor` 属性设置纯色或渐变色：

```tsx
// 纯色
<Progress percent={50} strokeColor="#13c2c2" />

// 渐变色
<Progress percent={70} strokeColor={{ from: '#108ee9', to: '#87d068' }} />

// 带方向的渐变
<Progress percent={70} strokeColor={{ from: '#108ee9', to: '#87d068', direction: 'bottom' }} />

// 自定义断点渐变
<Progress percent={70} strokeColor={{ '0': '#108ee9', '50': '#87d068', '100': '#f5222d' }} />
```

> **提示**：`direction` 支持 `'left'`、`'right'`、`'top'`、`'bottom'` 四个方向值，内部会自动转换为 CSS `linear-gradient` 对应的 `to left`、`to right`、`to top`、`to bottom`。

### 圆形进度条如何自定义大小？

通过 `size` 属性设置圆形进度条的直径：

```tsx
// 小尺寸
<Progress type="circle" percent={75} size={80} />

// 自定义尺寸
<Progress type="circle" percent={75} size={150} />
```

### 步骤进度条的 steps 有什么限制？

`steps` 属性用于将进度条分成指定数量的步骤，每个步骤根据当前百分比自动计算激活状态。

### success.percent 的行为是怎样的？

`success.percent` 用于在进度条上叠加显示"成功进度"部分（绿色）。它不会超过当前 `percent` 值——如果 `success.percent` 大于 `percent`，会自动截断为 `percent`。这是为了避免成功进度条完全遮挡主进度条，导致无法区分实际进度和成功进度。

```tsx
// success.percent = 30，percent = 50 → 成功部分显示 30%
<Progress percent={50} success={{ percent: 30 }} />

// success.percent = 80，percent = 50 → 成功部分截断为 50%
<Progress percent={50} success={{ percent: 80 }} />
```

## 相关资源

- [Message 全局提示](/components/message)
- [Alert 警告提示](/components/alert)
- [ConfigProvider 全局化配置](/theming/config-provider)
