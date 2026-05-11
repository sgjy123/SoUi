import React from 'react';
import { Typography } from '../../src';

const { Title, Paragraph, Text, Link } = Typography;

export default () => (
  <>
    <Title level={1}>H1 标题</Title>
    <Title level={2}>H2 标题</Title>
    <Paragraph>这是一个段落文本，用于展示排版效果。</Paragraph>
    <Text>普通文本</Text>
    <Link href="https://example.com">链接文本</Link>
  </>
);
