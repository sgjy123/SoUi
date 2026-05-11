import React from 'react';
import { Tooltip, Button } from '../../src';

export default () => (
  <Tooltip title="延迟显示" mouseEnterDelay={1}>
    <Button>悬停 1 秒后显示</Button>
  </Tooltip>
);
