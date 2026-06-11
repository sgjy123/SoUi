# Anchor 锚点

用于跳转到页面指定位置，需要展现当前页面上可供跳转的锚点链接，以及快速在锚点之间跳转。

## 何时使用

- 当页面内容较长，需要快速定位到不同区域
- 展示文档目录结构，帮助用户了解页面内容
- 构建帮助文档或知识库的侧边导航
- 需要展示当前阅读位置的章节导航

## 代码演示

### 基础用法

最简单的用法，展示垂直锚点导航，支持滚动监听自动高亮和点击跳转。

```tsx
import { Anchor } from '@soui/ui';

const items = [
  { key: '1', href: '#section-1', title: '第一部分' },
  { key: '2', href: '#section-2', title: '第二部分' },
  { key: '3', href: '#section-3', title: '第三部分' },
  { key: '4', href: '#section-4', title: '第四部分' },
];

export default () => (
  <div style={{ display: 'flex' }}>
    <div style={{ flex: 1 }}>
      <div id="section-1" style={{ height: '200px', background: '#f0f5ff', marginBottom: '16px', padding: '24px', borderRadius: '8px' }}>
        <h3>第一部分</h3>
        <p>内容区域</p>
      </div>
      <div id="section-2" style={{ height: '200px', background: '#f6ffed', marginBottom: '16px', padding: '24px', borderRadius: '8px' }}>
        <h3>第二部分</h3>
        <p>内容区域</p>
      </div>
    </div>
    <div style={{ width: '160px', marginLeft: '24px' }}>
      <Anchor items={items} />
    </div>
  </div>
);
```

### 水平方向

设置 `direction="horizontal"` 可以让锚点水平排列，适合顶部导航栏使用。

```tsx
import { Anchor } from '@soui/ui';

export default () => (
  <Anchor
    direction="horizontal"
    items={[
      { key: '1', href: '#section-1', title: '功能特性' },
      { key: '2', href: '#section-2', title: '技术架构' },
      { key: '3', href: '#section-3', title: '使用指南' },
    ]}
  />
);
```

### 静态模式

设置 `affix={false}` 可以让锚点不浮动，状态不随页面滚动变化。

```tsx
import { Anchor } from '@soui/ui';

export default () => (
  <Anchor
    affix={false}
    showInkInFixed
    items={[
      { key: '1', href: '#section-1', title: '设计原则' },
      { key: '2', href: '#section-2', title: '组件规范' },
      { key: '3', href: '#section-3', title: '主题定制' },
    ]}
  />
);
```

### 嵌套锚点（items 数据化）

使用 `items` 中的 `children` 属性可以配置嵌套的锚点，适合文档目录等多层级场景。

```tsx
import { Anchor } from '@soui/ui';

export default () => (
  <Anchor
    items={[
      {
        key: 'guide',
        href: '#guide',
        title: '开发指南',
        children: [
          { key: 'quick', href: '#quick', title: '快速上手' },
          { key: 'install', href: '#install', title: '安装部署' },
        ],
      },
      {
        key: 'components',
        href: '#components',
        title: '组件文档',
        children: [
          { key: 'button', href: '#button', title: '按钮 Button' },
          { key: 'input', href: '#input', title: '输入框 Input' },
        ],
      },
    ]}
  />
);
```

### 使用 Anchor.Link 子组件方式

除了 `items` 数据化配置，也可以使用 `Anchor.Link` 子组件方式。

```tsx
import { Anchor } from '@soui/ui';

export default () => (
  <Anchor>
    <Anchor.Link href="#section-1" title="基础用法" />
    <Anchor.Link href="#section-2" title="动态渲染" />
    <Anchor.Link href="#section-3" title="子锚点">
      <Anchor.Link href="#sub-1" title="子锚点 1" />
      <Anchor.Link href="#sub-2" title="子锚点 2" />
    </Anchor.Link>
  </Anchor>
);
```

### 偏移量控制

通过 `offsetTop` 和 `targetOffset` 控制锚点的固定触发位置和跳转偏移量，适用于有固定顶栏的页面。

```tsx
import { Anchor } from '@soui/ui';

export default () => (
  <Anchor
    offsetTop={80}
    targetOffset={60}
    items={[
      { key: '1', href: '#section-1', title: '概览' },
      { key: '2', href: '#section-2', title: 'API 设计' },
      { key: '3', href: '#section-3', title: '注意事项' },
    ]}
  />
);
```

### 自定义滚动容器

使用 `getContainer` 指定非 window 的滚动容器，适合侧边栏、抽屉等场景。

```tsx
import { Anchor, useRef } from '@soui/ui';

export default () => {
  const containerRef = useRef(null);
  return (
    <>
      <div ref={containerRef} style={{ maxHeight: 480, overflow: 'auto' }}>
        <div id="section-1">内容 1</div>
        <div id="section-2">内容 2</div>
      </div>
      <Anchor
        getContainer={() => containerRef.current}
        items={[
          { key: '1', href: '#section-1', title: '快速开始' },
          { key: '2', href: '#section-2', title: '安装配置' },
        ]}
      />
    </>
  );
};
```

### 监听激活状态变化

通过 `onChange` 回调获取当前激活的锚点链接，可用于面包屑联动、状态同步等。

```tsx
import { Anchor, useState } from '@soui/ui';

export default () => {
  const [active, setActive] = useState('#section-1');
  return (
    <>
      <div>当前高亮：{active}</div>
      <Anchor
        onChange={(link) => setActive(link)}
        items={[
          { key: '1', href: '#section-1', title: '第一节' },
          { key: '2', href: '#section-2', title: '第二节' },
        ]}
      />
    </>
  );
};
```

### 边界范围与历史记录控制

`bounds` 限制锚点监听范围，超出边界时取消高亮。`replace` 控制是否在浏览器历史中产生记录。

```tsx
import { Anchor } from '@soui/ui';

// bounds 示例：容器超出 300px 边界后高亮失效
<Anchor bounds={300} items={items} />

// replace 示例：点击锚点不产生浏览器历史记录
<Anchor replace items={items} />
```

## API

### Anchor 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| affix | 固定模式，当该值为 true 时，Anchor 将固定在页面上 | `boolean` | `true` | - |
| bounds | 锚点区域边界，单位 px（滚动到边界外不再更新高亮） | `number` | - | - |
| className | 自定义类名 | `string` | - | - |
| direction | 设置导航方向 | `'vertical' \| 'horizontal'` | `'vertical'` | - |
| getContainer | 指定滚动的容器 | `() => HTMLElement \| Window` | `() => window` | - |
| getCurrentAnchor | 自定义高亮的锚点 | `(activeLink: string) => string` | - | - |
| items | 数据化配置选项内容，支持嵌套子锚点 | `AnchorItem[]` | - | - |
| offsetTop | 距离窗口顶部达到指定偏移量后触发固定模式 | `number` | `0` | - |
| onChange | 监听锚点链接改变的回调 | `(currentActiveLink: string) => void` | - | - |
| onClick | 点击事件的 handler | `(e, link: { title, href }) => void` | - | - |
| replace | 替换浏览器历史记录中项目的 href 而不是推送它 | `boolean` | `false` | - |
| showInkInFixed | `affix={false}` 时是否显示指示器 | `boolean` | `false` | - |
| style | 自定义行内样式 | `CSSProperties` | - | - |
| targetOffset | 锚点滚动偏移量，默认与 offsetTop 相同 | `number` | - | - |

### AnchorItem（数据化配置项）

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| key | 唯一标志 | `string \| number` | - |
| href | 锚点链接 | `string` | - |
| title | 文字内容 | `ReactNode` | - |
| target | 该属性指定在何处显示链接的资源 | `string` | - |
| children | 嵌套的子锚点（水平方向不支持） | `AnchorItem[]` | - |
| replace | 替换浏览器历史记录中的项目 href 而不是推送它 | `boolean` | `false` |

### Anchor.Link 属性

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| href | 锚点链接 | `string` | - |
| title | 文字内容 | `ReactNode` | - |
| target | 该属性指定在何处显示链接的资源 | `string` | - |
| replace | 替换浏览器历史记录中的项目 href 而不是推送它 | `boolean` | `false` |

## 主题定制

Anchor 组件支持通过 ConfigProvider 进行主题定制，遵循 SoUi 三层设计令牌系统。

### 全局配置

通过 `theme` 属性配置全局样式：

```tsx
import { ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      primaryColor: '#1677ff',
      fontSize: 14,
    }}
  >
    <Anchor items={items} />
  </ConfigProvider>
);
```

### 组件级配置

通过 `theme.components.Anchor` 针对锚点组件进行精细化配置：

```tsx
import { ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Anchor: {
          colorPrimary: '#1890ff',
          fontSize: 16,
          linkPadding: 8,
          inkWidth: 3,
        },
      },
    }}
  >
    <Anchor items={items} />
  </ConfigProvider>
);
```

### 配置优先级

SoUi 采用以下优先级规则（从高到低）：

```
Props 属性 > 组件级配置 > 全局配置 > CSS 变量 > Less 变量
```

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorPrimary | 主色（激活态、指示器颜色） | `string` | `#1677ff` |
| colorText | 文本颜色 | `string` | `rgba(0,0,0,0.88)` |
| fontSize | 字体大小（像素） | `number` | `14` |
| linkPadding | 链接内边距（像素） | `number` | `4` |
| inkWidth | 指示器宽度（像素） | `number` | `2` |

### 自定义 CSS 变量

```tsx
<Anchor
  style={{
    '--soui-anchor-color-primary': '#ff0000',
    '--soui-anchor-font-size': '16px',
  }}
  items={items}
/>
```

## 设计原则

### ✅ 推荐用法

```tsx
// 使用 items 数据化配置（推荐）
<Anchor
  items={[
    { key: '1', href: '#section-1', title: '第一部分' },
    { key: '2', href: '#section-2', title: '第二部分' },
  ]}
/>

// 嵌套锚点展示文档目录结构
<Anchor
  items={[
    {
      key: 'guide',
      href: '#guide',
      title: '开发指南',
      children: [
        { key: 'quick', href: '#quick', title: '快速上手' },
      ],
    },
  ]}
/>
```

### ❌ 避免使用

```tsx
// 不要使用不存在的 href
<Anchor items={[{ key: '1', href: '#non-existent', title: '不存在' }]} />

// 水平方向不要使用嵌套子锚点（不支持）
<Anchor direction="horizontal" items={[{ key: '1', href: '#a', title: 'A', children: [...] }]} />
```

## 无障碍访问

- 锚点链接使用 `<a>` 标签，确保键盘可访问
- 支持 `href` 属性提供语义化的链接目标
- 激活状态通过颜色和字重区分，不依赖单一视觉提示
- 支持键盘 `Tab` 键导航和 `Enter` 键激活

## FAQ

### 如何让锚点滚动到目标位置而不是页面顶部？

通过 `targetOffset` 属性设置滚动偏移量，例如固定顶部导航栏高度：

```tsx
<Anchor targetOffset={64} items={items} />
```

### 如何在非 window 容器中监听滚动？

使用 `getContainer` 属性指定滚动容器：

```tsx
<Anchor getContainer={() => document.getElementById('scroll-container')} items={items} />
```

### 锚点跳转后在浏览器历史中是否可以回退？

默认使用 `pushState` 记录历史。使用 `replace` 属性可以替换历史记录：

```tsx
<Anchor replace items={items} />
```

## 相关资源

- [Steps 步骤条](/components/steps) - 用于步骤流程引导
- [Menu 菜单](/components/menu) - 用于页面导航
- [Breadcrumb 面包屑](/components/breadcrumb) - 用于路径导航
