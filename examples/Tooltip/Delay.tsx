import React from 'react';
import Tooltip from '../../src/components/Tooltip';
import Button from '../../src/components/Button';

const Delay: React.FC = () => {
  return (
    <Tooltip
      title="延迟显示的提示"
      mouseEnterDelay={0.5}
      mouseLeaveDelay={0.3}
    >
      <Button type="primary">延迟显示/隐藏</Button>
    </Tooltip>
  );
};

export default Delay;
