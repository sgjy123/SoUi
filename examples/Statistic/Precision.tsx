import React from 'react';
import { Statistic, Row, Col } from '../../src';

/** 精度与千分位 */
const PrecisionExample = () => (
  <Row gutter={48}>
    <Col span={8}>
      <Statistic title="总金额" value={1234567.89} precision={2} prefix="¥" />
    </Col>
    <Col span={8}>
      <Statistic
        title="无千分位"
        value={1234567}
        groupSeparator=""
      />
    </Col>
    <Col span={8}>
      <Statistic
        title="自定义分隔符"
        value={1234567}
        groupSeparator="."
      />
    </Col>
  </Row>
);

export default PrecisionExample;
