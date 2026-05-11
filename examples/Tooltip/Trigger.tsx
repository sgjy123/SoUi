import React from 'react';
import { Tooltip, Button } from '../../src';

export default () => (
  <Tooltip title="点击触发" trigger="click">
    <Button>点击我</Button>
  </Tooltip>
);
