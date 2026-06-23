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
        title="抽屉标题"
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
        extra={
          <Space>
            <Button size="small" onClick={() => setOpen(false)}>取消</Button>
            <Button type="primary" size="small" onClick={() => setOpen(false)}>确定</Button>
          </Space>
        }
        footer={
          <Space>
            <Button onClick={() => setOpen(false)}>取消</Button>
            <Button type="primary" onClick={() => setOpen(false)}>提交</Button>
          </Space>
        }
      >
        <p>抽屉支持 extra 属性在标题右侧添加额外操作区。</p>
        <p>抽屉支持 footer 属性在底部添加操作按钮。</p>
        <p>这在表单提交场景中非常常见。</p>
      </Drawer>
    </Space>
  );
};
