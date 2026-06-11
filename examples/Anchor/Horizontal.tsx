import React from 'react';
import { Anchor } from '../../src';

export default () => (
  <div>
    <div style={{ marginBottom: '24px' }}>
      <Anchor
        direction="horizontal"
        items={[
          { key: '1', href: '#h-section-1', title: '功能特性' },
          { key: '2', href: '#h-section-2', title: '技术架构' },
          { key: '3', href: '#h-section-3', title: '使用指南' },
          { key: '4', href: '#h-section-4', title: '常见问题' },
        ]}
      />
    </div>
    <div id="h-section-1" style={{ padding: '32px', margin: '0 0 16px', background: '#f0f5ff', borderRadius: '8px', border: '1px solid #d6e4ff', height: '200px' }}>
      <h3>功能特性</h3>
      <p>水平锚点适合用于顶部导航或者横向排列的内容区域。</p>
    </div>
    <div id="h-section-2" style={{ padding: '32px', margin: '0 0 16px', background: '#f6ffed', borderRadius: '8px', border: '1px solid #b7eb8f', height: '200px' }}>
      <h3>技术架构</h3>
      <p>基于 React + TypeScript + Less，支持主题定制和响应式布局。</p>
    </div>
    <div id="h-section-3" style={{ padding: '32px', margin: '0 0 16px', background: '#fff7e6', borderRadius: '8px', border: '1px solid #ffd591', height: '200px' }}>
      <h3>使用指南</h3>
      <p>支持 items 数据化配置和 Anchor.Link 两种使用方式。</p>
    </div>
    <div id="h-section-4" style={{ padding: '32px', margin: '0 0 16px', background: '#fff0f6', borderRadius: '8px', border: '1px solid #ffadd2', height: '200px' }}>
      <h3>常见问题</h3>
      <p>查看 FAQ 获取更详细的使用帮助和技术支持。</p>
    </div>
  </div>
);
