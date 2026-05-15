import React from "react";
import { Menu } from "../../src";

/**
 * @title 折叠菜单
 * @description 侧边栏收起时只显示图标
 */
export default () => {
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
};
