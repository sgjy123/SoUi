import React from 'react';
import { Menu, Space } from '../../src';

export default () => (
  <Space direction="vertical" size="large" style={{ width: '100%' }}>
    <div>
      <h4 style={{ marginBottom: 8 }}>Light Theme</h4>
      <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']} style={{ width: 256 }}>
        <Menu.Item itemKey="1" icon="Home" label="首页" />
        <Menu.Item itemKey="2" icon="User" label="用户管理" />
        <Menu.Item itemKey="3" icon="Setting" label="系统设置" />
      </Menu>
    </div>
    
    <div>
      <h4 style={{ marginBottom: 8 }}>Dark Theme</h4>
      <Menu mode="vertical" theme="dark" defaultSelectedKeys={['1']} style={{ width: 256 }}>
        <Menu.Item itemKey="1" icon="Home" label="首页" />
        <Menu.Item itemKey="2" icon="User" label="用户管理" />
        <Menu.Item itemKey="3" icon="Setting" label="系统设置" />
      </Menu>
    </div>
  </Space>
);
