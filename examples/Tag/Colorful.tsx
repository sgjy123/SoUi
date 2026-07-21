import React from 'react';
import { Tag, Space, Divider } from '../../src';

const presetColors = [
  'magenta', 'red', 'volcano', 'orange', 'gold', 'lime',
  'green', 'cyan', 'blue', 'geekblue', 'purple',
];

export default () => (
  <div>
    <Divider orientation="left">状态色</Divider>
    <Space wrap>
      <Tag color="success">成功</Tag>
      <Tag color="processing">进行中</Tag>
      <Tag color="error">错误</Tag>
      <Tag color="warning">警告</Tag>
      <Tag color="default">默认</Tag>
    </Space>
    <Divider orientation="left">预设颜色</Divider>
    <Space wrap>
      {presetColors.map((c) => (
        <Tag key={c} color={c}>{c}</Tag>
      ))}
    </Space>
    <Divider orientation="left">自定义颜色</Divider>
    <Space wrap>
      <Tag color="#f50">#f50</Tag>
      <Tag color="#2db7f5">#2db7f5</Tag>
      <Tag color="#87d068">#87d068</Tag>
      <Tag color="#108ee9">#108ee9</Tag>
    </Space>
  </div>
);
