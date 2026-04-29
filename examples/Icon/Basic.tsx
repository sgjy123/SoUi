import React from 'react';
import Icon from '../../src/components/Icon';
import Space from '../../src/components/Space';

const Basic: React.FC = () => {
  return (
    <Space wrap size="large">
      <Icon name="Home" size={24} theme="outline" />
      <Icon name="User" size={24} theme="outline" />
      <Icon name="Setting" size={24} theme="outline" />
      <Icon name="Search" size={24} theme="outline" />
      <Icon name="Loading" size={24} theme="outline" />
      <Icon name="CheckCorrect" size={24} theme="filled" fill="#52c41a" />
      <Icon name="Close" size={24} theme="filled" fill="#ff4d4f" />
      <Icon name="Info" size={24} theme="filled" fill="#1677ff" />
      <Icon name="Reminder" size={24} theme="filled" fill="#faad14" />
    </Space>
  );
};

export default Basic;
