import React from 'react';
import { AutoComplete } from '../../src';

/** 尺寸与状态 */
const SizeStatusExample = () => {
  const options = [
    { value: '选项 A' },
    { value: '选项 B' },
    { value: '选项 C', disabled: true },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <AutoComplete options={options} placeholder="小号" size="small" style={{ width: 240 }} />
      <AutoComplete options={options} placeholder="默认" style={{ width: 240 }} />
      <AutoComplete options={options} placeholder="大号" size="large" style={{ width: 240 }} />
      <AutoComplete options={options} placeholder="错误状态" status="error" style={{ width: 240 }} />
      <AutoComplete options={options} placeholder="警告状态" status="warning" style={{ width: 240 }} />
      <AutoComplete options={options} placeholder="禁用" disabled style={{ width: 240 }} />
    </div>
  );
};

export default SizeStatusExample;
