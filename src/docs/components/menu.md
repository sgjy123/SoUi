# Menu 菜单

导航菜单，提供站点内部不同页面或功能模块之间的跳转。采用数据驱动的方式配置菜单项。

## 何时使用

- 网站顶部导航栏，用于在不同页面之间切换
- 侧边栏导航，用于在页面内部不同模块间切换
- 展示具有层级关系的内容，便于用户快速查找
- 移动端底部标签页导航

## 代码演示

### 基础用法

使用 `items` 数组配置菜单项，支持嵌套子菜单。

```tsx
import { Menu } from '@soui/ui';

export default () => {
  const items = [
    { key: 'home', label: '首页' },
    { key: 'profile', label: '个人中心', icon: 'User' },
    {
      key: 'settings',
      label: '设置',
      icon: 'Setting',
      children: [
        { key: 'account', label: '账户设置' },
        { key: 'security', label: '安全设置' },
      ],
    },
    { key: 'about', label: '关于我们' },
  ];

  return <Menu mode="vertical" items={items} />;
};
```

### 水平菜单

水平排列的菜单，适用于顶部导航栏。

```tsx
import { Menu } from '@soui/ui';

export default () => {
  const items = [
    { key: 'home', label: '首页' },
    { key: 'products', label: '产品' },
    { key: 'about', label: '关于' },
    { key: 'contact', label: '联系' },
  ];

  return <Menu mode="horizontal" items={items} />;
};
```

### 内嵌菜单

子菜单内嵌在菜单中，适用于有层级关系的导航。

```tsx
import { Menu } from '@soui/ui';

export default () => {
  const items = [
    { key: 'mail', label: '邮件', icon: 'Mail' },
    {
      key: 'app',
      label: '应用',
      icon: 'Appstore',
      children: [
        { key: 'calendar', label: '日历' },
        { key: 'project', label: '项目' },
      ],
    },
    {
      key: 'setting',
      label: '设置',
      icon: 'Setting',
      children: [
        { key: 'account', label: '账户' },
        { key: 'system', label: '系统' },
      ],
    },
  ];

  return <Menu mode="inline" items={items} />;
};
```

### 暗色主题

深色背景的菜单，适用于深色主题的应用。

```tsx
import { Menu } from '@soui/ui';

export default () => {
  const items = [
    { key: 'home', label: '首页' },
    { key: 'profile', label: '个人中心', icon: 'User' },
    {
      key: 'settings',
      label: '设置',
      icon: 'Setting',
      children: [
        { key: 'account', label: '账户设置' },
        { key: 'security', label: '安全设置' },
      ],
    },
    { key: 'about', label: '关于我们' },
  ];

  return <Menu mode="vertical" theme="dark" items={items} />;
};
```

### 内联折叠

内联菜单可以折叠，节省侧边栏空间。

```tsx
import { Menu, Button } from '@soui/ui';
import { useState } from 'react';

export default () => {
  const [collapsed, setCollapsed] = useState(false);

  const items = [
    { key: 'home', label: '首页', icon: 'Home' },
    { key: 'profile', label: '个人中心', icon: 'User' },
    {
      key: 'settings',
      label: '设置',
      icon: 'Setting',
      children: [
        { key: 'account', label: '账户设置' },
        { key: 'security', label: '安全设置' },
      ],
    },
    { key: 'about', label: '关于我们', icon: 'InfoCircle' },
  ];

  return (
    <>
      <Button onClick={() => setCollapsed(!collapsed)}>
        {collapsed ? '展开' : '折叠'}
      </Button>
      <br />
      <br />
      <Menu mode="inline" inlineCollapsed={collapsed} items={items} />
    </>
  );
};
```

## API

### Menu 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| mode | 菜单类型，可选 `vertical` `horizontal` `inline` | `MenuMode` | `vertical` | - |
| theme | 主题颜色，可选 `light` `dark` | `MenuTheme` | `light` | - |
| selectedKeys | 当前选中的菜单项 key 数组 | `string[]` | `[]` | - |
| defaultSelectedKeys | 初始选中的菜单项 key 数组 | `string[]` | `[]` | - |
| openKeys | 当前展开的SubMenu key数组 | `string[]` | `[]` | - |
| defaultOpenKeys | 初始展开的SubMenu key数组 | `string[]` | `[]` | - |
| items | 菜单数据源（数据驱动） | `MenuItemType[]` | `[]` | - |
| inlineCollapsed | inline 模式下是否折叠菜单 | `boolean` | `false` | - |
| onClick | 点击菜单项触发的回调函数 | `(key: string) => void` | - | - |
| onOpenChange | SubMenu 展开/关闭的回调函数 | `(openKeys: string[]) => void` | - | - |

### MenuItemType

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| key | 菜单项唯一标识 | `string` | - | - |
| label | 菜单项标签 | `ReactNode` | - | - |
| icon | 菜单项图标 | `string \| ReactNode` | - | - |
| disabled | 是否禁用 | `boolean` | `false` | - |
| children | 子菜单项（用于嵌套） | `MenuItemType[]` | - | - |

## 设计原则

### ✅ 推荐用法

```tsx
// 使用数据驱动方式配置菜单
const items = [
  { key: 'home', label: '首页' },
  {
    key: 'settings',
    label: '设置',
    children: [
      { key: 'account', label: '账户' },
    ],
  },
];
<Menu items={items} />
```

### ❌ 避免使用

```tsx
// 过深的嵌套（建议不超过3层）
const items = [
  {
    key: 'level1',
    label: '一级菜单',
    children: [
      {
        key: 'level2',
        label: '二级菜单',
        children: [
          {
            key: 'level3',
            label: '三级菜单',
            children: [
              { key: 'level4', label: '四级菜单' }, // 不推荐
            ],
          },
        ],
      },
    ],
  },
];
```

## 无障碍访问

- 菜单使用 `role="menu"`，菜单项使用 `role="menuitem"`，符合 WAI-ARIA 规范
- 支持键盘导航，可通过 Tab 键切换焦点
- 选中状态通过 `aria-selected` 属性标记
- 禁用状态通过 `aria-disabled` 属性标记

## FAQ

### 如何设置默认选中的菜单项？

使用 `defaultSelectedKeys` 属性设置初始选中的菜单项：

```tsx
<Menu defaultSelectedKeys={['home']} items={items} />
```

### 如何在水平模式下设置子菜单？

水平模式下的子菜单会在鼠标悬停时展开，直接在 `children` 中添加子菜单项即可：

```tsx
const items = [
  { key: 'home', label: '首页' },
  {
    key: 'products',
    label: '产品',
    children: [
      { key: 'product1', label: '产品1' },
      { key: 'product2', label: '产品2' },
    ],
  },
];
<Menu mode="horizontal" items={items} />
```

## 相关资源

- [Button 按钮](/components/button)
- [Layout 布局](/components/layout)
