import React, { useState } from 'react';
import { Layout, Space } from '../../src';

const { Header, Sider, Content } = Layout;

const menuItems = [
  { key: 'dashboard', icon: '📊', label: '控制台' },
  { key: 'users', icon: '👥', label: '用户管理' },
  { key: 'settings', icon: '⚙️', label: '系统设置' },
];

export default () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider style={{ minHeight: '400px', borderRadius: '8px', overflow: 'hidden' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{ 
          background: 'linear-gradient(180deg, #2c3e50 0%, #34495e 100%)', 
          color: '#fff',
          padding: collapsed ? '16px 8px' : '16px 0'
        }}
      >
        {!collapsed && (
          <div style={{ padding: '0 16px', marginBottom: '24px' }}>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold' }}>🎯 菜单</h3>
          </div>
        )}
        <div>
          {menuItems.map((item, index) => (
            <div
              key={item.key}
              style={{
                padding: collapsed ? '12px 8px' : '12px 16px',
                cursor: 'pointer',
                background: index === 0 ? 'rgba(102, 126, 234, 0.3)' : 'transparent',
                borderLeft: index === 0 ? '3px solid #667eea' : '3px solid transparent',
                transition: 'all 0.3s',
                display: 'flex',
                alignItems: 'center',
                justifyContent: collapsed ? 'center' : 'flex-start',
                gap: '8px',
                marginBottom: '4px',
                borderRadius: '4px'
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              {!collapsed && <span>{item.label}</span>}
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
          <span style={{ fontSize: '16px', fontWeight: '500' }}>
            {collapsed ? '☰' : '📋'} 可收起侧边栏
          </span>
          <Space size="middle">
            <span style={{ cursor: 'pointer', fontSize: '18px' }}>🔔</span>
            <span style={{ cursor: 'pointer' }}>👤 Admin</span>
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
            background: '#fff', 
            padding: '32px', 
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            textAlign: 'center'
          }}>
            <h3 style={{ margin: '0 0 16px', color: '#1a1a1a' }}>✨ 可收起侧边栏</h3>
            <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '24px' }}>
              点击侧边栏底部的图标可以收起/展开侧边栏。<br/>
              收起后只显示图标，节省空间；展开后显示完整菜单。
            </p>
            <div style={{
              display: 'inline-block',
              padding: '16px 24px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '14px',
              boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)'
            }}>
              💡 当前状态：{collapsed ? '已收起' : '已展开'}
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
