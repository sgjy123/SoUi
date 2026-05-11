import React, { useState } from 'react';
import { Layout } from '../../src';

const { Header, Sider, Content } = Layout;

export default () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider style={{ minHeight: '400px' }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        style={{ background: '#001529', color: '#fff', padding: '24px' }}
      >
        {collapsed ? 'C' : 'Sider'}
      </Sider>
      <Layout>
        <Header style={{ background: '#fff', padding: '0 24px', color: 'rgba(0, 0, 0, 0.85)' }}>
          Header
        </Header>
        <Content style={{ padding: '24px', background: '#fff', margin: '16px', minHeight: '280px' }}>
          Content
        </Content>
      </Layout>
    </Layout>
  );
};
