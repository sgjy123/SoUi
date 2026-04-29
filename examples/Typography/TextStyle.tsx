import React from 'react';
import Typography from '../../src/components/Typography';
import Space from '../../src/components/Space';

const { Text } = Typography;

const TextStyle: React.FC = () => {
  return (
    <Space direction="vertical" size="middle">
      <div>
        <Text strong>加粗文本</Text>
      </div>
      <div>
        <Text italic>斜体文本</Text>
      </div>
      <div>
        <Text underline>下划线文本</Text>
      </div>
      <div>
        <Text delete>删除线文本</Text>
      </div>
      <div>
        <Text code>代码文本</Text>
      </div>
      <div>
        <Text mark>高亮文本</Text>
      </div>
      <div>
        <Text disabled>禁用文本</Text>
      </div>
      <div>
        <Text strong underline>组合样式：加粗且带下划线</Text>
      </div>
    </Space>
  );
};

export default TextStyle;
