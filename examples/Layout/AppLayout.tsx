import React, { useState } from 'react';
import { Layout, Space } from '../../src';

const { Header, Sider, Content } = Layout;

export default () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeMenu, setActiveMenu] = useState('home');

  const menuGroups = [
    {
      title: '主要功能',
      items: [
        { key: 'home', icon: '🏠', label: '首页' },
        { key: 'explore', icon: '🔍', label: '发现' },
        { key: 'messages', icon: '💬', label: '消息', badge: 3 },
      ]
    },
    {
      title: '个人空间',
      items: [
        { key: 'profile', icon: '👤', label: '个人资料' },
        { key: 'favorites', icon: '⭐', label: '收藏' },
        { key: 'settings', icon: '⚙️', label: '设置' },
      ]
    }
  ];

  return (
    <Layout hasSider style={{ minHeight: '400px', borderRadius: '8px', overflow: 'hidden' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        width={260}
        style={{ 
          background: '#fff',
          borderRight: '1px solid #e8e8e8',
          padding: collapsed ? '16px 8px' : '16px 0'
        }}
      >
        {/* Logo */}
        {!collapsed && (
          <div style={{ 
            padding: '0 20px', 
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <div style={{
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              color: '#fff'
            }}>
              🎵
            </div>
            <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#1a1a1a' }}>
              MusicApp
            </span>
          </div>
        )}

        {collapsed && (
          <div style={{ 
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            <div style={{
              width: '48px',
              height: '48px',
              margin: '0 auto',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              color: '#fff'
            }}>
              🎵
            </div>
          </div>
        )}

        {/* Menu Groups */}
        {menuGroups.map((group, groupIndex) => (
          <div key={groupIndex} style={{ marginBottom: '24px' }}>
            {!collapsed && (
              <div style={{ 
                padding: '0 20px',
                marginBottom: '12px',
                fontSize: '12px',
                color: '#999',
                textTransform: 'uppercase',
                fontWeight: '500'
              }}>
                {group.title}
              </div>
            )}
            
            <div style={{ padding: '0 8px' }}>
              {group.items.map((item) => (
                <div
                  key={item.key}
                  onClick={() => setActiveMenu(item.key)}
                  style={{
                    padding: collapsed ? '12px 8px' : '12px 20px',
                    cursor: 'pointer',
                    background: activeMenu === item.key ? '#f0f5ff' : 'transparent',
                    color: activeMenu === item.key ? '#667eea' : '#666',
                    borderRadius: '8px',
                    marginBottom: '4px',
                    transition: 'all 0.3s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: collapsed ? 'center' : 'space-between',
                    gap: '12px',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '20px' }}>{item.icon}</span>
                    {!collapsed && <span style={{ fontWeight: activeMenu === item.key ? '500' : 'normal' }}>
                      {item.label}
                    </span>}
                  </div>
                  
                  {!collapsed && item.badge && (
                    <span style={{
                      minWidth: '20px',
                      height: '20px',
                      padding: '0 6px',
                      background: '#ff4d4f',
                      color: '#fff',
                      borderRadius: '10px',
                      fontSize: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 'bold'
                    }}>
                      {item.badge}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </Sider>

      <Layout>
        <Header 
          style={{ 
            background: '#fff',
            padding: '16px 24px',
            borderBottom: '1px solid #e8e8e8',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <h2 style={{ margin: 0, fontSize: '20px', color: '#1a1a1a' }}>
            {menuGroups.flatMap(g => g.items).find(i => i.key === activeMenu)?.icon}{' '}
            {menuGroups.flatMap(g => g.items).find(i => i.key === activeMenu)?.label}
          </h2>
          
          <Space size="middle">
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '18px',
              cursor: 'pointer'
            }}>
              👤
            </div>
          </Space>
        </Header>

        <Content 
          style={{ 
            padding: '24px',
            background: '#f5f7fa'
          }}
        >
          <div style={{
            background: '#fff',
            borderRadius: '12px',
            padding: '32px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '24px' }}>
              {menuGroups.flatMap(g => g.items).find(i => i.key === activeMenu)?.icon}
            </div>
            <h3 style={{ margin: '0 0 16px', color: '#1a1a1a', fontSize: '24px' }}>
              {menuGroups.flatMap(g => g.items).find(i => i.key === activeMenu)?.label}
            </h3>
            <p style={{ color: '#666', lineHeight: '1.8', maxWidth: '500px', margin: '0 auto' }}>
              这是一个现代化的应用布局示例，左侧是可收起的导航菜单，支持分组显示和徽章提示。<br/>
              适合用于音乐播放器、社交应用、内容平台等场景。
            </p>
            
            <div style={{
              marginTop: '32px',
              padding: '20px',
              background: 'linear-gradient(135deg, #f0f5ff 0%, #e8f0ff 100%)',
              borderRadius: '8px',
              display: 'inline-block'
            }}>
              <div style={{ fontSize: '14px', color: '#667eea', marginBottom: '8px' }}>
                💡 当前状态
              </div>
              <div style={{ fontSize: '16px', color: '#1a1a1a', fontWeight: '500' }}>
                侧边栏：{collapsed ? '已收起' : '已展开'} | 菜单项：{activeMenu}
              </div>
            </div>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
