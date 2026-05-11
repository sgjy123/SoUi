import React from 'react';
import { Layout, Space } from '../../src';

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
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
      }}
    >
      <span style={{ fontSize: '18px', fontWeight: 'bold' }}>🎨 SoUi Layout</span>
      <Space size="middle">
        <span style={{ cursor: 'pointer', opacity: 0.9 }}>首页</span>
        <span style={{ cursor: 'pointer', opacity: 0.9 }}>文档</span>
        <span style={{ cursor: 'pointer', opacity: 0.9 }}>关于</span>
      </Space>
    </Header>
    <Content 
      style={{ 
        padding: '32px', 
        background: '#f5f7fa',
        minHeight: '280px'
      }}
    >
      <div style={{ 
        background: '#fff', 
        padding: '32px', 
        borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        minHeight: '200px',
        textAlign: 'center'
      }}>
        <h3 style={{ margin: '0 0 16px', color: '#1a1a1a' }}>✨ 基础布局</h3>
        <p style={{ color: '#666', lineHeight: '1.8' }}>
          这是最经典的上-中-下布局结构，适用于大多数页面场景。<br/>
          Header 用于导航，Content 展示主要内容，Footer 放置版权信息。
        </p>
        <div style={{ 
          marginTop: '24px',
          padding: '16px',
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
          borderRadius: '6px',
          color: '#555'
        }}>
          💡 提示：这种布局简洁明了，适合博客、文章、产品展示等页面
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
);
