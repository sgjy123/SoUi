import React from 'react';
import Space from '../../src/components/Space';
import Button from '../../src/components/Button';

const Size: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Space size="small">
        <Button>小间距</Button>
        <Button>小间距</Button>
        <Button>小间距</Button>
      </Space>
      <Space size="middle">
        <Button>中间距</Button>
        <Button>中间距</Button>
        <Button>中间距</Button>
      </Space>
      <Space size="large">
        <Button>大间距</Button>
        <Button>大间距</Button>
        <Button>大间距</Button>
      </Space>
      <Space size={40}>
        <Button>自定义40px</Button>
        <Button>自定义40px</Button>
        <Button>自定义40px</Button>
      </Space>
    </div>
  );
};

export default Size;
