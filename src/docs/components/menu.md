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
import { Menu, ConfigProvider } from '@soui/ui';

export default () => {
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
    { key: 'about', label: '关于我们' },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            colorText: 'rgba(255, 255, 255, 0.65)',
            itemHoverBg: 'rgba(255, 255, 255, 0.08)',
            itemSelectedColor: '#fff',
            itemSelectedBg: 'rgba(24, 144, 255, 0.15)',
          },
        },
      }}
    >
      <Menu mode="vertical" popupTheme="dark" items={items} />
    </ConfigProvider>
  );
};
```

::: tip 提示
暗色主题需要同时设置：
- `ConfigProvider` 中配置 Menu 组件的颜色变量
- `popupTheme="dark"` - 设置弹出子菜单为暗色主题
:::

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

### 手风琴模式

一次只展开一个子菜单，其他子菜单会自动关闭。

```tsx
import { Menu } from '@soui/ui';

export default () => {
  const items = [
    {
      key: 'mail',
      label: '邮件',
      icon: 'Mail',
      children: [
        { key: 'inbox', label: '收件箱' },
        { key: 'sent', label: '已发送' },
      ],
    },
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

  return <Menu mode="inline" accordion items={items} />;
};
```

### 点击触发子菜单

通过点击而非悬停来展开子菜单。

```tsx
import { Menu } from '@soui/ui';

export default () => {
  const items = [
    {
      key: 'mail',
      label: '邮件',
      icon: 'Mail',
      children: [
        { key: 'inbox', label: '收件箱' },
        { key: 'sent', label: '已发送' },
      ],
    },
    {
      key: 'app',
      label: '应用',
      icon: 'Appstore',
      children: [
        { key: 'calendar', label: '日历' },
        { key: 'project', label: '项目' },
      ],
    },
  ];

  return (
    <Menu mode="inline" triggerSubMenuAction="click" items={items} />
  );
};
```

### 危险操作菜单项

使用红色标识危险操作的菜单项。

```tsx
import { Menu } from '@soui/ui';

export default () => {
  const items = [
    { key: 'edit', label: '编辑', icon: 'Edit' },
    { key: 'delete', label: '删除', icon: 'Delete', danger: true },
  ];

  return <Menu mode="vertical" items={items} />;
};
```

### 菜单分组和分割线

使用分组和分割线组织菜单项。

```tsx
import { Menu } from '@soui/ui';

export default () => {
  const items = [
    {
      key: 'group1',
      type: 'group',
      label: '用户管理',
      children: [
        { key: 'user-list', label: '用户列表' },
        { key: 'role-list', label: '角色列表' },
      ],
    },
    {
      key: 'divider1',
      type: 'divider',
    },
    {
      key: 'group2',
      type: 'group',
      label: '系统设置',
      children: [
        { key: 'basic-setting', label: '基础设置' },
        { key: 'advanced-setting', label: '高级设置' },
      ],
    },
  ];

  return <Menu mode="inline" items={items} />;
};
```

### 受控模式

通过 `selectedKeys` 和 `openKeys` 完全控制菜单的选中和展开状态。

```tsx
import { Menu } from '@soui/ui';
import { useState } from 'react';

export default () => {
  const [selectedKeys, setSelectedKeys] = useState<string[]>(['home']);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const items = [
    { key: 'home', label: '首页', icon: 'Home' },
    {
      key: 'settings',
      label: '设置',
      icon: 'Setting',
      children: [
        { key: 'account', label: '账户设置' },
        { key: 'security', label: '安全设置' },
      ],
    },
  ];

  return (
    <Menu
      mode="inline"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onClick={({ key }) => setSelectedKeys([key])}
      onOpenChange={setOpenKeys}
      items={items}
    />
  );
};
```

### 事件处理

监听菜单点击和展开/关闭事件。

```tsx
import { Menu, Message } from '@soui/ui';

export default () => {
  const items = [
    { key: 'home', label: '首页', icon: 'Home' },
    {
      key: 'settings',
      label: '设置',
      icon: 'Setting',
      children: [
        { key: 'account', label: '账户设置' },
        { key: 'security', label: '安全设置' },
      ],
    },
  ];

  return (
    <Menu
      mode="inline"
      onClick={({ key, keyPath }) => {
        Message.success(`点击了: ${key}, 路径: ${keyPath.join(' > ')}`);
      }}
      onOpenChange={(keys) => {
        console.log('展开的菜单:', keys);
      }}
      items={items}
    />
  );
};
```

## 特性说明

### 折叠模式

当 `inlineCollapsed` 为 `true` 时：
- 菜单宽度收缩为 80px
- 只显示图标或标签的第一个字符
- 鼠标悬停时自动显示完整标签的 Tooltip 提示
- 子菜单以弹出面板形式展示

### 子菜单弹出方向

- **水平菜单**：第一层和第二层子菜单从下方弹出，第三层及以上从右侧弹出
- **内联菜单**：子菜单在内部展开
- **垂直菜单**：子菜单以弹出面板形式从右侧弹出

### 自动高亮父级菜单

当子菜单项被选中时，其所有父级 SubMenu 会自动显示为选中状态，方便用户了解当前位置。

## 主题定制

Menu 组件支持全局主题和组件级主题定制。

### 全局主题

通过 ConfigProvider 的 `theme.primaryColor` 配置全局主色，会影响菜单的选中颜色：

```tsx
import { ConfigProvider, Menu } from '@soui/ui';

export default () => {
  const items = [
    { key: 'home', label: '首页' },
    { key: 'profile', label: '个人中心' },
  ];

  return (
    <ConfigProvider
      theme={{
        primaryColor: '#722ed1',
        primaryHoverColor: '#9254de',
      }}
    >
      <Menu mode="inline" items={items} />
    </ConfigProvider>
  );
};
```

### 组件级主题（推荐）

通过 `theme.components.Menu` 配置菜单的专属样式：

```tsx
import { ConfigProvider, Menu } from '@soui/ui';

export default () => {
  const items = [
    { key: 'home', label: '首页', icon: 'Home' },
    { key: 'user', label: '用户管理', icon: 'User' },
    {
      key: 'settings',
      label: '系统设置',
      icon: 'Setting',
      children: [
        { key: 'basic', label: '基础设置' },
        { key: 'notify', label: '通知设置' },
      ],
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            colorText: '#333',                    // 文本颜色
            colorPrimary: '#1890ff',              // 主色调
            itemSelectedBg: 'rgba(24, 144, 255, 0.1)',  // 选中背景
            itemSelectedColor: '#1890ff',         // 选中文本颜色
            itemHoverBg: 'rgba(0, 0, 0, 0.04)',   // 悬停背景
            borderRadius: 4,                      // 圆角
            fontSize: 14,                         // 字体大小
          },
        },
      }}
    >
      <Menu mode="inline" items={items} />
    </ConfigProvider>
  );
};
```

### 组件级主题配置项

| 配置项 | 说明 | 类型 | 默认值 | 版本 |
|--------|------|------|--------|------|
| colorText | 文本颜色 | `string` | `@text-color` | - |
| colorTextSecondary | 次要文本颜色 | `string` | `@text-color-secondary` | - |
| colorPrimary | 主色调 | `string` | 继承全局 `primaryColor` | - |
| colorPrimaryHover | 主色调悬停 | `string` | 继承全局 `primaryHoverColor` | - |
| itemSelectedBg | 选中项背景色 | `string` | `rgba(24, 144, 255, 0.1)` | - |
| itemSelectedColor | 选中项文本颜色 | `string` | 继承全局 `primaryColor` | - |
| itemHoverBg | 悬停背景色 | `string` | `rgba(0, 0, 0, 0.04)` | - |
| itemActiveBg | 激活背景色 | `string` | `rgba(0, 0, 0, 0.06)` | - |
| borderRadius | 圆角大小（像素） | `number` | 继承全局 `borderRadius` | - |
| fontSize | 字体大小（像素） | `number` | 继承全局 `fontSize` | - |

### 暗色主题示例

完整的暗色主题配置：

```tsx
import { ConfigProvider, Menu } from '@soui/ui';

export default () => {
  const items = [
    { key: 'home', label: '首页', icon: 'Home' },
    { key: 'user', label: '用户管理', icon: 'User' },
    {
      key: 'settings',
      label: '系统设置',
      icon: 'Setting',
      children: [
        { key: 'basic', label: '基础设置' },
        { key: 'notify', label: '通知设置' },
      ],
    },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            colorText: 'rgba(255, 255, 255, 0.65)',
            colorPrimary: '#1890ff',
            colorPrimaryHover: '#40a9ff',
            itemHoverBg: 'rgba(255, 255, 255, 0.08)',
            itemActiveBg: 'rgba(255, 255, 255, 0.12)',
            itemSelectedBg: 'rgba(24, 144, 255, 0.15)',
            itemSelectedColor: '#fff',
          },
        },
      }}
    >
      <div style={{ background: '#001529', padding: 16 }}>
        <Menu mode="vertical" popupTheme="dark" items={items} />
      </div>
    </ConfigProvider>
  );
};
```

::: tip 提示
暗色主题需要同时设置：
- `ConfigProvider` 中配置 Menu 组件的颜色变量
- `popupTheme="dark"` - 设置弹出子菜单为暗色主题
- 外层容器使用深色背景（如 `#001529`）
:::

### 优先级

CSS 变量的优先级从高到低：

1. **组件级主题** (`theme.components.Menu.*`)
2. **全局主题** (`theme.*`)
3. **Less 变量** (`variables.less`)

```tsx
// 全局主题设置主色为紫色
theme={{
  primaryColor: '#722ed1',
  components: {
    Menu: {
      // 菜单级会覆盖全局主题
      colorPrimary: '#52c41a',  // 菜单主色为绿色
    },
  },
}}
```

## API

### Menu 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| mode | 菜单类型，可选 `vertical` `horizontal` `inline` | `MenuMode` | `inline` | - |
| inlineCollapsed | inline 模式下是否折叠菜单 | `boolean` | `false` | - |
| selectedKeys | 当前选中的菜单项 key 数组（受控） | `string[]` | - | - |
| defaultSelectedKeys | 初始选中的菜单项 key 数组 | `string[]` | `[]` | - |
| openKeys | 当前展开的 SubMenu key 数组（受控） | `string[]` | - | - |
| defaultOpenKeys | 初始展开的 SubMenu key 数组 | `string[]` | `[]` | - |
| accordion | 是否只保持一个子菜单展开 | `boolean` | `false` | - |
| triggerSubMenuAction | 子菜单展开/关闭的触发方式，可选 `hover` `click` | `'hover' \| 'click'` | `hover` | - |
| popupZIndex | 弹出菜单的 z-index | `number` | `1050` | - |
| popupTheme | 弹出菜单的主题，可选 `light` `dark` | `'light' \| 'dark'` | `light` | - |
| items | 菜单数据源（数据驱动） | `MenuItemType[]` | `[]` | - |
| className | 自定义类名 | `string` | - | - |
| style | 自定义样式 | `React.CSSProperties` | - | - |
| onClick | 点击菜单项触发的回调函数 | `(info: { key: string; keyPath: string[] }) => void` | - | - |
| onOpenChange | SubMenu 展开/关闭的回调函数 | `(keys: string[]) => void` | - | - |

### MenuItemType

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| key | 菜单项唯一标识 | `string` | - | - |
| label | 菜单项标签 | `ReactNode` | - | - |
| icon | 菜单项图标，可以是图标名称字符串或 React 节点 | `string \| ReactNode` | - | - |
| disabled | 是否禁用 | `boolean` | `false` | - |
| danger | 是否为危险操作（显示为红色） | `boolean` | `false` | - |
| children | 子菜单项（用于嵌套） | `MenuItemType[]` | - | - |
| type | 菜单项类型，可选 `item`（普通菜单项）、`group`（分组）、`divider`（分割线） | `'item' \| 'group' \| 'divider'` | `item` | - |

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
