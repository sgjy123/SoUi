import React from 'react';
import Typography from '../../src/components/Typography';
import Space from '../../src/components/Space';

const { Paragraph, Text } = Typography;

const longText = '这是一段很长的文本内容，用于演示文本溢出时的省略效果。当文本超过指定行数时，会自动显示省略号，并且可以提供展开功能来查看完整内容。';

const Ellipsis: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div>
        <h4 style={{ marginBottom: '8px' }}>单行省略</h4>
        <Paragraph ellipsis>
          {longText}
        </Paragraph>
      </div>
      <div>
        <h4 style={{ marginBottom: '8px' }}>多行省略（2行）</h4>
        <Paragraph ellipsis={{ rows: 2 }}>
          {longText + longText}
        </Paragraph>
      </div>
      <div>
        <h4 style={{ marginBottom: '8px' }}>可展开的多行省略</h4>
        <Paragraph
          ellipsis={{
            rows: 2,
            expandable: true,
            symbol: '更多',
          }}
        >
          {longText + longText}
        </Paragraph>
      </div>
      <div>
        <h4 style={{ marginBottom: '8px' }}>带 Tooltip 的省略</h4>
        <Text ellipsis={{ tooltip: longText }}>
          {longText}
        </Text>
      </div>
    </Space>
  );
};

export default Ellipsis;
