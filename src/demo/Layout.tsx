import React, { useState } from "react";
import { docsConfig, ComponentConfig } from "./config";
import { useExampleLoader } from "./useExampleLoader";
import DemoContainer from "../../examples/DemoContainer";
import ConfigProvider from "../components/ConfigProvider";
import Layout from "../components/Layout";
import Menu from "../components/Menu";
import Icon from "../components/Icon";
import { ThemeProviderWrapper } from "./ThemeSwitcher";
import "./style.less";

const DocsLayout: React.FC = () => {
  // 当前选中的大类 key
  const [activeGroupKey, setActiveGroupKey] = useState<string>(
    docsConfig[0].title,
  );
  // 当前展开的大类 keys
  const [openKeys, setOpenKeys] = useState<string[]>([docsConfig[0].title]);
  // 当前选中的组件 key
  const [activeComponentKey, setActiveComponentKey] = useState<string>(
    docsConfig[0].components[0].key,
  );
  // 当前选中的具体案例 key
  const [activeKey, setActiveKey] = useState<string>(
    docsConfig[0].components[0].items[0].key,
  );

  // 获取当前大类
  const activeGroup = docsConfig.find((g) => g.title === activeGroupKey);
  // 获取当前组件
  const activeComponent = activeGroup?.components.find(
    (c) => c.key === activeComponentKey,
  );
  // 获取当前案例项
  const activeItem = activeComponent?.items.find((i) => i.key === activeKey);

  // 加载组件和代码
  const { Component, code } = useExampleLoader(
    activeItem?.componentPath || "",
    activeItem?.exampleName || "",
  );

  // 左侧菜单 - 使用嵌套结构（大类 -> 组件）
  const menuItems = docsConfig.map((group) => ({
    key: group.title,
    label: group.title,
    icon: group.icon,
    children: group.components.map((comp) => ({
      key: comp.key,
      label: comp.label,
      icon: comp.icon,
    })),
  }));

  // 右侧悬浮子菜单 - 显示当前组件下的所有案例
  const subMenuItems =
    activeComponent?.items.map((item) => ({
      key: item.key,
      label: item.label,
    })) || [];

  return (
    <ThemeProviderWrapper>
      <Layout hasSider style={{ minHeight: '100vh', borderRadius: '8px', overflow: 'hidden' }}>
        {/* 左侧菜单 */}
        <Layout.Sider width={256}
          style={{
            background: '#fff',
            color: '#fff',
          }}>
          <Menu
            items={menuItems}
            mode="inline"
            selectedKeys={[activeComponentKey]}
            openKeys={openKeys}
            accordion
            onOpenChange={(keys) => setOpenKeys(keys)}
            onClick={({ key }) => {
              // key 是组件的 key
              setActiveComponentKey(key);

              // 找到该组件所属的大类和第一个案例
              for (const group of docsConfig) {
                const comp = group.components.find((c) => c.key === key);
                if (comp) {
                  setActiveGroupKey(group.title);
                  // 展开该大类
                  if (!openKeys.includes(group.title)) {
                    setOpenKeys([...openKeys, group.title]);
                  }
                  // 选中第一个案例
                  if (comp.items.length > 0) {
                    setActiveKey(comp.items[0].key);
                  }
                  break;
                }
              }
            }}
          />
        </Layout.Sider>
        <Layout style={{ padding: '0 224px 0 24px' }}>
          {/* 中间内容区 */}
          <Layout.Content className="soui-docs-content">
            {activeItem && Component ? (
              <DemoContainer
                title={activeItem.label}
                description={activeItem.description}
                code={code}
                component={Component}
              />
            ) : (
              <div className="soui-docs-empty">请选择一个组件示例</div>
            )}
          </Layout.Content>
          {/* 右侧悬浮子菜单 */}
          <div className="soui-docs-submenu">
            <div className="soui-docs-submenu-header">
              <Icon name="List" size={16} />
              <span>{activeComponent?.label}</span>
            </div>
            <Menu
              items={subMenuItems}
              mode="inline"
              selectedKeys={[activeKey]}
              onClick={({ key }) => setActiveKey(key)}
            />
          </div>
        </Layout>
      </Layout>
    </ThemeProviderWrapper>
  );
};

export default DocsLayout;
