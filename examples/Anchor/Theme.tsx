import React from 'react';
import { Anchor, ConfigProvider, Space, Typography } from '../../src';

const { Text } = Typography;

export default () => (
  <div>
    <Space direction="vertical" size={16} style={{ marginBottom: '24px' }}>
      <Text type="secondary">
        通过 ConfigProvider 的 theme 属性自定义锚点的主题样式（颜色、间距、字号等）。
      </Text>
    </Space>
    <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap' }}>
      {/* 默认主题 */}
      <div style={{ flex: '1', minWidth: '260px' }}>
        <Text strong style={{ marginBottom: '12px', display: 'block' }}>
          默认主题
        </Text>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <div
              id="theme-default-1"
              style={{
                padding: '16px',
                margin: '0 0 8px',
                background: '#f0f5ff',
                borderRadius: '6px',
                height: '120px',
              }}
            >
              <h4>概述</h4>
              <p>默认蓝色主题。</p>
            </div>
            <div
              id="theme-default-2"
              style={{
                padding: '16px',
                margin: '0 0 8px',
                background: '#f6ffed',
                borderRadius: '6px',
                height: '120px',
              }}
            >
              <h4>安装</h4>
              <p>默认间距 4px。</p>
            </div>
            <div
              id="theme-default-3"
              style={{
                padding: '16px',
                margin: '0 0 8px',
                background: '#fff7e6',
                borderRadius: '6px',
                height: '120px',
              }}
            >
              <h4>使用</h4>
              <p>默认字号 14px。</p>
            </div>
          </div>
          <ConfigProvider>
            <div style={{ width: '140px', marginLeft: '16px', flexShrink: 0 }}>
              <Anchor
                items={[
                  { key: 'd1', href: '#theme-default-1', title: '概述' },
                  { key: 'd2', href: '#theme-default-2', title: '安装' },
                  { key: 'd3', href: '#theme-default-3', title: '使用' },
                ]}
              />
            </div>
          </ConfigProvider>
        </div>
      </div>

      {/* 绿色主题：自定义主色 */}
      <div style={{ flex: '1', minWidth: '260px' }}>
        <Text strong style={{ color: '#52c41a', marginBottom: '12px', display: 'block' }}>
          绿色主题
        </Text>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <div
              id="theme-green-1"
              style={{
                padding: '16px',
                margin: '0 0 8px',
                background: '#f0f5ff',
                borderRadius: '6px',
                height: '120px',
              }}
            >
              <h4>设计</h4>
              <p>主色改为绿色。</p>
            </div>
            <div
              id="theme-green-2"
              style={{
                padding: '16px',
                margin: '0 0 8px',
                background: '#f6ffed',
                borderRadius: '6px',
                height: '120px',
              }}
            >
              <h4>组件</h4>
              <p>指示器和文本同色。</p>
            </div>
            <div
              id="theme-green-3"
              style={{
                padding: '16px',
                margin: '0 0 8px',
                background: '#fff7e6',
                borderRadius: '6px',
                height: '120px',
              }}
            >
              <h4>主题</h4>
              <p>全局统一的视觉风格。</p>
            </div>
          </div>
          <ConfigProvider
            theme={{
              primaryColor: '#52c41a',
              components: {
                Anchor: {
                  colorPrimary: '#52c41a',
                },
              },
            }}
          >
            <div style={{ width: '140px', marginLeft: '16px', flexShrink: 0 }}>
              <Anchor
                items={[
                  { key: 'g1', href: '#theme-green-1', title: '设计' },
                  { key: 'g2', href: '#theme-green-2', title: '组件' },
                  { key: 'g3', href: '#theme-green-3', title: '主题' },
                ]}
              />
            </div>
          </ConfigProvider>
        </div>
      </div>

      {/* 紫色主题：自定义间距和字号 */}
      <div style={{ flex: '1', minWidth: '260px' }}>
        <Text strong style={{ color: '#722ed1', marginBottom: '12px', display: 'block' }}>
          紫色大号主题
        </Text>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <div
              id="theme-purple-1"
              style={{
                padding: '16px',
                margin: '0 0 8px',
                background: '#f0f5ff',
                borderRadius: '6px',
                height: '120px',
              }}
            >
              <h4>框架</h4>
              <p>更大字号更易阅读。</p>
            </div>
            <div
              id="theme-purple-2"
              style={{
                padding: '16px',
                margin: '0 0 8px',
                background: '#f6ffed',
                borderRadius: '6px',
                height: '120px',
              }}
            >
              <h4>规范</h4>
              <p>更大间距更醒目。</p>
            </div>
            <div
              id="theme-purple-3"
              style={{
                padding: '16px',
                margin: '0 0 8px',
                background: '#fff7e6',
                borderRadius: '6px',
                height: '120px',
              }}
            >
              <h4>资源</h4>
              <p>可任意组合配置项。</p>
            </div>
          </div>
          <ConfigProvider
            theme={{
              primaryColor: '#722ed1',
              components: {
                Anchor: {
                  colorPrimary: '#722ed1',
                  fontSize: 16,
                  linkPadding: 8,
                  inkWidth: 3,
                },
              },
            }}
          >
            <div style={{ width: '140px', marginLeft: '16px', flexShrink: 0 }}>
              <Anchor
                items={[
                  { key: 'p1', href: '#theme-purple-1', title: '框架' },
                  { key: 'p2', href: '#theme-purple-2', title: '规范' },
                  { key: 'p3', href: '#theme-purple-3', title: '资源' },
                ]}
              />
            </div>
          </ConfigProvider>
        </div>
      </div>
    </div>
  </div>
);
