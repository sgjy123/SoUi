import React from 'react';
import { Tooltip, Button } from '../../src';

export default () => (
  <Tooltip title="禁用状态不会显示">
    <span>
      <Button disabled>禁用按钮</Button>
    </span>
  </Tooltip>
);
