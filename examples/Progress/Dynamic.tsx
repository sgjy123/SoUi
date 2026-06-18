import React, { useState } from 'react';
import { Progress, Button, Space } from '../../src';
import type { ProgressStatus } from 'components/Progress';

const Dynamic: React.FC = () => {
  const [percent, setPercent] = useState(0);
  const [status, setStatus] = useState<ProgressStatus>('active');

  const increase = () => {
    setPercent((prev) => {
      if (prev + 10 < 100) {
          setStatus('active');
      } else {
          setStatus('success');
      }
     return  Math.min(100, prev + 10)
    });
  };

  const decrease = () => {
    setPercent((prev) => {
      if (prev + 10 < 100) {
          setStatus('active');
      } else {
          setStatus('success');
      }
     return  Math.max(0, prev - 10)
    });
  };

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Progress percent={percent} status={status} />
      <Progress type="circle" percent={percent} status={status} />
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
