import React from 'react';
import { Menu } from '../../src';

export default () => (
  <Menu mode="horizontal" theme="light" defaultSelectedKeys={['1']}>
    <Menu.Item itemKey="1" icon="Home" label="首页" />
    <Menu.Item itemKey="2" icon="User" label="用户管理" />
    
    <Menu.SubMenu itemKey="sub1" title="产品">
      <Menu.Item itemKey="3" label="产品列表" />
      <Menu.Item itemKey="4" label="产品分类" />
      <Menu.Item itemKey="5" label="库存管理" />
    </Menu.SubMenu>
    
    <Menu.SubMenu itemKey="sub2" title="订单">
      <Menu.Item itemKey="6" label="全部订单" />
      <Menu.Item itemKey="7" label="待处理" />
      <Menu.Item itemKey="8" label="已完成" />
    </Menu.SubMenu>
    
    <Menu.Item itemKey="9" icon="Setting" label="设置" />
  </Menu>
);
