import React from 'react';
import Typography from '../../src/components/Typography';
import Space from '../../src/components/Space';

const { Text, Paragraph } = Typography;

const Copyable: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div>
        <Text copyable>这段文字可以点击复制</Text>
      </div>
      <div>
        <Text
          copyable={{
            text: '自定义复制内容',
            tooltips: '点击复制',
          }}
        >
          自定义复制内容
        </Text>
      </div>
      <Paragraph copyable>
        段落也可以支持复制功能，点击右侧的复制图标即可复制整段内容。
      </Paragraph>
    </Space>
  );
};

export default Copyable;
