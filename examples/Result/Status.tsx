import React from 'react';
import { Result, Button, Space } from '../../src';

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Result
      status="success"
      title="成功"
      subTitle="操作已成功完成"
    />
    <Result
      status="error"
      title="错误"
      subTitle="操作过程中发生错误"
    />
    <Result
      status="warning"
      title="警告"
      subTitle="请注意以下警告信息"
    />
    <Result
      status="info"
      title="提示"
      subTitle="这是一条提示信息"
    />
    <Result
      status="403"
      title="403"
      subTitle="抱歉，您没有权限访问此页面"
      extra={[<Button key="back" type="primary">返回首页</Button>]}
    />
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在"
      extra={[<Button key="back" type="primary">返回首页</Button>]}
    />
    <Result
      status="500"
      title="500"
      subTitle="抱歉，服务器出错了"
      extra={[<Button key="back" type="primary">返回首页</Button>]}
    />
  </Space>
);
