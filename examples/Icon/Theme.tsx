import React from 'react';
import Icon from '../../src/components/Icon';
import Space from '../../src/components/Space';

/**
 * 主题样式演示
 * 展示 outline 和 filled 两种主题样式
 */
const Theme: React.FC = () => {
  return (
    <Space wrap size="large">
      <Icon name="Home" size={32} theme="outline" />
      <Icon name="Home" size={32} theme="filled" />
      <Icon name="User" size={32} theme="outline" />
      <Icon name="User" size={32} theme="filled" />
      <Icon name="Setting" size={32} theme="outline" />
      <Icon name="Setting" size={32} theme="filled" />
    </Space>
  );
};

export default Theme;
