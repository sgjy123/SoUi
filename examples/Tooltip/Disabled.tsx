import React from 'react';
import Tooltip from '../../src/components/Tooltip';
import Button from '../../src/components/Button';
import Space from '../../src/components/Space';

const Disabled: React.FC = () => {
  return (
    <Space wrap>
      <Tooltip title="正常状态">
        <Button>正常按钮</Button>
      </Tooltip>
      <Tooltip title="已禁用" disabled>
        <Button disabled>禁用按钮</Button>
      </Tooltip>
    </Space>
  );
};

export default Disabled;
