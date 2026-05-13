import React from 'react';
import { Menu } from '../../src';

export default () => (
  <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']}>
    <Menu.Item key="1" label="仪表盘" icon="Home" />
    <Menu.Item key="2" label="数据管理" icon="SwitchButton" />
    <Menu.Item key="3" label="用户中心" icon="User" />
  </Menu>
);
