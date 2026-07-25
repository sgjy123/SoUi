import React, { useState, useRef } from 'react';
import { Tour, Button } from '../../src';

/** 自定义指示器 */
const CustomIndicatorExample = () => {
  const [open, setOpen] = useState(false);
  const ref1 = useRef<HTMLSpanElement>(null);
  const ref2 = useRef<HTMLSpanElement>(null);
  const ref3 = useRef<HTMLSpanElement>(null);

  const steps = [
    {
      target: () => ref1.current!,
      title: '步骤一',
      description: '这是第一个步骤的说明。',
    },
    {
      target: () => ref2.current!,
      title: '步骤二',
      description: '这是第二个步骤的说明。',
    },
    {
      target: () => ref3.current!,
      title: '步骤三',
      description: '这是第三个步骤的说明。',
    },
  ];

  return (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <span ref={ref1}><Button>按钮一</Button></span>
      <span ref={ref2}><Button>按钮二</Button></span>
      <span ref={ref3}><Button>按钮三</Button></span>
      <Button type="link" onClick={() => setOpen(true)}>开始引导</Button>
      <Tour
        open={open}
        onClose={() => setOpen(false)}
        steps={steps}
        indicatorsRender={(current, total) => (
          <span>{current + 1} / {total}</span>
        )}
      />
    </div>
  );
};

export default CustomIndicatorExample;
