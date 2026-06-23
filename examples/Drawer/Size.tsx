import React, { useState } from 'react';
import { Drawer, Button, Space } from '../../src';

export default () => {
  const [openDefault, setOpenDefault] = useState(false);
  const [openLarge, setOpenLarge] = useState(false);
  const [openCustom, setOpenCustom] = useState(false);

  return (
    <Space>
      <Button onClick={() => setOpenDefault(true)}>默认尺寸 (378px)</Button>
      <Button onClick={() => setOpenLarge(true)}>大尺寸 (736px)</Button>
      <Button onClick={() => setOpenCustom(true)}>自定义 (500px)</Button>

      <Drawer
        title="默认尺寸"
        placement="right"
        size="default"
        open={openDefault}
        onClose={() => setOpenDefault(false)}
      >
        <p>默认宽度为 378px。</p>
      </Drawer>

      <Drawer
        title="大尺寸"
        placement="right"
        size="large"
        open={openLarge}
        onClose={() => setOpenLarge(false)}
      >
        <p>大尺寸宽度为 736px。</p>
      </Drawer>

      <Drawer
        title="自定义宽度"
        placement="right"
        size={500}
        open={openCustom}
        onClose={() => setOpenCustom(false)}
      >
        <p>自定义宽度为 500px。</p>
        <p>size 属性支持 number 和 string 类型。</p>
      </Drawer>
    </Space>
  );
};
