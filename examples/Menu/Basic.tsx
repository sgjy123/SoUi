import React from "react";
import { Menu } from "../../src";

/**
 * @title 基础用法
 * @description 最简单的菜单用法，展示垂直菜单的基本结构
 */
export default () => {
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
};
