import React from 'react';
import { Loading, Space, Icon } from '../../src';

export default () => (
  <Space size={40}>
    <div style={{ textAlign: 'center' }}>
      <Loading tip="加载中..." />
    </div>
    <div style={{ textAlign: 'center' }}>
      <Loading
        indicator={<Icon name="LoadingThree" size={24} fill="#1677ff" />}
        tip="自定义图标"
      />
    </div>
    <div style={{ textAlign: 'center' }}>
      <Loading size="large" tip="正在加载数据..." />
    </div>
  </Space>
);
