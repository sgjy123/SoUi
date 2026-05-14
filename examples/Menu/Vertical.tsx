import React from 'react';
import { Menu } from '../../src';

export default () => (
  <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']} style={{ width: 256 }}>
    <Menu.Item key="1" icon="Home">首页</Menu.Item>
    <Menu.Item key="2" icon="User">用户管理</Menu.Item>
    
    <Menu.SubMenu key="sub1" icon="Folder" title="文件管理">
      <Menu.Item key="3">我的文档</Menu.Item>
      <Menu.Item key="4">下载内容</Menu.Item>
      <Menu.Item key="5">图片库</Menu.Item>
    </Menu.SubMenu>
    
    <Menu.SubMenu key="sub2" icon="Chart" title="数据分析">
      <Menu.Item key="6">访问统计</Menu.Item>
      <Menu.Item key="7">用户行为</Menu.Item>
    </Menu.SubMenu>
    
    <Menu.Divider />
    <Menu.Item key="8" icon="Setting">系统设置</Menu.Item>
  </Menu>
);
