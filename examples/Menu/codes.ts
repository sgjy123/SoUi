// Menu Basic Example
export const basicCode = `<Menu mode="vertical" theme="light" defaultSelectedKeys={['1']}>
  <Menu.Item key="1" icon="Home">首页</Menu.Item>
  <Menu.Item key="2" icon="User">用户管理</Menu.Item>
  <Menu.Item key="3" icon="Setting">系统设置</Menu.Item>
</Menu>`;

// Menu Vertical Example
export const verticalCode = `<Menu mode="vertical" theme="light" defaultSelectedKeys={['1']} style={{ width: 256 }}>
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
</Menu>`;

// Menu Horizontal Example
export const horizontalCode = `<Menu mode="horizontal" theme="light" defaultSelectedKeys={['1']}>
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
</Menu>`;

// Menu Collapsed Example
export const collapsedCode = `const [collapsed, setCollapsed] = useState(false);

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
      <Menu.Item key="5">图片库</Menu.Item>
    </Menu.SubMenu>
    
    <Menu.SubMenu key="sub2" icon="InternalData" title="数据分析">
      <Menu.Item key="6">访问统计</Menu.Item>
      <Menu.Item key="7">用户行为</Menu.Item>
    </Menu.SubMenu>
  </Menu>
</div>`;

// Menu Theme Example
export const themeCode = `<Space direction="vertical" size="large" style={{ width: '100%' }}>
  <div>
    <h4>Light Theme</h4>
    <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']} style={{ width: 256 }}>
      <Menu.Item key="1" icon="Home">首页</Menu.Item>
      <Menu.Item key="2" icon="User">用户管理</Menu.Item>
      <Menu.Item key="3" icon="Setting">系统设置</Menu.Item>
    </Menu>
  </div>
  
  <div>
    <h4>Dark Theme</h4>
    <Menu mode="vertical" theme="dark" defaultSelectedKeys={['1']} style={{ width: 256 }}>
      <Menu.Item key="1" icon="Home">首页</Menu.Item>
      <Menu.Item key="2" icon="User">用户管理</Menu.Item>
      <Menu.Item key="3" icon="Setting">系统设置</Menu.Item>
    </Menu>
  </div>
</Space>`;

// Menu Group Example
export const groupCode = `<Menu mode="vertical" theme="light" defaultSelectedKeys={['1']} style={{ width: 256 }}>
  <Menu.Group title="导航菜单">
    <Menu.Item key="1" icon="Home">首页</Menu.Item>
    <Menu.Item key="2" icon="User">用户管理</Menu.Item>
  </Menu.Group>
  
  <Menu.Divider />
  
  <Menu.Group title="系统管理">
    <Menu.Item key="3" icon="Setting">系统设置</Menu.Item>
    <Menu.Item key="4" icon="Security">安全管理</Menu.Item>
  </Menu.Group>
</Menu>`;

// Menu Status Example
export const statusCode = `<Menu mode="vertical" theme="light" defaultSelectedKeys={['1']} style={{ width: 256 }}>
  <Menu.Item key="1" icon="Home">正常菜单项</Menu.Item>
  <Menu.Item key="2" icon="User" disabled>禁用菜单项</Menu.Item>
  <Menu.Item key="3" icon="Delete" danger>危险操作</Menu.Item>
</Menu>`;
