import React from 'react';
import Tooltip from '../../src/components/Tooltip';
import Button from '../../src/components/Button';
import Space from '../../src/components/Space';

const Trigger: React.FC = () => {
  return (
    <Space wrap>
      <Tooltip title="悬停触发" trigger="hover">
        <Button>Hover</Button>
      </Tooltip>
      <Tooltip title="聚焦触发" trigger="focus">
        <Button>Focus</Button>
      </Tooltip>
      <Tooltip title="点击触发" trigger="click">
        <Button>Click</Button>
      </Tooltip>
      <Tooltip title="右键触发" trigger="contextMenu">
        <Button>Context Menu</Button>
      </Tooltip>
    </Space>
  );
};

export default Trigger;
