import React, { useState } from 'react';
import { Button, Dialog, Space } from '../../src';

export default () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);

  return (
    <Space>
      <Button onClick={() => setOpen1(true)}>自定义底部</Button>
      <Dialog
        open={open1}
        title="自定义底部"
        footer={
          <Space>
            <Button onClick={() => setOpen1(false)}>取消</Button>
            <Button type="primary" onClick={() => setOpen1(false)}>
              自定义按钮
            </Button>
          </Space>
        }
      >
        <p>通过 footer 属性自定义对话框底部内容。</p>
        <p>可以放置任意数量的按钮或其他元素。</p>
      </Dialog>

      <Button onClick={() => setOpen2(true)}>隐藏底部</Button>
      <Dialog
        open={open2}
        title="隐藏底部"
        footer={null}
        onCancel={() => setOpen2(false)}
      >
        <p>设置 footer={null} 可以隐藏对话框底部。</p>
        <p>适用于纯信息展示的场景。</p>
      </Dialog>
    </Space>
  );
};
