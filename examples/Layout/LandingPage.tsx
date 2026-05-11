import React from 'react';
import { Layout, Space } from '../../src';

const { Header, Sider, Content, Footer } = Layout;

export default () => (
  <Layout style={{ minHeight: '400px', borderRadius: '8px', overflow: 'hidden' }}>
    <Header 
      style={{ 
        background: '#fff',
        padding: '0 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        zIndex: 10
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
        <span style={{ fontSize: '20px', fontWeight: 'bold', color: '#667eea' }}>
          🚀 SoUi
        </span>
        <Space size="large">
          <span style={{ cursor: 'pointer', color: '#667eea', fontWeight: '500' }}>首页</span>
          <span style={{ cursor: 'pointer', color: '#666' }}>产品</span>
          <span style={{ cursor: 'pointer', color: '#666' }}>解决方案</span>
          <span style={{ cursor: 'pointer', color: '#666' }}>文档</span>
          <span style={{ cursor: 'pointer', color: '#666' }}>关于</span>
        </Space>
      </div>
      <Space size="middle">
        <span style={{ cursor: 'pointer', padding: '8px 16px', borderRadius: '6px', background: '#f5f7fa' }}>
          🔍 搜索
        </span>
        <span style={{ 
          cursor: 'pointer', 
          padding: '8px 20px', 
          borderRadius: '6px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          fontWeight: '500'
        }}>
          登录
        </span>
      </Space>
    </Header>
    
    <Content style={{ background: '#fafafa' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '80px 32px',
        textAlign: 'center',
        color: '#fff'
      }}>
        <h1 style={{ margin: '0 0 16px', fontSize: '48px', fontWeight: 'bold' }}>
          构建现代化 Web 应用
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '32px' }}>
          SoUi 提供丰富的组件和布局方案，让开发更高效
        </p>
        <Space size="middle">
          <button style={{
            padding: '12px 32px',
            borderRadius: '8px',
            border: 'none',
            background: '#fff',
            color: '#667eea',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
          }}>
            开始使用
          </button>
          <button style={{
            padding: '12px 32px',
            borderRadius: '8px',
            border: '2px solid #fff',
            background: 'transparent',
            color: '#fff',
            fontSize: '16px',
            fontWeight: '500',
            cursor: 'pointer'
          }}>
            查看文档
          </button>
        </Space>
      </div>

      {/* Features Section */}
      <div style={{ padding: '64px 32px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '48px', color: '#1a1a1a' }}>
          ✨ 核心特性
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px'
        }}>
          {[
            { icon: '🎨', title: '精美设计', desc: '现代化的 UI 设计，符合最新的设计趋势' },
            { icon: '⚡', title: '高性能', desc: '优化的渲染性能，流畅的用户体验' },
            { icon: '📱', title: '响应式', desc: '完美适配各种屏幕尺寸和设备' },
            { icon: '🔧', title: '易定制', desc: '灵活的主题配置，满足个性化需求' },
            { icon: '📚', title: '完善文档', desc: '详细的 API 文档和丰富的示例' },
            { icon: '🤝', title: '社区支持', desc: '活跃的社区和持续的技术支持' },
          ].map((feature, index) => (
            <div
              key={index}
              style={{
                background: '#fff',
                padding: '32px',
                borderRadius: '12px',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                textAlign: 'center',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>{feature.icon}</div>
              <h3 style={{ margin: '0 0 12px', color: '#1a1a1a' }}>{feature.title}</h3>
              <p style={{ margin: 0, color: '#666', lineHeight: '1.6' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </Content>

    <Footer 
      style={{ 
        background: '#1a1f2e',
        color: 'rgba(255,255,255,0.65)',
        padding: '48px 32px 24px',
        textAlign: 'center'
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
          marginBottom: '32px',
          textAlign: 'left'
        }}>
          <div>
            <h4 style={{ color: '#fff', marginBottom: '16px' }}>产品</h4>
            <div style={{ lineHeight: '2' }}>
              <div>组件库</div>
              <div>模板</div>
              <div>插件</div>
            </div>
          </div>
          <div>
            <h4 style={{ color: '#fff', marginBottom: '16px' }}>资源</h4>
            <div style={{ lineHeight: '2' }}>
              <div>文档</div>
              <div>教程</div>
              <div>博客</div>
            </div>
          </div>
          <div>
            <h4 style={{ color: '#fff', marginBottom: '16px' }}>社区</h4>
            <div style={{ lineHeight: '2' }}>
              <div>GitHub</div>
              <div>Discord</div>
              <div>Twitter</div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px' }}>
          © 2024 SoUi Team. All rights reserved. Made with ❤️
        </div>
      </div>
    </Footer>
  </Layout>
);
