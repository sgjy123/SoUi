import React, { useState } from 'react';
import { Button, Dialog, Space } from '../../src';

export default () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        打开对话框
      </Button>
      <Dialog
        open={open}
        title="基本对话框"
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <p>这是一个基本的对话框示例。</p>
        <p>对话框用于在不离开当前页面的情况下，向用户展示重要信息或收集输入。</p>
      </Dialog>
    </>
  );
};
