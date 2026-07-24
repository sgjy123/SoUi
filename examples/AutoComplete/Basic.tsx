import React, { useState } from 'react';
import { AutoComplete } from '../../src';

/** 基础用法 */
const BasicExample = () => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);

  const handleSearch = (value: string) => {
    if (!value) {
      setOptions([]);
      return;
    }
    setOptions([
      { value: `${value}@gmail.com`, label: `${value}@gmail.com` },
      { value: `${value}@outlook.com`, label: `${value}@outlook.com` },
      { value: `${value}@qq.com`, label: `${value}@qq.com` },
    ]);
  };

  return (
    <AutoComplete
      options={options}
      onSearch={handleSearch}
      placeholder="输入邮箱前缀"
      style={{ width: 280 }}
      allowClear
    />
  );
};

export default BasicExample;
