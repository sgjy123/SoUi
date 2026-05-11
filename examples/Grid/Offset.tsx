import React from 'react';
import { Row, Col } from '../../src';

export default () => (
  <>
    <Row>
      <Col span={6}>
        <div style={{ background: '#fff1f0', border: '1px solid #ffa39e', textAlign: 'center', padding: '16px 8px', borderRadius: '6px', minHeight: '40px', color: '#ff4d4f' }}>col-6</div>
      </Col>
      <Col span={6} offset={6}>
        <div style={{ background: '#fff1f0', border: '1px solid #ffa39e', textAlign: 'center', padding: '16px 8px', borderRadius: '6px', minHeight: '40px', color: '#ff4d4f' }}>col-6 offset-6</div>
      </Col>
    </Row>
    <Row>
      <Col span={6} offset={6}>
        <div style={{ background: '#fff1f0', border: '1px solid #ffa39e', textAlign: 'center', padding: '16px 8px', borderRadius: '6px', minHeight: '40px', color: '#ff4d4f' }}>col-6 offset-6</div>
      </Col>
      <Col span={6} offset={6}>
        <div style={{ background: '#fff1f0', border: '1px solid #ffa39e', textAlign: 'center', padding: '16px 8px', borderRadius: '6px', minHeight: '40px', color: '#ff4d4f' }}>col-6 offset-6</div>
      </Col>
    </Row>
  </>
);
