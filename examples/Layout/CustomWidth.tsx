import React from 'react';
import { Layout, Space } from '../../src';

const { Header, Sider, Content, Footer } = Layout;

export default () => (
  <Layout hasSider style={{ minHeight: '400px', borderRadius: '8px', overflow: 'hidden' }}>
    {/* Custom Width Sider */}
    <Sider 
      width={300}
      style={{ 
        background: 'linear-gradient(180deg, #2c3e50 0%, #34495e 100%)',
        color: '#fff',
        padding: '24px 0'
      }}
    >
      <div style={{ padding: '0 24px', marginBottom: '32px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 'bold' }}>🎨 自定义宽度</h3>
        <p style={{ margin: '8px 0 0', fontSize: '13px', opacity: 0.7 }}>
          当前宽度：300px
        </p>
      </div>

      {/* Menu Items */}
      <div style={{ padding: '0 16px' }}>
        {[
          { icon: '🏠', label: '首页', active: true },
          { icon: '📊', label: '数据看板' },
          { icon: '📁', label: '文件管理' },
          { icon: '👥', label: '团队协作' },
          { icon: '⚙️', label: '系统设置' },
        ].map((item, index) => (
          <div
            key={index}
            style={{
              padding: '14px 16px',
              cursor: 'pointer',
              background: item.active ? 'rgba(102, 126, 234, 0.3)' : 'transparent',
              borderLeft: item.active ? '3px solid #667eea' : '3px solid transparent',
              borderRadius: '6px',
              marginBottom: '8px',
              transition: 'all 0.3s',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <span style={{ fontSize: '20px' }}>{item.icon}</span>
            <span style={{ fontWeight: item.active ? '500' : 'normal' }}>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ padding: '24px', marginTop: 'auto' }}>
        <div style={{
          padding: '16px',
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '8px',
          backdropFilter: 'blur(10px)'
        }}>
          <h4 style={{ margin: '0 0 12px', fontSize: '14px' }}>💡 提示</h4>
          <p style={{ margin: 0, fontSize: '12px', lineHeight: '1.6', opacity: 0.8 }}>
            侧边栏宽度可以通过 width 属性自定义，支持数字和字符串（如 "30%"）。
          </p>
        </div>
      </div>
    </Sider>

    {/* Main Content Area */}
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span style={{ fontSize: '20px' }}>📐</span>
          <span style={{ fontSize: '16px', fontWeight: '500' }}>自定义宽度示例</span>
        </div>
        <Space size="middle">
          <span style={{ 
            padding: '6px 12px',
            background: '#f0f5ff',
            color: '#667eea',
            borderRadius: '4px',
            fontSize: '14px'
          }}>
            宽度: 300px
          </span>
          <button style={{
            padding: '6px 16px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '14px'
          }}>
            + 新建
          </button>
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
          <h3 style={{ margin: '0 0 16px', color: '#1a1a1a' }}>✨ 自定义宽度布局</h3>
          <p style={{ color: '#666', lineHeight: '1.8', marginBottom: '24px' }}>
            通过 width 属性可以灵活设置侧边栏的宽度。<br/>
            适合需要展示更多内容或特殊布局需求的场景。
          </p>

          {/* Width Comparison Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginTop: '24px'
          }}>
            {[
              { width: '200px', label: '标准宽度', desc: '默认值，适合大多数场景', color: '#667eea' },
              { width: '300px', label: '当前宽度', desc: '展示更多内容', color: '#f093fb', active: true },
              { width: '350px', label: '加宽模式', desc: '适合复杂导航', color: '#4facfe' },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  padding: '20px',
                  background: item.active 
                    ? `linear-gradient(135deg, ${item.color}20 0%, ${item.color}40 100%)`
                    : '#f5f7fa',
                  border: item.active ? `2px solid ${item.color}` : '2px solid transparent',
                  borderRadius: '8px',
                  textAlign: 'center',
                  transition: 'all 0.3s'
                }}
              >
                <div style={{ 
                  fontSize: '24px', 
                  fontWeight: 'bold', 
                  color: item.color,
                  marginBottom: '8px' 
                }}>
                  {item.width}
                </div>
                <div style={{ 
                  fontSize: '16px', 
                  fontWeight: '500', 
                  color: '#1a1a1a',
                  marginBottom: '4px' 
                }}>
                  {item.label}
                </div>
                <div style={{ fontSize: '13px', color: '#666' }}>
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Usage Tips */}
          <div style={{
            marginTop: '32px',
            padding: '20px',
            background: 'linear-gradient(135deg, #f0f5ff 0%, #e8f0ff 100%)',
            borderRadius: '8px',
            textAlign: 'left'
          }}>
            <h4 style={{ margin: '0 0 12px', color: '#667eea' }}>📝 使用建议</h4>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#666', lineHeight: '2' }}>
              <li>标准宽度 (200px)：适合简单的菜单导航</li>
              <li>中等宽度 (300px)：适合带图标和描述的菜单</li>
              <li>加宽模式 (350px+)：适合复杂的树形菜单或多级导航</li>
              <li>也可以使用百分比，如 width="25%"</li>
            </ul>
          </div>
        </div>
      </Content>

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
