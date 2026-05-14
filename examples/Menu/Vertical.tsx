import React from 'react';
import { Menu } from '../../src';

export default () => (
  <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']} style={{ width: 256 }}>
    <Menu.Item itemKey="1" icon="Home" label="首页" />
    <Menu.Item itemKey="2" icon="User" label="用户管理" />
    
    <Menu.SubMenu itemKey="sub1" icon="Folder" title="文件管理">
      <Menu.Item itemKey="3" label="我的文档" />
      <Menu.Item itemKey="4" label="下载内容" />
      <Menu.Item itemKey="5" label="图片库" />
    </Menu.SubMenu>
    
    <Menu.SubMenu itemKey="sub2" icon="Chart" title="数据分析">
      <Menu.Item itemKey="6" label="访问统计" />
      <Menu.Item itemKey="7" label="用户行为" />
    </Menu.SubMenu>
    
    <Menu.Divider />
    <Menu.Item itemKey="8" icon="Setting" label="系统设置" />
  </Menu>
);
