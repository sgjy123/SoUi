import React from 'react';
import { Breadcrumb, ConfigProvider } from '../../src';

export default () => (
  <>
    <h4 style={{ marginBottom: 8 }}>默认样式</h4>
    <Breadcrumb style={{ marginBottom: 24 }}>
      <Breadcrumb.Item>首页</Breadcrumb.Item>
      <Breadcrumb.Item href="">应用中心</Breadcrumb.Item>
      <Breadcrumb.Item>应用列表</Breadcrumb.Item>
    </Breadcrumb>

    <h4 style={{ marginBottom: 8 }}>自定义主题</h4>
    <ConfigProvider
      theme={{
        components: {
          Breadcrumb: {
            colorLink: '#52c41a',
            colorLinkHover: '#73d13d',
            fontSize: 16,
          },
        },
      }}
    >
      <Breadcrumb>
        <Breadcrumb.Item>首页</Breadcrumb.Item>
        <Breadcrumb.Item href="">应用中心</Breadcrumb.Item>
        <Breadcrumb.Item>应用列表</Breadcrumb.Item>
      </Breadcrumb>
    </ConfigProvider>
  </>
);
