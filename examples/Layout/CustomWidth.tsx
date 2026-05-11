import React from 'react';
import { Layout } from '../../src';

const { Sider, Content } = Layout;

export default () => (
  <Layout hasSider style={{ minHeight: '400px' }}>
    <Sider width={300} style={{ background: '#001529', color: '#fff', padding: '24px' }}>
      Width 300px
    </Sider>
    <Content style={{ padding: '24px', background: '#fff', margin: '16px', minHeight: '280px' }}>
      Content
    </Content>
  </Layout>
);
