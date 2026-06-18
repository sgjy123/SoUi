import React from 'react';
import { Progress, Space } from '../../src';

const Steps: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Progress percent={30} steps={5} />
      <Progress percent={50} steps={5} status="active" />
      <Progress percent={70} steps={5} status="exception" />
      <Progress percent={100} steps={5} />
      <Progress percent={60} steps={8} />
    </Space>
  );
};

export default Steps;
