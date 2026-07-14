# Popconfirm 气泡确认框

点击元素弹出确认气泡，用于二次确认操作。

## 何时使用

- 目标操作需要用户二次确认
- 删除、提交等不可逆操作前的确认
- 相比 Dialog 更轻量，适合简单确认场景
- 需要异步等待确认结果（如服务端校验）

## 代码演示

### 基础用法

最简单的用法，点击按钮弹出确认框，确认后执行回调。

```tsx
import { Popconfirm, Button, Space } from '@soui/ui';

export default () => (
  <Space>
    <Popconfirm
      title="确定要删除这条数据吗？"
      onConfirm={() => console.log('confirmed')}
      onCancel={() => console.log('cancelled')}
    >
      <Button type="primary">删除</Button>
    </Popconfirm>
    <Popconfirm
      title="你确定要执行这个操作吗？"
      okText="是的"
      cancelText="不用了"
    >
      <Button>执行操作</Button>
    </Popconfirm>
    <Popconfirm
      title="确认提交？"
      disabled
    >
      <Button disabled>提交（禁用）</Button>
    </Popconfirm>
  </Space>
);
```

### 弹出方向

支持 12 个不同的弹出位置，可以灵活选择确认框的展示方向。

```tsx
import { Popconfirm, Button } from '@soui/ui';

const positions = [
  { label: '上方', placement: 'top' },
  { label: '左上', placement: 'topLeft' },
  { label: '右上', placement: 'topRight' },
  { label: '下方', placement: 'bottom' },
  { label: '左下', placement: 'bottomLeft' },
  { label: '右下', placement: 'bottomRight' },
  { label: '左侧', placement: 'left' },
  { label: '左上对齐', placement: 'leftTop' },
  { label: '左下对齐', placement: 'leftBottom' },
  { label: '右侧', placement: 'right' },
  { label: '右上对齐', placement: 'rightTop' },
  { label: '右下对齐', placement: 'rightBottom' },
];

export default () => (
  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 500 }}>
    {positions.map(({ label, placement }) => (
      <Popconfirm
        key={placement}
        title={`弹出方向：${label}`}
        placement={placement}
      >
        <Button style={{ width: '100%' }}>{label}</Button>
      </Popconfirm>
    ))}
  </div>
);
```

### 自定义内容

可以自定义图标、添加描述文字、隐藏取消按钮等。

```tsx
import { Popconfirm, Button, Space, Icon } from '@soui/ui';

export default () => (
  <Space direction="vertical" size={16}>
    <Popconfirm
      title="确认删除"
      description="删除后将无法恢复，请确认是否继续？"
    >
      <Button danger>带描述的确认框</Button>
    </Popconfirm>

    <Popconfirm
      title="自定义图标"
      icon={<Icon name="Info" size={16} style={{ color: '#1677ff' }} />}
    >
      <Button>自定义图标</Button>
    </Popconfirm>

    <Popconfirm
      title="危险操作"
      description="此操作将永久删除所有数据！"
      icon={<Icon name="CloseOne" size={16} style={{ color: '#ff4d4f' }} />}
      okText="删除"
      okButtonProps={{ danger: true }}
    >
      <Button danger>危险操作确认</Button>
    </Popconfirm>

    <Popconfirm
      title="仅确认（无取消按钮）"
      showCancel={false}
      okText="我知道了"
    >
      <Button>仅确认按钮</Button>
    </Popconfirm>
  </Space>
);
```

### 异步关闭

`onConfirm` 返回 Promise 时，确认按钮会显示加载状态，直到 Promise resolve。

```tsx
import { useState } from 'react';
import { Popconfirm, Button, Space } from '@soui/ui';

export default () => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        setOpen(false);
      }, 2000);
    });
  };

  return (
    <Space>
      <Popconfirm
        title="点击确定后 2 秒关闭"
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
        open={open}
        onOpenChange={setOpen}
      >
        <Button type="primary">异步关闭（Promise）</Button>
      </Popconfirm>

      <Popconfirm
        title="确定要提交吗？"
        onConfirm={() => {
          console.log('submitted');
        }}
      >
        <Button>普通确认</Button>
      </Popconfirm>
    </Space>
  );
};
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| title | 确认框标题 | `React.ReactNode` | - | - |
| description | 确认框描述（标题下方辅助文字） | `React.ReactNode` | - | - |
| children | 触发元素 | `React.ReactNode` | - | - |
| placement | 弹出位置 | `PopconfirmPlacement` | `'top'` | - |
| trigger | 触发方式 | `PopconfirmTrigger \| PopconfirmTrigger[]` | `'click'` | - |
| open | 是否可见（受控） | `boolean` | - | - |
| defaultOpen | 默认是否可见（非受控） | `boolean` | `false` | - |
| disabled | 是否禁用 | `boolean` | `false` | - |
| destroyOnHidden | 关闭后是否销毁 DOM | `boolean` | `true` | - |
| autoAdjustOverflow | 是否自动调整位置以防止溢出 | `boolean` | `true` | - |
| arrow | 是否显示箭头 | `boolean` | `true` | - |
| zIndex | z-index | `number` | `1030` | - |
| mouseEnterDelay | 鼠标移入延迟（秒） | `number` | `0.1` | - |
| mouseLeaveDelay | 鼠标移出延迟（秒） | `number` | `0.1` | - |
| icon | 自定义图标 | `React.ReactNode` | `<Icon name="Caution" />` | - |
| okText | 确认按钮文字 | `React.ReactNode` | `'确定'` | - |
| cancelText | 取消按钮文字 | `React.ReactNode` | `'取消'` | - |
| okType | 确认按钮类型 | `'primary' \| 'default' \| 'dashed' \| 'text'` | `'primary'` | - |
| okButtonProps | 确认按钮额外属性 | `ButtonProps` | - | - |
| cancelButtonProps | 取消按钮额外属性 | `ButtonProps` | - | - |
| showCancel | 是否显示取消按钮 | `boolean` | `true` | - |
| className | 触发器类名 | `string` | - | - |
| style | 触发器样式 | `React.CSSProperties` | - | - |
| overlayClassName | 浮层类名 | `string` | - | - |
| overlayStyle | 浮层样式 | `React.CSSProperties` | - | - |
| getPopupContainer | 浮层渲染父节点 | `(triggerNode: HTMLElement) => HTMLElement` | - | - |
| onConfirm | 点击确认的回调，支持返回 Promise | `() => void \| Promise<any>` | - | - |
| onCancel | 点击取消的回调 | `() => void` | - | - |
| onOpenChange | 显示变化回调 | `(open: boolean) => void` | - | - |

### PopconfirmPlacement

```typescript
type PopconfirmPlacement =
  | 'top' | 'topLeft' | 'topRight'
  | 'bottom' | 'bottomLeft' | 'bottomRight'
  | 'left' | 'leftTop' | 'leftBottom'
  | 'right' | 'rightTop' | 'rightBottom';
```

### PopconfirmTrigger

```typescript
type PopconfirmTrigger = 'hover' | 'click' | 'focus' | 'contextMenu';
```

## 主题定制

通过 `ConfigProvider` 的 `theme.components.Popconfirm` 配置自定义样式。

```tsx
<ConfigProvider
  theme={{
    components: {
      Popconfirm: {
        colorBg: '#ffffff',
        titleColor: '#000000d9',
        descriptionColor: '#00000073',
        fontSize: 14,
        borderRadius: 8,
        boxShadow: '0 6px 16px rgba(0, 0, 0, 0.08)',
        colorWarning: '#faad14',
        colorPrimary: '#1677ff',
      },
    },
  }}
>
  <App />
</ConfigProvider>
```

### 可用的主题变量

| 变量 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| colorBg | 背景颜色 | `string` | `'#ffffff'` |
| titleColor | 标题文字颜色 | `string` | `'#000000d9'` |
| descriptionColor | 描述文字颜色 | `string` | `'#00000073'` |
| fontSize | 字体大小 | `number` | `14` |
| borderRadius | 圆角 | `number` | `8` |
| boxShadow | 阴影 | `string` | - |
| colorWarning | 警告图标颜色 | `string` | `'#faad14'` |
| colorPrimary | 确认按钮主色 | `string` | - |

## 常见问题

### 与 Dialog.confirm 的区别

Popconfirm 更轻量，适合简单的二次确认；Dialog.confirm 适合需要展示更多信息或复杂交互的场景。

### 异步关闭时如何手动控制

通过 `open` 和 `onOpenChange` 受控模式配合 Promise，可以精确控制关闭时机。
