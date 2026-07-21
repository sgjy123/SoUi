import React from 'react';
import { Card } from '../../src';

export default () => (
  <Card title="卡片栅格">
    <Card.Grid style={{ width: '25%', textAlign: 'center' }}>内容一</Card.Grid>
    <Card.Grid style={{ width: '25%', textAlign: 'center' }}>内容二</Card.Grid>
    <Card.Grid style={{ width: '25%', textAlign: 'center' }}>内容三</Card.Grid>
    <Card.Grid style={{ width: '25%', textAlign: 'center' }}>内容四</Card.Grid>
    <Card.Grid style={{ width: '25%', textAlign: 'center' }}>内容五</Card.Grid>
    <Card.Grid style={{ width: '25%', textAlign: 'center' }}>内容六</Card.Grid>
    <Card.Grid style={{ width: '25%', textAlign: 'center' }}>内容七</Card.Grid>
    <Card.Grid style={{ width: '25%', textAlign: 'center' }}>内容八</Card.Grid>
  </Card>
);
