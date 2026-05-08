import React from 'react';
import Icon from '../../src/components/Icon';
import Space from '../../src/components/Space';

/**
 * 颜色演示
 * 展示预设颜色和自定义颜色
 */
const Color: React.FC = () => {
  return (
    <>
      <h4 style={{ marginBottom: 16 }}>预设颜色</h4>
      <Space wrap size="large" style={{ marginBottom: 24 }}>
        <Icon name="CheckCorrect" size={24} color="primary" />
        <Icon name="CheckCorrect" size={24} color="success" />
        <Icon name="Reminder" size={24} color="warning" />
        <Icon name="Close" size={24} color="error" />
        <Icon name="Info" size={24} color="info" />
      </Space>

      <h4 style={{ marginBottom: 16 }}>自定义颜色</h4>
      <Space wrap size="large">
        <Icon name="Star" size={24} fill="#722ed1" />
        <Icon name="Heart" size={24} fill="#eb2f96" />
        <Icon name="Trophy" size={24} fill="#fa8c16" />
        <Icon name="Thunderbolt" size={24} fill="#52c41a" />
      </Space>
    </>
  );
};

export default Color;
