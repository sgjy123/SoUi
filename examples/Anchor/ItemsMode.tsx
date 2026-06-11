import React from 'react';
import { Anchor } from '../../src';

export default () => {
  const items = [
    {
      key: 'guide',
      href: '#items-guide',
      title: '开发指南',
      children: [
        { key: 'quick', href: '#items-quick', title: '快速上手' },
        { key: 'install', href: '#items-install', title: '安装部署' },
      ],
    },
    {
      key: 'component',
      href: '#items-component',
      title: '组件文档',
      children: [
        { key: 'button', href: '#items-button', title: '按钮 Button' },
        { key: 'input', href: '#items-input', title: '输入框 Input' },
      ],
    },
    {
      key: 'api',
      href: '#items-api',
      title: 'API 参考',
    },
  ];

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <h2 id="items-guide" style={{ margin: '0 0 16px' }}>开发指南</h2>
        <div id="items-quick" style={{ padding: '24px', margin: '0 0 12px', background: '#f0f5ff', borderRadius: '8px', border: '1px solid #d6e4ff', height: '180px' }}>
          <h4>快速上手</h4>
          <p>通过 items 属性可以方便地以数据驱动的方式配置锚点，支持嵌套结构。</p>
        </div>
        <div id="items-install" style={{ padding: '24px', margin: '0 0 16px', background: '#f6ffed', borderRadius: '8px', border: '1px solid #b7eb8f', height: '180px' }}>
          <h4>安装部署</h4>
          <p>使用 npm 或 pnpm 安装 SoUi，在项目中引入 Anchor 组件。</p>
        </div>
        <h2 id="items-component" style={{ margin: '24px 0 16px' }}>组件文档</h2>
        <div id="items-button" style={{ padding: '24px', margin: '0 0 12px', background: '#fff7e6', borderRadius: '8px', border: '1px solid #ffd591', height: '180px' }}>
          <h4>按钮 Button</h4>
          <p>按钮用于触发一个操作，如提交表单、确认对话框等。</p>
        </div>
        <div id="items-input" style={{ padding: '24px', margin: '0 0 16px', background: '#fff0f6', borderRadius: '8px', border: '1px solid #ffadd2', height: '180px' }}>
          <h4>输入框 Input</h4>
          <p>通过鼠标或键盘输入内容，是最基础的表单域的包装。</p>
        </div>
        <h2 id="items-api" style={{ margin: '24px 0 16px' }}>API 参考</h2>
        <div style={{ padding: '24px', margin: '0 0 16px', background: '#f5f5f5', borderRadius: '8px', border: '1px solid #d9d9d9', height: '180px' }}>
          <h4>API 参考</h4>
          <p>详细的属性、方法和事件说明，帮助开发者更好地使用组件。</p>
        </div>
      </div>
      <div style={{ width: '180px', marginLeft: '24px', flexShrink: 0 }}>
        <Anchor items={items} />
      </div>
    </div>
  );
};
