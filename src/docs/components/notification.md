# Notification 通知提醒框

全局展示通知提醒信息。

## 何时使用

- 在系统四个角显示通知提醒信息
- 较为复杂的通知内容
- 带有交互的通知，给出用户下一步的行动点
- 系统主动推送

## 代码演示

### 基础用法

四种类型的通知提醒框。

```tsx
import { Button, Space, Notification } from '@soui/ui';

export default () => {
  const openNotification = (type) => {
    Notification[type]({
      message: `Notification ${type}`,
      description: 'This is a notification message.',
    });
  };

  return (
    <Space>
      <Button onClick={() => openNotification('success')} type="primary">Success</Button>
      <Button onClick={() => openNotification('info')}>Info</Button>
      <Button onClick={() => openNotification('warning')}>Warning</Button>
      <Button onClick={() => openNotification('error')}>Error</Button>
    </Space>
  );
};
```

### 位置

设置通知出现的位置，支持 `topLeft`、`topRight`、`bottomLeft`、`bottomRight` 四种位置。

```tsx
import { Button, Space, Notification } from '@soui/ui';

export default () => {
  const openNotification = (placement) => {
    Notification.open({
      message: `Placement ${placement}`,
      description: 'This notification appears in the specified position.',
      placement,
    });
  };

  return (
    <Space direction="vertical">
      <Space>
        <Button onClick={() => openNotification('topLeft')}>Top Left</Button>
        <Button onClick={() => openNotification('topRight')}>Top Right</Button>
      </Space>
      <Space>
        <Button onClick={() => openNotification('bottomLeft')}>Bottom Left</Button>
        <Button onClick={() => openNotification('bottomRight')}>Bottom Right</Button>
      </Space>
    </Space>
  );
};
```

## API

### 方法

| 方法名 | 说明 | 类型 |
|--------|------|------|
| `open(config)` | 打开通知 | `(config: NotificationConfig) => void` |
| `success(config)` | 成功通知 | `(config: NotificationConfig) => void` |
| `info(config)` | 信息通知 | `(config: NotificationConfig) => void` |
| `warning(config)` | 警告通知 | `(config: NotificationConfig) => void` |
| `error(config)` | 错误通知 | `(config: NotificationConfig) => void` |
| `close(key)` | 关闭指定 key 的通知 | `(key: string) => void` |
| `destroy()` | 销毁所有通知 | `() => void` |
| `config(options)` | 全局配置 | `(options: NotificationGlobalConfig) => void` |

### NotificationConfig

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `message` | 通知标题 | `React.ReactNode` | - |
| `description` | 通知内容 | `React.ReactNode` | - |
| `duration` | 自动关闭的延时，单位秒。设为 `0` 时不自动关闭 | `number` | `4.5` |
| `icon` | 自定义图标 | `React.ReactNode` | - |
| `type` | 通知类型，会显示对应图标 | `'success' \| 'info' \| 'warning' \| 'error'` | - |
| `key` | 唯一标识符，可用于 `close(key)` 手动关闭 | `string` | - |
| `placement` | 弹出位置 | `'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight'` | `topRight` |
| `style` | 自定义样式 | `React.CSSProperties` | - |
| `className` | 自定义类名 | `string` | - |
| `onClick` | 点击通知时的回调 | `() => void` | - |
| `onClose` | 关闭时的回调（退出动画开始时触发） | `() => void` | - |
| `closeIcon` | 自定义关闭按钮 | `React.ReactNode` | - |

### NotificationGlobalConfig

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `duration` | 默认自动关闭延时，单位秒 | `number` | `4.5` |
| `getContainer` | 配置渲染节点的输出位置 | `() => HTMLElement` | `() => document.body` |
| `placement` | 弹出位置 | `'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight'` | `topRight` |
| `top` | 消息从顶部弹出时，距离顶部的位置（像素） | `string \| number` | `24px` |
| `bottom` | 消息从底部弹出时，距离底部的位置（像素） | `string \| number` | `24px` |

## 主题定制

Notification 组件支持通过 ConfigProvider 进行主题定制，遵循 SoUi 三层设计令牌系统。

**工作原理：** Notification 使用 `createRoot` 渲染在 ConfigProvider 的 DOM 树之外，因此无法直接继承 React Context 中的主题。组件通过 DOM 桥接机制（`getComputedStyle` 读取 `.soui-config-provider` 上的 CSS 变量并复制到通知容器）来实现主题同步。每次打开通知时都会刷新 CSS 变量，以支持动态主题切换。

### 组件级配置

通过 `theme.components.Notification` 针对 Notification 组件进行精细化配置：

```tsx
import { ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Notification: {
          borderRadius: 8,
          fontSize: 14,
          descriptionFontSize: 12,
          iconSize: 20,
          closeIconSize: 16,
          padding: '16px',
          zIndex: 1030,
          colorBg: '#fff',
        },
      },
    }}
  >
    <YourApp />
  </ConfigProvider>
);
```

### 配置优先级

配置优先级从高到低：

1. **Config 属性 (style/className)** - 每条通知的 `style`/`className` 属性
2. **组件级配置** - `theme.components.Notification` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| borderRadius | 圆角大小（像素） | `number` | `6` |
| fontSize | 字体大小（像素） | `number` | `14` |
| descriptionFontSize | 描述文字字号（像素） | `number` | `12` |
| iconSize | 图标尺寸（像素） | `number` | `20` |
| closeIconSize | 关闭按钮尺寸（像素） | `number` | `16` |
| padding | 内边距 | `string` | `16px` |
| zIndex | z-index | `number` | `1010` |
| colorBg | 背景色 | `string` | `#fff` |

## 无障碍访问

组件遵循 WAI-ARIA 规范：
- 使用 `role="alert"` 标记通知为重要的提示信息
- 关闭按钮提供 `aria-label="关闭"` 用于屏幕阅读器
- 支持键盘操作，可以通过 Tab 键聚焦到关闭按钮并按 Enter 键关闭

## FAQ

### 如何手动关闭特定通知？

可以使用 `key` 参数标识通知，然后调用 `Notification.close(key)` 方法关闭：

```tsx
const key = 'unique-notification-key';

// 打开通知
Notification.open({
  key,
  message: '可关闭的通知',
  description: '点击按钮可以关闭此通知',
});

// 关闭通知
Notification.close(key);
```

### 如何设置通知不自动关闭？

将 `duration` 设置为 `0`：

```tsx
Notification.info({
  message: '持久通知',
  description: '这个通知不会自动关闭',
  duration: 0,
});
```

### 如何全局配置通知的默认位置？

使用 `Notification.config()` 方法：

```tsx
Notification.config({
  placement: 'bottomRight',
  duration: 3,
  top: 100,
  bottom: 50,
});
```

`top` 和 `bottom` 支持数字（自动转为 px）或字符串（如 `'10vh'`）。

### 通知之间会重叠吗？

不会。每个位置（topLeft、topRight、bottomLeft、bottomRight）都有独立的容器，同一位置的通知会垂直堆叠显示。

### 关闭通知时有动画效果吗？

有。点击关闭按钮或到达 `duration` 后，通知会先触发退出动画（向上平移 + 透明度过渡，持续 300ms），动画结束后再从 DOM 中移除。退出过程中通知不可交互（`pointer-events: none`）。`onClose` 回调在动画开始时立即触发。

### Notification 支持 ConfigProvider 主题吗？

支持。虽然 Notification 使用 `createRoot` 渲染在 ConfigProvider 的 DOM 树之外，但组件通过 DOM 桥接机制自动同步主题。每次打开通知时，会从页面上的 `.soui-config-provider` 元素读取计算样式，将相关 CSS 变量复制到通知容器上。因此动态切换主题后新打开的通知会自动使用新主题。

## 相关资源

- [Message 全局提示](/components/message)
- [Alert 警告提示](/components/alert)
