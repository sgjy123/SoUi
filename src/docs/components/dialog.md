# Dialog 对话框

对话框用于在不离开当前页面的情况下，向用户展示重要信息、收集输入或要求确认操作。

## 何时使用

- 需要用户确认操作，防止误操作
- 展示重要信息，需要用户关注
- 收集用户输入，如表单填写
- 展示操作结果，如成功或失败提示

## 代码演示

### 基础对话框

最基本的对话框用法，通过 `open` 属性控制显示和隐藏。对话框高度自适应内容，不会有多余空白。

```tsx
import React, { useState } from 'react';
import { Button, Dialog } from 'soui';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开对话框
      </Button>
      <Dialog
        open={open}
        title="基本对话框"
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <p>这是一个基本的对话框示例。</p>
      </Dialog>
    </>
  );
};
```

### 确认对话框

使用静态方法快速弹出确认对话框，支持 `confirm`、`info`、`success`、`warning`、`error` 五种类型。点击确定或取消后自动关闭。

```tsx
import { Button, Dialog } from 'soui';

// 确认框
Dialog.confirm({
  title: '确认操作',
  content: '你确定要执行这个操作吗？',
  onOk() { console.log('确认'); },
});

// 成功提示
Dialog.success({
  title: '操作成功',
  content: '数据已成功保存！',
});
```

### 异步提交

点击确定后执行异步操作，通过 `confirmLoading` 显示加载状态。`confirmLoading` 为 `true` 时不会自动关闭，直到变为 `false`。

```tsx
import React, { useState } from 'react';
import { Button, Dialog } from 'soui';

export default () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 2000);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        异步提交
      </Button>
      <Dialog
        open={open}
        title="异步对话框"
        confirmLoading={loading}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
      >
        <p>点击确定后将模拟一个异步操作。</p>
      </Dialog>
    </>
  );
};
```

### 居中显示

通过 `centered` 属性让对话框在视口中垂直居中。

```tsx
import React, { useState } from 'react';
import { Button, Dialog } from 'soui';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        居中对话框
      </Button>
      <Dialog
        open={open}
        title="居中显示"
        centered
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <p>对话框在视口中垂直居中显示。</p>
      </Dialog>
    </>
  );
};
```

### useDialog Hook

当需要在 `ConfigProvider` 内使用对话框并继承主题上下文时，使用 `useDialog` Hook。Hook 创建的对话框点击确定或取消后会自动关闭。

```tsx
import React from 'react';
import { Button, Dialog, Space } from 'soui';

export default () => {
  const [dialog, contextHolder] = Dialog.useDialog();

  const showConfirm = () => {
    dialog.confirm({
      title: '确认操作',
      content: '使用 useDialog Hook 可以继承 ConfigProvider 的主题上下文。',
      onOk() { console.log('确认'); },
    });
  };

  const showSuccess = () => {
    dialog.success({
      title: '操作成功',
      content: '这是通过 useDialog Hook 调用的成功提示。',
    });
  };

  return (
    <>
      {contextHolder}
      <Space>
        <Button onClick={showConfirm}>确认框</Button>
        <Button onClick={showSuccess}>成功</Button>
      </Space>
    </>
  );
};
```

## API

### Dialog Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 是否显示对话框 | `boolean` | `false` |
| title | 标题 | `ReactNode` | - |
| children | 对话框内容 | `ReactNode` | - |
| onOk | 点击确定的回调 | `(e) => void` | - |
| onCancel | 点击取消的回调 | `(e) => void` | - |
| confirmLoading | 确定按钮 loading | `boolean` | `false` |
| footer | 底部内容，设为 `null` 时不显示 | `ReactNode` | - |
| width | 宽度 | `number \| string` | `420` |
| centered | 是否垂直居中显示 | `boolean` | `false` |
| destroyOnHidden | 关闭时销毁内容 | `boolean` | `false` |
| mask | 是否显示遮罩 | `boolean` | `true` |
| maskClosable | 点击遮罩是否可关闭 | `boolean` | `true` |
| closable | 是否显示关闭按钮 | `boolean` | `true` |
| closeIcon | 自定义关闭图标 | `ReactNode` | - |
| okText | 确定按钮文字 | `ReactNode` | `确定` |
| cancelText | 取消按钮文字 | `ReactNode` | `取消` |
| okType | 确定按钮类型 | `'primary' \| 'default' \| 'dashed' \| 'text' \| 'link'` | `'primary'` |
| okButtonProps | 确定按钮 Props | `ButtonProps` | - |
| cancelButtonProps | 取消按钮 Props | `ButtonProps` | - |
| keyboard | 是否支持 ESC 键关闭 | `boolean` | `true` |
| maskClassName | 自定义遮罩类名 | `string` | - |
| wrapClassName | 自定义容器类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |
| bodyStyle | 对话框 body 样式 | `CSSProperties` | - |
| zIndex | 自定义 z-index | `number` | - |
| getContainer | 指定挂载节点 | `() => HTMLElement` | `() => document.body` |
| afterClose | 关闭后回调 | `() => void` | - |
| modalRender | 自定义渲染对话框 | `(node: ReactNode) => ReactNode` | - |
| focusable | 是否获取焦点 | `boolean` | `true` |

### 静态方法

- `Dialog.confirm(config)` - 确认对话框
- `Dialog.info(config)` - 信息对话框
- `Dialog.success(config)` - 成功对话框
- `Dialog.warning(config)` - 警告对话框
- `Dialog.error(config)` - 错误对话框
- `Dialog.destroyAll()` - 销毁所有静态对话框

静态方法返回 `{ close, destroy }`，可用于手动关闭或销毁对话框。

### DialogConfirmConfig

静态方法的配置项，继承 `DialogProps`，额外支持：

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| content | 对话框内容 | `ReactNode` | - |
| icon | 自定义图标 | `ReactNode` | - |
| type | 对话框类型 | `'confirm' \| 'info' \| 'success' \| 'warning' \| 'error'` | - |

### useDialog Hook

`Dialog.useDialog()` 返回 `[api, contextHolder]`：

- `api` - 包含 `open`、`confirm`、`info`、`success`、`warning`、`error` 方法
- `contextHolder` - 需要渲染在 JSX 中，用于挂载对话框容器

Hook 创建的对话框点击确定或取消后会自动关闭（带动画）。如果 `confirmLoading` 为 `true`，则不会自动关闭，直到变为 `false`。

```tsx
const [dialog, contextHolder] = Dialog.useDialog();

// 使用
dialog.confirm({ title: '确认', content: '内容' });

// 在 JSX 中渲染 contextHolder
return <>{contextHolder}</>;
```

## 主题定制

Dialog 支持通过 `ConfigProvider` 进行主题定制：

```tsx
<ConfigProvider
  theme={{
    components: {
      Dialog: {
        borderRadius: 8,
        titleFontSize: 16,
        colorBg: '#ffffff',
        maskBgColor: 'rgba(0, 0, 0, 0.45)',
        headerPadding: '12px 20px',
        bodyPadding: '16px 20px',
        footerPadding: '10px 20px',
        zIndex: 1000,
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.1)',
      },
    },
  }}
>
  <Dialog open={true} title="主题定制" />
</ConfigProvider>
```

支持的 CSS 变量：

| 变量名 | 说明 | 默认值 |
| --- | --- | --- |
| `--soui-dialog-border-radius` | 圆角 | `8px` |
| `--soui-dialog-title-font-size` | 标题字号 | `16px` |
| `--soui-dialog-bg-color` | 背景色 | `#fff` |
| `--soui-dialog-mask-bg-color` | 遮罩背景色 | `rgba(0, 0, 0, 0.45)` |
| `--soui-dialog-header-padding` | 头部内边距 | `12px 20px` |
| `--soui-dialog-body-padding` | 内容区内边距 | `16px 20px` |
| `--soui-dialog-footer-padding` | 底部内边距 | `10px 20px` |
| `--soui-dialog-z-index` | 层级 | `1030` |
| `--soui-dialog-box-shadow` | 阴影 | `0 6px 16px rgba(0, 0, 0, 0.08)` |
| `--soui-dialog-confirm-gap` | 确认框图标与内容间距 | `12px` |
| `--soui-dialog-confirm-body-padding` | 确认框主体内边距 | `16px 20px` |

## FAQ

### 静态方法如何继承 ConfigProvider 主题？

静态方法（`Dialog.confirm` 等）通过 DOM 桥接的方式从 `.soui-config-provider` 节点复制 CSS 变量。如果需要更精确的主题继承，建议使用 `Dialog.useDialog()` Hook。

### 如何阻止点击遮罩关闭对话框？

设置 `maskClosable={false}` 即可阻止点击遮罩关闭对话框。

### 不同使用方式的关闭行为有什么区别？

- **声明式 Dialog**：`onOk` 不会自动关闭对话框，需要用户在回调中手动设置 `open={false}`。这给了用户完全的控制权，适合需要异步验证的场景。
- **静态方法**（`Dialog.confirm` 等）：点击确定或取消后自动关闭。如果 `confirmLoading` 为 `true`，则等待变为 `false` 后再关闭。
- **useDialog Hook**：与静态方法行为一致，点击确定或取消后自动关闭。

### 异步操作时如何保持对话框打开？

**声明式 Dialog**：使用 `confirmLoading` 属性控制确定按钮的加载状态。当 `confirmLoading` 为 `true` 时，点击确定不会触发关闭，直到 `confirmLoading` 变为 `false` 且用户手动设置 `open={false}`。

**静态方法 / useDialog**：同样使用 `confirmLoading`，当为 `true` 时不会自动关闭，变为 `false` 后自动关闭。

### 对话框内容区域高度如何控制？

对话框 body 区域高度自适应内容，不会有多余空白。如果内容超出 `max-height`（默认 `calc(100vh - 64px)`），body 会出现滚动条。
