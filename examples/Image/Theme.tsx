import React from 'react';
import { Image, ConfigProvider } from '../../src';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Image: {
          borderRadius: 16,
          placeholderBg: '#f0f5ff',
        },
      },
    }}
  >
    <Image
      src="https://picsum.photos/200/200?random=7"
      width={200}
      height={200}
      placeholder="加载中..."
      alt="自定义主题"
    />
  </ConfigProvider>
);
