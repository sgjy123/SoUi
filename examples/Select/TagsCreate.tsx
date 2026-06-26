import React, { useState } from 'react';
import { Select } from '../../src';

export default () => {
  const [tags, setTags] = useState<string[]>(['React', 'Vue']);

  const defaultOptions = [
    { label: 'React', value: 'React' },
    { label: 'Vue', value: 'Vue' },
    { label: 'Angular', value: 'Angular' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 400 }}>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>
          Tags 模式 — 输入新内容后按回车即可创建
        </p>
        <Select
          mode="tags"
          placeholder="输入标签后按回车"
          value={tags}
          onChange={(val) => setTags(val as string[])}
          options={defaultOptions}
          showSearch
        />
        <p style={{ marginTop: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>
          当前标签：{tags.join(', ') || '无'}
        </p>
      </div>
      <div>
        <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>
          提示：试试输入一个不在列表中的名称（如 "Svelte"），然后按回车
        </p>
      </div>
    </div>
  );
};
