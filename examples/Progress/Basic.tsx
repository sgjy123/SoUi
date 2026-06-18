import React from 'react';
import { Progress, Space } from '../../src';

const Basic: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Progress percent={30} />
      <Progress percent={50} status="active" />
      <Progress percent={70} status="exception" />
      <Progress percent={100} status="success" />
      <Progress percent={50} showInfo={false} />
    </Space>
  );
};

export default Basic;
