import React from 'react';
import Typography from '../../src/components/Typography';
import Space from '../../src/components/Space';

const { Text } = Typography;

const TextType: React.FC = () => {
  return (
    <Space direction="vertical" size="middle">
      <div>
        <Text type="secondary">次要文本（Secondary）</Text>
      </div>
      <div>
        <Text type="success">成功文本（Success）</Text>
      </div>
      <div>
        <Text type="warning">警告文本（Warning）</Text>
      </div>
      <div>
        <Text type="danger">危险文本（Danger）</Text>
      </div>
    </Space>
  );
};

export default TextType;
