import React, { useState } from 'react';
import { Mentions } from '../../src';

/** 基础用法 */
const BasicExample = () => {
  const options = [
    { value: '张三', label: '张三' },
    { value: '李四', label: '李四' },
    { value: '王五', label: '王五' },
    { value: '赵六', label: '赵六' },
  ];

  return (
    <Mentions
      options={options}
      placeholder="输入 @ 提及用户"
      rows={3}
      style={{ width: '100%' }}
    />
  );
};

export default BasicExample;
