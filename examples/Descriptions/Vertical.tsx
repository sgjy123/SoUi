import React from 'react';
import { Descriptions } from '../../src';

export default () => (
  <Descriptions title="项目信息" layout="vertical">
    <Descriptions.Item label="项目名称">SoUi 组件库</Descriptions.Item>
    <Descriptions.Item label="负责人">张三</Descriptions.Item>
    <Descriptions.Item label="状态">进行中</Descriptions.Item>
    <Descriptions.Item label="描述">基于 React 18 + TypeScript 的现代化 UI 组件库。</Descriptions.Item>
    <Descriptions.Item label="创建时间">2026-01-01</Descriptions.Item>
  </Descriptions>
);
