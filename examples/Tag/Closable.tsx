import React, { useState } from 'react';
import { Tag, Space, Button } from '../../src';

export default () => {
  const [tags, setTags] = useState(['电影', '书籍', '音乐', '运动']);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleClose = (removed: string) => {
    setTags(tags.filter((t) => t !== removed));
  };

  const addTag = () => {
    if (inputValue && !tags.includes(inputValue)) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue('');
  };

  return (
    <Space wrap>
      {tags.map((tag) => (
        <Tag key={tag} closable onClose={() => handleClose(tag)}>
          {tag}
        </Tag>
      ))}
      {inputVisible ? (
        <input
          autoFocus
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onBlur={addTag}
          onKeyDown={(e) => e.key === 'Enter' && addTag()}
          style={{
            width: 64,
            height: 22,
            border: '1px dashed #d9d9d9',
            borderRadius: 4,
            padding: '0 7px',
            fontSize: 12,
            outline: 'none',
          }}
        />
      ) : (
        <Button size="small" onClick={() => setInputVisible(true)}>
          + 新标签
        </Button>
      )}
    </Space>
  );
};
