import React from 'react';
import Space from '../../src/components/Space';
import Button from '../../src/components/Button';

const Align: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px' }}>align="start"（顶部对齐）</h4>
        <Space align="start" style={{ height: '80px', background: '#fafafa', padding: '8px' }}>
          <Button>短按钮</Button>
          <Button size="large">长文本按钮</Button>
          <Button size="small">小按钮</Button>
        </Space>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px' }}>align="center"（居中对齐，默认）</h4>
        <Space align="center" style={{ height: '80px', background: '#fafafa', padding: '8px' }}>
          <Button>短按钮</Button>
          <Button size="large">长文本按钮</Button>
          <Button size="small">小按钮</Button>
        </Space>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px' }}>align="end"（底部对齐）</h4>
        <Space align="end" style={{ height: '80px', background: '#fafafa', padding: '8px' }}>
          <Button>短按钮</Button>
          <Button size="large">长文本按钮</Button>
          <Button size="small">小按钮</Button>
        </Space>
      </div>
    </div>
  );
};

export default Align;
