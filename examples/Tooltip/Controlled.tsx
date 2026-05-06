import React, { useState } from 'react';
import Tooltip from '../../src/components/Tooltip';
import Button from '../../src/components/Button';
import Space from '../../src/components/Space';

const Controlled: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <Space direction="vertical">
      <Tooltip
        title="受控模式的提示框"
        open={open}
        onOpenChange={(visible) => setOpen(visible)}
      >
        <Button>受控模式（当前：{open ? '显示' : '隐藏'}）</Button>
      </Tooltip>
      <Button onClick={() => setOpen(!open)}>
        切换显示状态
      </Button>
    </Space>
  );
};

export default Controlled;
