import React from 'react';
import { Card } from '../../src';

export default () => (
  <Card title="外层卡片" style={{ background: '#f5f5f5' }}>
    <p>外层卡片内容</p>
    <Card type="inner" title="内嵌卡片" extra={<a href="#" onClick={(e) => e.preventDefault()}>更多</a>}>
      <p>内嵌卡片内容</p>
    </Card>
    <Card type="inner" title="内嵌卡片二" style={{ marginTop: 16 }}>
      <p>内嵌卡片内容</p>
    </Card>
  </Card>
);
