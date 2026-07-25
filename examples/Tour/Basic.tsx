import React, { useState, useRef } from 'react';
import { Tour, Button } from '../../src';

/** 基础用法 */
const BasicExample = () => {
  const [open, setOpen] = useState(false);
  const ref1 = useRef<HTMLSpanElement>(null);
  const ref2 = useRef<HTMLSpanElement>(null);
  const ref3 = useRef<HTMLSpanElement>(null);

  const steps = [
    {
      target: () => ref1.current!,
      title: '上传文件',
      description: '点击这里可以上传文件到服务器。',
    },
    {
      target: () => ref2.current!,
      title: '保存草稿',
      description: '未完成的工作可以先保存为草稿。',
    },
    {
      target: () => ref3.current!,
      title: '发布',
      description: '确认无误后点击发布。',
    },
  ];

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <span ref={ref1}><Button>上传文件</Button></span>
      <span ref={ref2}><Button>保存草稿</Button></span>
      <span ref={ref3}><Button type="primary">发布</Button></span>
      <Button type="link" onClick={() => setOpen(true)}>开始引导</Button>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </div>
  );
};

export default BasicExample;
