import React from 'react';
import { Breadcrumb } from '../../src';

export default () => (
  <Breadcrumb>
    <Breadcrumb.Item>首页</Breadcrumb.Item>
    <Breadcrumb.Item href="">应用中心</Breadcrumb.Item>
    <Breadcrumb.Item href="">应用列表</Breadcrumb.Item>
    <Breadcrumb.Item>某个应用</Breadcrumb.Item>
  </Breadcrumb>
);
