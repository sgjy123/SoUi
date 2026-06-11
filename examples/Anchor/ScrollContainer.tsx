import React, { useRef } from 'react';
import { Anchor, Space, Typography } from '../../src';

const { Text } = Typography;

export default () => {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div style={{ display: 'flex', gap: '24px' }}>
      <div style={{ flex: 1 }}>
        <Space direction="vertical" size={8} style={{ marginBottom: '16px' }}>
          <Text type="success">
            锚点监听自定义滚动容器，而非 window 滚动。
          </Text>
          <Text type="secondary">
            通过 getContainer 指定滚动容器，适合侧边栏、抽屉等非页面级的锚点场景。
          </Text>
        </Space>
        <div
          ref={containerRef}
          style={{
            maxHeight: '480px',
            overflow: 'auto',
            border: '2px solid #1677ff',
            borderRadius: '12px',
            padding: '16px',
            background: '#fafbfc',
          }}
        >
          <div
            id="scroll-section-1"
            style={{
              padding: '24px',
              margin: '0 0 16px',
              background: '#f0f5ff',
              borderRadius: '8px',
              border: '1px solid #d6e4ff',
              height: '240px',
            }}
          >
            <h3>快速开始</h3>
            <p>在弹窗、抽屉、面板等独立滚动容器中，锚点仍能正常工作。</p>
          </div>
          <div
            id="scroll-section-2"
            style={{
              padding: '24px',
              margin: '0 0 16px',
              background: '#f6ffed',
              borderRadius: '8px',
              border: '1px solid #b7eb8f',
              height: '240px',
            }}
          >
            <h3>安装配置</h3>
            <p>getContainer 返回对应的 DOM 元素即可，组件会自动绑定滚动监听。</p>
          </div>
          <div
            id="scroll-section-3"
            style={{
              padding: '24px',
              margin: '0 0 16px',
              background: '#fff7e6',
              borderRadius: '8px',
              border: '1px solid #ffd591',
              height: '240px',
            }}
          >
            <h3>常见问题</h3>
            <p>确保容器设置了 overflow: auto 或 overflow: scroll。</p>
          </div>
          <div
            id="scroll-section-4"
            style={{
              padding: '24px',
              margin: '0 0 16px',
              background: '#fff0f6',
              borderRadius: '8px',
              border: '1px solid #ffadd2',
              height: '240px',
            }}
          >
            <h3>进阶用法</h3>
            <p>结合 bounds 和 offsetTop，在容器内部精确控制锚点行为。</p>
          </div>
        </div>
      </div>
      <div style={{ width: '160px', flexShrink: 0 }}>
        <div
          style={{
            position: 'sticky',
            top: '16px',
          }}
        >
          <Text strong style={{ marginBottom: '8px', display: 'block' }}>
            容器内导航
          </Text>
          <Anchor
            getContainer={() => containerRef.current || window}
            items={[
              { key: '1', href: '#scroll-section-1', title: '快速开始' },
              { key: '2', href: '#scroll-section-2', title: '安装配置' },
              { key: '3', href: '#scroll-section-3', title: '常见问题' },
              { key: '4', href: '#scroll-section-4', title: '进阶用法' },
            ]}
          />
        </div>
      </div>
    </div>
  );
};
