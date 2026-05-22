import React from 'react';
import { Breadcrumb, Icon } from '../../src';

export default () => (
  <>
    <Breadcrumb separator=">" style={{ marginBottom: 16 }}>
      <Breadcrumb.Item>首页</Breadcrumb.Item>
      <Breadcrumb.Item href="">应用中心</Breadcrumb.Item>
      <Breadcrumb.Item>应用列表</Breadcrumb.Item>
    </Breadcrumb>

    <Breadcrumb separator="-" style={{ marginBottom: 16 }}>
      <Breadcrumb.Item>首页</Breadcrumb.Item>
      <Breadcrumb.Item href="">应用中心</Breadcrumb.Item>
      <Breadcrumb.Item>应用列表</Breadcrumb.Item>
    </Breadcrumb>

    <Breadcrumb separator={<Icon name="Right" size={12} />}>
      <Breadcrumb.Item>首页</Breadcrumb.Item>
      <Breadcrumb.Item href="">应用中心</Breadcrumb.Item>
      <Breadcrumb.Item>应用列表</Breadcrumb.Item>
    </Breadcrumb>
  </>
);
