---
title: Tour 漫游式引导
---

# Tour 漫游式引导

分段引导用户了解页面功能的浮层组件，常用于新功能介绍和操作指引。

## 何时使用

- 新功能上线后，引导用户了解功能位置和使用方式
- 操作指引，帮助用户完成复杂操作流程
- 首次访问引导，降低用户学习成本

## 代码示例

### 基础用法

```tsx
import { Tour, Button, useState, useRef } from '@soui/ui';

export default () => {
  const [open, setOpen] = useState(false);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const steps = [
    {
      target: () => ref1.current,
      title: '上传文件',
      description: '点击这里可以上传文件到服务器。',
    },
    {
      target: () => ref2.current,
      title: '保存草稿',
      description: '未完成的工作可以先保存为草稿。',
    },
    {
      target: () => ref3.current,
      title: '发布',
      description: '确认无误后点击发布。',
    },
  ];

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <span ref={ref1}><Button>上传文件</Button></span>
      <span ref={ref2}><Button>保存草稿</Button></span>
      <span ref={ref3}><Button type="primary">发布</Button></span>
      <Button type="link" onClick={() => setOpen(true)}>开始引导</Button>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </div>
  );
};
```

### Primary 类型

```tsx
import { Tour, Button, useState, useRef } from '@soui/ui';

export default () => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);

  const steps = [
    {
      target: () => btnRef.current,
      title: '功能介绍',
      description: '这是 Primary 类型的漫游引导，使用主题色背景。',
      type: 'primary',
    },
    {
      target: () => btnRef.current,
      title: '操作步骤',
      description: '可以通过上一步/下一步按钮进行步骤导航。',
      type: 'primary',
    },
  ];

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <span ref={btnRef}><Button type="primary">目标按钮</Button></span>
      <Button type="link" onClick={() => setOpen(true)}>开始引导</Button>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </div>
  );
};
```

### 无遮罩

```tsx
import { Tour, Button, useState, useRef } from '@soui/ui';

export default () => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);

  const steps = [
    {
      target: () => btnRef.current,
      title: '无遮罩引导',
      description: '这个步骤没有遮罩，不会遮挡页面内容。',
      mask: false,
    },
  ];

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <span ref={btnRef}><Button>目标按钮</Button></span>
      <Button type="link" onClick={() => setOpen(true)}>开始引导</Button>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </div>
  );
};
```

### 自定义指示器

```tsx
import { Tour, Button, useState, useRef } from '@soui/ui';

export default () => {
  const [open, setOpen] = useState(false);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);

  const steps = [
    {
      target: () => ref1.current,
      title: '步骤一',
      description: '这是第一个步骤的说明。',
    },
    {
      target: () => ref2.current,
      title: '步骤二',
      description: '这是第二个步骤的说明。',
    },
    {
      target: () => ref3.current,
      title: '步骤三',
      description: '这是第三个步骤的说明。',
    },
  ];

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <span ref={ref1}><Button>按钮一</Button></span>
      <span ref={ref2}><Button>按钮二</Button></span>
      <span ref={ref3}><Button>按钮三</Button></span>
      <Button type="link" onClick={() => setOpen(true)}>开始引导</Button>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={steps}
        indicatorsRender={(current, total) => (
          <span>{current + 1} / {total}</span>
        )}
      />
    </div>
  );
};
```

## API

### Tour

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| open | 是否显示引导 | `boolean` | - |
| onClose | 关闭引导回调 | `() => void` | - |
| steps | 步骤数据 | `TourStep[]` | - |
| current | 当前步骤（受控） | `number` | - |
| onChange | 步骤变化回调 | `(current: number) => void` | - |
| placement | 默认浮层位置 | `TourPlacement` | `'bottom'` |
| type | 默认类型 | `'default' \| 'primary'` | `'default'` |
| mask | 是否显示遮罩 | `boolean \| CSSProperties` | `true` |
| arrow | 是否显示箭头 | `boolean \| { pointAtCenter: boolean }` | `true` |
| destroyOnClose | 关闭时是否销毁 | `boolean` | `true` |
| indicatorsRender | 自定义指示器 | `(current: number, total: number) => ReactNode` | - |
| zIndex | 层级 | `number` | `1100` |
| className | 自定义类名 | `string` | - |
| style | 自定义样式 | `CSSProperties` | - |

### TourStep

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| target | 目标元素 | `HTMLElement \| (() => HTMLElement)` | - |
| title | 标题 | `ReactNode` | - |
| description | 描述 | `ReactNode` | - |
| cover | 引导图 | `ReactNode` | - |
| placement | 浮层位置 | `TourPlacement` | - |
| mask | 是否显示遮罩 | `boolean \| CSSProperties` | - |
| arrow | 是否显示箭头 | `boolean \| { pointAtCenter: boolean }` | - |
| type | 类型 | `'default' \| 'primary'` | - |
| prevButtonProps | 上一步按钮属性 | `{ children?: ReactNode; onClick?: (e) => void }` | - |
| nextButtonProps | 下一步按钮属性 | `{ children?: ReactNode; onClick?: (e) => void }` | - |

## 主题定制

Tour 作为 Portal 组件渲染在 ConfigProvider 的 DOM 树之外，通过 DOM 桥接机制（`getComputedStyle` 读取 `.soui-config-provider` 上的 CSS 变量并复制到容器）来实现主题同步。

### 组件级配置

通过 `theme.components.Tour` 针对组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Tour: {
        colorBg: '#fff',
        borderRadius: 8,
        colorPrimary: '#1677ff',
        maskColor: 'rgba(0, 0, 0, 0.45)',
      },
    },
  }}
>
  <YourApp />
</ConfigProvider>
```

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorBg | 背景色 | `string` | `'#fff'` |
| colorText | 文本颜色 | `string` | `'rgba(0, 0, 0, 0.88)'` |
| colorTextSecondary | 次要文本颜色 | `string` | `'rgba(0, 0, 0, 0.65)'` |
| fontSize | 字体大小（像素） | `number` | `14` |
| borderRadius | 圆角（像素） | `number` | `8` |
| colorPrimary | 主色 | `string` | `'#1677ff'` |
| colorPrimaryText | primary 类型文本颜色 | `string` | `'#fff'` |
| boxShadow | 阴影 | `string` | - |
| maskColor | 遮罩颜色 | `string` | `'rgba(0, 0, 0, 0.45)'` |
