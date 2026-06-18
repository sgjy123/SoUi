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
| `warn(config)` | 警告通知（别名） | `(config: NotificationConfig) => void` |
| `error(config)` | 错误通知 | `(config: NotificationConfig) => void` |
| `destroy()` | 销毁所有通知 | `() => void` |
| `config(options)` | 全局配置 | `(options: NotificationGlobalConfig) => void` |

### NotificationConfig

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| `message` | 通知标题 | `React.ReactNode` | - |
| `description` | 通知内容 | `React.ReactNode` | - |
| `duration` | 自动关闭的延时，单位秒。设为 0 时不自动关闭 | `number` | `4.5` |
| `icon` | 自定义图标 | `React.ReactNode` | - |
| `type` | 通知类型，会覆盖 icon | `'success' \| 'info' \| 'warning' \| 'error'` | - |
| `key` | 唯一标识符 | `string` | - |
| `placement` | 弹出位置 | `'topLeft' \| 'topRight' \| 'bottomLeft' \| 'bottomRight'` | `topRight` |
| `style` | 自定义样式 | `React.CSSProperties` | - |
| `className` | 自定义类名 | `string` | - |
| `onClick` | 点击通知时的回调 | `() => void` | - |
| `onClose` | 关闭通知时的回调 | `() => void` | - |
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

### 全局配置

通过 `theme` 属性配置全局样式，影响所有使用该组件的实例：

```tsx
import { ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      // 全局配置项
      borderRadius: 6,              // 圆角
      fontSize: 14,                 // 字体大小
      // ... 其他全局配置
    }}
  >
    <YourApp />
  </ConfigProvider>
);
```

### 组件级配置

通过 `theme.components.Notification` 针对特定组件进行精细化配置：

```tsx
import { ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Notification: {
          // 组件专属配置项
          borderRadius: 8,              // 组件圆角
          fontSize: 14,                 // 组件字号
          descriptionFontSize: 12,      // 描述文字字号
          iconSize: 20,                 // 图标尺寸
          closeIconSize: 16,            // 关闭按钮尺寸
          padding: '16px',              // 内边距
          zIndex: 1030,                 // z-index
          colorBg: '#fff',              // 背景色
        },
      },
    }}
  >
    <YourApp />
  </ConfigProvider>
);
```

### 配置优先级

SoUi 采用以下优先级规则（从高到低）：

```
Props 属性 > 组件级配置 > 全局配置 > CSS 变量 > Less 变量
```

**示例：**

```tsx
// 最高优先级：Props 直接设置
<Notification style={{ backgroundColor: 'red' }} />

// 第二优先级：组件级配置
<ConfigProvider theme={{ components: { Notification: { colorBg: 'blue' } } }}>
  <YourApp /> {/* 使用蓝色背景 */}
</ConfigProvider>

// 第三优先级：全局配置
<ConfigProvider theme={{ primaryColor: 'green' }}>
  <YourApp /> {/* 使用绿色主色 */}
</ConfigProvider>
```

### 可用的主题配置项

根据组件的不同，可配置的主题项包括：

**颜色相关：**
- `colorBg` - 背景色

**尺寸相关：**
- `borderRadius` - 圆角大小（像素）
- `fontSize` - 字体大小（像素）
- `descriptionFontSize` - 描述文字字号（像素）
- `iconSize` - 图标尺寸（像素）
- `closeIconSize` - 关闭按钮尺寸（像素）
- `padding` - 内边距
- `zIndex` - z-index

**其他：**
- 具体配置项请参考组件 API 文档或 `ConfigProvider/types.ts` 类型定义

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<Notification 
  style={{
    '--soui-notification-bg-color': '#f0f0f0',
    '--soui-notification-border-radius': '10px',
  }}
/>
```

**CSS 变量命名规范：**
- 第1层（设计令牌）：`--soui-{property}` - 不带组件前缀的全局变量
- 第2层（组件配置点）：`--soui-notification-{property}` - 带组件前缀的配置点
- 第3层（组件级覆盖）：`--soui-notification-{property}-component` - 带 `-component` 后缀的覆盖变量

## 无障碍访问

组件遵循 WAI-ARIA 规范：
- 使用 `role="alert"` 标记通知为重要的提示信息
- 关闭按钮提供 `aria-label="Close notification"` 用于屏幕阅读器
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

将 `duration` 设置为 `0` 或 `null`：

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
});
```

### 通知之间会重叠吗？

不会。每个位置（topLeft、topRight、bottomLeft、bottomRight）都有独立的容器，同一位置的通知会垂直堆叠显示。

## 相关资源

- [Message 全局提示](/components/message)
- [Alert 警告提示](/components/alert)
