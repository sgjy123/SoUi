# Message 全局提示

全局展示操作反馈信息，是一种轻量级的信息提示方式。

## 何时使用

- 可提供成功、警告和错误等反馈信息
- 当用户需要查看操作结果时
- 当需要显示短暂的提示信息，不需要用户交互
- 替代浏览器原生的 `alert()`、`confirm()` 等弹窗提示

## 代码演示

### 基础用法

通过静态方法调用，展示四种不同类型的消息提示。

```tsx
<Space>
  <Button type="primary" onClick={() => Message.success('操作成功完成！')}>
    成功
  </Button>
  <Button onClick={() => Message.info('这是一条普通信息提示。')}>
    信息
  </Button>
  <Button onClick={() => Message.warning('请注意，这是一条警告提示！')}>
    警告
  </Button>
  <Button danger onClick={() => Message.error('操作失败，请稍后重试。')}>
    错误
  </Button>
</Space>
```

### 自定义内容

支持传入 ReactNode 作为消息内容，也支持自定义图标。

```tsx
<Space>
  <Button
    type="primary"
    onClick={() => {
      Message.open({
        content: (
          <span>
            这是一条使用 <strong>open</strong> 方法打开的自定义消息，
            支持传入 <strong>ReactNode</strong> 作为内容。
          </span>
        ),
        type: 'success',
        duration: 5,
      });
    }}
  >
    自定义内容
  </Button>
  <Button
    onClick={() => {
      Message.open({
        content: '带自定义图标的消息',
        type: 'info',
        icon: <span style={{ color: '#1677ff', fontSize: 16 }}>★</span>,
      });
    }}
  >
    自定义图标
  </Button>
</Space>
```

### 持续时间

通过 `duration` 参数自定义消息显示的时长（单位：秒），设置为 `0` 时不会自动关闭。

```tsx
<Space>
  <Button
    onClick={() => {
      Message.info('这条消息将在 1 秒后关闭', 1);
    }}
  >
    1 秒关闭
  </Button>
  <Button
    onClick={() => {
      Message.info('这条消息将在 5 秒后关闭', 5);
    }}
  >
    5 秒关闭
  </Button>
  <Button
    onClick={() => {
      Message.info('这条消息不会自动关闭（duration=0）', 0);
    }}
  >
    不自动关闭
  </Button>
</Space>
```

### 加载状态

展示加载中状态，默认不会自动关闭，需要手动调用 `Message.destroy()` 关闭。

```tsx
<Space direction="vertical" align="start">
  <Space>
    <Button type="primary" onClick={() => {
      Message.loading('正在处理中，请稍候...');
      setTimeout(() => {
        Message.destroy();
        Message.success('处理完成！');
      }, 3000);
    }}>
      显示加载状态
    </Button>
    <Button
      onClick={() => {
        Message.loading('持续显示的加载提示');
      }}
    >
      加载提示
    </Button>
  </Space>
</Space>
```

### Hook 方式

通过 `useMessage` Hook 获取消息 API 和上下文节点，适用于需要配合 ConfigProvider 进行主题定制的场景。

```tsx
const [messageApi, contextHolder] = Message.useMessage();

<Button type="primary" onClick={() => messageApi.success('Hook 方式调用成功！')}>
  Hook 调用
</Button>
{contextHolder}
```

### 全局配置

通过 `Message.config()` 设置全局默认选项。

```tsx
Message.config({
  duration: 5,    // 默认显示 5 秒
  maxCount: 3,    // 最多同时显示 3 条
  top: 24,        // 距顶部距离
});
```

## API

### 静态方法

| 方法 | 说明 | 参数 | 版本 |
|------|------|------|------|
| `Message.success` | 成功提示 | `(content: ReactNode, duration?: number)` | - |
| `Message.info` | 信息提示 | `(content: ReactNode, duration?: number)` | - |
| `Message.warning` | 警告提示 | `(content: ReactNode, duration?: number)` | - |
| `Message.error` | 错误提示 | `(content: ReactNode, duration?: number)` | - |
| `Message.loading` | 加载提示 | `(content: ReactNode, duration?: number)` | - |
| `Message.open` | 自定义消息 | `(config: MessageConfig)` | - |
| `Message.destroy` | 销毁所有消息 | `()` | - |
| `Message.config` | 全局配置 | `(options: MessageOptions)` | - |

### MessageConfig

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| content | 消息内容（必填） | `ReactNode` | - | - |
| type | 消息类型 | `'success' \| 'info' \| 'warning' \| 'error' \| 'loading'` | `'info'` | - |
| duration | 显示时长（秒），`0` 表示不自动关闭 | `number` | `3` | - |
| key | 唯一标识，用于更新消息 | `React.Key` | - | - |
| icon | 自定义图标 | `ReactNode` | - | - |
| style | 自定义样式 | `CSSProperties` | - | - |
| className | 自定义类名 | `string` | - | - |
| onClose | 关闭时的回调 | `(key: React.Key) => void` | - | - |

### MessageOptions

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| duration | 默认显示时长（秒） | `number` | `3` | - |
| top | 消息距顶部距离（像素） | `number` | `16` | - |
| maxCount | 最大显示数量 | `number` | - | - |
| getContainer | 指定消息渲染容器 | `() => HTMLElement` | `() => document.body` | - |

### Hook 方式

```tsx
const [messageApi, contextHolder] = Message.useMessage();
```

- `messageApi` — 与静态方法 API 一致（`success`、`info`、`warning`、`error`、`loading`、`open`、`destroy`）
- `contextHolder` — 上下文节点，需渲染在组件树中

## 主题定制

Message 组件支持通过 ConfigProvider 进行主题定制。静态方法（`Message.success()` 等）和 Hook 方式（`useMessage`）均可自动获取 ConfigProvider 的主题配置。

### 组件级配置

通过 `theme.components.Message` 针对 Message 组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Message: {
        borderRadius: 8,     // 消息圆角（px）
        fontSize: 16,        // 消息字号（px）
        maxWidth: 600,       // 消息最大宽度（px）
      },
    },
  }}
>
  <App />
</ConfigProvider>
```

> **工作原理**：Message 通过 `createRoot` 渲染到 `document.body` 的独立容器中，无法直接继承 ConfigProvider 的 CSS 变量。组件内部会自动从 `.soui-config-provider` 元素读取已注入的 CSS 变量并复制到消息容器上，因此静态方法和 Hook 方式均能正确响应主题配置。

### 配置优先级

```
MessageConfig.style > 组件级配置 > CSS 变量 > Less 变量
```

### 可用的主题配置项

| 配置项 | 说明 | 类型 |
|--------|------|------|
| borderRadius | 圆角大小（像素） | `number` |
| fontSize | 字体大小（像素） | `number` |
| maxWidth | 最大宽度（像素） | `number` |

### CSS 变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `--soui-message-border-radius` | 圆角大小 | `var(--soui-border-radius)` |
| `--soui-message-font-size` | 字体大小 | `var(--soui-font-size)` |
| `--soui-message-max-width` | 最大宽度 | `480px` |

## 无障碍访问

- 每条消息使用 `role="alert"` 属性，屏幕阅读器会自动朗读消息内容
- 加载状态使用旋转动画图标，视觉上明确传达进行中的状态

## FAQ

### Message 和 Alert 有什么区别？

Message 是轻量级的全局提示，显示在页面顶部居中位置，自动消失，不需要用户交互。Alert 是页面级别的警告提示，嵌入在页面内容中，不会自动消失，适合需要用户关注的持久性提示。

### 如何关闭正在显示的消息？

调用 `Message.destroy()` 可以关闭所有正在显示的消息。如果只想关闭特定消息，可以传入 `key`：

```tsx
// 关闭所有消息
Message.destroy();
```

### loading 类型的消息如何关闭？

`Message.loading()` 默认不会自动关闭（`duration` 为 `0`），需要手动调用 `Message.destroy()` 关闭：

```tsx
Message.loading('加载中...');
// 异步操作完成后
Message.destroy();
Message.success('加载完成');
```

### 静态方法和 Hook 方式有什么区别？

两者在功能上基本一致，都支持 ConfigProvider 主题配置。主要区别在于：

- **静态方法**（`Message.success()`）：可在任意位置调用（事件处理、异步回调等），使用更方便。消息渲染在 `document.body` 的独立容器中。
- **Hook 方式**（`useMessage()`）：API 实例随组件挂载而创建、随卸载而销毁，生命周期更可控。适合需要在组件卸载时自动清理消息的场景。

### `Message.config()` 中 `top` 和 `maxCount` 如何工作？

`top` 控制消息距离页面顶部的偏移量（默认 16px），`maxCount` 限制同时显示的最大消息数量（超出时自动移除最早的非 loading 消息）：

```tsx
Message.config({
  top: 24,        // 距顶部 24px
  maxCount: 3,    // 最多同时显示 3 条
  duration: 5,    // 默认显示 5 秒
});
```

## 相关资源

- [Alert 警告提示](/components/alert)
- [Tooltip 文字提示](/components/tooltip)
- [ConfigProvider 全局化配置](/theming/config-provider)
