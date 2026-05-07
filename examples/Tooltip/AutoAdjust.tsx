import React from 'react';
import Tooltip from '../../src/components/Tooltip';
import Button from '../../src/components/Button';
import Space from '../../src/components/Space';

const AutoAdjust: React.FC = () => {
  return (
    <Space wrap>
      <Tooltip title="自动调整位置" autoAdjustOverflow>
        <Button>自动调整（默认）</Button>
      </Tooltip>
      <Tooltip title="不自动调整位置" autoAdjustOverflow={false}>
        <Button type="primary">手动调整</Button>
      </Tooltip>
    </Space>
  );
};

export default AutoAdjust;
