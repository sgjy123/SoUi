import React from 'react';
import { Menu } from '../../src';

export default () => (
  <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']} style={{ width: 256 }}>
    <Menu.Item itemKey="1" icon="Home" label="正常菜单项" />
    <Menu.Item itemKey="2" icon="User" label="禁用菜单项" disabled />
    <Menu.Item itemKey="3" icon="Delete" label="危险操作" danger />
  </Menu>
);
