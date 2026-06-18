# Alert 警告提示

警告提示，展现需要关注的信息。

## 何时使用

- 当某个页面需要向用户发送警告提示时
- 当需要显示操作成功、失败等反馈信息时
- 当需要提示用户注意某些事项时
- 用于页面顶部的通知横幅

## 代码演示

### 基础用法

四种类型的警告提示：`info`、`success`、`warning`、`error`。

```tsx
<Space direction="vertical" size={12} style={{ width: '100%' }}>
  <Alert message="Info Text" type="info" />
  <Alert message="Success Text" type="success" />
  <Alert message="Warning Text" type="warning" />
  <Alert message="Error Text" type="error" />
</Space>
```

### 带有描述

含有辅助性文字介绍的警告提示，当有 `description` 时会自动切换为更大的布局。

```tsx
<Space direction="vertical" size={12} style={{ width: '100%' }}>
  <Alert message="信息提示" description="这是信息类型的警告提示，用于一般性提示信息。" type="info" showIcon />
  <Alert message="操作成功" description="恭喜！您的操作已成功完成，数据已保存。" type="success" showIcon />
</Space>
```

### 带图标

为警告提示添加图标，增强视觉效果和信息辨识度。

```tsx
<Space direction="vertical" size={12} style={{ width: '100%' }}>
  <Alert message="带图标的信息提示" type="info" showIcon />
  <Alert message="带图标的成功提示" type="success" showIcon />
  <Alert message="带图标的警告提示" type="warning" showIcon />
  <Alert message="带图标的错误提示" type="error" showIcon />
</Space>
```

### 可关闭

可以关闭的警告提示，点击关闭按钮后消失。

```tsx
<Space direction="vertical" size={12} style={{ width: '100%' }}>
  <Alert message="可关闭的提示" type="info" closable />
  <Alert message="自定义关闭图标" type="success" closable closeIcon="✕" />
</Space>
```

### 操作按钮

带有自定义操作元素的警告提示。

```tsx
<Alert
  message="操作成功"
  type="success"
  action={<button>查看详情</button>}
/>
```

### Banner 模式

页面顶部通告形式，去掉圆角和左右边框。

```tsx
<Alert message="Banner 模式提示" type="info" banner />
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| type | 警告提示类型 | `'success' \| 'info' \| 'warning' \| 'error'` | `info` | - |
| message | 警告提示内容（必填） | `ReactNode` | - | - |
| description | 辅助性文字（第二行描述） | `ReactNode` | - | - |
| closable | 是否可关闭 | `boolean` | `false` | - |
| closeIcon | 自定义关闭按钮 | `ReactNode` | - | - |
| icon | 自定义图标 | `ReactNode` | - | - |
| showIcon | 是否显示图标 | `boolean` | `false` | - |
| banner | 是否为 banner 模式 | `boolean` | `false` | - |
| action | 自定义操作元素 | `ReactNode` | - | - |
| afterClose | 关闭动画结束后触发的回调 | `() => void` | - | - |

### 事件

| 事件名 | 说明 | 类型 |
|--------|------|------|
| afterClose | 关闭后的回调 | `() => void` |

## 主题定制

Alert 组件支持通过 ConfigProvider 进行主题定制，遵循 SoUi 三层设计令牌系统。

### 全局配置

通过 `theme` 属性配置全局样式，影响所有使用该组件的实例：

```tsx
<ConfigProvider
  theme={{
    borderRadius: 8,
    fontSize: 14,
  }}
>
  <Alert message="自定义主题" type="info" />
</ConfigProvider>
```

### 组件级配置

通过 `theme.components.Alert` 针对 Alert 组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Alert: {
        borderRadius: 8,
        fontSize: 14,
        titleFontSize: 16,
        iconSize: 20,
        colorSuccessBg: '#f0fff0',
        colorSuccessBorder: '#80ff80',
        colorErrorBg: '#fff0f0',
        colorErrorBorder: '#ff8080',
      },
    },
  }}
>
  <Alert message="自定义主题" type="success" />
</ConfigProvider>
```

### 可用的主题配置项

| 配置项 | 说明 | 类型 |
|--------|------|------|
| borderRadius | 圆角大小（像素） | `number` |
| fontSize | 字体大小（像素） | `number` |
| titleFontSize | 标题字号（像素） | `number` |
| iconSize | 图标大小（像素） | `number` |
| colorSuccessBg | 成功状态背景色 | `string` |
| colorSuccessBorder | 成功状态边框色 | `string` |
| colorInfoBg | 信息状态背景色 | `string` |
| colorInfoBorder | 信息状态边框色 | `string` |
| colorWarningBg | 警告状态背景色 | `string` |
| colorWarningBorder | 警告状态边框色 | `string` |
| colorErrorBg | 错误状态背景色 | `string` |
| colorErrorBorder | 错误状态边框色 | `string` |

## 无障碍访问

- Alert 组件使用 `role="alert"` 属性，屏幕阅读器会自动朗读警告内容
- 关闭按钮带有 `aria-label="关闭"` 属性

## FAQ

### Banner 模式和普通模式有什么区别？

Banner 模式下 Alert 会去掉圆角和左右边框，适合放在页面顶部作为全局通知使用。同时 Banner 模式下如果未指定 `type`，默认使用 `warning` 类型。

### 如何自定义图标？

可以通过 `showIcon` 属性显示默认图标，也可以通过 `icon` 属性传入自定义的 React 节点作为图标。

## 相关资源

- [Tooltip 文字提示](/components/tooltip)
- [Message 全局提示](/components/message)
- [Modal 对话框](/components/modal)
