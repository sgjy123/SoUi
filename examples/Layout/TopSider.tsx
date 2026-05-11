import React from 'react';
import { Layout, Space } from '../../src';

const { Header, Sider, Content, Footer } = Layout;

const menuItems = [
  { key: 'dashboard', icon: '📊', label: '控制台' },
  { key: 'analytics', icon: '📈', label: '数据分析' },
  { key: 'users', icon: '👥', label: '用户管理' },
  { key: 'settings', icon: '⚙️', label: '系统设置' },
];

export default () => (
  <Layout hasSider style={{ minHeight: '400px', borderRadius: '8px', overflow: 'hidden' }}>
    {/* Left Sider */}
    <Sider 
      width={200}
      style={{ 
        background: 'linear-gradient(180deg, #1a1f2e 0%, #2d3748 100%)',
        color: '#fff',
        padding: '16px 0'
      }}
    >
      <div style={{ padding: '0 16px', marginBottom: '24px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>🎯 导航菜单</h3>
      </div>
      <div>
        {menuItems.map((item, index) => (
          <div
            key={item.key}
            style={{
              padding: '12px 16px',
              cursor: 'pointer',
              background: index === 0 ? 'rgba(102, 126, 234, 0.3)' : 'transparent',
              borderLeft: index === 0 ? '3px solid #667eea' : '3px solid transparent',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <span>{item.icon}</span>
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </Sider>

    {/* Right Content Area */}
    <Layout>
      {/* Top Header */}
      <Header 
        style={{ 
          background: '#fff', 
          padding: '0 24px', 
          color: 'rgba(0, 0, 0, 0.85)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '18px' }}>☰</span>
          <span style={{ fontSize: '16px', fontWeight: '500' }}>顶部-侧边复合布局</span>
        </div>
        <Space size="middle">
          <span style={{ cursor: 'pointer', fontSize: '18px' }}>🔔</span>
          <span style={{ cursor: 'pointer' }}>👤 管理员</span>
        </Space>
      </Header>

      {/* Main Content */}
      <Content 
        style={{ 
          padding: '24px', 
          background: '#f5f7fa',
          minHeight: '200px'
        }}
      >
        <div style={{ 
          background: '#fff', 
          padding: '32px', 
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 16px', color: '#1a1a1a' }}>✨ 顶部-侧边复合布局</h3>
          <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '24px' }}>
            这种布局结合了顶部导航和左侧侧边栏的优点。<br/>
            顶部用于全局操作和用户信息，侧边栏用于功能导航。
          </p>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
            gap: '16px',
            marginTop: '24px'
          }}>
            {[
              { icon: '📊', label: '数据概览', value: '1,234' },
              { icon: '📈', label: '趋势分析', value: '+12.5%' },
              { icon: '👥', label: '活跃用户', value: '567' },
              { icon: '💰', label: '收入统计', value: '¥8.9k' },
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  padding: '20px',
                  background: 'linear-gradient(135deg, #f0f5ff 0%, #e8f0ff 100%)',
                  borderRadius: '8px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>{stat.icon}</div>
                <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#667eea', marginBottom: '4px' }}>
                  {stat.value}
                </div>
                <div style={{ color: '#666', fontSize: '14px' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Content>

      {/* Footer */}
      <Footer 
        style={{ 
          textAlign: 'center', 
          color: 'rgba(0, 0, 0, 0.65)',
          background: '#fafafa',
        }}
      >
        <div>
          <span style={{ marginRight: '8px' }}>©2024 Created by</span>
          <strong style={{ color: '#667eea' }}>SoUi Team</strong>
          <span style={{ marginLeft: '8px' }}>❤️</span>
        </div>
      </Footer>
    </Layout>
  </Layout>
);
