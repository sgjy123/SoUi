import React from 'react';
import { Menu } from '../../src';

export default () => (
  <Menu mode="horizontal" theme="light" defaultSelectedKeys={['1']}>
    <Menu.Item key="1" icon="Home">首页</Menu.Item>
    <Menu.Item key="2" icon="User">用户管理</Menu.Item>
    
    <Menu.SubMenu key="sub1" title="产品">
      <Menu.Item key="3">产品列表</Menu.Item>
      <Menu.Item key="4">产品分类</Menu.Item>
      <Menu.Item key="5">库存管理</Menu.Item>
    </Menu.SubMenu>
    
    <Menu.SubMenu key="sub2" title="订单">
      <Menu.Item key="6">全部订单</Menu.Item>
      <Menu.Item key="7">待处理</Menu.Item>
      <Menu.Item key="8">已完成</Menu.Item>
    </Menu.SubMenu>
    
    <Menu.Item key="9" icon="Setting">设置</Menu.Item>
  </Menu>
);
