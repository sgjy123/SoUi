import React from 'react';
import { Statistic, Row, Col, Icon } from '../../src';

/** 前缀和后缀 */
const PrefixSuffixExample = () => (
  <Row gutter={48}>
    <Col span={12}>
      <Statistic
        title="反馈数"
        value={1128}
        prefix={<Icon name="Comment" size={20} />}
      />
    </Col>
    <Col span={12}>
      <Statistic
        title="增长率"
        value={9.3}
        precision={1}
        suffix="%"
        prefix={<Icon name="Up" size={20} style={{ color: '#52c41a' }} />}
      />
    </Col>
  </Row>
);

export default PrefixSuffixExample;
