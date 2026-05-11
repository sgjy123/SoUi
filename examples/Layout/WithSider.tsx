import React from 'react';
import { Layout, Space } from '../../src';

const { Header, Sider, Content } = Layout;

const menuItems = [
  { key: 'dashboard', icon: '📊', label: '控制台' },
  { key: 'users', icon: '👥', label: '用户管理' },
  { key: 'settings', icon: '⚙️', label: '系统设置' },
  { key: 'help', icon: '❓', label: '帮助中心' },
];

export default () => (
  <Layout hasSider style={{ minHeight: '400px', borderRadius: '8px', overflow: 'hidden' }}>
    <Sider 
      style={{ 
        background: 'linear-gradient(180deg, #1a1f2e 0%, #2d3748 100%)',
        color: '#fff',
        padding: '16px 0'
      }}
    >
      <div style={{ padding: '0 16px', marginBottom: '24px' }}>
        <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>🎯 管理系统</h3>
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
    <Layout>
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
        <span style={{ fontSize: '16px', fontWeight: '500' }}>📊 控制台概览</span>
        <Space size="middle">
          <span style={{ cursor: 'pointer' }}>🔔</span>
          <span style={{ cursor: 'pointer' }}>👤 管理员</span>
        </Space>
      </Header>
      <Content 
        style={{ 
          padding: '24px', 
          background: '#f5f7fa',
          minHeight: '280px'
        }}
      >
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '16px',
          marginBottom: '24px'
        }}>
          {[
            { title: '总用户数', value: '1,234', icon: '👥', color: '#667eea' },
            { title: '今日访问', value: '567', icon: '📈', color: '#f093fb' },
            { title: '订单数量', value: '89', icon: '📦', color: '#4facfe' },
            { title: '收入统计', value: '¥12.5k', icon: '💰', color: '#43e97b' },
          ].map((stat, index) => (
            <div
              key={index}
              style={{
                background: '#fff',
                padding: '20px',
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                textAlign: 'center'
              }}
            >
              <div style={{ fontSize: '32px', marginBottom: '8px' }}>{stat.icon}</div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: stat.color, marginBottom: '4px' }}>
                {stat.value}
              </div>
              <div style={{ color: '#999', fontSize: '14px' }}>{stat.title}</div>
            </div>
          ))}
        </div>
        <div style={{
          background: '#fff',
          padding: '24px',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
        }}>
          <h4 style={{ margin: '0 0 16px', color: '#1a1a1a' }}>📋 最近活动</h4>
          <p style={{ color: '#666', lineHeight: '1.8' }}>
            这是一个典型的后台管理系统布局，左侧是导航菜单，右侧是内容区域。<br/>
            适合用于数据展示、用户管理、系统配置等场景。
          </p>
        </div>
      </Content>
    </Layout>
  </Layout>
);
