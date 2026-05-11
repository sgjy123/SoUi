import React, { useState } from 'react';
import { Tooltip, Button } from '../../src';

export default () => {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip title="受控模式" open={open} onOpenChange={setOpen}>
      <Button onClick={() => setOpen(!open)}>切换显示</Button>
    </Tooltip>
  );
};
