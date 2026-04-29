import React from 'react';
import Button from '../../src/components/Button';
import Space from '../../src/components/Space';

const Status: React.FC = () => {
  return (
    <Space wrap>
      <Button loading type="primary">加载中</Button>
      <Button loading>加载中</Button>
      <Button disabled type="primary">禁用</Button>
      <Button disabled>禁用</Button>
      <Button danger type="primary">危险</Button>
      <Button danger>危险</Button>
    </Space>
  );
};

export default Status;
