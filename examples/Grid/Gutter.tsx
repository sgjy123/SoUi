import React from 'react';
import { Row, Col } from '../../src';

export default () => (
  <Row gutter={16}>
    <Col span={6}>
      <div style={{ background: '#e6f7ff', border: '1px solid #91d5ff', textAlign: 'center', padding: '16px 8px', borderRadius: '6px', minHeight: '40px', color: '#1677ff' }}>col-6</div>
    </Col>
    <Col span={6}>
      <div style={{ background: '#e6f7ff', border: '1px solid #91d5ff', textAlign: 'center', padding: '16px 8px', borderRadius: '6px', minHeight: '40px', color: '#1677ff' }}>col-6</div>
    </Col>
    <Col span={6}>
      <div style={{ background: '#e6f7ff', border: '1px solid #91d5ff', textAlign: 'center', padding: '16px 8px', borderRadius: '6px', minHeight: '40px', color: '#1677ff' }}>col-6</div>
    </Col>
    <Col span={6}>
      <div style={{ background: '#e6f7ff', border: '1px solid #91d5ff', textAlign: 'center', padding: '16px 8px', borderRadius: '6px', minHeight: '40px', color: '#1677ff' }}>col-6</div>
    </Col>
  </Row>
);
