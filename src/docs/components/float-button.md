# FloatButton 悬浮按钮

悬浮按钮组件，用于在页面中提供快速操作入口。

## 何时使用

- 需要在页面右下角提供快捷操作时
- 需要突出显示主要操作按钮时
- 需要提供一组相关的快捷功能时

## 代码演示

### 基础用法

最基础的悬浮按钮，默认圆形样式。

```tsx
import { FloatButton } from '@soui/ui';

export default () => (
  <FloatButton icon="Plus" />
);
```

### 形状

支持圆形和方形两种形状。

```tsx
import { FloatButton } from '@soui/ui';

export default () => (
  <div style={{ display: 'flex', gap: '16px' }}>
    <FloatButton icon="Plus" shape="circle" />
    <FloatButton icon="Plus" shape="square" />
  </div>
);
```

### 类型

支持默认和主色两种类型，以及危险状态。

```tsx
import { FloatButton, Space } from '@soui/ui';

export default () => (
  <Space size="large">
    <FloatButton icon="Plus" type="default" />
    <FloatButton icon="Plus" type="primary" />
    <FloatButton icon="Delete" type="primary" danger />
  </Space>
);
```

### 按钮组

可以将多个悬浮按钮组合在一起使用。

```tsx
import { FloatButton } from '@soui/ui';

export default () => (
  <FloatButton.Group vertical>
    <FloatButton icon="Edit" tooltip="编辑" />
    <FloatButton icon="Copy" tooltip="复制" />
    <FloatButton icon="Share" tooltip="分享" />
  </FloatButton.Group>
);
```

### 带触发器的按钮组

支持点击或悬停触发展开/收起。

```tsx
import { FloatButton } from '@soui/ui';

export default () => (
  <FloatButton.Group
    icon="Plus"
    tooltip="快捷操作"
  >
    <FloatButton icon="Edit" tooltip="编辑" />
    <FloatButton icon="Copy" tooltip="复制" />
    <FloatButton icon="Share" tooltip="分享" />
  </FloatButton.Group>
);
```

### 受控模式

通过 `open` 和 `onOpenChange` 控制展开状态。

```tsx
import { useState } from 'react';
import { FloatButton } from '@soui/ui';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <p>当前状态: {open ? '展开' : '收起'}</p>
      <FloatButton.Group
        open={open}
        onOpenChange={setOpen}
        icon="Menu"
        tooltip="菜单"
      >
        <FloatButton icon="Edit" tooltip="编辑" />
        <FloatButton icon="Delete" tooltip="删除" danger />
        <FloatButton icon="Download" tooltip="下载" />
      </FloatButton.Group>
    </div>
  );
};
```

### 悬停触发

设置 `trigger="hover"` 实现鼠标悬停展开。

```tsx
import { FloatButton } from '@soui/ui';

export default () => (
  <FloatButton.Group
    trigger="hover"
    icon="More"
    tooltip="更多操作（悬停展开）"
  >
    <FloatButton icon="Edit" tooltip="编辑" />
    <FloatButton icon="Copy" tooltip="复制" />
    <FloatButton icon="Share" tooltip="分享" />
    <FloatButton icon="Download" tooltip="下载" />
  </FloatButton.Group>
);
```

### 自定义位置

通过 `position` 属性可以自定义悬浮按钮的位置（只支持 bottom 和 right）。

```tsx
import { FloatButton } from '@soui/ui';

export default () => (
  <div>
    {/* 右上角 */}
    <FloatButton 
      icon="Plus" 
      position={{ bottom: 200, right: 24 }}
      tooltip="右上角"
    />
    
    {/* 右下角（默认） */}
    <FloatButton 
      icon="Plus" 
      tooltip="右下角"
    />
    
    {/* 自定义 bottom */}
    <FloatButton 
      icon="Plus" 
      position={{ bottom: 100 }}
      tooltip="bottom: 100px"
    />
    
    {/* 自定义 right */}
    <FloatButton 
      icon="Plus" 
      position={{ right: 100 }}
      tooltip="right: 100px"
    />
  </div>
);
```

### 按钮组位置

按钮组也支持自定义位置。

```tsx
import { FloatButton } from '@soui/ui';

export default () => (
  <FloatButton.Group
    position={{ bottom: 100, right: 24 }}
    icon="Menu"
    tooltip="菜单"
  >
    <FloatButton icon="Edit" tooltip="编辑" />
    <FloatButton icon="Copy" tooltip="复制" />
    <FloatButton icon="Share" tooltip="分享" />
  </FloatButton.Group>
);
```

### z-index 层级

通过 `zIndex` 属性可以控制悬浮按钮的层叠顺序。

```tsx
import { FloatButton } from '@soui/ui';

export default () => (
  <div>
    {/* 默认层级（999） */}
    <FloatButton 
      icon="Plus" 
      position={{ bottom: 200, right: 24 }}
      tooltip="默认层级"
    />
    
    {/* 高层级 */}
    <FloatButton 
      icon="Star" 
      type="primary"
      position={{ bottom: 100, right: 24 }}
      zIndex={9999}
      tooltip="高层级"
    />
    
    {/* 低层级 */}
    <FloatButton 
      icon="Setting" 
      position={{ bottom: 24, right: 24 }}
      zIndex={100}
      tooltip="低层级"
    />
  </div>
);
```

## API

### FloatButton

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| type | 按钮类型 | `default` \| `primary` | `default` | - |
| shape | 按钮形状 | `circle` \| `square` | `circle` | - |
| size | 按钮尺寸 | `large` \| `middle` \| `small` | `middle` | - |
| disabled | 是否禁用 | `boolean` | `false` | - |
| icon | 图标 | `string` \| `ReactNode` | - | - |
| danger | 危险按钮 | `boolean` | `false` | - |
| tooltip | Tooltip 文本 | `string` | - | - |
| position | 自定义位置 | `{ bottom?: number \| string; right?: number \| string }` | - | - |
| zIndex | z-index 层级 | `number` | `999` | - |

### FloatButton.Group

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| vertical | 垂直排列 | `boolean` | `false` | - |
| defaultOpen | 是否默认展开 | `boolean` | `false` | - |
| open | 受控展开状态 | `boolean` | - | - |
| onOpenChange | 展开/收起变化回调 | `(open: boolean) => void` | - | - |
| trigger | 触发方式 | `click` \| `hover` | `click` | - |
| icon | 主按钮图标 | `string` \| `ReactNode` | `Plus` | - |
| tooltip | 主按钮 Tooltip | `string` | - | - |
| position | 自定义位置 | `{ bottom?: number \| string; right?: number \| string }` | - | - |
| zIndex | z-index 层级 | `number` | `999` | - |

## 设计原则

### ✅ 推荐用法

```tsx
// 单个悬浮按钮
<FloatButton icon="Plus" type="primary" />

// 按钮组
<FloatButton.Group vertical>
  <FloatButton icon="Edit" />
  <FloatButton icon="Delete" danger />
</FloatButton.Group>
```

### ❌ 避免使用

```tsx
// 不要在同一个位置放置过多按钮
<FloatButton.Group>
  <FloatButton icon="Icon1" />
  <FloatButton icon="Icon2" />
  <FloatButton icon="Icon3" />
  <FloatButton icon="Icon4" />
  <FloatButton icon="Icon5" />
</FloatButton.Group>
```

## 无障碍访问

- 按钮具有合适的 `role="button"` 属性
- 禁用状态设置 `aria-disabled`
- 支持键盘 Tab 键聚焦和操作
- 提供 `tooltip` 属性为按钮添加说明文本

## FAQ

### 如何自定义按钮位置？

可以通过 `position` 属性自定义位置：

```tsx
<FloatButton 
  icon="Plus" 
  position={{ bottom: 40, right: 40 }}
/>
```

### 按钮组和单个按钮有什么区别？

按钮组会将多个按钮组织在一起，并自动处理间距和布局。单个按钮则独立定位。

**定位行为差异：**
- **单个按钮**：使用 `position: fixed` 固定定位，独立于文档流
- **按钮组中的子按钮**：使用 `position: static` 正常排列，跟随 Group 容器定位

### 如何添加点击事件？

```tsx
<FloatButton 
  icon="Plus" 
  onClick={() => console.log('clicked')}
/>
```

## 相关资源

- [Button 按钮](/components/button)
- [Icon 图标](/components/icon)
- [Space 间距](/components/space)
