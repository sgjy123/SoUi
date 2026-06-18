import React from 'react';
import { Skeleton } from '../../src';

export default () => (
  <div>
    <h4 style={{ marginBottom: 16 }}>基础占位</h4>
    <Skeleton />

    <h4 style={{ marginTop: 24, marginBottom: 16 }}>无标题</h4>
    <Skeleton title={false} paragraph={{ rows: 4 }} />

    <h4 style={{ marginTop: 24, marginBottom: 16 }}>小段落</h4>
    <Skeleton paragraph={{ rows: 2 }} />
  </div>
);
