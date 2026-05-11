// Layout 组件示例代码

export const basicCode = `<Layout style={{ minHeight: '100vh' }}>
  <Header style={{ background: '#fff', padding: '0 24px' }}>Header</Header>
  <Content style={{ padding: '24px', background: '#fff', margin: '16px' }}>
    Content
  </Content>
  <Footer style={{ textAlign: 'center' }}>Footer</Footer>
</Layout>`;

export const withSiderCode = `<Layout hasSider style={{ minHeight: '100vh' }}>
  <Sider style={{ background: '#001529', color: '#fff', padding: '24px' }}>
    Sider
  </Sider>
  <Layout>
    <Header style={{ background: '#fff', padding: '0 24px' }}>Header</Header>
    <Content style={{ padding: '24px', background: '#fff', margin: '16px' }}>
      Content
    </Content>
  </Layout>
</Layout>`;

export const topSiderCode = `<Layout hasSider style={{ minHeight: '100vh' }}>
  <Sider style={{ background: '#001529', color: '#fff', padding: '24px' }}>
    Sider
  </Sider>
  <Layout>
    <Header style={{ background: '#fff', padding: '0 24px' }}>Header</Header>
    <Content style={{ padding: '24px', background: '#fff', margin: '16px' }}>
      Content
    </Content>
    <Footer style={{ textAlign: 'center' }}>Footer</Footer>
  </Layout>
</Layout>`;

export const collapsibleCode = `const [collapsed, setCollapsed] = useState(false);

<Layout hasSider style={{ minHeight: '100vh' }}>
  <Sider
    collapsible
    collapsed={collapsed}
    onCollapse={setCollapsed}
    style={{ background: '#001529', color: '#fff', padding: '24px' }}
  >
    {collapsed ? 'C' : 'Sider'}
  </Sider>
  <Layout>
    <Header style={{ background: '#fff', padding: '0 24px' }}>Header</Header>
    <Content style={{ padding: '24px', background: '#fff', margin: '16px' }}>
      Content
    </Content>
  </Layout>
</Layout>`;

export const customWidthCode = `<Layout hasSider style={{ minHeight: '400px' }}>
  <Sider width={300} style={{ background: '#001529', color: '#fff', padding: '24px' }}>
    Width 300px
  </Sider>
  <Content style={{ padding: '24px', background: '#fff', margin: '16px' }}>
    Content
  </Content>
</Layout>`;
