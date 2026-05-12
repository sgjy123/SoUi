import React from 'react';
import { Menu } from '../../src';

export default () => (
  <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']}>
    <Menu.Item key="1" label="菜单项 1" icon="Home" />
    <Menu.Item key="2" label="菜单项 2" icon="Setting" />
    <Menu.Item key="3" label="菜单项 3" icon="User" />
  </Menu>
);
