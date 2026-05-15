import React from "react";
import { Menu } from "../../src";

/**
 * @title 水平菜单
 * @description 顶部导航栏式的水平菜单布局
 */
export default () => {
  const items = [
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

  return <Menu mode="horizontal" items={items} />;
};
