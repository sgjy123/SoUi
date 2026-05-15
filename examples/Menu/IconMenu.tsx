import React from "react";
import { Menu } from "../../src";

/**
 * @title 图标菜单
 * @description 为菜单项添加图标，增强视觉识别度
 */
export default () => {
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
};
