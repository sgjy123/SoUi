import React from 'react';
import { Statistic, Row, Col } from '../../src';

const { Countdown } = Statistic;

/** 倒计时 */
const CountdownExample = () => {
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 30;

  return (
    <Row gutter={48}>
      <Col span={12}>
        <Countdown
          title="倒计时"
          value={deadline}
          onFinish={() => console.log('倒计时结束')}
        />
      </Col>
      <Col span={12}>
        <Countdown
          title="包含天数"
          value={deadline}
          format="DD 天 HH:mm:ss"
        />
      </Col>
    </Row>
  );
};

export default CountdownExample;
