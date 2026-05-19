import React, { useState } from 'react';
import { FloatButton } from '../../src';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <p style={{ marginBottom: '16px' }}>当前状态: {open ? '展开' : '收起'}</p>
      <FloatButton.Group
        open={open}
        onOpenChange={setOpen}
        icon="ApplicationMenu"
        tooltip="菜单"
      >
        <FloatButton icon="Edit" tooltip="编辑" />
        <FloatButton icon="DeleteOne" tooltip="删除" danger />
        <FloatButton icon="Download" tooltip="下载" />
      </FloatButton.Group>
    </div>
  );
};
