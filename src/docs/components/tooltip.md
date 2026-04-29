# Tooltip 文字提示

简单的文字提示气泡框。

## 何时使用

- 鼠标移入则显示提示，移出消失，延迟显示和隐藏
- 相较于 `Popover`，Tooltip 更轻量，仅用于展示简单的文字提示信息
- 需要为用户提供额外的说明或帮助信息时

## 代码演示

### 基础用法

最简单的用法，鼠标悬停时显示提示文字。

```tsx
import { Tooltip, Button } from '@soui/ui';

export default () => (
  <Tooltip title="这是提示文字">
    <Button type="primary">悬停显示提示</Button>
  </Tooltip>
);
```

### 不同位置

支持 12 个不同的弹出位置。

```tsx
import { Tooltip, Button, Space } from '@soui/ui';

export default () => {
  const placements = [
    'topLeft', 'top', 'topRight',
    'leftTop', 'left', 'leftBottom',
    'rightTop', 'right', 'rightBottom',
    'bottomLeft', 'bottom', 'bottomRight',
  ];

  return (
    <div style={{ padding: 50 }}>
      <Space direction="vertical" size="large">
        <Space>
          <span style={{ width: 80 }}></span>
          {['topLeft', 'top', 'topRight'].map(p => (
            <Tooltip key={p} title={p} placement={p as any}>
              <Button>{p}</Button>
            </Tooltip>
          ))}
          <span style={{ width: 80 }}></span>
        </Space>
        <Space>
          {['leftTop', 'left', 'leftBottom'].map(p => (
            <Tooltip key={p} title={p} placement={p as any}>
              <Button>{p}</Button>
            </Tooltip>
          ))}
          <span style={{ width: 120 }}></span>
          {['rightTop', 'right', 'rightBottom'].map(p => (
            <Tooltip key={p} title={p} placement={p as any}>
              <Button>{p}</Button>
            </Tooltip>
          ))}
        </Space>
        <Space>
          <span style={{ width: 80 }}></span>
          {['bottomLeft', 'bottom', 'bottomRight'].map(p => (
            <Tooltip key={p} title={p} placement={p as any}>
              <Button>{p}</Button>
            </Tooltip>
          ))}
          <span style={{ width: 80 }}></span>
        </Space>
      </Space>
    </div>
  );
};
```

### 不同触发方式

支持 hover、focus、click 和 contextMenu 四种触发方式。

```tsx
import { Tooltip, Button, Space } from '@soui/ui';

export default () => (
  <Space wrap>
    <Tooltip title="悬停触发" trigger="hover">
      <Button>Hover</Button>
    </Tooltip>
    <Tooltip title="聚焦触发" trigger="focus">
      <Button>Focus</Button>
    </Tooltip>
    <Tooltip title="点击触发" trigger="click">
      <Button>Click</Button>
    </Tooltip>
    <Tooltip title="右键触发" trigger="contextMenu">
      <Button>Context Menu</Button>
    </Tooltip>
  </Space>
);
```

### 延迟显示/隐藏

设置鼠标移入后延时显示和移出后延时隐藏的时间。

```tsx
import { Tooltip, Button } from '@soui/ui';

export default () => (
  <Tooltip
    title="延迟显示的提示"
    mouseEnterDelay={0.5}
    mouseLeaveDelay={0.3}
  >
    <Button type="primary">延迟显示/隐藏</Button>
  </Tooltip>
);
```

### 受控模式

通过 `visible` 属性控制提示框的显示和隐藏。

```tsx
import { useState } from 'react';
import { Tooltip, Button, Space } from '@soui/ui';

export default () => {
  const [visible, setVisible] = useState(false);

  return (
    <Space direction="vertical">
      <Tooltip
        title="受控模式的提示"
        visible={visible}
        onVisibleChange={setVisible}
      >
        <Button onClick={() => setVisible(!visible)}>
          {visible ? '隐藏' : '显示'}提示框
        </Button>
      </Tooltip>
    </Space>
  );
};
```

### 自定义样式

通过 `overlayClassName` 和 `overlayStyle` 自定义提示框样式。

```tsx
import { Tooltip, Button } from '@soui/ui';

export default () => (
  <Tooltip
    title="自定义样式的提示文字"
    overlayClassName="custom-tooltip"
    overlayStyle={{ backgroundColor: '#52c41a', color: '#fff' }}
  >
    <Button type="primary">自定义样式</Button>
  </Tooltip>
);
```

### 自定义颜色

通过 `color` 和 `bgColor` 属性自定义文字颜色和背景颜色。

```tsx
import { Tooltip, Button, Space } from '@soui/ui';

export default () => (
  <Space wrap>
    <Tooltip title="成功提示" color="#fff" bgColor="#52c41a">
      <Button type="primary">成功</Button>
    </Tooltip>
    <Tooltip title="警告提示" color="#fff" bgColor="#faad14">
      <Button type="primary">警告</Button>
    </Tooltip>
    <Tooltip title="错误提示" color="#fff" bgColor="#ff4d4f">
      <Button type="primary">错误</Button>
    </Tooltip>
  </Space>
);
```

### 多行文本

Tooltip 支持显示多行文本内容，会自动换行。

```tsx
import { Tooltip, Button } from '@soui/ui';

export default () => (
  <Tooltip title="这是第一行提示文字&#10;这是第二行提示文字&#10;这是第三行提示文字">
    <Button>多行文本</Button>
  </Tooltip>
);
```

### 富文本内容

`title` 属性支持 React 节点，可以包含 HTML 元素。

```tsx
import { Tooltip, Button } from '@soui/ui';

export default () => (
  <Tooltip
    title={
      <div>
        <div style={{ fontWeight: 'bold', marginBottom: 4 }}>提示标题</div>
        <div>这是详细的提示内容</div>
        <div style={{ fontSize: 12, color: '#999', marginTop: 4 }}>附加信息</div>
      </div>
    }
  >
    <Button type="primary">富文本内容</Button>
  </Tooltip>
);
```

### 禁用状态

当子元素处于禁用状态时，可以通过包裹一层元素来实现 Tooltip 显示。

```tsx
import { Tooltip, Button, Space } from '@soui/ui';

export default () => (
  <Space wrap>
    {/* 这种方式在按钮禁用时不会显示 Tooltip */}
    <Tooltip title="禁用的按钮">
      <Button disabled>禁用按钮</Button>
    </Tooltip>

    {/* 正确的方式：包裹一层 span */}
    <Tooltip title="禁用的按钮">
      <span>
        <Button disabled>禁用按钮（可显示提示）</Button>
      </span>
    </Tooltip>
  </Space>
);
```

### 组合触发方式

可以同时设置多种触发方式。

```tsx
import { Tooltip, Button } from '@soui/ui';

export default () => (
  <Tooltip title="悬停或聚焦都会显示" trigger={['hover', 'focus']}>
    <Button>Hover 或 Focus</Button>
  </Tooltip>
);
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| title | 提示文字 | `React.ReactNode` | - | - |
| placement | 弹出位置 | `'top' \| 'topLeft' \| 'topRight' \| 'bottom' \| 'bottomLeft' \| 'bottomRight' \| 'left' \| 'leftTop' \| 'leftBottom' \| 'right' \| 'rightTop' \| 'rightBottom'` | `'top'` | - |
| trigger | 触发方式 | `'hover' \| 'focus' \| 'click' \| 'contextMenu' \| Array<'hover' \| 'focus' \| 'click' \| 'contextMenu'>` | `'hover'` | - |
| visible | 是否显示（受控） | `boolean` | - | - |
| defaultVisible | 是否默认显示 | `boolean` | `false` | - |
| onVisibleChange | 显示/隐藏回调 | `(visible: boolean) => void` | - | - |
| mouseEnterDelay | 鼠标移入后延时多少才显示 Tooltip，单位：秒 | `number` | `0.1` | - |
| mouseLeaveDelay | 鼠标移出后延时多少才隐藏 Tooltip，单位：秒 | `number` | `0.1` | - |
| overlayClassName | 卡片类名 | `string` | - | - |
| overlayStyle | 卡片样式 | `React.CSSProperties` | - | - |
| color | 文字颜色 | `string` | - | - |
| bgColor | 背景颜色 | `string` | - | - |

## 设计原则

### ✅ 推荐用法

```tsx
// 简洁明了的提示文字
<Tooltip title="保存文件">
  <Button icon="Save" />
</Tooltip>

// 提供有用的补充信息
<Tooltip title="密码至少包含8个字符，包括字母和数字">
  <Input placeholder="请输入密码" />
</Tooltip>
```

### ❌ 避免使用

```tsx
// 不要放置过长的文字
<Tooltip title="这是一段非常长的提示文字，可能会让用户阅读困难...">
  <Button>按钮</Button>
</Tooltip>

// 不要嵌套 Tooltip
<Tooltip title="外层">
  <Tooltip title="内层">
    <Button>按钮</Button>
  </Tooltip>
</Tooltip>
```

## 无障碍访问

- Tooltip 遵循 WAI-ARIA 规范，使用 `role="tooltip"` 属性
- 支持键盘焦点触发（当 `trigger` 包含 `focus` 时）
- 提示内容对屏幕阅读器友好

## FAQ

### Tooltip 和 Popover 有什么区别？

Tooltip 更适合展示简单的文字提示，而 Popover 可以承载更复杂的内容（如表单、列表等）。如果提示内容较复杂或需要用户交互，建议使用 Popover。

### 如何自定义 Tooltip 的样式？

可以通过 `overlayClassName` 添加自定义类名，或通过 `overlayStyle` 直接设置样式：

```tsx
<Tooltip
  title="提示文字"
  overlayStyle={{ backgroundColor: '#52c41a' }}
>
  <Button>按钮</Button>
</Tooltip>
```

### 为什么 Tooltip 没有显示？

可能的原因：
1. `title` 为空或未设置
2. 触发方式与操作不匹配
3. 检查是否有 CSS 层级问题（z-index）

### 如何在移动端使用 Tooltip？

在移动端，建议将 `trigger` 设置为 `'click'`，因为移动设备没有 hover 状态：

```tsx
<Tooltip title="提示文字" trigger="click">
  <Button>点击显示</Button>
</Tooltip>
```

## 相关资源

- [Popover 气泡卡片](/components/popover)
- [Button 按钮](/components/button)
- [Typography 排版](/components/typography)
