import React, { useState } from 'react';
import { docsConfig, MenuItem } from './config';
import { useExampleLoader } from './useExampleLoader';
import DemoContainer from '../../examples/DemoContainer';
import ConfigProvider from '../components/ConfigProvider';
import './style.less'; // 稍后我们会创建这个样式文件

const DocsLayout: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string>(docsConfig[0].items[0].key);

  // 找到当前激活的菜单项
  const activeItem = docsConfig.flatMap((g: any) => g.items).find((i: any) => i.key === activeKey);

  // 动态加载当前示例
  const { Component, code } = useExampleLoader(
    activeItem?.componentPath || '', 
    activeItem?.exampleName || ''
  );

  return (
    <ConfigProvider>
      <div className="soui-docs-layout">
        {/* 侧边栏 */}
        <aside className="soui-docs-sidebar">
          <div className="soui-docs-logo">SoUi Docs</div>
          <div className="soui-docs-menu">
            {docsConfig.map((group: any) => (
              <div key={group.title} className="soui-docs-group">
                <h4>{group.title}</h4>
                <ul>
                  {group.items.map((item: any) => (
                    <li
                      key={item.key}
                      className={`soui-docs-item ${activeKey === item.key ? 'active' : ''}`}
                      onClick={() => setActiveKey(item.key)}
                    >
                      {item.label}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        {/* 内容区 */}
        <main className="soui-docs-content">
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
        </main>
      </div>
    </ConfigProvider>
  );
};

export default DocsLayout;
