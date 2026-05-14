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
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ width: collapsed ? 80 : 256 }}
      >
        <Menu.Item itemKey="1" icon="Home" label="首页" />
        <Menu.Item itemKey="2" icon="User" label="用户管理" />
        
        {/* 一级子菜单 */}
        <Menu.SubMenu itemKey="sub1" icon="Folder" title="文件管理">
          <Menu.Item itemKey="3" label="我的文档" />
          <Menu.Item itemKey="4" label="下载内容" />
          
          {/* 二级子菜单 */}
          <Menu.SubMenu itemKey="sub1-1" title="图片库">
            <Menu.Item itemKey="5" label="相册管理" />
            <Menu.Item itemKey="6" label="图片上传" />
            
            {/* 三级子菜单 */}
            <Menu.SubMenu itemKey="sub1-1-1" title="图片分类">
              <Menu.Item itemKey="7" label="风景图" />
              <Menu.Item itemKey="8" label="人物图" />
              <Menu.Item itemKey="9" label="建筑图" />
            </Menu.SubMenu>
          </Menu.SubMenu>
        </Menu.SubMenu>
        
        {/* 一级子菜单 - 数据分析 */}
        <Menu.SubMenu itemKey="sub2" icon="InternalData" title="数据分析">
          <Menu.Item itemKey="10" label="访问统计" />
          
          {/* 二级子菜单 */}
          <Menu.SubMenu itemKey="sub2-1" title="用户行为">
            <Menu.Item itemKey="11" label="登录记录" />
            
            {/* 三级子菜单 */}
            <Menu.SubMenu itemKey="sub2-1-1" title="操作日志">
              <Menu.Item itemKey="12" label="页面访问" />
              <Menu.Item itemKey="13" label="按钮点击" />
              <Menu.Item itemKey="14" label="表单提交" />
            </Menu.SubMenu>
          </Menu.SubMenu>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};
