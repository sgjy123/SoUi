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
| afterClose | 关闭动画（300ms）结束后触发的回调 | `() => void` | - | - |

## 主题定制

Alert 组件支持通过 ConfigProvider 进行主题定制，遵循 SoUi 三层设计令牌系统。

**注意：** Alert 组件可以在没有 ConfigProvider 的情况下独立使用，不会抛出错误。

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

### 配置优先级

配置优先级从高到低：

1. **Props (style/className)** - 直接传入的样式属性
2. **组件级配置** - `theme.components.Alert` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| borderRadius | 圆角大小（像素） | `number` | `6` |
| fontSize | 字体大小（像素） | `number` | `14` |
| titleFontSize | 标题字号（像素） | `number` | `16` |
| iconSize | 图标大小（像素） | `number` | `16/24` |
| colorSuccessBg | 成功状态背景色 | `string` | `#f6ffed` |
| colorSuccessBorder | 成功状态边框色 | `string` | `#b7eb8f` |
| colorInfoBg | 信息状态背景色 | `string` | `#e6f4ff` |
| colorInfoBorder | 信息状态边框色 | `string` | `#91caff` |
| colorWarningBg | 警告状态背景色 | `string` | `#fffbe6` |
| colorWarningBorder | 警告状态边框色 | `string` | `#ffe58f` |
| colorErrorBg | 错误状态背景色 | `string` | `#fff2f0` |
| colorErrorBorder | 错误状态边框色 | `string` | `#ffccc7` |
| colorDescription | 描述文字颜色 | `string` | `rgba(0,0,0,0.65)` |

**说明：** `iconSize` 默认值在有 `description` 时为 `24`，无 `description` 时为 `16`。

## 无障碍访问

- Alert 组件使用 `role="alert"` 属性，屏幕阅读器会自动朗读警告内容
- 关闭按钮带有 `aria-label="关闭"` 属性

## FAQ

### Banner 模式和普通模式有什么区别？

Banner 模式下 Alert 会去掉圆角和左右边框，适合放在页面顶部作为全局通知使用。同时 Banner 模式下如果未指定 `type`，默认使用 `warning` 类型。

### 如何自定义图标？

可以通过 `showIcon` 属性显示默认图标，也可以通过 `icon` 属性传入自定义的 React 节点作为图标。各类型的默认图标为：`success` → CheckOne，`info` → Info，`warning` → Attention，`error` → CloseOne。

### 关闭动画是如何工作的？

当用户点击关闭按钮时，Alert 会先添加退出动画类（透明度渐变为 0，高度收缩为 0），等待 300ms 动画完成后再从 DOM 中移除组件，最后触发 `afterClose` 回调。这样可以确保用户看到平滑的过渡效果，而不是突然消失。

```tsx
<Alert
  message="可关闭的提示"
  type="info"
  closable
  afterClose={() => {
    console.log('Alert 已完全关闭');
  }}
/>
```

### Alert 组件必须配合 ConfigProvider 使用吗？

不需要。Alert 组件可以在没有 ConfigProvider 的情况下独立使用，不会抛出错误。当没有 ConfigProvider 时，组件会使用 Less 变量中定义的默认样式。如果有 ConfigProvider，组件会自动读取 `theme.components.Alert` 配置并应用相应的主题。

## 相关资源

- [Tooltip 文字提示](/components/tooltip)
- [Message 全局提示](/components/message)
- [Modal 对话框](/components/modal)
