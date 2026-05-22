import React from 'react';
import { Breadcrumb, Icon } from '../../src';

export default () => (
  <Breadcrumb>
    <Breadcrumb.Item icon={<Icon name="Home" size={14} />}>首页</Breadcrumb.Item>
    <Breadcrumb.Item 
      href="" 
      icon={<Icon name="Application" size={14} />}
    >
      应用中心
    </Breadcrumb.Item>
    <Breadcrumb.Item 
      href=""
      icon={<Icon name="List" size={14} />}
    >
      应用列表
    </Breadcrumb.Item>
    <Breadcrumb.Item icon={<Icon name="File" size={14} />}>某个应用</Breadcrumb.Item>
  </Breadcrumb>
);
