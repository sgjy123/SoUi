import React from 'react';
import { Descriptions, ConfigProvider } from '../../src';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Descriptions: {
          colorLabelBg: '#f0f5ff',
          borderColor: '#adc6ff',
        },
      },
    }}
  >
    <Descriptions title="自定义主题" bordered>
      <Descriptions.Item label="用户名">Li Si</Descriptions.Item>
      <Descriptions.Item label="部门">研发部</Descriptions.Item>
      <Descriptions.Item label="邮箱">lisi@soui.com</Descriptions.Item>
      <Descriptions.Item label="电话">139****9999</Descriptions.Item>
    </Descriptions>
  </ConfigProvider>
);
