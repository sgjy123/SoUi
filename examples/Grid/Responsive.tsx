import React from 'react';
import { Row, Col } from '../../src';

export default () => (
  <Row>
    <Col xs={2} sm={4} md={6} lg={8} xl={10}>
      <div style={{ background: '#f9f0ff', border: '1px solid #d3adf7', textAlign: 'center', padding: '16px 8px', borderRadius: '6px', minHeight: '40px', color: '#722ed1' }}>col</div>
    </Col>
    <Col xs={20} sm={16} md={12} lg={8} xl={4}>
      <div style={{ background: '#f9f0ff', border: '1px solid #d3adf7', textAlign: 'center', padding: '16px 8px', borderRadius: '6px', minHeight: '40px', color: '#722ed1' }}>col</div>
    </Col>
    <Col xs={2} sm={4} md={6} lg={8} xl={10}>
      <div style={{ background: '#f9f0ff', border: '1px solid #d3adf7', textAlign: 'center', padding: '16px 8px', borderRadius: '6px', minHeight: '40px', color: '#722ed1' }}>col</div>
    </Col>
  </Row>
);
