import React, { useState } from 'react';
import { Popconfirm, Button, Space } from '../../src';

export default () => {
  const [open, setOpen] = useState(false);

  const handleConfirm = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        resolve();
        setOpen(false);
      }, 2000);
    });
  };

  return (
    <Space>
      <Popconfirm
        title="点击确定后 2 秒关闭"
        onConfirm={handleConfirm}
        onCancel={() => setOpen(false)}
        open={open}
        onOpenChange={setOpen}
      >
        <Button type="primary">异步关闭（Promise）</Button>
      </Popconfirm>

      <Popconfirm
        title="确定要提交吗？"
        onConfirm={() => {
          console.log('submitted');
        }}
      >
        <Button>普通确认</Button>
      </Popconfirm>
    </Space>
  );
};
