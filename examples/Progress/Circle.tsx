import React from 'react';
import { Progress, Space } from '../../src';

const Circle: React.FC = () => {
  return (
    <Space size={24} wrap>
      <Progress type="circle" percent={75} />
      <Progress type="circle" percent={70} status="exception" />
      <Progress type="circle" percent={100} status='success' />
      <Progress type="circle" percent={50} status="active" />
    </Space>
  );
};

export default Circle;
