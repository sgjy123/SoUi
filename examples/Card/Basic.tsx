import React from 'react';
import { Card } from '../../src';

export default () => (
  <Card title="卡片标题" extra={<a href="#" onClick={(e) => e.preventDefault()}>更多</a>} style={{ width: 360 }}>
    <p>卡片内容一</p>
    <p>卡片内容二</p>
    <p>卡片内容三</p>
  </Card>
);
