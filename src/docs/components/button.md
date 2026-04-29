# Button 按钮

按钮用于触发即时操作或标记一组操作命令。

## 何时使用

- 触发一个即时操作，如提交、保存、删除等
- 标记一组操作命令，提供明确的行动点
- 在表单中作为提交或重置控件

## 代码演示

### 基础用法

默认的按钮样式，适用于大多数场景。

```tsx
import { Button } from '@soui/ui';

export default () => (
  <>
    <Button>默认按钮</Button>
    <Button type="primary">主要按钮</Button>
    <Button type="dashed">虚线按钮</Button>
    <Button type="text">文本按钮</Button>
    <Button type="link">链接按钮</Button>
  </>
);
```

### 不同尺寸

按钮有大、中、小三种尺寸，适配不同的使用场景。

```tsx
import { Button } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <div>
      <Button size="large">大按钮</Button>
      <Button size="middle">中按钮</Button>
      <Button size="small">小按钮</Button>
    </div>
    <div>
      <Button size="large" type="primary">大按钮</Button>
      <Button size="middle" type="primary">中按钮</Button>
      <Button size="small" type="primary">小按钮</Button>
    </div>
  </div>
);
```

### 禁用状态

禁用状态的按钮，表示当前不可用。

```tsx
import { Button } from '@soui/ui';

export default () => (
  <>
    <Button disabled>默认按钮</Button>
    <Button type="primary" disabled>主要按钮</Button>
    <Button type="dashed" disabled>虚线按钮</Button>
    <Button type="text" disabled>文本按钮</Button>
    <Button type="link" disabled>链接按钮</Button>
  </>
);
```

### 加载状态

显示加载状态，表示操作正在进行中。

```tsx
import { useState } from 'react';
import { Button } from '@soui/ui';

export default () => {
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 3000);
  };

  return (
    <>
      <Button loading>加载中</Button>
      <Button loading type="primary">主要按钮</Button>
      <Button 
        loading={loading} 
        type="primary" 
        onClick={handleClick}
      >
        点击加载
      </Button>
    </>
  );
};
```

### 危险按钮

用于删除、销毁等危险操作。

```tsx
import { Button } from '@soui/ui';

export default () => (
  <>
    <Button danger>危险按钮</Button>
    <Button type="primary" danger>危险主要按钮</Button>
    <Button danger disabled>危险禁用</Button>
  </>
);
```

### 图标按钮

带图标的按钮，增强视觉识别。

```tsx
import { Button } from '@soui/ui';
import { SearchOutlined, DownloadOutlined } from '@icon-park/react';

export default () => (
  <>
    <Button icon={<SearchOutlined />}>搜索</Button>
    <Button type="primary" icon={<DownloadOutlined />}>
      下载
    </Button>
    <Button type="primary" shape="circle" icon={<SearchOutlined />} />
    <Button type="primary" shape="round" icon={<DownloadOutlined />}>
      圆形按钮
    </Button>
  </>
);
```

### 按钮组

将多个按钮组合在一起。

```tsx
import { Button } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', gap: '8px' }}>
    <Button>取消</Button>
    <Button type="primary">确定</Button>
  </div>
);
```

## API

### 通用属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| type | 按钮类型 | `'default' \| 'primary' \| 'dashed' \| 'text' \| 'link'` | `default` | - |
| size | 按钮尺寸 | `'large' \| 'middle' \| 'small'` | `middle` | - |
| disabled | 是否禁用 | `boolean` | `false` | - |
| loading | 是否加载中 | `boolean \| { delay?: number }` | `false` | - |
| danger | 是否危险按钮 | `boolean` | `false` | - |
| icon | 按钮图标 | `ReactNode` | - | - |
| shape | 按钮形状 | `'default' \| 'circle' \| 'round'` | `default` | - |
| block | 是否为块级按钮 | `boolean` | `false` | - |
| ghost | 是否为幽灵按钮 | `boolean` | `false` | - |
| href | 链接地址（type="link" 时） | `string` | - | - |
| target | 链接目标（type="link" 时） | `string` | - | - |
| htmlType | 原生 button 的 type 属性 | `'button' \| 'submit' \| 'reset'` | `button` | - |
| className | 自定义类名 | `string` | - | - |
| style | 自定义内联样式 | `CSSProperties` | - | - |

### 事件

| 事件名 | 说明 | 类型 |
|--------|------|------|
| onClick | 点击事件 | `(event: MouseEvent) => void` |
| onMouseEnter | 鼠标移入 | `(event: MouseEvent) => void` |
| onMouseLeave | 鼠标移出 | `(event: MouseEvent) => void` |

## 设计原则

### ✅ 推荐用法

```tsx
// 1. 使用语义化的类型
<Button type="primary">提交</Button>
<Button type="default">取消</Button>
<Button danger>删除</Button>

// 2. 合适的尺寸
<Button size="large">重要操作</Button>
<Button size="small">次要操作</Button>

// 3. 清晰的反馈
<Button loading>处理中...</Button>
<Button disabled title="权限不足">删除</Button>
```

### ❌ 避免使用

```tsx
// 1. 避免过多主要按钮
<>
  <Button type="primary">提交</Button>
  <Button type="primary">取消</Button> {/* 不推荐 */}
  <Button type="primary">帮助</Button> {/* 不推荐 */}
</>

// 2. 避免混用多种类型
<>
  <Button type="primary">提交</Button>
  <Button type="danger">取消</Button> {/* 不推荐 */}
</>

// 3. 避免过度使用图标
<Button icon={<Icon1 />}><Icon2 />按钮</Button> {/* 不推荐 */}
```

## 主题定制

通过 ConfigProvider 自定义按钮样式：

```tsx
import { ConfigProvider, Button } from '@soui/ui';

function App() {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: '#your-color',
            borderRadius: 8,
            controlHeight: 40,
          },
        },
      }}
    >
      <Button type="primary">自定义按钮</Button>
    </ConfigProvider>
  );
}
```

## 无障碍访问

Button 组件遵循 WAI-ARIA 规范：

- 支持键盘操作（Enter 和 Space 触发点击）
- 禁用状态自动添加 `aria-disabled`
- 加载状态自动添加 `aria-busy`
- 支持自定义 `aria-label` 和 `aria-labelledby`

```tsx
<Button aria-label="提交表单" type="primary">
  提交
</Button>

<Button 
  aria-describedby="button-help-text"
  type="primary"
>
  了解更多
</Button>
<span id="button-help-text">点击查看更多信息</span>
```

## FAQ

### 如何在表单中使用？

```tsx
<Form onFinish={handleSubmit}>
  <Form.Item>
    <Button htmlType="submit" type="primary">
      提交
    </Button>
    <Button htmlType="reset">
      重置
    </Button>
  </Form.Item>
</Form>
```

### 如何控制加载延迟？

```tsx
<Button loading={{ delay: 300 }}>
  延迟显示加载状态
</Button>
```

### 如何实现整行按钮？

```tsx
<Button block type="primary">
  块级按钮（占满整行）
</Button>
```

## 相关资源

- [Space 间距](/components/space) - 按钮之间的间距控制
- [Modal 对话框](/components/modal) - 配合按钮使用
- [Form 表单](/components/form) - 表单中的按钮使用
