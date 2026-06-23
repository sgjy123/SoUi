import React, { useState } from 'react';
import { Drawer, Button, Space } from '../../src';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <Space>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开抽屉
      </Button>
      <Drawer
        title="基础抽屉"
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <p>这是抽屉的内容区域。</p>
        <p>抽屉从右侧滑出，适合展示详情、表单等信息。</p>
      </Drawer>
    </Space>
  );
};
