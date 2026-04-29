import React from 'react';
import Space from '../../src/components/Space';
import Button from '../../src/components/Button';

const Block: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <div>
        <h4 style={{ marginBottom: '8px' }}>非块级（inline-flex）</h4>
        <Space style={{ background: '#f0f0f0', padding: '8px' }}>
          <Button type="primary">按钮1</Button>
          <Button>按钮2</Button>
        </Space>
        <p style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
          灰色背景区域仅包裹内容
        </p>
      </div>
      <div>
        <h4 style={{ marginBottom: '8px' }}>块级（flex，占据整行）</h4>
        <Space block style={{ background: '#e6f7ff', padding: '8px' }}>
          <Button type="primary">按钮1</Button>
          <Button>按钮2</Button>
        </Space>
        <p style={{ fontSize: '12px', color: '#999', marginTop: '4px' }}>
          蓝色背景区域占据整行
        </p>
      </div>
    </div>
  );
};

export default Block;
