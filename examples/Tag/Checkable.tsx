import React, { useState } from 'react';
import { Tag, Space } from '../../src';

const { CheckableTag } = Tag;

const categories = ['美食', '旅行', '摄影', '音乐', '电影', '运动'];

export default () => {
  const [selected, setSelected] = useState<string[]>(['美食', '摄影']);

  const handleChange = (tag: string, checked: boolean) => {
    setSelected(checked ? [...selected, tag] : selected.filter((t) => t !== tag));
  };

  return (
    <Space wrap>
      {categories.map((tag) => (
        <CheckableTag
          key={tag}
          checked={selected.includes(tag)}
          onChange={(checked) => handleChange(tag, checked)}
        >
          {tag}
        </CheckableTag>
      ))}
    </Space>
  );
};
