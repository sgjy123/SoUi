import React from 'react';
import { Alert, Space } from '../../src';

export default () => (
  <Space direction="vertical" size={12} style={{ width: '100%' }}>
    <Alert message="信息提示" description="这是信息类型的警告提示，用于一般性提示信息。" type="info" showIcon />
    <Alert message="操作成功" description="恭喜！您的操作已成功完成，数据已保存。" type="success" showIcon />
    <Alert message="注意警告" description="请检查您的输入信息，部分内容可能需要修改。" type="warning" showIcon />
    <Alert message="操作失败" description="很抱歉，提交过程中出现了错误，请稍后重试。" type="error" showIcon />
  </Space>
);
