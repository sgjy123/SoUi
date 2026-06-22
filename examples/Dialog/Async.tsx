import React, { useState } from 'react';
import { Button, Dialog } from '../../src';

export default () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOk = () => {
    setLoading(true);
    // 模拟异步操作
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 2000);
  };

  return (
    <>
      <Button type="primary" onClick={() => setOpen(true)}>
        异步提交
      </Button>
      <Dialog
        open={open}
        title="异步对话框"
        confirmLoading={loading}
        onOk={handleOk}
        onCancel={() => setOpen(false)}
      >
        <p>点击确定后将模拟一个异步操作，持续 2 秒。</p>
        <p>在操作完成前，确定按钮会显示加载状态。</p>
      </Dialog>
    </>
  );
};
