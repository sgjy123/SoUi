import React from 'react';
import { Descriptions } from '../../src';

export default () => (
  <Descriptions title="用户信息">
    <Descriptions.Item label="用户名">Zhang San</Descriptions.Item>
    <Descriptions.Item label="手机号">138****8888</Descriptions.Item>
    <Descriptions.Item label="居住地">杭州</Descriptions.Item>
    <Descriptions.Item label="备注">无</Descriptions.Item>
    <Descriptions.Item label="地址">浙江省杭州市西湖区</Descriptions.Item>
  </Descriptions>
);
