import React from 'react';
import { Anchor, Space, Typography } from '../../src';

const { Text } = Typography;

export default () => (
  <div style={{ display: 'flex' }}>
    <div style={{ flex: 1 }}>
      <Space direction="vertical" size={8} style={{ marginBottom: '16px' }}>
        <Text type="success">
          点击锚点只会 <code>replaceState</code>，不会在浏览器历史中新增记录。
        </Text>
        <Text type="secondary">
          content.split('\n')对比：不开启 replace 时点击回去按钮会逐锚点回退。开启后点击锚点不产生历史。
        </Text>
      </Space>
      <div
        id="replace-section-1"
        style={{
          padding: '24px',
          margin: '0 0 16px',
          background: '#f0f5ff',
          borderRadius: '8px',
          border: '1px solid #d6e4ff',
          height: '260px',
        }}
      >
        <h3>页面布局</h3>
        <p>replace 模式下，点击锚点不会在浏览器历史中留下记录，适合文档浏览场景。</p>
      </div>
      <div
        id="replace-section-2"
        style={{
          padding: '24px',
          margin: '0 0 16px',
          background: '#f6ffed',
          borderRadius: '8px',
          border: '1px solid #b7eb8f',
          height: '260px',
        }}
      >
        <h3>表单操作</h3>
        <p>避免 navigator.history 大量冗余记录，提升返回操作的体验。</p>
      </div>
      <div
        id="replace-section-3"
        style={{
          padding: '24px',
          margin: '0 0 16px',
          background: '#fff7e6',
          borderRadius: '8px',
          border: '1px solid #ffd591',
          height: '260px',
        }}
      >
        <h3>数据请求</h3>
        <p>也可对单个 AnchorItem 设置 replace，实现更灵活的历史记录控制。</p>
      </div>
    </div>
    <div style={{ width: '160px', marginLeft: '24px', flexShrink: 0 }}>
      <Anchor
        replace
        items={[
          { key: '1', href: '#replace-section-1', title: '页面布局' },
          { key: '2', href: '#replace-section-2', title: '表单操作' },
          { key: '3', href: '#replace-section-3', title: '数据请求' },
        ]}
      />
    </div>
  </div>
);
