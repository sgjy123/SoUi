import React from "react";
import { Menu } from "../../src";

/**
 * @title 暗色主题
 * @description 深色背景下的菜单样式
 */
export default () => {
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
};
