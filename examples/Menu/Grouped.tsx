import React from "react";
import { Menu } from "../../src";

/**
 * @title 分组菜单
 * @description 带有分组的菜单结构
 */
export default () => {
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
};
