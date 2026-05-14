import React from 'react';
import { Menu } from '../../src';

export default () => (
  <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']}>
    <Menu.Item key="1" icon="Home">首页</Menu.Item>
    <Menu.Item key="2" icon="User">用户管理</Menu.Item>
    <Menu.Item key="3" icon="Setting">系统设置</Menu.Item>
  </Menu>
);
