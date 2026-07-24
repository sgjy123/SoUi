import React from 'react';
import { Statistic, Row, Col } from '../../src';

/** 基础用法 */
const BasicExample = () => (
  <Row gutter={48}>
    <Col span={12}>
      <Statistic title="活跃用户数" value={112893} />
    </Col>
    <Col span={12}>
      <Statistic title="账户余额" value={93.28} precision={2} suffix="元" />
    </Col>
  </Row>
);

export default BasicExample;
