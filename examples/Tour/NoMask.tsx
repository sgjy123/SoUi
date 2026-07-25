import React, { useState, useRef } from 'react';
import { Tour, Button } from '../../src';

/** 无遮罩 */
const NoMaskExample = () => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLSpanElement>(null);

  const steps = [
    {
      target: () => btnRef.current!,
      title: '无遮罩引导',
      description: '这个步骤没有遮罩，不会遮挡页面内容。',
      mask: false,
    },
  ];

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <span ref={btnRef}><Button>目标按钮</Button></span>
      <Button type="link" onClick={() => setOpen(true)}>开始引导</Button>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </div>
  );
};

export default NoMaskExample;
