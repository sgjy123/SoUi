import React, { useState, useRef } from 'react';
import { Tour, Button } from '../../src';

/** Primary 类型 */
const PrimaryExample = () => {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLSpanElement>(null);

  const steps = [
    {
      target: () => btnRef.current!,
      title: '功能介绍',
      description: '这是 Primary 类型的漫游引导，使用主题色背景。',
      type: 'primary' as const,
    },
    {
      target: () => btnRef.current!,
      title: '操作步骤',
      description: '可以通过上一步/下一步按钮进行步骤导航。',
      type: 'primary' as const,
    },
  ];

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <span ref={btnRef}><Button type="primary">目标按钮</Button></span>
      <Button type="link" onClick={() => setOpen(true)}>开始引导</Button>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </div>
  );
};

export default PrimaryExample;
