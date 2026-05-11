# Layout 布局

协助进行页面级整体布局。

## 何时使用

- 需要进行页面整体布局规划时
- 需要顶部导航、侧边栏、内容区、底部等经典布局结构时
- 需要响应式布局适配不同屏幕尺寸时

## 代码演示

### 基础布局

经典的上-中-下布局结构，适用于大多数页面场景。

```tsx
import { Layout, Space } from '@soui/ui';

const { Header, Content, Footer } = Layout;

export default () => (
  <Layout style={{ minHeight: '400px', borderRadius: '8px', overflow: 'hidden' }}>
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
        <p>Header 用于导航，Content 展示主要内容，Footer 放置版权信息。</p>
      </div>
    </Content>
    <Footer style={{ textAlign: 'center', background: '#fafafa', padding: '24px' }}>
      ©2024 Created by <strong>SoUi Team</strong> ❤️
    </Footer>
  </Layout>
);
```

### 带侧边栏布局

带有导航菜单的后台管理系统布局，左侧为功能导航，右侧为主要内容区。

```tsx
import { Layout, Space } from '@soui/ui';

const { Header, Sider, Content } = Layout;

const menuItems = [
  { key: 'dashboard', icon: '📊', label: '控制台' },
  { key: 'users', icon: '👥', label: '用户管理' },
  { key: 'settings', icon: '⚙️', label: '系统设置' },
];

export default () => (
  <Layout hasSider style={{ minHeight: '400px', borderRadius: '8px', overflow: 'hidden' }}>
    <Sider style={{ background: 'linear-gradient(180deg, #1a1f2e 0%, #2d3748 100%)', color: '#fff', padding: '16px 0' }}>
      <div style={{ padding: '0 16px', marginBottom: '24px' }}>
        <h3 style={{ margin: 0, fontSize: '16px' }}>🎯 管理系统</h3>
      </div>
      {menuItems.map((item) => (
        <div key={item.key} style={{ padding: '12px 16px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span>{item.icon}</span>
          <span>{item.label}</span>
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
  </Layout>
);
```

### 顶部-侧边复合布局

结合顶部导航和左侧侧边栏的优点，顶部用于全局操作，侧边栏用于功能导航。

```tsx
import { Layout, Space } from '@soui/ui';

const { Header, Sider, Content, Footer } = Layout;

export default () => (
  <Layout hasSider style={{ minHeight: '400px', borderRadius: '8px', overflow: 'hidden' }}>
    <Sider width={200} style={{ background: 'linear-gradient(180deg, #1a1f2e 0%, #2d3748 100%)', color: '#fff' }}>
      <div style={{ padding: '0 16px', marginBottom: '24px' }}>
        <h3 style={{ margin: 0 }}>🎯 导航菜单</h3>
      </div>
      {['控制台', '数据分析', '用户管理'].map((item, i) => (
        <div key={i} style={{ padding: '12px 16px', cursor: 'pointer', background: i === 0 ? 'rgba(102, 126, 234, 0.3)' : 'transparent' }}>
          {['📊', '📈', '👥'][i]} {item}
        </div>
      ))}
    </Sider>
    <Layout>
      <Header style={{ background: '#fff', padding: '0 24px', display: 'flex', justifyContent: 'space-between' }}>
        <span>☰ 顶部-侧边复合布局</span>
        <Space size="middle">
          <span>🔔</span>
          <span>👤 管理员</span>
        </Space>
      </Header>
      <Content style={{ padding: '24px', background: '#f5f7fa' }}>
        <div style={{ background: '#fff', padding: '32px', borderRadius: '8px', textAlign: 'center' }}>
          <h3>✨ 顶部-侧边复合布局</h3>
          <p>这种布局结合了顶部导航和左侧侧边栏的优点</p>
        </div>
      </Content>
      <Footer style={{ textAlign: 'center', background: '#fafafa', padding: '24px' }}>
        ©2024 Created by <strong>SoUi Team</strong> ❤️
      </Footer>
    </Layout>
  </Layout>
);
```

### 可收起侧边栏

支持收起/展开的侧边栏布局，节省空间的同时保持功能完整性。

```tsx
import { useState } from 'react';
import { Layout } from '@soui/ui';

const { Header, Sider, Content } = Layout;

export default () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
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
    </Layout>
  );
};
```

### 自定义宽度

通过 width 属性灵活设置侧边栏宽度，适应不同的内容展示需求。

```tsx
import { Layout } from '@soui/ui';

const { Sider, Content } = Layout;

export default () => (
  <Layout hasSider style={{ minHeight: '400px' }}>
    <Sider 
      width={300} 
      style={{ background: 'linear-gradient(180deg, #2c3e50 0%, #34495e 100%)', color: '#fff', padding: '24px' }}
    >
      <h3 style={{ margin: '0 0 8px' }}>🎨 自定义宽度</h3>
      <p style={{ margin: 0, fontSize: '13px', opacity: 0.7 }}>当前宽度：300px</p>
    </Sider>
    <Content style={{ padding: '24px', background: '#f5f7fa' }}>
      <div style={{ background: '#fff', padding: '32px', borderRadius: '8px', textAlign: 'center' }}>
        <h3>✨ 自定义宽度布局</h3>
        <p>通过 width 属性可以灵活设置侧边栏的宽度</p>
        <div style={{ marginTop: '24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {[
            { width: '200px', label: '标准宽度' },
            { width: '300px', label: '当前宽度' },
            { width: '350px', label: '加宽模式' },
          ].map((item, i) => (
            <div key={i} style={{ padding: '20px', background: i === 1 ? 'linear-gradient(135deg, #f093fb20 0%, #f093fb40 100%)' : '#f5f7fa', borderRadius: '8px', border: i === 1 ? '2px solid #f093fb' : '2px solid transparent' }}>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#f093fb', marginBottom: '8px' }}>{item.width}</div>
              <div style={{ fontSize: '14px', color: '#666' }}>{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Content>
  </Layout>
);
```

### 产品落地页

现代化的产品落地页布局，包含 Hero 区域、特性展示和页脚。

```tsx
import { Layout, Space } from '@soui/ui';

const { Header, Content, Footer } = Layout;

export default () => (
  <Layout style={{ minHeight: '400px', borderRadius: '8px', overflow: 'hidden' }}>
    <Header style={{ background: '#fff', padding: '0 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#667eea' }}>🚀 SoUi</span>
        <Space size="large">
          <span style={{ color: '#667eea', fontWeight: '500' }}>首页</span>
          <span>产品</span>
          <span>解决方案</span>
        </Space>
      </div>
      <button style={{ padding: '8px 20px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: '#fff', border: 'none', borderRadius: '6px' }}>登录</button>
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
  </Layout>
);
```

### 数据看板

专业的数据分析看板，包含统计卡片、图表占位区和数据表格。

```tsx
import { Layout } from '@soui/ui';

const { Header, Sider, Content } = Layout;

export default () => (
  <Layout hasSider style={{ minHeight: '400px', borderRadius: '8px', overflow: 'hidden' }}>
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
  </Layout>
);
```

### 博客平台

内容型网站布局，包含文章列表、分类标签和分页组件。

```tsx
import { Layout, Space } from '@soui/ui';

const { Header, Content, Footer } = Layout;

export default () => (
  <Layout style={{ minHeight: '400px', borderRadius: '8px', overflow: 'hidden' }}>
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
  </Layout>
);
```

### 应用布局

音乐/社交应用布局，包含分组菜单、徽章提示和可收起侧边栏。

```tsx
import { useState } from 'react';
import { Layout } from '@soui/ui';

const { Header, Sider, Content } = Layout;

export default () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('home');

  return (
    <Layout hasSider style={{ minHeight: '400px', borderRadius: '8px', overflow: 'hidden' }}>
      <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed} width={260} style={{ background: '#fff', borderRight: '1px solid #e8e8e8' }}>
        {!collapsed && (
          <div style={{ padding: '0 20px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>🎵</div>
            <span style={{ fontSize: '18px', fontWeight: 'bold' }}>MusicApp</span>
          </div>
        )}
        {['首页', '发现', '消息', '个人资料'].map((item, i) => (
          <div key={i} onClick={() => setActiveMenu(item)} style={{ padding: collapsed ? '12px 8px' : '12px 20px', cursor: 'pointer', background: i === 0 ? '#f0f5ff' : 'transparent', color: i === 0 ? '#667eea' : '#666', borderRadius: '8px', marginBottom: '4px', display: 'flex', justifyContent: collapsed ? 'center' : 'flex-start', gap: '12px' }}>
            <span>{['🏠', '🔍', '💬', '👤'][i]}</span>
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
    </Layout>
  );
};
```

## API

### Layout

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| hasSider | 表示子元素里有 Sider，一般不用指定。可用于服务端渲染时避免样式闪动 | `boolean` | `false` | - |
| className | 容器类名 | `string` | - | - |
| style | 样式对象 | `CSSProperties` | - | - |

### Layout.Header

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| className | 容器类名 | `string` | - | - |
| style | 样式对象 | `CSSProperties` | - | - |

### Layout.Sider

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| width | 宽度 | `number \| string` | `200` | - |
| collapsible | 是否可收起 | `boolean` | `false` | - |
| collapsed | 当前收起状态 | `boolean` | `false` | - |
| onCollapse | 展开-收起时的回调函数 | `(collapsed: boolean) => void` | - | - |
| trigger | 自定义触发器 | `ReactNode` | - | - |
| className | 容器类名 | `string` | - | - |
| style | 样式对象 | `CSSProperties` | - | - |

### Layout.Content

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| className | 容器类名 | `string` | - | - |
| style | 样式对象 | `CSSProperties` | - | - |

### Layout.Footer

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| className | 容器类名 | `string` | - | - |
| style | 样式对象 | `CSSProperties` | - | - |

## 主题配置

可以通过 ConfigProvider 配置 Layout 的主题：

```tsx
import { ConfigProvider, Layout } from '@soui/ui';

const { Header, Sider, Content, Footer } = Layout;

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Layout: {
          headerHeight: 80,
          footerHeight: 50,
          siderWidth: 250,
          siderCollapsedWidth: 100,
          headerColorBg: '#fff',
          siderColorBg: '#001529',
        },
      },
    }}
  >
    <Layout hasSider>
      <Sider>Sider</Sider>
      <Layout>
        <Header>Header</Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  </ConfigProvider>
);
```

### 可配置项

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| headerHeight | Header 高度（像素） | `number` | `64` |
| footerHeight | Footer 高度（像素） | `number` | `64` |
| siderWidth | Sider 宽度（像素） | `number` | `200` |
| siderCollapsedWidth | Sider 收起宽度（像素） | `number` | `80` |
| colorBg | 布局背景色 | `string` | `@bg-color-layout` |
| headerColorBg | Header 背景色 | `string` | `@bg-color-base` |
| headerColorText | Header 文本色 | `string` | `@text-color` |
| siderColorBg | Sider 背景色 | `string` | `#001529` |
| contentColorBg | Content 背景色 | `string` | `@bg-color-base` |
| footerColorBg | Footer 背景色 | `string` | `@bg-color-layout` |
| footerColorText | Footer 文本色 | `string` | `@text-color-secondary` |
| siderTriggerColorText | Sider 触发器文本色 | `string` | `#fff` |
| siderTriggerColorBg | Sider 触发器背景色 | `string` | `rgba(255, 255, 255, 0.1)` |
| siderTriggerColorBgHover | Sider 触发器悬停背景色 | `string` | `rgba(255, 255, 255, 0.2)` |
| contentPadding | Content 内边距 | `string` | `@padding-md` |

## 设计原则

### ✅ 推荐用法

```tsx
// 使用 hasSider 标识包含侧边栏
<Layout hasSider>
  <Sider>Sider</Sider>
  <Layout>
    <Header>Header</Header>
    <Content>Content</Content>
  </Layout>
</Layout>

// 设置最小高度确保布局撑满
<Layout style={{ minHeight: '100vh' }}>
  ...
</Layout>
```

### ❌ 避免使用

```tsx
// 不要在嵌套 Layout 中重复设置相同的样式
<Layout style={{ background: '#f0f2f5' }}>
  <Layout style={{ background: '#f0f2f5' }}>
    ...
  </Layout>
</Layout>

// 不要忘记设置 hasSider（当有 Sider 时）
<Layout>
  <Sider>Sider</Sider>
  <Content>Content</Content>
</Layout>
```

## 无障碍访问

- 布局容器使用语义化 HTML 标签（`header`, `aside`, `main`, `footer`）
- 支持键盘导航和焦点管理
- 遵循 WAI-ARIA 规范

## FAQ

### 为什么需要 hasSider 属性？

`hasSider` 主要用于服务端渲染（SSR）场景，帮助确定布局方向。在客户端渲染中通常可以省略，但建议显式声明以提高代码可读性。

### 如何实现响应式侧边栏？

可以使用媒体查询结合状态管理来实现：

```tsx
import { useState, useEffect } from 'react';
import { Layout } from '@soui/ui';

const { Sider, Content } = Layout;

export default () => {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Layout hasSider>
      <Sider collapsible collapsed={collapsed}>
        Sider
      </Sider>
      <Content>Content</Content>
    </Layout>
  );
};
```

### 如何自定义侧边栏触发器？

通过 `trigger` 属性传入自定义 React 节点：

```tsx
<Sider
  collapsible
  trigger={<Icon type="menu-unfold" />}
>
  Sider
</Sider>
```

## 相关资源

- [Grid 栅格](/components/grid) - 用于更细粒度的布局控制
- [Space 间距](/components/space) - 用于组件之间的间距控制
