// Menu 示例代码字符串

export const basicCode = `<Menu mode="vertical" theme="light" defaultSelectedKeys={['1']}>
  <Menu.Item key="1" label="菜单项 1" icon="Home" />
  <Menu.Item key="2" label="菜单项 2" icon="Setting" />
  <Menu.Item key="3" label="菜单项 3" icon="User" />
</Menu>`;

export const horizontalCode = `<Menu mode="horizontal" theme="light" defaultSelectedKeys={['1']}>
  <Menu.Item key="1" label="首页" icon="Home" />
  <Menu.Item key="2" label="产品" icon="Apps" />
  <Menu.SubMenu key="3" title="服务" icon="Setting">
    <Menu.Item key="3-1" label="云服务" />
    <Menu.Item key="3-2" label="数据库" />
    <Menu.Item key="3-3" label="存储" />
  </Menu.SubMenu>
  <Menu.Item key="4" label="关于" icon="Info" />
</Menu>`;

export const darkThemeCode = `<Menu mode="vertical" theme="dark" defaultSelectedKeys={['1']}>
  <Menu.Item key="1" label="仪表盘" icon="Home" />
  <Menu.SubMenu key="2" title="用户管理" icon="User">
    <Menu.Item key="2-1" label="用户列表" />
    <Menu.Item key="2-2" label="角色管理" />
    <Menu.Item key="2-3" label="权限设置" />
  </Menu.SubMenu>
  <Menu.SubMenu key="3" title="系统设置" icon="Setting">
    <Menu.Item key="3-1" label="基础设置" />
    <Menu.Item key="3-2" label="安全设置" />
    <Menu.Item key="3-3" label="通知设置" />
  </Menu.SubMenu>
  <Menu.Item key="4" label="帮助中心" icon="QuestionCircle" />
</Menu>`;

export const collapsedCode = `const [collapsed, setCollapsed] = useState(false);

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
    defaultSelectedKeys={['1']}
    defaultOpenKeys={['2']}
  >
    <Menu.Item key="1" label="仪表盘" icon="Home" />
    <Menu.SubMenu key="2" title="用户管理" icon="User">
      <Menu.Item key="2-1" label="用户列表" />
      <Menu.Item key="2-2" label="角色管理" />
      <Menu.Item key="2-3" label="权限设置" />
    </Menu.SubMenu>
    <Menu.SubMenu key="3" title="系统设置" icon="Setting">
      <Menu.Item key="3-1" label="基础设置" />
      <Menu.Item key="3-2" label="安全设置" />
    </Menu.SubMenu>
  </Menu>
</div>`;

export const controlledCode = `const [selectedKeys, setSelectedKeys] = useState<string[]>(['1']);
const [openKeys, setOpenKeys] = useState<string[]>(['2']);

<div>
  <Space direction="vertical" style={{ width: '100%' }}>
    <div>当前选中: {selectedKeys.join(', ')}</div>
    <div>当前展开: {openKeys.join(', ')}</div>
    
    <Menu
      mode="vertical"
      theme="light"
      selectedKeys={selectedKeys}
      openKeys={openKeys}
      onClick={({ key }) => setSelectedKeys([key])}
      onOpenChange={(keys) => setOpenKeys(keys)}
    >
      <Menu.Item key="1" label="首页" icon="Home" />
      <Menu.SubMenu key="2" title="产品管理" icon="Apps">
        <Menu.Item key="2-1" label="产品列表" />
        <Menu.Item key="2-2" label="产品分类" />
        <Menu.Item key="2-3" label="产品标签" />
      </Menu.SubMenu>
      <Menu.SubMenu key="3" title="订单管理" icon="FileText">
        <Menu.Item key="3-1" label="订单列表" />
        <Menu.Item key="3-2" label="退款管理" />
      </Menu.SubMenu>
      <Menu.Item key="4" label="数据统计" icon="ChartBar" />
    </Menu>
  </Space>
</div>`;

export const groupCode = `<Menu mode="vertical" theme="light" defaultSelectedKeys={['1']}>
  <Menu.Group title="导航菜单">
    <Menu.Item key="1" label="首页" icon="Home" />
    <Menu.Item key="2" label="产品" icon="Apps" />
    <Menu.Item key="3" label="服务" icon="Setting" />
  </Menu.Group>
  
  <Menu.Group title="管理菜单">
    <Menu.Item key="4" label="用户管理" icon="User" />
    <Menu.Item key="5" label="系统设置" icon="Setting" />
    <Menu.Item key="6" label="数据统计" icon="ChartBar" />
  </Menu.Group>
</Menu>`;
