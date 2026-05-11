import React from 'react';
import { Icon, Space } from '../../src';

export default () => {
  const handleClick = () => {
    console.log('图标被点击了！');
  };

  return (
    <Space wrap>
      <Icon name="Like" clickable onClick={handleClick} />
      <Icon name="Dislike" clickable onClick={handleClick} />
      <Icon name="ShareAlt" clickable onClick={handleClick} />
    </Space>
  );
};
