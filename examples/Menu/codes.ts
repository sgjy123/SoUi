// Menu 组件示例代码字符串

export const basicCode = `const items = [
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

return <Menu mode="vertical" items={items} />;`;

export const iconMenuCode = `const items = [
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

return <Menu mode="vertical" items={items} />;`;

export const horizontalCode = `const items = [
  { key: "home", label: "首页" },
  { key: "docs", label: "文档" },
  { key: "components", label: "组件库" },
  {
    key: "more",
    label: "更多",
    children: [
      { key: "github", label: "GitHub" },
      { key: "changelog", label: "更新日志" },
      { key: "faq", label: "常见问题" },
    ],
  },
];

return <Menu mode="horizontal" items={items} />;`;

export const collapsedCode = `const [collapsed, setCollapsed] = React.useState(false);

const items = [
  { key: "home", label: "首页", icon: "Home" },
  { key: "user", label: "用户管理", icon: "User" },
  { key: "order", label: "订单管理", icon: "ShoppingBag" },
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
    <button onClick={() => setCollapsed(!collapsed)}>
      {collapsed ? "展开菜单" : "折叠菜单"}
    </button>
    <Menu
      items={items}
      inlineCollapsed={collapsed}
      defaultSelectedKeys={["home"]}
    />
  </div>
);`;

export const accordionCode = `const items = [
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

return <Menu mode="inline" items={items} accordion defaultOpenKeys={["user"]} />;`;

export const groupedCode = `const items = [
  {
    key: "nav",
    type: "group",
    label: "导航",
    children: [
      { key: "home", label: "首页" },
      { key: "about", label: "关于我们" },
      { key: "contact", label: "联系我们" },
    ],
  },
  {
    key: "dashboard",
    type: "group",
    label: "控制台",
    children: [
      { key: "analytics", label: "数据分析" },
      { key: "reports", label: "报表管理" },
    ],
  },
];

return <Menu mode="vertical" items={items} />;`;

export const darkThemeCode = `const items = [
  { key: "home", label: "首页", icon: "Home" },
  { key: "user", label: "用户管理", icon: "User" },
  { key: "order", label: "订单管理", icon: "ShoppingBag" },
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
    mode="vertical"
    items={items}
    className="soui-menu-dark"
    defaultSelectedKeys={["home"]}
  />
);`;

export const controlledCode = `const [selectedKeys, setSelectedKeys] = React.useState(["home"]);
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
);`;
