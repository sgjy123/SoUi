# Menu 导航菜单

为页面和功能提供导航的菜单列表。

## 何时使用

导航菜单是一个网站的灵魂，用户依赖导航在各个页面中进行跳转。一般分为顶部导航和侧边导航：
- **顶部导航**：提供全局性的类目和功能
- **侧边导航**：提供多级结构来收纳和排列网站架构

更多布局和导航的使用可以参考：[Layout 布局](/components/layout)

## 代码演示

### 基础用法

最简单的菜单用法，包含几个基本的菜单项。

```tsx
import { Menu } from '@soui/ui';

export default () => (
  <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']}>
    <Menu.Item key="1" icon="Home">首页</Menu.Item>
    <Menu.Item key="2" icon="User">用户管理</Menu.Item>
    <Menu.Item key="3" icon="Setting">系统设置</Menu.Item>
  </Menu>
);
```

### 垂直菜单

垂直方向的菜单，支持子菜单、分组和分割线。

```tsx
import { Menu } from '@soui/ui';

export default () => (
  <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']} style={{ width: 256 }}>
    <Menu.Item key="1" icon="Home">首页</Menu.Item>
    <Menu.Item key="2" icon="User">用户管理</Menu.Item>
    
    <Menu.SubMenu key="sub1" icon="Folder" title="文件管理">
      <Menu.Item key="3">我的文档</Menu.Item>
      <Menu.Item key="4">下载内容</Menu.Item>
      <Menu.Item key="5">图片库</Menu.Item>
    </Menu.SubMenu>
    
    <Menu.SubMenu key="sub2" icon="Chart" title="数据分析">
      <Menu.Item key="6">访问统计</Menu.Item>
      <Menu.Item key="7">用户行为</Menu.Item>
    </Menu.SubMenu>
    
    <Menu.Divider />
    <Menu.Item key="8" icon="Setting">系统设置</Menu.Item>
  </Menu>
);
```

### 水平菜单

水平方向的菜单，适合用于顶部导航栏。

```tsx
import { Menu } from '@soui/ui';

export default () => (
  <Menu mode="horizontal" theme="light" defaultSelectedKeys={['1']}>
    <Menu.Item key="1" icon="Home">首页</Menu.Item>
    <Menu.Item key="2" icon="User">用户管理</Menu.Item>
    
    <Menu.SubMenu key="sub1" title="产品">
      <Menu.Item key="3">产品列表</Menu.Item>
      <Menu.Item key="4">产品分类</Menu.Item>
      <Menu.Item key="5">库存管理</Menu.Item>
    </Menu.SubMenu>
    
    <Menu.SubMenu key="sub2" title="订单">
      <Menu.Item key="6">全部订单</Menu.Item>
      <Menu.Item key="7">待处理</Menu.Item>
      <Menu.Item key="8">已完成</Menu.Item>
    </Menu.SubMenu>
    
    <Menu.Item key="9" icon="Setting">设置</Menu.Item>
  </Menu>
);
```

### 折叠菜单

支持收起和展开状态，适合空间有限的场景。

```tsx
import { useState } from 'react';
import { Menu, Button, Space } from '@soui/ui';

export default () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '展开' : '收起'}
        </Button>
      </Space>
      
      <Menu
        mode="vertical"
        theme="light"
        inlineCollapsed={collapsed}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ width: collapsed ? 80 : 256 }}
      >
        <Menu.Item key="1" icon="Home">首页</Menu.Item>
        <Menu.Item key="2" icon="User">用户管理</Menu.Item>
        
        <Menu.SubMenu key="sub1" icon="Folder" title="文件管理">
          <Menu.Item key="3">我的文档</Menu.Item>
          <Menu.Item key="4">下载内容</Menu.Item>
          <Menu.Item key="5">图片库</Menu.Item>
        </Menu.SubMenu>
        
        <Menu.SubMenu key="sub2" icon="Chart" title="数据分析">
          <Menu.Item key="6">访问统计</Menu.Item>
          <Menu.Item key="7">用户行为</Menu.Item>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};
```

### 主题切换

支持亮色和暗色两种主题。

```tsx
import { Menu, Space } from '@soui/ui';

export default () => (
  <Space direction="vertical" size="large" style={{ width: '100%' }}>
    <div>
      <h4>Light Theme</h4>
      <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']} style={{ width: 256 }}>
        <Menu.Item key="1" icon="Home">首页</Menu.Item>
        <Menu.Item key="2" icon="User">用户管理</Menu.Item>
        <Menu.Item key="3" icon="Setting">系统设置</Menu.Item>
      </Menu>
    </div>
    
    <div>
      <h4>Dark Theme</h4>
      <Menu mode="vertical" theme="dark" defaultSelectedKeys={['1']} style={{ width: 256 }}>
        <Menu.Item key="1" icon="Home">首页</Menu.Item>
        <Menu.Item key="2" icon="User">用户管理</Menu.Item>
        <Menu.Item key="3" icon="Setting">系统设置</Menu.Item>
      </Menu>
    </div>
  </Space>
);
```

### 分组菜单

使用 Menu.Group 对菜单项进行分组。

```tsx
import { Menu } from '@soui/ui';

export default () => (
  <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']} style={{ width: 256 }}>
    <Menu.Group title="导航菜单">
      <Menu.Item key="1" icon="Home">首页</Menu.Item>
      <Menu.Item key="2" icon="User">用户管理</Menu.Item>
    </Menu.Group>
    
    <Menu.Divider />
    
    <Menu.Group title="系统管理">
      <Menu.Item key="3" icon="Setting">系统设置</Menu.Item>
      <Menu.Item key="4" icon="Security">安全管理</Menu.Item>
    </Menu.Group>
  </Menu>
);
```

### 菜单状态

展示不同状态的菜单项：正常、禁用、危险操作。

```tsx
import { Menu } from '@soui/ui';

export default () => (
  <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']} style={{ width: 256 }}>
    <Menu.Item key="1" icon="Home">正常菜单项</Menu.Item>
    <Menu.Item key="2" icon="User" disabled>禁用菜单项</Menu.Item>
    <Menu.Item key="3" icon="Delete" danger>危险操作</Menu.Item>
  </Menu>
);
```

## API

### Menu

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| mode | 菜单类型，现在支持垂直、水平、和内嵌模式三种 | `vertical` \| `horizontal` \| `inline` | `vertical` | - |
| theme | 主题颜色 | `light` \| `dark` | `light` | - |
| selectedKeys | 当前选中的菜单项 key 数组 | string[] | - | - |
| defaultSelectedKeys | 初始选中的菜单项 key 数组 | string[] | - | - |
| openKeys | 当前展开的 SubMenu 菜单项 key 数组 | string[] | - | - |
| defaultOpenKeys | 初始展开的 SubMenu 菜单项 key 数组 | string[] | - | - |
| inlineCollapsed | inline 时菜单是否收起状态 | boolean | - | - |
| collapsedWidth | 折叠模式下的菜单宽度（像素） | number | 80 | - |
| popupZIndex | Popup 弹出层的 zIndex | number | 1050 | - |
| accordion | 是否开启手风琴模式（每次只展开一个子菜单） | boolean | true | - |
| triggerSubMenuAction | SubMenu 展开/关闭的触发行为 | `hover` \| `click` | `hover` | - |
| onClick | 点击 MenuItem 调用此函数 | function({ key, keyPath }) | - | - |
| onOpenChange | SubMenu 展开/收起的回调 | function(openKeys: string[]) | - | - |
| className | 自定义类名 | string | - | - |
| style | 根节点样式 | CSSProperties | - | - |

### Menu.Item

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| key | item 的唯一标志（必需） | string | - | - |
| label | 菜单项标题 | ReactNode | - | - |
| icon | 菜单图标 | string \| ReactNode | - | - |
| disabled | 是否禁用 | boolean | false | - |
| danger | 展示错误状态样式 | boolean | false | - |
| onClick | 点击回调 | function(key: string) | - | - |
| className | 自定义类名 | string | - | - |
| style | 自定义样式 | CSSProperties | - | - |

### Menu.SubMenu

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| key | 唯一标志（必需） | string | - | - |
| title | 子菜单标题 | ReactNode | - | - |
| icon | 菜单图标 | string \| ReactNode | - | - |
| disabled | 是否禁用 | boolean | false | - |
| children | 子菜单的菜单项 | ReactNode | - | - |
| className | 自定义类名 | string | - | - |
| style | 自定义样式 | CSSProperties | - | - |

### Menu.Group

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| title | 分组标题 | ReactNode | - | - |
| children | 分组的菜单项 | ReactNode | - | - |
| className | 自定义类名 | string | - | - |
| style | 自定义样式 | CSSProperties | - | - |

### Menu.Divider

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| dashed | 是否为虚线 | boolean | false | - |
| className | 自定义类名 | string | - | - |
| style | 自定义样式 | CSSProperties | - | - |

## 设计原则

### ✅ 推荐用法

```tsx
// 使用语义化的 key
<Menu.Item key="user-management">用户管理</Menu.Item>

// 合理使用子菜单层级
<Menu.SubMenu key="system" title="系统管理">
  <Menu.Item key="settings">系统设置</Menu.Item>
  <Menu.Item key="security">安全管理</Menu.Item>
</Menu.SubMenu>

// 配合 Layout 使用
<Layout.Sider>
  <Menu mode="vertical" theme="dark">
    {/* ... */}
  </Menu>
</Layout.Sider>
```

### ❌ 避免使用

```tsx
// 不要使用无意义的 key
<Menu.Item key="1">菜单项</Menu.Item>

// 避免过深的嵌套层级（建议不超过 3 层）
<Menu.SubMenu key="a">
  <Menu.SubMenu key="b">
    <Menu.SubMenu key="c">
      <Menu.SubMenu key="d">...</Menu.SubMenu>
    </Menu.SubMenu>
  </Menu.SubMenu>
</Menu.SubMenu>

// 不要在 MenuItem 中放置过多内容
<Menu.Item key="item">
  <div>复杂的 HTML 结构</div>
  <span>多个元素</span>
</Menu.Item>
```

## 无障碍访问

- 所有菜单项都支持键盘导航（Tab、Enter、Space）
- 使用 ARIA 属性标注菜单状态（aria-selected、aria-expanded、aria-disabled）
- 禁用的菜单项无法通过键盘聚焦
- 折叠模式下，菜单项会显示 Tooltip 提示完整文本

## FAQ

### 如何控制菜单的选中状态？

使用受控模式，通过 `selectedKeys` 和 `onClick` 回调来控制：

```tsx
const [selectedKeys, setSelectedKeys] = useState(['home']);

<Menu
  mode="vertical"
  selectedKeys={selectedKeys}
  onClick={({ key }) => setSelectedKeys([key])}
>
  <Menu.Item key="home">首页</Menu.Item>
  <Menu.Item key="about">关于</Menu.Item>
</Menu>
```

### 如何实现路由跳转？

在 `onClick` 回调中处理路由跳转：

```tsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();

<Menu
  onClick={({ key }) => {
    navigate(key); // key 可以是路由路径
  }}
>
  <Menu.Item key="/home">首页</Menu.Item>
  <Menu.Item key="/about">关于</Menu.Item>
</Menu>
```

### 折叠模式下为什么看不到文字？

这是预期行为。折叠模式下只显示图标，鼠标悬停时会通过 Tooltip 显示完整文本。如果需要显示文字，请将 `inlineCollapsed` 设置为 `false`。

### 如何自定义菜单项的图标？

可以使用字符串（Icon 组件的图标名称）或自定义 React 节点：

```tsx
// 使用字符串
<Menu.Item key="home" icon="Home">首页</Menu.Item>

// 使用自定义图标
<Menu.Item key="home" icon={<CustomIcon />}>首页</Menu.Item>
```

## 相关资源

- [Layout 布局](/components/layout) - 与 Menu 配合使用的布局组件
- [Icon 图标](/components/icon) - 菜单项中使用的图标
