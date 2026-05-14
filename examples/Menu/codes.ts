// Menu Basic Example
export const basicCode = `<Menu mode="vertical" theme="light" defaultSelectedKeys={['1']}>
  <Menu.Item itemKey="1" icon="Home" label="首页" />
  <Menu.Item itemKey="2" icon="User" label="用户管理" />
  <Menu.Item itemKey="3" icon="Setting" label="系统设置" />
</Menu>`;

// Menu Vertical Example
export const verticalCode = `<Menu mode="vertical" theme="light" defaultSelectedKeys={['1']} style={{ width: 256 }}>
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
</Menu>`;

// Menu Horizontal Example
export const horizontalCode = `<Menu mode="horizontal" theme="light" defaultSelectedKeys={['1']}>
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
    mode="inline"
    theme="light"
    inlineCollapsed={collapsed}
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['sub1']}
    style={{ width: collapsed ? 80 : 256 }}
  >
    <Menu.Item itemKey="1" icon="Home" label="首页" />
    <Menu.Item itemKey="2" icon="User" label="用户管理" />
    
    <Menu.SubMenu itemKey="sub1" icon="Folder" title="文件管理">
      <Menu.Item itemKey="3" label="我的文档" />
      <Menu.Item itemKey="4" label="下载内容" />
      <Menu.Item itemKey="5" label="图片库" />
    </Menu.SubMenu>
    
    <Menu.SubMenu itemKey="sub2" icon="InternalData" title="数据分析">
      <Menu.Item itemKey="6" label="访问统计" />
      <Menu.Item itemKey="7" label="用户行为" />
    </Menu.SubMenu>
  </Menu>
</div>`;

// Menu Theme Example
export const themeCode = `<Space direction="vertical" size="large" style={{ width: '100%' }}>
  <div>
    <h4>Light Theme</h4>
    <Menu mode="vertical" theme="light" defaultSelectedKeys={['1']} style={{ width: 256 }}>
      <Menu.Item itemKey="1" icon="Home" label="首页" />
      <Menu.Item itemKey="2" icon="User" label="用户管理" />
      <Menu.Item itemKey="3" icon="Setting" label="系统设置" />
    </Menu>
  </div>
  
  <div>
    <h4>Dark Theme</h4>
    <Menu mode="vertical" theme="dark" defaultSelectedKeys={['1']} style={{ width: 256 }}>
      <Menu.Item itemKey="1" icon="Home" label="首页" />
      <Menu.Item itemKey="2" icon="User" label="用户管理" />
      <Menu.Item itemKey="3" icon="Setting" label="系统设置" />
    </Menu>
  </div>
</Space>`;

// Menu Group Example
export const groupCode = `<Menu mode="vertical" theme="light" defaultSelectedKeys={['1']} style={{ width: 256 }}>
  <Menu.Group title="导航菜单">
    <Menu.Item itemKey="1" icon="Home" label="首页" />
    <Menu.Item itemKey="2" icon="User" label="用户管理" />
  </Menu.Group>
  
  <Menu.Divider />
  
  <Menu.Group title="系统管理">
    <Menu.Item itemKey="3" icon="Setting" label="系统设置" />
    <Menu.Item itemKey="4" icon="Security" label="安全管理" />
  </Menu.Group>
</Menu>`;

// Menu Status Example
export const statusCode = `<Menu mode="vertical" theme="light" defaultSelectedKeys={['1']} style={{ width: 256 }}>
  <Menu.Item itemKey="1" icon="Home" label="正常菜单项" />
  <Menu.Item itemKey="2" icon="User" label="禁用菜单项" disabled />
  <Menu.Item itemKey="3" icon="Delete" label="危险操作" danger />
</Menu>`;
