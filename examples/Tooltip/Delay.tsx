import React from 'react';
import Tooltip from '../../src/components/Tooltip';
import Button from '../../src/components/Button';
import Space from '../../src/components/Space';

const Delay: React.FC = () => {
  return (
    <Space wrap>
      <Tooltip title="延迟 0.5 秒显示" mouseEnterDelay={0.5}>
        <Button>延迟显示</Button>
      </Tooltip>
      <Tooltip title="延迟 1 秒隐藏" mouseLeaveDelay={1}>
        <Button type="primary">延迟隐藏</Button>
      </Tooltip>
    </Space>
  );
};

export default Delay;
