import React from 'react';
import { Menu } from '../../src';

export default () => (
  <Menu mode="horizontal" theme="light" defaultSelectedKeys={['1']}>
    <Menu.Item key="1" label="首页" icon="Home" />
    <Menu.Item key="2" label="产品" icon="Apps" />
    <Menu.SubMenu key="3" title="服务" icon="Setting">
      <Menu.Item key="3-1" label="云服务" />
      <Menu.Item key="3-2" label="数据库" />
      <Menu.Item key="3-3" label="存储" />
    </Menu.SubMenu>
    <Menu.Item key="4" label="关于" icon="Info" />
  </Menu>
);
