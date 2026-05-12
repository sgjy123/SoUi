import React from 'react';
import { Menu } from '../../src';

export default () => (
  <Menu mode="vertical" theme="dark" defaultSelectedKeys={['1']}>
    <Menu.Item key="1" label="仪表盘" icon="Home" />
    <Menu.SubMenu key="2" title="用户管理" icon="User">
      <Menu.Item key="2-1" label="用户列表" />
      <Menu.Item key="2-2" label="角色管理" />
      <Menu.Item key="2-3" label="权限设置" />
    </Menu.SubMenu>
    <Menu.SubMenu key="3" title="系统设置" icon="Setting">
      <Menu.Item key="3-1" label="基础设置" />
      <Menu.Item key="3-2" label="安全设置" />
      <Menu.Item key="3-3" label="通知设置" />
    </Menu.SubMenu>
    <Menu.Item key="4" label="帮助中心" icon="QuestionCircle" />
  </Menu>
);
