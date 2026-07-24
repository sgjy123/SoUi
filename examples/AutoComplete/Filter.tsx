import React from 'react';
import { AutoComplete } from '../../src';

/** 本地过滤与自定义选项 */
const FilterExample = () => {
  const options = [
    { value: 'React', label: 'React — JavaScript 库' },
    { value: 'Vue', label: 'Vue — 渐进式框架' },
    { value: 'Angular', label: 'Angular — 平台框架' },
    { value: 'Svelte', label: 'Svelte — 编译器' },
    { value: 'Solid', label: 'Solid — 响应式框架' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <AutoComplete
        options={options}
        placeholder="搜索前端框架（本地过滤）"
        style={{ width: 320 }}
        filterOption
      />
      <AutoComplete
        options={options}
        placeholder="禁用过滤（显示全部选项）"
        style={{ width: 320 }}
        filterOption={false}
      />
    </div>
  );
};

export default FilterExample;
