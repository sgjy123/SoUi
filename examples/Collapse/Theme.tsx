import React from 'react';
import { Collapse, ConfigProvider } from '../../src';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Collapse: {
          colorBg: '#f0f5ff',
          headerBg: '#e6f4ff',
          borderColor: '#adc6ff',
        },
      },
    }}
  >
    <Collapse defaultActiveKey={['1']}>
      <Collapse.Panel key="1" header="自定义主题面板">
        通过 ConfigProvider 自定义背景色和边框色。
      </Collapse.Panel>
      <Collapse.Panel key="2" header="第二个面板">
        主题配置作用于所有面板。
      </Collapse.Panel>
    </Collapse>
  </ConfigProvider>
);
