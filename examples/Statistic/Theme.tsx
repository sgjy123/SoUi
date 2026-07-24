import React from 'react';
import { Statistic, Row, Col, ConfigProvider, Icon } from '../../src';

const { Countdown } = Statistic;

/** 通过 ConfigProvider 自定义主题 */
const ThemeExample = () => (
  <ConfigProvider
    theme={{
      components: {
        Statistic: {
          colorTextHeading: '#8c8c8c',
          colorText: '#1677ff',
          fontSizeHeading: 14,
          fontSize: 32,
        },
      },
    }}
  >
    <Row gutter={48}>
      <Col span={8}>
        <Statistic title="总用户" value={28394} prefix={<Icon name="User" size={20} />} />
      </Col>
      <Col span={8}>
        <Statistic title="转化率" value={68.5} precision={1} suffix="%" />
      </Col>
      <Col span={8}>
        <Countdown title="活动剩余" value={Date.now() + 3600000} format="HH:mm:ss" />
      </Col>
    </Row>
  </ConfigProvider>
);

export default ThemeExample;
