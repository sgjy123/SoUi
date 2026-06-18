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
| size | 尺寸 | `'small' \| 'default' \| number \| [number, number]` | `'default'` | - |
| showInfo | 是否显示进度信息 | `boolean` | `true` | - |
| format | 自定义文本格式 | `(percent?, successPercent?) => ReactNode` | - | - |
| strokeColor | 进度条颜色 | `string \| ProgressGradient` | - | - |
| trailColor | 进度条轨道颜色 | `string` | `#f5f5f5` | - |
| strokeWidth | 进度条线宽 | `number` | `8` | - |
| steps | 步骤数量 | `number` | - | - |
| success | 成功进度配置 | `ProgressSuccess` | - | - |
| gapDegree | 仪表盘缺口角度 | `number` | `75` | - |
| gapPosition | 仪表盘缺口位置 | `'top' \| 'bottom' \| 'left' \| 'right'` | `'bottom'` | - |

### ProgressGradient

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| from | 渐变起始颜色 | `string` | `#1677ff` |
| to | 渐变结束颜色 | `string` | `#1677ff` |
| direction | 渐变方向 | `'left' \| 'right' \| 'top' \| 'bottom'` | `'to right'` |

### ProgressSuccess

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| percent | 成功百分比 | `number` | `0` |
| strokeColor | 成功进度颜色 | `string` | `#52c41a` |

## 主题定制

Progress 组件支持通过 ConfigProvider 进行主题定制，遵循 SoUi 三层设计令牌系统。

### 全局配置

通过 `theme` 属性配置全局样式：

```tsx
<ConfigProvider
  theme={{
    primaryColor: '#1677ff',
    borderRadius: 8,
  }}
>
  <App />
</ConfigProvider>
```

### 组件级配置

通过 `theme.components.Progress` 针对 Progress 组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Progress: {
        borderRadius: 10,
        fontSize: 16,
        colorPrimary: '#722ed1',
        colorSuccess: '#389e0d',
        colorError: '#cf1322',
        colorTrail: '#f0f0f0',
      },
    },
  }}
>
  <App />
</ConfigProvider>
```

### 可用的主题配置项

| 配置项 | 说明 | 类型 |
|--------|------|------|
| borderRadius | 圆角大小（像素） | `number` |
| fontSize | 字体大小（像素） | `number` |
| colorPrimary | 主色 | `string` |
| colorSuccess | 成功色 | `string` |
| colorError | 错误色 | `string` |
| colorTrail | 轨道颜色 | `string` |

### CSS 变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `--soui-progress-border-radius` | 圆角大小 | `var(--soui-border-radius)` |
| `--soui-progress-font-size` | 字体大小 | `var(--soui-font-size)` |
| `--soui-progress-color-primary` | 主色 | `var(--soui-primary-color)` |
| `--soui-progress-color-success` | 成功色 | `var(--soui-success-color)` |
| `--soui-progress-color-error` | 错误色 | `var(--soui-error-color)` |
| `--soui-progress-trail-color` | 轨道颜色 | `#f5f5f5` |

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
```

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

## 相关资源

- [Message 全局提示](/components/message)
- [Alert 警告提示](/components/alert)
- [ConfigProvider 全局化配置](/theming/config-provider)
