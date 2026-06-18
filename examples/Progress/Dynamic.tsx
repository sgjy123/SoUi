import React, { useState } from 'react';
import { Progress, Button, Space } from '../../src';

const Dynamic: React.FC = () => {
  const [percent, setPercent] = useState(0);

  const increase = () => {
    setPercent((prev) => Math.min(100, prev + 10));
  };

  const decrease = () => {
    setPercent((prev) => Math.max(0, prev - 10));
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Progress percent={percent} />
      <Progress type="circle" percent={percent} />
      <Space>
        <Button onClick={decrease} disabled={percent === 0}>
          减少
        </Button>
        <Button onClick={increase} type="primary" disabled={percent === 100}>
          增加
        </Button>
      </Space>
    </Space>
  );
};

export default Dynamic;
