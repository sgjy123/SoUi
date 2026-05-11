import React, { useState } from 'react';
import { Layout, Space } from '../../src';

const { Header, Sider, Content } = Layout;

export default () => {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { key: 'overview', label: '📊 概览' },
    { key: 'analytics', label: '📈 分析' },
    { key: 'reports', label: '📋 报表' },
    { key: 'settings', label: '⚙️ 设置' },
  ];

  return (
    <Layout hasSider style={{ minHeight: '400px', borderRadius: '8px', overflow: 'hidden' }}>
      <Sider 
        width={240}
        style={{ 
          background: '#fff',
          borderRight: '1px solid #e8e8e8',
          padding: '16px 0'
        }}
      >
        <div style={{ padding: '0 16px', marginBottom: '24px' }}>
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 'bold', color: '#1a1a1a' }}>
            📊 数据分析
          </h3>
        </div>
        
        <div style={{ padding: '0 8px' }}>
          {tabs.map((tab) => (
            <div
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                padding: '12px 16px',
                cursor: 'pointer',
                background: activeTab === tab.key ? '#f0f5ff' : 'transparent',
                color: activeTab === tab.key ? '#667eea' : '#666',
                borderRadius: '6px',
                marginBottom: '4px',
                transition: 'all 0.3s',
                fontWeight: activeTab === tab.key ? '500' : 'normal',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              {tab.label}
            </div>
          ))}
        </div>

        <div style={{ marginTop: '32px', padding: '0 16px' }}>
          <h4 style={{ fontSize: '12px', color: '#999', marginBottom: '12px', textTransform: 'uppercase' }}>
            快捷操作
          </h4>
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            <div style={{ 
              padding: '8px 12px',
              background: '#f5f7fa',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#666'
            }}>
              📥 导出数据
            </div>
            <div style={{ 
              padding: '8px 12px',
              background: '#f5f7fa',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '14px',
              color: '#666'
            }}>
              📤 分享报告
            </div>
          </Space>
        </div>
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
          <h2 style={{ margin: 0, fontSize: '18px', color: '#1a1a1a' }}>
            {tabs.find(t => t.key === activeTab)?.label}
          </h2>
          <Space size="middle">
            <span style={{ 
              padding: '6px 12px',
              background: '#f0f5ff',
              color: '#667eea',
              borderRadius: '4px',
              fontSize: '14px'
            }}>
              📅 最近7天
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
            background: '#f5f7fa'
          }}
        >
          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '16px',
            marginBottom: '24px'
          }}>
            {[
              { label: '总访问量', value: '128.5K', change: '+12.5%', trend: 'up' },
              { label: '活跃用户', value: '45.2K', change: '+8.3%', trend: 'up' },
              { label: '转化率', value: '3.24%', change: '-2.1%', trend: 'down' },
              { label: '平均时长', value: '4m 32s', change: '+15.7%', trend: 'up' },
            ].map((stat, index) => (
              <div
                key={index}
                style={{
                  background: '#fff',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                }}
              >
                <div style={{ color: '#999', fontSize: '14px', marginBottom: '8px' }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#1a1a1a', marginBottom: '8px' }}>
                  {stat.value}
                </div>
                <div style={{ 
                  fontSize: '14px',
                  color: stat.trend === 'up' ? '#52c41a' : '#ff4d4f',
                  fontWeight: '500'
                }}>
                  {stat.trend === 'up' ? '↗' : '↘'} {stat.change}
                </div>
              </div>
            ))}
          </div>

          {/* Chart Placeholder */}
          <div style={{
            background: '#fff',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            marginBottom: '24px'
          }}>
            <h3 style={{ margin: '0 0 16px', color: '#1a1a1a' }}>📈 访问趋势</h3>
            <div style={{
              height: '200px',
              background: 'linear-gradient(180deg, #f0f5ff 0%, #fff 100%)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#667eea',
              fontSize: '16px'
            }}>
              📊 图表区域（可集成 ECharts/Chart.js）
            </div>
          </div>

          {/* Data Table */}
          <div style={{
            background: '#fff',
            padding: '24px',
            borderRadius: '8px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
          }}>
            <h3 style={{ margin: '0 0 16px', color: '#1a1a1a' }}>📋 详细数据</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #f0f0f0' }}>
                  <th style={{ textAlign: 'left', padding: '12px', color: '#666', fontSize: '14px' }}>日期</th>
                  <th style={{ textAlign: 'right', padding: '12px', color: '#666', fontSize: '14px' }}>访问量</th>
                  <th style={{ textAlign: 'right', padding: '12px', color: '#666', fontSize: '14px' }}>用户数</th>
                  <th style={{ textAlign: 'right', padding: '12px', color: '#666', fontSize: '14px' }}>转化率</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { date: '2024-01-15', visits: '18.5K', users: '6.2K', rate: '3.4%' },
                  { date: '2024-01-14', visits: '17.8K', users: '5.9K', rate: '3.2%' },
                  { date: '2024-01-13', visits: '19.2K', users: '6.5K', rate: '3.6%' },
                  { date: '2024-01-12', visits: '16.5K', users: '5.4K', rate: '3.1%' },
                ].map((row, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid #f5f5f5' }}>
                    <td style={{ padding: '12px', color: '#1a1a1a' }}>{row.date}</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#667eea', fontWeight: '500' }}>
                      {row.visits}
                    </td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#666' }}>{row.users}</td>
                    <td style={{ padding: '12px', textAlign: 'right', color: '#52c41a' }}>{row.rate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
