import React from 'react';
import { Menu, Space } from '../../src';

export default () => (
  <Space direction="vertical" size="large" style={{ width: '100%' }}>
    <div>
      <h4 style={{ marginBottom: 8 }}>Light Theme</h4>
      <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']} style={{ width: 256 }}>
        <Menu.Item key="1" icon="Home">首页</Menu.Item>
        <Menu.Item key="2" icon="User">用户管理</Menu.Item>
        <Menu.Item key="3" icon="Setting">系统设置</Menu.Item>
      </Menu>
    </div>
    
    <div>
      <h4 style={{ marginBottom: 8 }}>Dark Theme</h4>
      <Menu mode="vertical" theme="dark" defaultSelectedKeys={['1']} style={{ width: 256 }}>
        <Menu.Item key="1" icon="Home">首页</Menu.Item>
        <Menu.Item key="2" icon="User">用户管理</Menu.Item>
        <Menu.Item key="3" icon="Setting">系统设置</Menu.Item>
      </Menu>
    </div>
  </Space>
);
