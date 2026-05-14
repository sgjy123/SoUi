import React from 'react';
import { Menu } from '../../src';

export default () => (
  <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']} style={{ width: 256 }}>
    <Menu.Item key="1" icon="Home">正常菜单项</Menu.Item>
    <Menu.Item key="2" icon="User" disabled>禁用菜单项</Menu.Item>
    <Menu.Item key="3" icon="Delete" danger>危险操作</Menu.Item>
  </Menu>
);
