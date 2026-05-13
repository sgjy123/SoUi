import React, { useState } from 'react';
import { Menu, Button, Space } from '../../src';

export default () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? '展开' : '收起'}
        </Button>
      </Space>
      
      <Menu 
        mode="vertical" 
        theme="dark" 
        inlineCollapsed={collapsed}
        defaultSelectedKeys={['1-1']}
        defaultOpenKeys={['1']}
      >
        <Menu.Item key="1-1" label="仪表盘" icon="Home" />
        <Menu.SubMenu key="1" title="用户管理" icon="User">
          <Menu.Item key="1-1-1" label="用户列表" />
          <Menu.SubMenu key="1-2" title="权限管理">
            <Menu.Item key="1-2-1" label="角色列表" />
            <Menu.Item key="1-2-2" label="权限设置" />
          </Menu.SubMenu>
          <Menu.Item key="1-3" label="组织架构" />
        </Menu.SubMenu>
        <Menu.SubMenu key="2" title="系统设置" icon="Setting">
          <Menu.Item key="2-1" label="基础设置" />
          <Menu.Item key="2-2" label="安全设置" />
          <Menu.SubMenu key="2-3" title="高级设置">
            <Menu.Item key="2-3-1" label="数据备份" />
            <Menu.Item key="2-3-2" label="日志管理" />
          </Menu.SubMenu>
        </Menu.SubMenu>
        <Menu.Item key="3" label="帮助中心" icon="QuestionCircle" />
      </Menu>
    </div>
  );
};
