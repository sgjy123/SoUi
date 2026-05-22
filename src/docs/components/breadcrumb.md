# Breadcrumb 面包屑

显示当前页面在系统层级结构中的位置，并能向上返回。

## 何时使用

- 当系统拥有超过两级以上的层级结构时
- 当需要告知用户『你在哪里』时
- 当需要向上导航的功能时

## 代码演示

### 基础用法

最基础的面包屑导航。

```tsx
import { Breadcrumb } from '@soui/ui';

export default () => (
  <Breadcrumb>
    <Breadcrumb.Item>首页</Breadcrumb.Item>
    <Breadcrumb.Item href="">应用中心</Breadcrumb.Item>
    <Breadcrumb.Item href="">应用列表</Breadcrumb.Item>
    <Breadcrumb.Item>某个应用</Breadcrumb.Item>
  </Breadcrumb>
);
```

### 自定义分隔符

通过 `separator` 属性自定义分隔符。

```tsx
import { Breadcrumb, Icon } from '@soui/ui';

export default () => (
  <>
    <Breadcrumb separator=">" style={{ marginBottom: 16 }}>
      <Breadcrumb.Item>首页</Breadcrumb.Item>
      <Breadcrumb.Item href="">应用中心</Breadcrumb.Item>
      <Breadcrumb.Item>应用列表</Breadcrumb.Item>
    </Breadcrumb>

    <Breadcrumb separator="-" style={{ marginBottom: 16 }}>
      <Breadcrumb.Item>首页</Breadcrumb.Item>
      <Breadcrumb.Item href="">应用中心</Breadcrumb.Item>
      <Breadcrumb.Item>应用列表</Breadcrumb.Item>
    </Breadcrumb>

    <Breadcrumb separator={<Icon name="Right" size={12} />}>
      <Breadcrumb.Item>首页</Breadcrumb.Item>
      <Breadcrumb.Item href="">应用中心</Breadcrumb.Item>
      <Breadcrumb.Item>应用列表</Breadcrumb.Item>
    </Breadcrumb>
  </>
);
```

### 使用 items 属性

通过 `items` 属性配置面包屑项。

```tsx
import { Breadcrumb } from '@soui/ui';

const items = [
  { title: '首页', href: '' },
  { title: '应用中心', href: '' },
  { title: '应用列表' },
];

export default () => (
  <Breadcrumb
    items={items.map((item) => ({
      children: item.title,
      href: item.href,
    }))}
  />
);
```

### 带图标的面包屑

为面包屑项添加图标，增强视觉识别度。

```tsx
import { Breadcrumb, Icon } from '@soui/ui';

export default () => (
  <Breadcrumb>
    <Breadcrumb.Item icon={<Icon name="Home" size={14} />}>首页</Breadcrumb.Item>
    <Breadcrumb.Item 
      href="" 
      icon={<Icon name="Application" size={14} />}
    >
      应用中心
    </Breadcrumb.Item>
    <Breadcrumb.Item 
      href=""
      icon={<Icon name="List" size={14} />}
    >
      应用列表
    </Breadcrumb.Item>
    <Breadcrumb.Item icon={<Icon name="File" size={14} />}>某个应用</Breadcrumb.Item>
  </Breadcrumb>
);
```

## API

### Breadcrumb

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| items | 面包屑项列表 | `BreadcrumbItemProps[]` | - | - |
| separator | 分隔符自定义 | `ReactNode` | `/` | - |
| className | 自定义类名 | `string` | - | - |
| style | 自定义样式 | `CSSProperties` | - | - |
| children | 子节点（优先于 items） | `ReactNode` | - | - |

### Breadcrumb.Item

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| href | 链接地址 | `string` | - | - |
| icon | 图标 | `ReactNode` | - | - |
| onClick | 点击事件 | `(e: MouseEvent) => void` | - | - |
| className | 自定义类名 | `string` | - | - |
| style | 自定义样式 | `CSSProperties` | - | - |
| children | 内容 | `ReactNode` | - | - |

## 主题定制

Breadcrumb 组件支持通过 ConfigProvider 进行主题定制，遵循 SoUi 三层设计令牌系统。

### 全局配置

通过 `theme` 属性配置全局样式，影响所有面包屑组件：

```tsx
import { ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      primaryColor: '#1677ff',     // 主色（影响链接颜色）
      fontSize: 14,                 // 字体大小
    }}
  >
    <YourApp />
  </ConfigProvider>
);
```

### 组件级配置

通过 `theme.components.Breadcrumb` 针对面包屑组件进行精细化配置：

```tsx
import { ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Breadcrumb: {
          colorText: 'rgba(0, 0, 0, 0.88)',    // 文本颜色
          colorLink: '#1890ff',                // 链接颜色
          colorLinkHover: '#40a9ff',           // 链接悬停颜色
          separatorColor: 'rgba(0, 0, 0, 0.25)', // 分隔符颜色
          fontSize: 14,                        // 字体大小
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
<Breadcrumb style={{ fontSize: '16px' }} />

// 第二优先级：组件级配置
<ConfigProvider theme={{ components: { Breadcrumb: { fontSize: 14 } } }}>
  <Breadcrumb /> {/* 使用 14px */}
</ConfigProvider>

// 第三优先级：全局配置
<ConfigProvider theme={{ fontSize: 12 }}>
  <Breadcrumb /> {/* 使用 12px */}
</ConfigProvider>
```

### 可用的主题配置项

Breadcrumb 组件支持以下主题配置项：

**颜色相关：**
- `colorText` - 文本颜色
- `colorLink` - 链接颜色
- `colorLinkHover` - 链接悬停颜色
- `separatorColor` - 分隔符颜色

**尺寸相关：**
- `fontSize` - 字体大小（像素）

**其他：**
- 具体配置项请参考 `ConfigProvider/types.ts` 类型定义

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<Breadcrumb
  style={{
    '--soui-breadcrumb-color-link': '#ff0000',
    '--soui-breadcrumb-font-size': '16px',
  }}
/>
```

**CSS 变量命名规范：**
- 第1层（设计令牌）：`--soui-{property}` - 不带组件前缀的全局变量
- 第2层（组件配置点）：`--soui-breadcrumb-{property}` - 带组件前缀的配置点
- 第3层（组件级覆盖）：`--soui-breadcrumb-{property}-component` - 带 `-component` 后缀的覆盖变量

## 设计原则

### ✅ 推荐用法

```tsx
// 使用面包屑展示页面层级
<Breadcrumb>
  <Breadcrumb.Item href="/">首页</Breadcrumb.Item>
  <Breadcrumb.Item href="/list">列表页</Breadcrumb.Item>
  <Breadcrumb.Item>详情页</Breadcrumb.Item>
</Breadcrumb>

// 最后一个项目不需要链接
<Breadcrumb>
  <Breadcrumb.Item href="">上级页面</Breadcrumb.Item>
  <Breadcrumb.Item>当前页面</Breadcrumb.Item>
</Breadcrumb>
```

### ❌ 避免使用

```tsx
// 不要在面包屑中使用过多层级（建议不超过 5 层）
<Breadcrumb>
  <Breadcrumb.Item>层级1</Breadcrumb.Item>
  <Breadcrumb.Item>层级2</Breadcrumb.Item>
  <Breadcrumb.Item>层级3</Breadcrumb.Item>
  <Breadcrumb.Item>层级4</Breadcrumb.Item>
  <Breadcrumb.Item>层级5</Breadcrumb.Item>
  <Breadcrumb.Item>层级6</Breadcrumb.Item>
</Breadcrumb>

// 不要在没有层级关系的页面使用面包屑
```

## 无障碍访问

- 面包屑使用 `<nav>` 和 `<ol>` 语义化标签
- 每个面包屑项使用 `<li>` 标签
- 链接项具有合适的 `href` 属性
- 当前页面项没有链接，表示不可点击状态

## FAQ

### 如何隐藏最后一个面包屑项的分隔符？

组件会自动隐藏最后一个项目的分隔符，无需额外配置。

### 如何在面包屑中使用图标？

可以直接在 `children` 中使用 Icon 组件：

```tsx
<Breadcrumb>
  <Breadcrumb.Item>
    <Icon name="Home" /> 首页
  </Breadcrumb.Item>
  <Breadcrumb.Item>列表</Breadcrumb.Item>
</Breadcrumb>
```

### 面包屑的最大层级数有限制吗？

技术上没有限制，但为了用户体验，建议不超过 5 层。

## 相关资源

- [Menu 菜单](/components/menu) - 用于导航菜单
- [Layout 布局](/components/layout) - 用于页面布局
