import React, { useState } from 'react';
import { Drawer, Button, Space } from '../../src';

type Placement = 'top' | 'right' | 'bottom' | 'left';

export default () => {
  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState<Placement>('right');

  const showDrawer = (p: Placement) => {
    setPlacement(p);
    setOpen(true);
  };

  return (
    <Space>
      <Button onClick={() => showDrawer('top')}>顶部</Button>
      <Button onClick={() => showDrawer('right')}>右侧</Button>
      <Button onClick={() => showDrawer('bottom')}>底部</Button>
      <Button onClick={() => showDrawer('left')}>左侧</Button>
      <Drawer
        title={`${placement} 方向抽屉`}
        placement={placement}
        open={open}
        onClose={() => setOpen(false)}
      >
        <p>抽屉从 {placement} 方向滑出。</p>
        <p>支持 top、right、bottom、left 四个方向。</p>
      </Drawer>
    </Space>
  );
};
