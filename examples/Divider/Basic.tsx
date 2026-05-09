import React from 'react';
import Divider from '../../src/components/Divider';
import Space from '../../src/components/Space';

const Basic: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <p>第一段内容</p>
      <Divider />
      <p>第二段内容</p>
      <Divider dashed />
      <p>第三段内容（虚线分割）</p>
    </Space>
  );
};

export default Basic;
