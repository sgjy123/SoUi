import React from 'react';
import { Skeleton, Space } from '../../src';

export default () => (
  <div>
    <h4 style={{ marginBottom: 16 }}>按钮占位</h4>
    <Space size={16}>
      <Skeleton.Button size="small" />
      <Skeleton.Button />
      <Skeleton.Button size="large" />
      <Skeleton.Button shape="round" />
      <Skeleton.Button shape="circle" />
    </Space>

    <h4 style={{ marginTop: 24, marginBottom: 16 }}>头像占位</h4>
    <Space size={16}>
      <Skeleton.Avatar size="small" />
      <Skeleton.Avatar />
      <Skeleton.Avatar size="large" />
      <Skeleton.Avatar shape="square" />
    </Space>

    <h4 style={{ marginTop: 24, marginBottom: 16 }}>输入框占位</h4>
    <Space direction="vertical" size={16}>
      <Skeleton.Input size="small" />
      <Skeleton.Input />
      <Skeleton.Input size="large" />
    </Space>

    <h4 style={{ marginTop: 24, marginBottom: 16 }}>图片占位</h4>
    <Skeleton.Image />

    <h4 style={{ marginTop: 24, marginBottom: 16 }}>带动画效果</h4>
    <Space size={16}>
      <Skeleton.Button active />
      <Skeleton.Avatar active />
      <Skeleton.Input active />
      <Skeleton.Image active />
    </Space>
  </div>
);
