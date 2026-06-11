import React from 'react';
import { Anchor, Space, Typography, Divider } from '../../src';

const { Text } = Typography;

export default () => (
  <div style={{ display: 'flex' }}>
    <div style={{ flex: 1 }}>
      <Space direction="vertical" size={8} style={{ marginBottom: '16px' }}>
        <Text type="warning">
          bounds=100：当锚点目标元素距离视口边界超过 100px 时，高亮自动失效。
        </Text>
        <Text type="secondary">
          向下滚动到页面底部（超出最后一个锚点目标 100px 以上），指示器和激活状态都会消失。
        </Text>
      </Space>
      <div style={{ height: '40px' }} />
      <div
        id="bounds-section-1"
        style={{
          padding: '24px',
          margin: '0 0 16px',
          background: '#f0f5ff',
          borderRadius: '8px',
          border: '1px solid #d6e4ff',
          height: '200px',
        }}
      >
        <h3>特性一</h3>
        <p>bounds 用于限制锚点的监听范围，超出边界时自动取消高亮，避免误触发。</p>
      </div>
      <div
        id="bounds-section-2"
        style={{
          padding: '24px',
          margin: '0 0 16px',
          background: '#f6ffed',
          borderRadius: '8px',
          border: '1px solid #b7eb8f',
          height: '200px',
        }}
      >
        <h3>特性二</h3>
        <p>典型场景：页面中同时有多个锚点区域，每个只在自己的可视范围内生效。</p>
      </div>
      <div
        id="bounds-section-3"
        style={{
          padding: '24px',
          margin: '0 0 16px',
          background: '#fff7e6',
          borderRadius: '8px',
          border: '1px solid #ffd591',
          height: '200px',
        }}
      >
        <h3>特性三</h3>
        <p>当锚点容器滚动回到视口范围内时，高亮和指示器会自动恢复。</p>
      </div>

      {/* 超出 bounds 的演示区域 */}
      <Divider />
      <div
        style={{
          padding: '32px',
          marginBottom: '16px',
          background: '#fff1f0',
          borderRadius: '8px',
          border: '1px solid #ffa39e',
          minHeight: '300px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <Text type="danger" style={{ fontSize: '16px', fontWeight: 500 }}>
          👆 上方锚点高亮已消失
        </Text>
        <Text type="secondary" style={{ marginTop: '8px' }}>
          因为最后一个锚点目标（特性三）距离视口底部已超过 bounds=100 的限制
        </Text>
      </div>
    </div>
    <div style={{ width: '180px', marginLeft: '24px', flexShrink: 0 }}>
      <Anchor
        bounds={100}
        items={[
          { key: '1', href: '#bounds-section-1', title: '特性一' },
          { key: '2', href: '#bounds-section-2', title: '特性二' },
          { key: '3', href: '#bounds-section-3', title: '特性三' },
        ]}
      />
    </div>
  </div>
);
