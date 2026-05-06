import React from 'react';
import Tooltip from '../../src/components/Tooltip';
import Button from '../../src/components/Button';
import Space from '../../src/components/Space';

const Basic: React.FC = () => {
  return (
    <Space wrap>
      <Tooltip title="这是一个提示">
        <Button>悬停显示提示</Button>
      </Tooltip>
      <Tooltip title="点击触发" trigger="click">
        <Button type="primary">点击显示</Button>
      </Tooltip>
    </Space>
  );
};

export default Basic;
