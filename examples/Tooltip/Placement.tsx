import React from 'react';
import { Tooltip, Button, Space } from '../../src';

export default () => (
  <Space wrap>
    <Tooltip placement="top" title="顶部提示"><Button>上</Button></Tooltip>
    <Tooltip placement="bottom" title="底部提示"><Button>下</Button></Tooltip>
    <Tooltip placement="left" title="左侧提示"><Button>左</Button></Tooltip>
    <Tooltip placement="right" title="右侧提示"><Button>右</Button></Tooltip>
  </Space>
);
