# Menu 菜单

为页面和功能提供导航的菜单列表。

## 何时使用

- 需要为用户提供导航功能时
- 需要在侧边栏或顶部展示多级菜单结构时
- 需要实现折叠菜单以节省空间时

## 代码演示

### 基础用法

最简单的垂直菜单，支持单选模式。

```tsx
import { Menu } from '@soui/ui';

export default () => (
  <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']}>
    <Menu.Item key="1" label="菜单项 1" icon="Home" />
    <Menu.Item key="2" label="菜单项 2" icon="Setting" />
    <Menu.Item key="3" label="菜单项 3" icon="User" />
  </Menu>
);
```

### 水平菜单

水平方向的菜单，常用于页面顶部导航。

```tsx
import { Menu } from '@soui/ui';

export default () => (
  <Menu mode="horizontal" theme="light" defaultSelectedKeys={['1']}>
    <Menu.Item key="1" label="首页" icon="Home" />
    <Menu.Item key="2" label="产品" icon="Apps" />
    <Menu.SubMenu key="3" title="服务" icon="Setting">
      <Menu.Item key="3-1" label="云服务" />
      <Menu.Item key="3-2" label="数据库" />
      <Menu.Item key="3-3" label="存储" />
    </Menu.SubMenu>
    <Menu.Item key="4" label="关于" icon="Info" />
  </Menu>
);
```

### 深色主题

使用深色主题的菜单，适合管理后台的侧边栏。

```tsx
import { Menu } from '@soui/ui';

export default () => (
  <Menu mode="vertical" theme="dark" defaultSelectedKeys={['1']}>
    <Menu.Item key="1" label="仪表盘" icon="Home" />
    <Menu.SubMenu key="2" title="用户管理" icon="User">
      <Menu.Item key="2-1" label="用户列表" />
      <Menu.Item key="2-2" label="角色管理" />
      <Menu.Item key="2-3" label="权限设置" />
    </Menu.SubMenu>
    <Menu.SubMenu key="3" title="系统设置" icon="Setting">
      <Menu.Item key="3-1" label="基础设置" />
      <Menu.Item key="3-2" label="安全设置" />
      <Menu.Item key="3-3" label="通知设置" />
    </Menu.SubMenu>
    <Menu.Item key="4" label="帮助中心" icon="QuestionCircle" />
  </Menu>
);
```

### 折叠菜单

通过 `inlineCollapsed` 属性可以折叠菜单，只显示图标，鼠标悬停时显示 Tooltip。

```tsx
import { Menu, Button, Space } from '@soui/ui';
import { useState } from 'react';

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
        theme="dark" 
        inlineCollapsed={collapsed}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['2']}
      >
        <Menu.Item key="1" label="仪表盘" icon="Home" />
        <Menu.SubMenu key="2" title="用户管理" icon="User">
          <Menu.Item key="2-1" label="用户列表" />
          <Menu.Item key="2-2" label="角色管理" />
          <Menu.Item key="2-3" label="权限设置" />
        </Menu.SubMenu>
        <Menu.SubMenu key="3" title="系统设置" icon="Setting">
          <Menu.Item key="3-1" label="基础设置" />
          <Menu.Item key="3-2" label="安全设置" />
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};
```

### 受控模式

通过 `selectedKeys` 和 `openKeys` 可以实现完全受控的菜单状态管理。

```tsx
import { Menu, Space } from '@soui/ui';
import { useState } from 'react';

export default () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['1']);
  const [openKeys, setOpenKeys] = useState<string[]>(['2']);

  return (
    <div>
      <Space direction="vertical" style={{ width: '100%' }}>
        <div>当前选中: {selectedKeys.join(', ')}</div>
        <div>当前展开: {openKeys.join(', ')}</div>
        
        <Menu
          mode="vertical"
          theme="light"
          selectedKeys={selectedKeys}
          openKeys={openKeys}
          onClick={({ key }) => setSelectedKeys([key])}
          onOpenChange={(keys) => setOpenKeys(keys)}
        >
          <Menu.Item key="1" label="首页" icon="Home" />
          <Menu.SubMenu key="2" title="产品管理" icon="Apps">
            <Menu.Item key="2-1" label="产品列表" />
            <Menu.Item key="2-2" label="产品分类" />
            <Menu.Item key="2-3" label="产品标签" />
          </Menu.SubMenu>
          <Menu.SubMenu key="3" title="订单管理" icon="FileText">
            <Menu.Item key="3-1" label="订单列表" />
            <Menu.Item key="3-2" label="退款管理" />
          </Menu.SubMenu>
          <Menu.Item key="4" label="数据统计" icon="ChartBar" />
        </Menu>
      </Space>
    </div>
  );
};
```

### 分组菜单

使用 `Menu.Group` 对菜单项进行分组。

```tsx
import { Menu } from '@soui/ui';

export default () => (
  <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']}>
    <Menu.Group title="导航菜单">
      <Menu.Item key="1" label="首页" icon="Home" />
      <Menu.Item key="2" label="产品" icon="Apps" />
      <Menu.Item key="3" label="服务" icon="Setting" />
    </Menu.Group>
    
    <Menu.Group title="管理菜单">
      <Menu.Item key="4" label="用户管理" icon="User" />
      <Menu.Item key="5" label="系统设置" icon="Setting" />
      <Menu.Item key="6" label="数据统计" icon="ChartBar" />
    </Menu.Group>
  </Menu>
);
```

## API

### Menu

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| mode | 菜单类型，现在支持垂直、水平两种模式 | `vertical` \| `horizontal` | `vertical` | - |
| theme | 主题颜色 | `light` \| `dark` | `light` | - |
| selectedKeys | 当前选中的菜单项 key 数组 | `string[]` | - | - |
| defaultSelectedKeys | 默认选中的菜单项 key 数组 | `string[]` | - | - |
| openKeys | 当前展开的子菜单 key 数组 | `string[]` | - | - |
| defaultOpenKeys | 默认展开的子菜单 key 数组 | `string[]` | - | - |
| inlineCollapsed | 是否内嵌菜单（仅 vertical 模式有效） | `boolean` | `false` | - |
| onClick | 点击菜单项的回调函数 | `(info: { key: string; keyPath: string[] }) => void` | - | - |
| onOpenChange | 子菜单展开/收起的回调函数 | `(openKeys: string[]) => void` | - | - |

### Menu.Item

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| key | 唯一标识 | `string` | - | - |
| label | 菜单项文本 | `ReactNode` | - | - |
| icon | 菜单项图标 | `string` \| `ReactNode` | - | - |
| disabled | 是否禁用 | `boolean` | `false` | - |
| onClick | 点击回调 | `(key: string) => void` | - | - |

### Menu.SubMenu

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| key | 唯一标识 | `string` | - | - |
| title | 子菜单标题 | `ReactNode` | - | - |
| icon | 子菜单图标 | `string` \| `ReactNode` | - | - |
| disabled | 是否禁用 | `boolean` | `false` | - |
| children | 子菜单内容 | `ReactNode` | - | - |

### Menu.Group

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| title | 分组标题 | `ReactNode` | - | - |
| children | 分组内容 | `ReactNode` | - | - |

## 设计原则

### ✅ 推荐用法

```tsx
// 使用语义化的 key
<Menu.Item key="dashboard" label="仪表盘" icon="Home" />

// 合理使用子菜单层级（建议不超过 3 层）
<Menu.SubMenu key="settings" title="系统设置">
  <Menu.Item key="basic" label="基础设置" />
  <Menu.Item key="security" label="安全设置" />
</Menu.SubMenu>
```

### ❌ 避免使用

```tsx
// 避免使用无意义的 key
<Menu.Item key="1" label="菜单项" />

// 避免过深的嵌套层级
<Menu.SubMenu key="a">
  <Menu.SubMenu key="b">
    <Menu.SubMenu key="c">
      <Menu.SubMenu key="d">
        {/* 太深了 */}
      </Menu.SubMenu>
    </Menu.SubMenu>
  </Menu.SubMenu>
</Menu.SubMenu>
```

## 无障碍访问

- 菜单组件遵循 WAI-ARIA Menu Pattern 规范
- 支持键盘导航：↑↓ 键切换菜单项，←→ 键展开/收起子菜单
- 所有交互元素都有适当的 ARIA 属性（role、aria-selected、aria-expanded 等）
- 禁用状态的菜单项不可聚焦

## FAQ

### 如何实现路由跳转？

在 `onClick` 回调中处理路由跳转：

```tsx
<Menu
  onClick={({ key }) => {
    // 使用 react-router 或其他路由库
    history.push(key);
  }}
>
  <Menu.Item key="/dashboard" label="仪表盘" />
  <Menu.Item key="/users" label="用户管理" />
</Menu>
```

### 如何动态生成菜单？

可以通过遍历数据动态生成菜单项：

```tsx
const menuData = [
  { key: '1', label: '首页', icon: 'Home' },
  { key: '2', label: '产品', icon: 'Apps' },
];

<Menu>
  {menuData.map(item => (
    <Menu.Item key={item.key} label={item.label} icon={item.icon} />
  ))}
</Menu>
```

### 折叠模式下如何自定义 Tooltip 位置？

折叠模式下的 Tooltip 默认显示在右侧，这是最佳实践，不建议修改。如果需要调整，可以通过 CSS 覆盖样式。

## 相关资源

- [Layout 布局](/components/layout) - 与 Menu 配合使用构建完整的管理后台布局
- [Icon 图标](/components/icon) - 为菜单项添加图标
- [Tooltip 文字提示](/components/tooltip) - 折叠菜单时显示的提示信息
