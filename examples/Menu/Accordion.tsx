import React from "react";
import { Menu } from "../../src";

/**
 * @title 手风琴模式
 * @description 同一时刻只能展开一个子菜单
 */
export default () => {
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
};
