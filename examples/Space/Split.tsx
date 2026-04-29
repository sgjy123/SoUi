import React from 'react';
import Space from '../../src/components/Space';
import Button from '../../src/components/Button';

const Split: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ marginBottom: '12px' }}>文本分隔符</h4>
        <Space split="|">
          <Button type="text">首页</Button>
          <Button type="text">产品</Button>
          <Button type="text">关于</Button>
          <Button type="text">联系</Button>
        </Space>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px' }}>自定义符号分隔符</h4>
        <Space split={<span style={{ color: '#1677ff', fontWeight: 'bold' }}>•</span>}>
          <span>选项一</span>
          <span>选项二</span>
          <span>选项三</span>
        </Space>
      </div>
      <div>
        <h4 style={{ marginBottom: '12px' }}>垂直分隔线</h4>
        <Space
          direction="vertical"
          split={<div style={{ borderBottom: '1px solid #e8e8e8', width: '100%' }} />}
        >
          <div style={{ padding: '8px 0' }}>第一行内容</div>
          <div style={{ padding: '8px 0' }}>第二行内容</div>
          <div style={{ padding: '8px 0' }}>第三行内容</div>
        </Space>
      </div>
    </div>
  );
};

export default Split;
