import React, { useState } from 'react';
import { Input, Space } from '../../src';

const { TextArea } = Input;

export default () => {
  const [value, setValue] = useState('');

  return (
    <Space direction="vertical" size="middle" style={{ maxWidth: 400 }}>
      <TextArea placeholder="输入多行文本" rows={3} />
      <TextArea placeholder="自适应高度" autoSize />
      <TextArea placeholder="显示字数统计" showCount maxLength={100} />
      <TextArea placeholder="可清空" allowClear value={value} onChange={(e: any) => setValue(e.target.value)} />
    </Space>
  );
};
