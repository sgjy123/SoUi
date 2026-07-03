import React from 'react';
import Empty from '../../src/components/Empty';
import ConfigProvider from '../../src/components/ConfigProvider';

const ThemeConfig: React.FC = () => {
  return (
    <div style={{ display: 'flex', gap: 48 }}>
      <ConfigProvider
        theme={{
          primaryColor: '#722ed1',
          components: {
            Empty: {
              iconColor: '#722ed1',
              iconBg: 'rgba(114, 46, 209, 0.08)',
              descriptionColor: 'rgba(114, 46, 209, 0.65)',
            },
          },
        }}
      >
        <Empty description="紫色主题空状态" />
      </ConfigProvider>

      <ConfigProvider
        theme={{
          primaryColor: '#13c2c2',
          components: {
            Empty: {
              iconColor: '#13c2c2',
              iconBg: 'rgba(19, 194, 194, 0.08)',
              imageHeight: 160,
            },
          },
        }}
      >
        <Empty description="青色主题空状态" />
      </ConfigProvider>
    </div>
  );
};

export default ThemeConfig;
