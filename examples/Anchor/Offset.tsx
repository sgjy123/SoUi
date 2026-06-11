import React from 'react';
import { Anchor, Space, Typography } from '../../src';

const { Text } = Typography;

export default () => (
  <div style={{ display: 'flex' }}>
    <div style={{ flex: 1 }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 10,
          background: '#ff4d4f',
          color: '#fff',
          padding: '16px 24px',
          borderRadius: '8px',
          marginBottom: '16px',
          textAlign: 'center',
          fontWeight: 'bold',
        }}
      >
        模拟固定顶栏（高度 60px）
      </div>
      <Space direction="vertical" size={8} style={{ marginBottom: '16px' }}>
        <Text type="secondary">
          offsetTop=80：当锚点距离窗口顶部 80px 时才触发固定。
        </Text>
        <Text type="secondary">
          targetOffset=60：点击跳转时预留 60px 偏移，避免被固定顶栏遮挡。
        </Text>
      </Space>
      <div
        id="offset-section-1"
        style={{
          padding: '24px',
          margin: '0 0 16px',
          background: '#f0f5ff',
          borderRadius: '8px',
          border: '1px solid #d6e4ff',
          height: '260px',
        }}
      >
        <h3>概览</h3>
        <p>当页面存在固定顶栏时，需要设置 targetOffset 避免内容被遮挡。</p>
      </div>
      <div
        id="offset-section-2"
        style={{
          padding: '24px',
          margin: '0 0 16px',
          background: '#f6ffed',
          borderRadius: '8px',
          border: '1px solid #b7eb8f',
          height: '260px',
        }}
      >
        <h3>API 设计</h3>
        <p>targetOffset 默认与 offsetTop 保持一致，也可以单独指定。</p>
      </div>
      <div
        id="offset-section-3"
        style={{
          padding: '24px',
          margin: '0 0 16px',
          background: '#fff7e6',
          borderRadius: '8px',
          border: '1px solid #ffd591',
          height: '260px',
        }}
      >
        <h3>注意事项</h3>
        <p>点击锚点跳转后会平滑滚动并预留偏移量，确保内容区域完整可见。</p>
      </div>
    </div>
    <div style={{ width: '180px', marginLeft: '24px', flexShrink: 0 }}>
      <Anchor
        offsetTop={80}
        targetOffset={60}
        items={[
          { key: '1', href: '#offset-section-1', title: '概览' },
          { key: '2', href: '#offset-section-2', title: 'API 设计' },
          { key: '3', href: '#offset-section-3', title: '注意事项' },
        ]}
      />
    </div>
  </div>
);
