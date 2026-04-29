import React from 'react';
import Typography from '../../src/components/Typography';
import Space from '../../src/components/Space';

const { Title, Paragraph, Text, Link } = Typography;

const Basic: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <Title level={1}>一级标题</Title>
      <Title level={2}>二级标题</Title>
      <Title level={3}>三级标题</Title>
      <Title level={4}>四级标题</Title>
      <Title level={5}>五级标题</Title>
      <Paragraph>这是一个段落，用于展示正文内容的样式。</Paragraph>
      <Text>普通文本</Text>
      <br />
      <Link href="https://example.com">链接文本</Link>
    </Space>
  );
};

export default Basic;
