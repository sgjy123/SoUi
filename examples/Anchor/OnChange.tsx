import React, { useState } from 'react';
import { Anchor, Space, Typography } from '../../src';

const { Text } = Typography;

export default () => {
  const [activeSection, setActiveSection] = useState<string>('#section-1');

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flex: 1 }}>
        <Space direction="vertical" size={12} style={{ marginBottom: '16px' }}>
          <Text>当前高亮锚点：</Text>
          <Text type="success">
            <code>{activeSection}</code>
          </Text>
          <Text type="secondary">
            滚动页面或点击锚点，下方会实时显示当前激活的链接
          </Text>
        </Space>
        <div
          id="onchange-section-1"
          style={{
            padding: '24px',
            margin: '0 0 16px',
            background: '#f0f5ff',
            borderRadius: '8px',
            border: '1px solid #d6e4ff',
            height: '280px',
          }}
        >
          <h3>第一节：入门</h3>
          <p>滚动时 onChange 事件会触发，返回当前激活的锚点 href。</p>
        </div>
        <div
          id="onchange-section-2"
          style={{
            padding: '24px',
            margin: '0 0 16px',
            background: '#f6ffed',
            borderRadius: '8px',
            border: '1px solid #b7eb8f',
            height: '280px',
          }}
        >
          <h3>第二节：进阶</h3>
          <p>可用于与面包屑联动、目录高亮同步等场景。</p>
        </div>
        <div
          id="onchange-section-3"
          style={{
            padding: '24px',
            margin: '0 0 16px',
            background: '#fff7e6',
            borderRadius: '8px',
            border: '1px solid #ffd591',
            height: '280px',
          }}
        >
          <h3>第三节：最佳实践</h3>
          <p>配合 getCurrentAnchor 实现完全自定义的高亮逻辑。</p>
        </div>
      </div>
      <div style={{ width: '160px', marginLeft: '24px', flexShrink: 0 }}>
        <Anchor
          onChange={(link) => setActiveSection(link)}
          items={[
            { key: '1', href: '#onchange-section-1', title: '第一节：入门' },
            { key: '2', href: '#onchange-section-2', title: '第二节：进阶' },
            { key: '3', href: '#onchange-section-3', title: '第三节：最佳实践' },
          ]}
        />
      </div>
    </div>
  );
};
