import React from 'react';
import { Mentions } from '../../src';

/** 多前缀与自定义触发 */
const PrefixExample = () => {
  const users = [
    { value: 'alice', label: 'Alice' },
    { value: 'bob', label: 'Bob' },
    { value: 'charlie', label: 'Charlie' },
  ];
  const topics = [
    { value: 'bug', label: '#Bug' },
    { value: 'feature', label: '#Feature' },
    { value: 'improvement', label: '#Improvement' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      <Mentions
        options={users}
        prefix={['@', '#']}
        placeholder="输入 @ 提及用户，# 提及话题"
        style={{ width: '100%' }}
      />
    </div>
  );
};

export default PrefixExample;
