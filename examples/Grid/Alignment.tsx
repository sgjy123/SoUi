import React from 'react';
import { Row, Col } from '../../src';

export default () => (
  <>
    <Row justify="center">
      <Col span={4}>
        <div style={{ background: '#faad14', color: '#fff', textAlign: 'center', padding: '16px 8px', borderRadius: '6px', minHeight: '40px' }}>col-4</div>
      </Col>
      <Col span={4}>
        <div style={{ background: '#faad14', color: '#fff', textAlign: 'center', padding: '16px 8px', borderRadius: '6px', minHeight: '40px' }}>col-4</div>
      </Col>
    </Row>
    <Row align="middle" style={{ height: '100px' }}>
      <Col span={4}>
        <div style={{ background: '#faad14', color: '#fff', textAlign: 'center', padding: '16px 8px', borderRadius: '6px', minHeight: '40px' }}>col-4</div>
      </Col>
      <Col span={4}>
        <div style={{ background: '#faad14', color: '#fff', textAlign: 'center', padding: '16px 8px', borderRadius: '6px', minHeight: '40px' }}>col-4</div>
      </Col>
      <Col span={4}>
        <div style={{ background: '#faad14', color: '#fff', textAlign: 'center', padding: '16px 8px', borderRadius: '6px', minHeight: '40px' }}>col-4</div>
      </Col>
    </Row>
  </>
);
