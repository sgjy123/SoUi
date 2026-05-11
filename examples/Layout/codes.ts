// Layout 组件示例代码

export const basicCode = `<Layout style={{ minHeight: '400px', borderRadius: '8px', overflow: 'hidden' }}>
  <Header 
    style={{ 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '0 24px', 
      color: '#fff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}
  >
    <span style={{ fontSize: '18px', fontWeight: 'bold' }}>🎨 SoUi Layout</span>
    <Space size="middle">
      <span>首页</span>
      <span>文档</span>
      <span>关于</span>
    </Space>
  </Header>
  <Content style={{ padding: '32px', background: '#f5f7fa' }}>
    <div style={{ background: '#fff', padding: '32px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <h3>✨ 基础布局</h3>
      <p>经典的上-中-下布局结构，适用于大多数页面场景。</p>
    </div>
  </Content>
  <Footer style={{ textAlign: 'center', background: '#fafafa', padding: '24px' }}>
    ©2024 Created by <strong>SoUi Team</strong> ❤️
  </Footer>
</Layout>`;

export const withSiderCode = `<Layout hasSider style={{ minHeight: '400px', borderRadius: '8px', overflow: 'hidden' }}>
  <Sider style={{ background: 'linear-gradient(180deg, #1a1f2e 0%, #2d3748 100%)', color: '#fff', padding: '16px 0' }}>
    <div style={{ padding: '0 16px', marginBottom: '24px' }}>
      <h3 style={{ margin: 0, fontSize: '16px' }}>🎯 管理系统</h3>
    </div>
    {['控制台', '用户管理', '系统设置', '帮助中心'].map((item, i) => (
      <div key={i} style={{ padding: '12px 16px', cursor: 'pointer', background: i === 0 ? 'rgba(102, 126, 234, 0.3)' : 'transparent' }}>
        {item}
      </div>
    ))}
  </Sider>
  <Layout>
    <Header style={{ background: '#fff', padding: '0 24px', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
      📊 控制台概览
    </Header>
    <Content style={{ padding: '24px', background: '#f5f7fa' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {[
          { title: '总用户数', value: '1,234', icon: '👥' },
          { title: '今日访问', value: '567', icon: '📈' },
          { title: '订单数量', value: '89', icon: '📦' },
          { title: '收入统计', value: '¥12.5k', icon: '💰' },
        ].map((stat, index) => (
          <div key={index} style={{ background: '#fff', padding: '20px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '32px', marginBottom: '8px' }}>{stat.icon}</div>
            <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stat.value}</div>
            <div style={{ color: '#999' }}>{stat.title}</div>
          </div>
        ))}
      </div>
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

<Layout hasSider style={{ minHeight: '400px', borderRadius: '8px', overflow: 'hidden' }}>
  <Sider
    collapsible
    collapsed={collapsed}
    onCollapse={setCollapsed}
    style={{ background: 'linear-gradient(180deg, #2c3e50 0%, #34495e 100%)', color: '#fff' }}
  >
    {!collapsed && <div style={{ padding: '0 16px', marginBottom: '24px' }}><h3>🎯 菜单</h3></div>}
    {['控制台', '用户管理', '系统设置'].map((item, i) => (
      <div key={i} style={{ padding: collapsed ? '12px 8px' : '12px 16px', cursor: 'pointer', display: 'flex', justifyContent: collapsed ? 'center' : 'flex-start' }}>
        <span>📊</span>
        {!collapsed && <span>{item}</span>}
      </div>
    ))}
  </Sider>
  <Layout>
    <Header style={{ background: '#fff', padding: '0 24px' }}>
      {collapsed ? '☰' : '📋'} 可收起侧边栏
    </Header>
    <Content style={{ padding: '24px', background: '#f5f7fa' }}>
      <div style={{ background: '#fff', padding: '32px', borderRadius: '8px', textAlign: 'center' }}>
        <h3>✨ 可收起侧边栏</h3>
        <p>点击底部图标可以收起/展开侧边栏</p>
        <div style={{ marginTop: '24px', padding: '16px 24px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', borderRadius: '8px', display: 'inline-block' }}>
          💡 当前状态：{collapsed ? '已收起' : '已展开'}
        </div>
      </div>
    </Content>
  </Layout>
</Layout>`;

export const customWidthCode = `<Layout hasSider style={{ minHeight: '400px' }}>
  <Sider width={300} style={{ background: 'linear-gradient(180deg, #1a1f2e 0%, #2d3748 100%)', color: '#fff', padding: '24px' }}>
    Width 300px
  </Sider>
  <Content style={{ padding: '24px', background: '#f5f7fa' }}>
    Content
  </Content>
</Layout>`;

export const landingPageCode = `<Layout style={{ minHeight: '400px', borderRadius: '8px', overflow: 'hidden' }}>
  <Header style={{ background: '#fff', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
      <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#667eea' }}>🚀 SoUi</span>
      <Space size="large">
        <span style={{ color: '#667eea', fontWeight: '500' }}>首页</span>
        <span>产品</span>
        <span>解决方案</span>
        <span>文档</span>
      </Space>
    </div>
    <Space size="middle">
      <button style={{ padding: '8px 20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', border: 'none', borderRadius: '6px' }}>登录</button>
    </Space>
  </Header>
  <Content>
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '80px 32px', textAlign: 'center', color: '#fff' }}>
      <h1 style={{ margin: '0 0 16px', fontSize: '48px' }}>构建现代化 Web 应用</h1>
      <p style={{ fontSize: '18px', opacity: 0.9 }}>SoUi 提供丰富的组件和布局方案</p>
    </div>
    <div style={{ padding: '64px 32px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '48px' }}>✨ 核心特性</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {['精美设计', '高性能', '响应式', '易定制'].map((feature, i) => (
          <div key={i} style={{ background: '#fff', padding: '32px', borderRadius: '12px', boxShadow: '0 2px 12px rgba(0,0,0,0.08)', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>{['🎨', '⚡', '📱', '🔧'][i]}</div>
            <h3>{feature}</h3>
          </div>
        ))}
      </div>
    </div>
  </Content>
  <Footer style={{ background: '#1a1f2e', color: 'rgba(255,255,255,0.65)', padding: '48px 32px 24px', textAlign: 'center' }}>
    © 2024 SoUi Team. All rights reserved.
  </Footer>
</Layout>`;

export const dashboardCode = `<Layout hasSider style={{ minHeight: '400px', borderRadius: '8px', overflow: 'hidden' }}>
  <Sider width={240} style={{ background: '#fff', borderRight: '1px solid #e8e8e8', padding: '16px 0' }}>
    <div style={{ padding: '0 16px', marginBottom: '24px' }}>
      <h3 style={{ margin: 0 }}>📊 数据分析</h3>
    </div>
    {['概览', '分析', '报表', '设置'].map((tab, i) => (
      <div key={i} style={{ padding: '12px 16px', cursor: 'pointer', background: i === 0 ? '#f0f5ff' : 'transparent', color: i === 0 ? '#667eea' : '#666', borderRadius: '6px', marginBottom: '4px' }}>
        {['📊', '📈', '📋', '⚙️'][i]} {tab}
      </div>
    ))}
  </Sider>
  <Layout>
    <Header style={{ background: '#fff', padding: '16px 24px', borderBottom: '1px solid #e8e8e8', display: 'flex', justifyContent: 'space-between' }}>
      <h2 style={{ margin: 0 }}>📊 概览</h2>
      <button style={{ padding: '6px 16px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', border: 'none', borderRadius: '6px' }}>+ 新建</button>
    </Header>
    <Content style={{ padding: '24px', background: '#f5f7fa' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {[
          { label: '总访问量', value: '128.5K', change: '+12.5%' },
          { label: '活跃用户', value: '45.2K', change: '+8.3%' },
          { label: '转化率', value: '3.24%', change: '-2.1%' },
          { label: '平均时长', value: '4m 32s', change: '+15.7%' },
        ].map((stat, index) => (
          <div key={index} style={{ background: '#fff', padding: '20px', borderRadius: '8px' }}>
            <div style={{ color: '#999', fontSize: '14px' }}>{stat.label}</div>
            <div style={{ fontSize: '28px', fontWeight: 'bold' }}>{stat.value}</div>
            <div style={{ color: stat.change.startsWith('+') ? '#52c41a' : '#ff4d4f' }}>{stat.change}</div>
          </div>
        ))}
      </div>
    </Content>
  </Layout>
</Layout>`;

export const blogLayoutCode = `<Layout style={{ minHeight: '400px', borderRadius: '8px', overflow: 'hidden' }}>
  <Header style={{ background: '#fff', padding: '16px 32px', borderBottom: '1px solid #e8e8e8', display: 'flex', justifyContent: 'space-between' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
      <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#667eea' }}>📝 博客平台</span>
      <Space size="large">
        <span style={{ color: '#667eea', fontWeight: '500' }}>首页</span>
        <span>分类</span>
        <span>归档</span>
      </Space>
    </div>
    <button style={{ padding: '8px 20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', border: 'none', borderRadius: '6px' }}>写文章</button>
  </Header>
  <Content style={{ background: '#fafafa' }}>
    <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '60px 32px', textAlign: 'center', color: '#fff' }}>
      <h1 style={{ margin: '0 0 16px', fontSize: '42px' }}>探索技术的无限可能</h1>
      <p style={{ fontSize: '18px', opacity: 0.9 }}>分享前端开发、设计模式和最佳实践</p>
    </div>
    <div style={{ padding: '48px 32px', maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        {[
          { title: 'React 18 新特性深度解析', tag: 'React', views: '2.5K' },
          { title: 'TypeScript 高级类型技巧', tag: 'TypeScript', views: '1.8K' },
          { title: 'CSS Grid 布局完全指南', tag: 'CSS', views: '3.2K' },
        ].map((article, i) => (
          <div key={i} style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
            <div style={{ height: '160px', background: '#f0f5ff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '48px' }}>📝</div>
            <div style={{ padding: '20px' }}>
              <span style={{ padding: '4px 12px', background: '#f0f5ff', color: '#667eea', borderRadius: '4px', fontSize: '12px' }}>{article.tag}</span>
              <h3 style={{ margin: '12px 0' }}>{article.title}</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#999', fontSize: '13px' }}>
                <span>📅 2024-01-15</span>
                <span>👁️ {article.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </Content>
  <Footer style={{ background: '#fff', borderTop: '1px solid #e8e8e8', padding: '32px', textAlign: 'center', color: '#666' }}>
    © 2024 博客平台 | 隐私政策 | 使用条款
  </Footer>
</Layout>`;

export const appLayoutCode = `const [collapsed, setCollapsed] = useState(false);
const [activeMenu, setActiveMenu] = useState('home');

<Layout hasSider style={{ minHeight: '400px', borderRadius: '8px', overflow: 'hidden' }}>
  <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} width={260} style={{ background: '#fff', borderRight: '1px solid #e8e8e8' }}>
    {!collapsed && (
      <div style={{ padding: '0 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>🎵</div>
        <span style={{ fontSize: '18px', fontWeight: 'bold' }}>MusicApp</span>
      </div>
    )}
    {['首页', '发现', '消息', '个人资料', '收藏', '设置'].map((item, i) => (
      <div key={i} onClick={() => setActiveMenu(item)} style={{ padding: collapsed ? '12px 8px' : '12px 20px', cursor: 'pointer', background: i === 0 ? '#f0f5ff' : 'transparent', color: i === 0 ? '#667eea' : '#666', borderRadius: '8px', marginBottom: '4px', display: 'flex', justifyContent: collapsed ? 'center' : 'flex-start', gap: '12px' }}>
        <span>{['🏠', '🔍', '💬', '👤', '⭐', '⚙️'][i]}</span>
        {!collapsed && <span>{item}</span>}
      </div>
    ))}
  </Sider>
  <Layout>
    <Header style={{ background: '#fff', padding: '16px 24px', borderBottom: '1px solid #e8e8e8', display: 'flex', justifyContent: 'space-between' }}>
      <h2 style={{ margin: 0 }}>🏠 首页</h2>
      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>👤</div>
    </Header>
    <Content style={{ padding: '24px', background: '#f5f7fa' }}>
      <div style={{ background: '#fff', borderRadius: '12px', padding: '32px', textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>🏠</div>
        <h3>首页</h3>
        <p>现代化的应用布局，左侧是可收起的导航菜单</p>
      </div>
    </Content>
  </Layout>
</Layout>`;
