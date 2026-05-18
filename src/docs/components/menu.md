# Menu 菜单

为页面和功能提供导航的菜单列表。

## 何时使用

- 需要为用户提供导航功能时
- 需要在侧边栏或顶部展示多级菜单结构时
- 需要支持折叠、分组、图标等高级功能的菜单场景
- 后台管理系统、应用导航等需要清晰层级结构的场景

## 代码演示

### 基础用法

最简单的垂直菜单，包含普通菜单项和子菜单。

```tsx
const items = [
  { key: "home", label: "首页" },
  { key: "profile", label: "个人中心" },
  {
    key: "settings",
    label: "设置",
    children: [
      { key: "account", label: "账户设置" },
      { key: "security", label: "安全设置" },
    ],
  },
  { key: "about", label: "关于我们" },
];

return <Menu mode="vertical" items={items} />;
```

### 图标菜单

为菜单项添加图标，增强视觉识别度和用户体验。

```tsx
const items = [
  { key: "home", label: "首页", icon: "Home" },
  { key: "user", label: "用户管理", icon: "User" },
  { key: "order", label: "订单管理", icon: "ShoppingBag" },
  { key: "product", label: "商品管理", icon: "Box" },
  { key: "analysis", label: "数据分析", icon: "ChartLine" },
  {
    key: "settings",
    label: "系统设置",
    icon: "Setting",
    children: [
      { key: "basic", label: "基础设置", icon: "Tool" },
      { key: "notify", label: "通知设置", icon: "Notification" },
    ],
  },
  { key: "logout", label: "退出登录", icon: "Power" },
];

return <Menu mode="vertical" items={items} />;
```

### 水平菜单

顶部导航栏式的水平菜单布局，适合网站主导航。

```tsx
const items = [
  { key: "home", label: "首页" },
  { key: "docs", label: "文档" },
  { key: "components", label: "组件库" },
  {
    key: "more",
    label: "更多",
    children: [
      { key: "github", label: "GitHub" },
      {
        key: "changelog",
        label: "更新日志",
        children: [{ key: "changelog", label: "更新日志" }],
      },
      { key: "faq", label: "常见问题" },
    ],
  },
];

return <Menu mode="horizontal" items={items} />;
```

### 折叠菜单

侧边栏收起时只显示图标，节省空间。鼠标悬停时会显示完整标签的 Tooltip。

```tsx
const [collapsed, setCollapsed] = React.useState(false);

const items = [
  { key: "home", label: "首页", icon: "Home" },
  { key: "user", label: "用户管理", icon: "User" },
  { key: "order", label: "订单管理", icon: "ShoppingBag" },
  { key: "product", label: "商品管理", icon: "Box" },
  {
    key: "settings",
    label: "系统设置",
    icon: "Setting",
    children: [
      { key: "basic", label: "基础设置" },
      { key: "notify", label: "通知设置" },
    ],
  },
];

return (
  <div>
    <button
      onClick={() => setCollapsed(!collapsed)}
      style={{
        marginBottom: 16,
        padding: "6px 12px",
        cursor: "pointer",
      }}
    >
      {collapsed ? "展开菜单" : "折叠菜单"}
    </button>
    <Menu
      mode="inline"
      items={items}
      inlineCollapsed={collapsed}
      defaultSelectedKeys={["home"]}
    />
  </div>
);
```

### 手风琴模式

同一时刻只能展开一个子菜单，自动关闭其他已展开的子菜单。

```tsx
const items = [
  { key: "home", label: "首页" },
  {
    key: "user",
    label: "用户管理",
    icon: "User",
    children: [
      { key: "user-list", label: "用户列表" },
      { key: "user-group", label: "用户组" },
    ],
  },
  {
    key: "order",
    label: "订单管理",
    icon: "ShoppingBag",
    children: [
      { key: "order-list", label: "订单列表" },
      { key: "order-stat", label: "订单统计" },
    ],
  },
  {
    key: "settings",
    label: "系统设置",
    icon: "Setting",
    children: [
      { key: "basic", label: "基础设置" },
      { key: "notify", label: "通知设置" },
    ],
  },
];

return <Menu mode="inline" items={items} accordion defaultOpenKeys={["user"]} />;
```

### 分组菜单

将相关菜单项分组展示，提升菜单的可读性和组织性。

```tsx
const items = [
  {
    key: "nav",
    label: "导航",
    children: [
      {
        key: "basic-nav",
        type: "group" as const,
        label: "基础导航",
        children: [
          {
            key: "home",
            label: "首页",
            children: [{ key: "home-dashboard", label: "仪表盘" }],
          },
          {
            key: "about",
            label: "关于我们",
            children: [{ key: "about-team", label: "团队" }],
          },
        ],
      },
      { key: "contact", label: "联系我们" },
    ],
  },
  {
    key: "dashboard",
    type: "group" as const,
    label: "控制台",
    children: [
      { key: "analytics", label: "数据分析" },
      { key: "reports", label: "报表管理" },
    ],
  },
  {
    key: "system",
    type: "group" as const,
    label: "系统",
    children: [
      { key: "users", label: "用户管理" },
      { key: "settings", label: "系统设置" },
    ],
  },
];

return <Menu mode="vertical" items={items} />;
```

### 暗色主题

深色背景下的菜单样式，适合深色主题的后台管理系统。

```tsx
const items = [
  { key: "home", label: "首页", icon: "Home" },
  { key: "user", label: "用户管理", icon: "User" },
  { key: "order", label: "订单管理", icon: "ShoppingBag" },
  { key: "product", label: "商品管理", icon: "Box" },
  {
    key: "settings",
    label: "系统设置",
    icon: "Setting",
    children: [
      { key: "basic", label: "基础设置", icon: "Tool" },
      { key: "notify", label: "通知设置", icon: "Notification" },
    ],
  },
  { key: "logout", label: "退出登录", icon: "Power" },
];

return (
  <div style={{ background: "#f5f5f5", padding: 16 }}>
    <Menu
      mode="vertical"
      items={items}
      className="soui-menu-dark"
      defaultSelectedKeys={["home"]}
      popupTheme="dark"
    />
  </div>
);
```

### 受控菜单

完全控制菜单的选中状态和展开状态，适合需要与路由或其他状态联动的场景。

```tsx
const [selectedKeys, setSelectedKeys] = React.useState(["home"]);
const [openKeys, setOpenKeys] = React.useState(["settings"]);

const items = [
  { key: "home", label: "首页", icon: "Home" },
  { key: "user", label: "用户管理", icon: "User" },
  {
    key: "settings",
    label: "系统设置",
    icon: "Setting",
    children: [
      { key: "basic", label: "基础设置" },
      { key: "notify", label: "通知设置" },
    ],
  },
];

return (
  <Menu
    mode="inline"
    items={items}
    selectedKeys={selectedKeys}
    openKeys={openKeys}
    onClick={({ key, keyPath }) => {
      console.log("Selected:", key, keyPath);
      setSelectedKeys([key]);
    }}
    onOpenChange={(keys) => setOpenKeys(keys)}
  />
);
```

## API

### Menu 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| items | 菜单项配置数组 | `MenuItemType[]` | - | - |
| mode | 菜单模式 | `'inline' \| 'vertical' \| 'horizontal'` | `'inline'` | - |
| inlineCollapsed | 是否折叠（仅 inline 模式有效） | `boolean` | `false` | - |
| selectedKeys | 当前选中的菜单项 key 数组（受控） | `string[]` | - | - |
| defaultSelectedKeys | 默认选中的菜单项 key 数组 | `string[]` | `[]` | - |
| openKeys | 当前展开的SubMenu key 数组（受控） | `string[]` | - | - |
| defaultOpenKeys | 默认展开的SubMenu key 数组 | `string[]` | `[]` | - |
| accordion | 是否开启手风琴模式 | `boolean` | `false` | - |
| triggerSubMenuAction | 子菜单触发方式 | `'hover' \| 'click'` | `'hover'` | - |
| popupZIndex | 弹出层的 zIndex | `number` | `1050` | - |
| popupTheme | 弹出层主题 | `'light' \| 'dark'` | `'light'` | - |
| className | 自定义类名 | `string` | - | - |
| style | 自定义样式 | `React.CSSProperties` | - | - |
| onClick | 点击菜单项的回调 | `(info: { key: string; keyPath: string[] }) => void` | - | - |
| onOpenChange | SubMenu 展开/关闭的回调 | `(keys: string[]) => void` | - | - |

### MenuItemType

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| key | 唯一标识 | `string` | - | - |
| label | 菜单项文本 | `React.ReactNode` | - | - |
| icon | 菜单项图标（Icon 名称字符串或 ReactNode） | `React.ReactNode \| string` | - | - |
| disabled | 是否禁用 | `boolean` | `false` | - |
| danger | 是否为危险操作 | `boolean` | `false` | - |
| children | 子菜单项 | `MenuItemType[]` | - | - |
| type | 菜单项类型 | `'item' \| 'group' \| 'divider'` | `'item'` | - |

## 设计原则

### ✅ 推荐用法

**1. 合理组织菜单层级**

```tsx
// 好的示例：清晰的层级结构
const items = [
  { key: "home", label: "首页", icon: "Home" },
  {
    key: "management",
    label: "管理",
    icon: "Setting",
    children: [
      { key: "user", label: "用户管理" },
      { key: "role", label: "角色管理" },
    ],
  },
];
```

**2. 为重要菜单项添加图标**

```tsx
// 好的示例：图标增强识别度
{ key: "dashboard", label: "数据看板", icon: "Chart" }
```

**3. 使用分组整理相关菜单**

```tsx
// 好的示例：分组提升可读性
{
  key: "system",
  type: "group",
  label: "系统设置",
  children: [
    { key: "basic", label: "基础设置" },
    { key: "security", label: "安全设置" },
  ]
}
```

### ❌ 避免使用

**1. 过深的嵌套层级**

```tsx
// 不好的示例：超过 3 层嵌套会影响用户体验
{
  key: "level1",
  children: [
    {
      key: "level2",
      children: [
        {
          key: "level3",
          children: [
            // 避免第4层
          ]
        }
      ]
    }
  ]
}
```

**2. 过多的顶级菜单项**

```tsx
// 不好的示例：超过 7 个顶级菜单项会造成认知负担
// 建议通过分组或二级菜单来组织
```

**3. 混用不同的菜单模式**

```tsx
// 不好的示例：不要在同一页面混用多种模式
<Menu mode="vertical" items={items1} />
<Menu mode="horizontal" items={items2} />
```

## 无障碍访问

Menu 组件遵循 WAI-ARIA 规范：

- 使用 `role="menu"` 标识菜单容器
- 菜单项使用 `role="menuitem"`
- 支持键盘导航（Tab、Enter、Space）
- 禁用状态设置 `tabIndex={-1}`
- 焦点可见样式（focus-visible）

## 主题定制

Menu 组件支持通过 ConfigProvider 进行全局或组件级的主题定制。

### 全局主题配置

通过 ConfigProvider 的 `theme` 属性可以统一修改所有 Menu 组件的样式：

```tsx
import { ConfigProvider, Menu } from '@soui/ui';

const App = () => {
  return (
    <ConfigProvider
      theme={{
        // 全局主色会影响 Menu 的选中状态颜色
        primaryColor: '#722ed1',
        primaryHoverColor: '#9254de',
        
        // 字体大小和圆角
        fontSize: 14,
        borderRadius: 8,
      }}
    >
      <Menu items={items} />
    </ConfigProvider>
  );
};
```

### 组件级主题配置

通过 `theme.components.Menu` 可以单独定制 Menu 组件的样式，不影响其他组件：

```tsx
import { ConfigProvider, Menu } from '@soui/ui';

const App = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            // 颜色配置
            colorPrimary: '#52c41a',           // 主色（影响选中状态）
            colorPrimaryHover: '#73d13d',      // 主色悬停
            colorText: 'rgba(0, 0, 0, 0.85)',  // 文本颜色
            colorTextSecondary: 'rgba(0, 0, 0, 0.65)', // 次要文本颜色
            
            // 状态背景色
            itemSelectedBg: 'rgba(82, 196, 26, 0.1)',   // 选中项背景色
            itemSelectedColor: '#52c41a',               // 选中项文本颜色
            itemHoverBg: 'rgba(0, 0, 0, 0.06)',         // 悬停背景色
            itemActiveBg: 'rgba(0, 0, 0, 0.08)',        // 激活背景色
            
            // 尺寸配置
            fontSize: 14,                      // 字体大小（像素）
            borderRadius: 6,                   // 圆角（像素）
          },
        },
      }}
    >
      <Menu items={items} />
    </ConfigProvider>
  );
};
```

### CSS 变量定制

Menu 组件暴露了以下 CSS 变量，可以通过样式覆盖进行定制：

```less
.soui-menu {
  // 基础变量
  --soui-menu-bg-color: #fff;                    // 菜单背景色
  --soui-menu-color-text: rgba(0, 0, 0, 0.88);   // 文本颜色
  --soui-menu-color-text-secondary: rgba(0, 0, 0, 0.65); // 次要文本色
  --soui-menu-color-primary: #1677ff;            // 主色
  --soui-menu-color-primary-hover: #4096ff;      // 主色悬停
  
  // 状态变量
  --soui-menu-item-hover-bg: rgba(0, 0, 0, 0.04);     // 悬停背景色
  --soui-menu-item-active-bg: rgba(0, 0, 0, 0.06);    // 激活背景色
  --soui-menu-item-selected-bg: rgba(24, 144, 255, 0.1); // 选中背景色
  --soui-menu-item-selected-color: #1677ff;          // 选中文本色
  
  // 尺寸变量
  --soui-menu-border-radius: 6px;       // 圆角
  --soui-menu-font-size: 14px;          // 字体大小
  --soui-menu-collapsed-width: 80px;    // 折叠宽度
  --soui-menu-border-color: #f0f0f0;    // 边框颜色
}
```

**使用示例：**

```tsx
<Menu
  items={items}
  style={{
    '--soui-menu-bg-color': '#fafafa',
    '--soui-menu-color-primary': '#eb2f96',
    '--soui-menu-item-selected-bg': 'rgba(235, 47, 150, 0.1)',
    '--soui-menu-border-radius': '12px',
  } as React.CSSProperties}
/>
```

### 暗色主题

Menu 组件内置了暗色主题，通过添加 `soui-menu-dark` 类名即可启用：

```tsx
<Menu
  mode="vertical"
  items={items}
  className="soui-menu-dark"
  popupTheme="dark"  // 弹出层也使用暗色主题
/>
```

暗色主题的默认配色：
- 背景色：`#001529`
- 文本色：`rgba(255, 255, 255, 0.65)`
- 悬停背景：`rgba(255, 255, 255, 0.08)`
- 选中文本：`#fff`

### 自定义主题示例

#### 示例 1：品牌色主题

```tsx
<ConfigProvider
  theme={{
    components: {
      Menu: {
        colorPrimary: '#1890ff',
        itemSelectedBg: 'rgba(24, 144, 255, 0.15)',
        itemSelectedColor: '#1890ff',
        borderRadius: 4,
      },
    },
  }}
>
  <Menu items={items} />
</ConfigProvider>
```

#### 示例 2：柔和风格

```tsx
<Menu
  items={items}
  style={{
    '--soui-menu-bg-color': '#f5f5f5',
    '--soui-menu-item-hover-bg': 'rgba(0, 0, 0, 0.02)',
    '--soui-menu-item-selected-bg': 'rgba(0, 0, 0, 0.04)',
    '--soui-menu-border-radius': '12px',
    '--soui-menu-font-size': '13px',
  } as React.CSSProperties}
/>
```

#### 示例 3：紧凑模式

```tsx
<Menu
  items={items}
  style={{
    '--soui-menu-font-size': '12px',
  } as React.CSSProperties}
/>
```

## FAQ

### 如何在折叠模式下显示完整标签？

折叠模式下，菜单项会自动隐藏文本，只显示图标。当没有图标时，会显示文本的第一个字符。如果需要显示完整的 Tooltip，可以确保菜单项有图标，或者组件会自动包裹 Tooltip。

### 如何实现与路由联动？

使用受控模式，在 `onClick` 回调中调用路由跳转：

```tsx
import { useNavigate } from 'react-router-dom';

const navigate = useNavigate();
const [selectedKeys, setSelectedKeys] = useState([currentPath]);

<Menu
  items={items}
  selectedKeys={selectedKeys}
  onClick={({ key }) => {
    navigate(key);
    setSelectedKeys([key]);
  }}
/>
```

### 如何自定义菜单宽度？

可以通过 CSS 覆盖默认宽度：

```less
.soui-menu-vertical,
.soui-menu-inline {
  width: 200px; // 自定义宽度
}

.soui-menu-inline-collapsed {
  --soui-menu-collapsed-width: 60px; // 自定义折叠宽度
}
```

### 子菜单为什么无法弹出？

检查以下几点：
1. 确保 `mode` 设置为 `'vertical'` 或 `'inline'`
2. 确保子菜单项有 `children` 数组
3. 检查 `popupZIndex` 是否足够高
4. 确认父容器没有 `overflow: hidden`

### 如何实现动态菜单？

可以从后端获取菜单数据，然后转换为 `MenuItemType[]` 格式：

```tsx
const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);

useEffect(() => {
  fetch('/api/menu')
    .then(res => res.json())
    .then(data => {
      // 转换数据格式
      const items = data.map(item => ({
        key: item.id,
        label: item.name,
        icon: item.icon,
        children: item.children?.map(child => ({
          key: child.id,
          label: child.name,
        }))
      }));
      setMenuItems(items);
    });
}, []);

return <Menu items={menuItems} />;
```

## 相关资源

- [Layout 布局](/components/layout) - 与 Menu 配合使用构建完整页面布局
- [Icon 图标](/components/icon) - 为菜单项添加图标
- [Tooltip 文字提示](/components/tooltip) - 折叠菜单的悬停提示
