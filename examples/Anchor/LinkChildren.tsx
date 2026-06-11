import React from 'react';
import { Anchor, Space, Typography } from '../../src';

const { Text } = Typography;

export default () => (
  <div style={{ display: 'flex' }}>
    <div style={{ flex: 1 }}>
      <Space direction="vertical" size={8} style={{ marginBottom: '16px' }}>
        <Text type="secondary">
          使用 <code>&lt;Anchor.Link&gt;</code> 子组件方式配置锚点，而非 items 属性。
        </Text>
        <Text type="secondary">
          适合需要自定义渲染逻辑、动态添加/移除锚点的场景。
        </Text>
      </Space>
      <div
        id="link-section-1"
        style={{
          padding: '24px',
          margin: '0 0 16px',
          background: '#f0f5ff',
          borderRadius: '8px',
          border: '1px solid #d6e4ff',
          height: '260px',
        }}
      >
        <h3>基础用法</h3>
        <p>通过 Anchor.Link 可以直接定义每一个锚点，支持嵌套子锚点。</p>
      </div>
      <div
        id="link-section-2"
        style={{
          padding: '24px',
          margin: '0 0 16px',
          background: '#f6ffed',
          borderRadius: '8px',
          border: '1px solid #b7eb8f',
          height: '260px',
        }}
      >
        <h3>动态渲染</h3>
        <p>在 children 模式下可以灵活插入其他 React 元素，适合复杂布局需求。</p>
      </div>
      <div
        id="link-section-3"
        style={{
          padding: '24px',
          margin: '0 0 16px',
          background: '#fff7e6',
          borderRadius: '8px',
          border: '1px solid #ffd591',
          height: '260px',
        }}
      >
        <h3>子锚点</h3>
        <p>Anchor.Link 内可嵌套其他 Anchor.Link，形成多级目录结构。</p>
      </div>
      {/* 子锚点对应的内容 */}
      <div
        id="link-sub-1"
        style={{
          padding: '16px 24px',
          margin: '0 0 12px 32px',
          background: '#e6f7ff',
          borderRadius: '8px',
          border: '1px solid #91d5ff',
          height: '120px',
        }}
      >
        <h4>子锚点 1</h4>
        <p>这是嵌套锚点对应的内容区域。</p>
      </div>
      <div
        id="link-sub-2"
        style={{
          padding: '16px 24px',
          margin: '0 0 16px 32px',
          background: '#e6f7ff',
          borderRadius: '8px',
          border: '1px solid #91d5ff',
          height: '120px',
        }}
      >
        <h4>子锚点 2</h4>
        <p>二级锚点同样支持滚动监听和高亮。</p>
      </div>
    </div>
    <div style={{ width: '180px', marginLeft: '24px', flexShrink: 0 }}>
      <Anchor>
        <Anchor.Link href="#link-section-1" title="基础用法" />
        <Anchor.Link href="#link-section-2" title="动态渲染" />
        <Anchor.Link href="#link-section-3" title="子锚点">
          <Anchor.Link href="#link-sub-1" title="子锚点 1" />
          <Anchor.Link href="#link-sub-2" title="子锚点 2" />
        </Anchor.Link>
      </Anchor>
    </div>
  </div>
);
