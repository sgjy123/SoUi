import React from 'react';
import { Menu } from '../../src';

export default () => (
  <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']} style={{ width: 256 }}>
    <Menu.Group title="导航菜单">
      <Menu.Item itemKey="1" icon="Home" label="首页" />
      <Menu.Item itemKey="2" icon="User" label="用户管理" />
    </Menu.Group>
    
    <Menu.Divider />
    
    <Menu.Group title="系统管理">
      <Menu.Item itemKey="3" icon="Setting" label="系统设置" />
      <Menu.Item itemKey="4" icon="Security" label="安全管理" />
    </Menu.Group>
  </Menu>
);
