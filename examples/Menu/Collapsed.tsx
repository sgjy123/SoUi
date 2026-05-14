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
        theme="light"
        inlineCollapsed={collapsed}
        defaultSelectedKeys={['1']}
        defaultOpenKeys={['sub1']}
        style={{ width: collapsed ? 80 : 256 }}
      >
        <Menu.Item key="1" icon="Home">首页</Menu.Item>
        <Menu.Item key="2" icon="User">用户管理</Menu.Item>
        
        <Menu.SubMenu key="sub1" icon="Folder" title="文件管理">
          <Menu.Item key="3">我的文档</Menu.Item>
          <Menu.Item key="4">下载内容</Menu.Item>
          
          <Menu.SubMenu key="sub1-1" title="图片库">
            <Menu.Item key="5">相册管理</Menu.Item>
            <Menu.Item key="6">图片上传</Menu.Item>
            
            <Menu.SubMenu key="sub1-1-1" title="图片分类">
              <Menu.Item key="7">风景图</Menu.Item>
              <Menu.Item key="8">人物图</Menu.Item>
              <Menu.Item key="9">建筑图</Menu.Item>
            </Menu.SubMenu>
          </Menu.SubMenu>
        </Menu.SubMenu>
        
        <Menu.SubMenu key="sub2" icon="InternalData" title="数据分析">
          <Menu.Item key="10">访问统计</Menu.Item>
          
          <Menu.SubMenu key="sub2-1" title="用户行为">
            <Menu.Item key="11">登录记录</Menu.Item>
            
            <Menu.SubMenu key="sub2-1-1" title="操作日志">
              <Menu.Item key="12">页面访问</Menu.Item>
              <Menu.Item key="13">按钮点击</Menu.Item>
              <Menu.Item key="14">表单提交</Menu.Item>
            </Menu.SubMenu>
          </Menu.SubMenu>
        </Menu.SubMenu>
      </Menu>
    </div>
  );
};
