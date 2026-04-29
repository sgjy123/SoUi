import React from 'react';
import Space from '../../src/components/Space';
import Button from '../../src/components/Button';

const Basic: React.FC = () => {
  return (
    <Space>
      <Button type="primary">主要按钮</Button>
      <Button>默认按钮</Button>
      <Button type="dashed">虚线按钮</Button>
      <Button type="link">链接按钮</Button>
    </Space>
  );
};

export default Basic;
