import React from 'react';
import { Menu } from '../../src';

export default () => (
  <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']}>
    <Menu.Group title="导航菜单">
      <Menu.Item key="1" label="首页" icon="Home" />
      <Menu.Item key="2" label="产品" icon="Apps" />
      <Menu.Item key="3" label="服务" icon="Setting" />
    </Menu.Group>
    
    <Menu.Group title="管理菜单">
      <Menu.Item key="4" label="用户管理" icon="User" />
      <Menu.Item key="5" label="系统设置" icon="Setting" />
      <Menu.Item key="6" label="数据统计" icon="ChartBar" />
    </Menu.Group>
  </Menu>
);
