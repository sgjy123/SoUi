import React from 'react';
import Icon from '../../src/components/Icon';
import Space from '../../src/components/Space';

/**
 * 交互演示
 * 展示可点击图标的交互效果
 */
const Interactive: React.FC = () => {
  const handleClick = (name: string) => {
    console.log(`Clicked: ${name}`);
    alert(`你点击了 ${name} 图标`);
  };

  return (
    <Space size="large">
      <Icon
        name="Like"
        size={24}
        clickable
        onClick={() => handleClick('点赞')}
      />
      <Icon
        name="Dislike"
        size={24}
        clickable
        onClick={() => handleClick('点踩')}
      />
      <Icon
        name="Share"
        size={24}
        clickable
        onClick={() => handleClick('分享')}
      />
      <Icon
        name="Download"
        size={24}
        clickable
        onClick={() => handleClick('下载')}
      />
      <Icon
        name="Star"
        size={24}
        clickable
        onClick={() => handleClick('收藏')}
      />
    </Space>
  );
};

export default Interactive;
