import React from 'react';
import { Anchor } from '../../src';

export default () => (
  <div style={{ display: 'flex' }}>
    <div style={{ flex: 1, marginBottom: '124px'}}>
      <div id="static-section-1" style={{ padding: '24px', margin: '0 0 100px', background: '#f0f5ff', borderRadius: '8px', border: '1px solid #d6e4ff', height: '200px' }}>
        <h3>设计原则</h3>
        <p>静态锚点不随页面滚动而固定定位，保持原始位置。</p>
      </div>
      <div id="static-section-2" style={{ padding: '24px', margin: '0 0 100px', background: '#f6ffed', borderRadius: '8px', border: '1px solid #b7eb8f', height: '200px' }}>
        <h3>组件规范</h3>
        <p>遵循 SoUi 设计规范，保持与现有组件一致的设计语言。</p>
      </div>
      <div id="static-section-3" style={{ padding: '24px', margin: '0 0 100px', background: '#fff7e6', borderRadius: '8px', border: '1px solid #ffd591', height: '200px' }}>
        <h3>主题定制</h3>
        <p>支持通过 ConfigProvider 进行全局和组件级主题配置。</p>
      </div>
    </div>
    <div style={{ width: '160px', marginLeft: '24px', flexShrink: 0 }}>
      <Anchor
        affix={false}
        showInkInFixed
        items={[
          { key: '1', href: '#static-section-1', title: '设计原则' },
          { key: '2', href: '#static-section-2', title: '组件规范' },
          { key: '3', href: '#static-section-3', title: '主题定制' },
        ]}
      />
    </div>
  </div>
);
