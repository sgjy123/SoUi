import React from 'react';
import { Badge, Space } from '../../src';

const colors = [
  'pink', 'red', 'yellow', 'orange', 'cyan', 'green', 'blue', 'purple', 'geekblue', 'magenta', 'volcano', 'gold', 'lime',
];

export default () => (
  <Space direction="vertical" size={10}>
    {colors.map((c) => (
      <Badge key={c} color={c} text={c} />
    ))}
    <br />
    <Badge color="#f50" text="#f50" />
    <br />
    <Badge color="#2db7f5" text="#2db7f5" />
    <br />
    <Badge color="#87d068" text="#87d068" />
    <br />
    <Badge color="#108ee9" text="#108ee9" />
  </Space>
);
