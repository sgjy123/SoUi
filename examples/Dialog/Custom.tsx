import React, { useState } from 'react';
import { Button, Dialog, Space } from '../../src';

export default () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);

  return (
    <Space>
      <Button onClick={() => setOpen1(true)}>自定义宽度</Button>
      <Dialog
        open={open1}
        title="自定义宽度"
        width={800}
        onOk={() => setOpen1(false)}
        onCancel={() => setOpen1(false)}
      >
        <p>通过 width 属性设置对话框宽度为 600px。</p>
        <p>适用于需要展示更多内容的场景。</p>
      </Dialog>

      <Button onClick={() => setOpen2(true)}>居中显示</Button>
      <Dialog
        open={open2}
        title="居中对话框"
        centered
        onOk={() => setOpen2(false)}
        onCancel={() => setOpen2(false)}
      >
        <p>通过 centered 属性让对话框垂直居中显示。</p>
        <p>适合需要强调内容的重要对话框。</p>
      </Dialog>

      <Button onClick={() => setOpen3(true)}>自定义按钮文字</Button>
      <Dialog
        open={open3}
        title="自定义按钮文字"
        okText="提交"
        cancelText="返回"
        onOk={() => setOpen3(false)}
        onCancel={() => setOpen3(false)}
      >
        <p>通过 okText 和 cancelText 自定义按钮文字。</p>
      </Dialog>
    </Space>
  );
};
