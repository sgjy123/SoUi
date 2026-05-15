import React from "react";
import { Menu } from "../../src";

/**
 * @title 受控菜单
 * @description 完全控制菜单的选中状态和展开状态
 */
export default () => {
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
};
