import React from 'react';
import Icon from '../../src/components/Icon';
import Space from '../../src/components/Space';

/**
 * 尺寸演示
 * 展示不同尺寸的图标
 */
const Size: React.FC = () => {
  return (
    <Space wrap align="end">
      <Icon name="Home" size={12} />
      <Icon name="Home" size={16} />
      <Icon name="Home" size={20} />
      <Icon name="Home" size={24} />
      <Icon name="Home" size={32} />
      <Icon name="Home" size={48} />
      <Icon name="Home" size={64} />
    </Space>
  );
};

export default Size;
