import React from 'react';
import { Layout } from '../../src';

const { Header, Sider, Content, Footer } = Layout;

export default () => (
  <Layout hasSider style={{ minHeight: '400px' }}>
    <Sider style={{ background: '#001529', color: '#fff', padding: '24px' }}>
      Sider
    </Sider>
    <Layout>
      <Header style={{ background: '#fff', padding: '0 24px', color: 'rgba(0, 0, 0, 0.85)' }}>
        Header
      </Header>
      <Content style={{ padding: '24px', background: '#fff', margin: '16px', minHeight: '200px' }}>
        Content
      </Content>
      <Footer style={{ textAlign: 'center', color: 'rgba(0, 0, 0, 0.65)' }}>
        Footer ©2024 Created by SoUi
      </Footer>
    </Layout>
  </Layout>
);
