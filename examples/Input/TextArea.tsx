import React, { useState } from 'react';
import { Input } from '../../src';

export default () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Input.TextArea placeholder="请输入内容" rows={4} />
    <Input.TextArea placeholder="禁用状态" disabled rows={3} />
    <Input.TextArea placeholder="带字符计数" showCount maxLength={200} rows={4} />
    <Input.TextArea placeholder="成功状态" status="success" rows={3} />
    <Input.TextArea placeholder="错误状态" status="error" rows={3} />
  </div>
);
