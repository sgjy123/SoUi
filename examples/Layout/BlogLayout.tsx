import React from 'react';
import { Layout, Space } from '../../src';

const { Header, Content, Footer } = Layout;

export default () => (
  <Layout style={{ minHeight: '400px', borderRadius: '8px', overflow: 'hidden' }}>
    {/* Top Navigation Bar */}
    <Header 
      style={{ 
        background: '#fff',
        padding: '16px 32px',
        borderBottom: '1px solid #e8e8e8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
        <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#667eea' }}>
          📝 博客平台
        </span>
        <Space size="large">
          <span style={{ cursor: 'pointer', color: '#667eea', fontWeight: '500' }}>首页</span>
          <span style={{ cursor: 'pointer', color: '#666' }}>分类</span>
          <span style={{ cursor: 'pointer', color: '#666' }}>归档</span>
          <span style={{ cursor: 'pointer', color: '#666' }}>关于</span>
        </Space>
      </div>
      <Space size="middle">
        <input 
          placeholder="搜索文章..."
          style={{
            padding: '8px 16px',
            border: '1px solid #d9d9d9',
            borderRadius: '6px',
            outline: 'none',
            width: '200px'
          }}
        />
        <button style={{
          padding: '8px 20px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontWeight: '500'
        }}>
          写文章
        </button>
      </Space>
    </Header>

    <Content style={{ background: '#fafafa' }}>
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '60px 32px',
        textAlign: 'center',
        color: '#fff'
      }}>
        <h1 style={{ margin: '0 0 16px', fontSize: '42px', fontWeight: 'bold' }}>
          探索技术的无限可能
        </h1>
        <p style={{ fontSize: '18px', opacity: 0.9, marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
          分享前端开发、设计模式和最佳实践的优质内容
        </p>
        <div style={{
          display: 'inline-flex',
          gap: '12px',
          padding: '8px',
          background: 'rgba(255,255,255,0.2)',
          borderRadius: '8px'
        }}>
          <span style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.3)', borderRadius: '6px' }}>
            🔥 热门文章
          </span>
          <span style={{ padding: '8px 16px', borderRadius: '6px' }}>
            ⭐ 最新发表
          </span>
          <span style={{ padding: '8px 16px', borderRadius: '6px' }}>
            💡 精选推荐
          </span>
        </div>
      </div>

      {/* Article Grid */}
      <div style={{ padding: '48px 32px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {[
            {
              title: 'React 18 新特性深度解析',
              desc: '探索 Concurrent Rendering、Suspense 等核心特性的实际应用',
              tag: 'React',
              date: '2024-01-15',
              views: '2.5K',
              color: '#61dafb'
            },
            {
              title: 'TypeScript 高级类型技巧',
              desc: '掌握泛型、条件类型、映射类型等高级用法，提升代码质量',
              tag: 'TypeScript',
              date: '2024-01-14',
              views: '1.8K',
              color: '#3178c6'
            },
            {
              title: 'CSS Grid 布局完全指南',
              desc: '从基础到进阶，全面掌握现代 CSS 布局技术',
              tag: 'CSS',
              date: '2024-01-13',
              views: '3.2K',
              color: '#264de4'
            },
            {
              title: 'Node.js 性能优化实践',
              desc: '分享实际项目中的性能优化经验和最佳实践',
              tag: 'Node.js',
              date: '2024-01-12',
              views: '1.5K',
              color: '#68a063'
            },
            {
              title: '微前端架构设计与实现',
              desc: '探讨微前端的适用场景、技术方案和落地实践',
              tag: 'Architecture',
              date: '2024-01-11',
              views: '2.1K',
              color: '#ff6b6b'
            },
            {
              title: '前端工程化最佳实践',
              desc: '构建、测试、部署全流程的工程化解决方案',
              tag: 'Engineering',
              date: '2024-01-10',
              views: '1.9K',
              color: '#feca57'
            },
          ].map((article, index) => (
            <div
              key={index}
              style={{
                background: '#fff',
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer'
              }}
            >
              {/* Article Cover */}
              <div style={{
                height: '160px',
                background: `linear-gradient(135deg, ${article.color}20 0%, ${article.color}40 100%)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '48px'
              }}>
                📝
              </div>
              
              {/* Article Content */}
              <div style={{ padding: '20px' }}>
                <div style={{ marginBottom: '12px' }}>
                  <span style={{
                    display: 'inline-block',
                    padding: '4px 12px',
                    background: `${article.color}15`,
                    color: article.color,
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    {article.tag}
                  </span>
                </div>
                
                <h3 style={{ margin: '0 0 12px', fontSize: '18px', color: '#1a1a1a', lineHeight: '1.4' }}>
                  {article.title}
                </h3>
                
                <p style={{ margin: '0 0 16px', color: '#666', fontSize: '14px', lineHeight: '1.6' }}>
                  {article.desc}
                </p>
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '16px',
                  borderTop: '1px solid #f0f0f0',
                  fontSize: '13px',
                  color: '#999'
                }}>
                  <span>📅 {article.date}</span>
                  <span>👁️ {article.views}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div style={{
          marginTop: '48px',
          display: 'flex',
          justifyContent: 'center',
          gap: '8px'
        }}>
          {[1, 2, 3, 4, 5].map((page) => (
            <button
              key={page}
              style={{
                width: '40px',
                height: '40px',
                border: page === 1 ? 'none' : '1px solid #d9d9d9',
                background: page === 1 ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : '#fff',
                color: page === 1 ? '#fff' : '#666',
                borderRadius: '6px',
                cursor: 'pointer',
                fontWeight: page === 1 ? 'bold' : 'normal'
              }}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </Content>

    <Footer 
      style={{ 
        background: '#fff',
        borderTop: '1px solid #e8e8e8',
        textAlign: 'center',
        color: '#666'
      }}
    >
      <Space size="large">
        <span>© 2024 博客平台</span>
        <span>|</span>
        <span style={{ cursor: 'pointer' }}>隐私政策</span>
        <span style={{ cursor: 'pointer' }}>使用条款</span>
        <span style={{ cursor: 'pointer' }}>联系我们</span>
      </Space>
    </Footer>
  </Layout>
);
