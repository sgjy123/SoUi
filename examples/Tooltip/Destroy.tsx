import React from 'react';
import { Tooltip, Button } from '../../src';

export default () => (
  <Tooltip title="关闭后销毁 DOM" destroyOnHidden>
    <Button>查看 DOM 变化</Button>
  </Tooltip>
);
