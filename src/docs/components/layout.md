# Layout 布局

协助进行页面级整体布局。

## 参考来源

本组件参考了 [Ant Design](https://ant.design/components/layout/) 的 Layout 组件设计，在保持 SoUi 设计风格的前提下，借鉴了其 API 设计思路。

## 何时使用

- 需要进行页面整体布局规划时
- 需要顶部导航、侧边栏、内容区、底部等经典布局结构时
- 需要响应式布局适配不同屏幕尺寸时

## 代码演示

### 基础布局

最基本的『上-中-下』布局。

```tsx
import { Layout } from '@soui/ui';

const { Header, Content, Footer } = Layout;

export default () => (
  <Layout style={{ minHeight: '100vh' }}>
    <Header>Header</Header>
    <Content>Content</Content>
    <Footer>Footer</Footer>
  </Layout>
);
```

### 带侧边栏的布局

带有侧边栏的布局，适合后台管理系统。

```tsx
import { Layout } from '@soui/ui';

const { Header, Sider, Content } = Layout;

export default () => (
  <Layout hasSider style={{ minHeight: '100vh' }}>
    <Sider>Sider</Sider>
    <Layout>
      <Header>Header</Header>
      <Content>Content</Content>
    </Layout>
  </Layout>
);
```

### 顶部-侧边布局

顶部导航加侧边栏的经典布局。

```tsx
import { Layout } from '@soui/ui';

const { Header, Sider, Content, Footer } = Layout;

export default () => (
  <Layout hasSider style={{ minHeight: '100vh' }}>
    <Sider>Sider</Sider>
    <Layout>
      <Header>Header</Header>
      <Content>Content</Content>
      <Footer>Footer</Footer>
    </Layout>
  </Layout>
);
```

### 可收起侧边栏

侧边栏可以收起和展开。

```tsx
import { useState } from 'react';
import { Layout } from '@soui/ui';

const { Header, Sider, Content } = Layout;

export default () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider style={{ minHeight: '100vh' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        {collapsed ? 'Collapsed' : 'Sider'}
      </Sider>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
      </Layout>
    </Layout>
  );
};
```

### 自定义宽度

自定义侧边栏宽度。

```tsx
import { Layout } from '@soui/ui';

const { Sider, Content } = Layout;

export default () => (
  <Layout hasSider style={{ minHeight: '400px' }}>
    <Sider width={300}>Width 300px</Sider>
    <Content>Content</Content>
  </Layout>
);
```

## API

### Layout

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| hasSider | 表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动 | `boolean` | `false` | - |
| className | 容器类名 | `string` | - | - |
| style | 样式对象 | `CSSProperties` | - | - |

### Layout.Header

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| className | 容器类名 | `string` | - | - |
| style | 样式对象 | `CSSProperties` | - | - |

### Layout.Sider

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| width | 宽度 | `number \| string` | `200` | - |
| collapsible | 是否可收起 | `boolean` | `false` | - |
| collapsed | 当前收起状态 | `boolean` | `false` | - |
| onCollapse | 展开-收起时的回调函数 | `(collapsed: boolean) => void` | - | - |
| trigger | 自定义触发器 | `ReactNode` | - | - |
| className | 容器类名 | `string` | - | - |
| style | 样式对象 | `CSSProperties` | - | - |

### Layout.Content

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| className | 容器类名 | `string` | - | - |
| style | 样式对象 | `CSSProperties` | - | - |

### Layout.Footer

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| className | 容器类名 | `string` | - | - |
| style | 样式对象 | `CSSProperties` | - | - |

## 主题配置

可以通过 ConfigProvider 配置 Layout 的主题：

```tsx
import { ConfigProvider, Layout } from '@soui/ui';

const { Header, Sider, Content, Footer } = Layout;

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Layout: {
          headerHeight: 80,
          footerHeight: 50,
          siderWidth: 250,
          siderCollapsedWidth: 100,
          headerColorBg: '#fff',
          siderColorBg: '#001529',
        },
      },
    }}
  >
    <Layout hasSider>
      <Sider>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  </ConfigProvider>
);
```

### 可配置项

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| headerHeight | Header 高度（像素） | `number` | `64` |
| footerHeight | Footer 高度（像素） | `number` | `64` |
| siderWidth | Sider 宽度（像素） | `number` | `200` |
| siderCollapsedWidth | Sider 收起宽度（像素） | `number` | `80` |
| colorBg | 布局背景色 | `string` | `@bg-color-layout` |
| headerColorBg | Header 背景色 | `string` | `@bg-color-base` |
| headerColorText | Header 文本色 | `string` | `@text-color` |
| siderColorBg | Sider 背景色 | `string` | `#001529` |
| contentColorBg | Content 背景色 | `string` | `@bg-color-base` |
| footerColorBg | Footer 背景色 | `string` | `@bg-color-layout` |
| footerColorText | Footer 文本色 | `string` | `@text-color-secondary` |
| siderTriggerColorText | Sider 触发器文本色 | `string` | `#fff` |
| siderTriggerColorBg | Sider 触发器背景色 | `string` | `rgba(255, 255, 255, 0.1)` |
| siderTriggerColorBgHover | Sider 触发器悬停背景色 | `string` | `rgba(255, 255, 255, 0.2)` |
| contentPadding | Content 内边距 | `string` | `@padding-md` |

## 设计原则

### ✅ 推荐用法

```tsx
// 使用 hasSider 标识包含侧边栏
<Layout hasSider>
  <Sider>Sider</Sider>
  <Layout>
    <Header>Header</Header>
    <Content>Content</Content>
  </Layout>
</Layout>

// 设置最小高度确保布局撑满
<Layout style={{ minHeight: '100vh' }}>
  ...
</Layout>
```

### ❌ 避免使用

```tsx
// 不要在嵌套 Layout 中重复设置相同的样式
<Layout style={{ background: '#f0f2f5' }}>
  <Layout style={{ background: '#f0f2f5' }}>
    ...
  </Layout>
</Layout>

// 不要忘记设置 hasSider（当有 Sider 时）
<Layout>
  <Sider>Sider</Sider>
  <Content>Content</Content>
</Layout>
```

## 无障碍访问

- 布局容器使用语义化 HTML 标签（`header`, `aside`, `main`, `footer`）
- 支持键盘导航和焦点管理
- 遵循 WAI-ARIA 规范

## FAQ

### 为什么需要 hasSider 属性？

`hasSider` 主要用于服务端渲染（SSR）场景，帮助确定布局方向。在客户端渲染中通常可以省略，但建议显式声明以提高代码可读性。

### 如何实现响应式侧边栏？

可以使用媒体查询结合状态管理来实现：

```tsx
import { useState, useEffect } from 'react';
import { Layout } from '@soui/ui';

const { Sider, Content } = Layout;

export default () => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout hasSider>
      <Sider collapsible collapsed={collapsed}>
        Sider
      </Sider>
      <Content>Content</Content>
    </Layout>
  );
};
```

### 如何自定义侧边栏触发器？

通过 `trigger` 属性传入自定义 React 节点：

```tsx
<Sider
  collapsible
  trigger={<Icon type="menu-unfold" />}
>
  Sider
</Sider>
```

## 相关资源

- [Grid 栅格](/components/grid) - 用于更细粒度的布局控制
- [Space 间距](/components/space) - 用于组件之间的间距控制
