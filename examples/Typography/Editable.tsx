import React from 'react';
import Typography from '../../src/components/Typography';
import Space from '../../src/components/Space';

const { Text, Paragraph } = Typography;

const Editable: React.FC = () => {
  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div>
        <Text editable>点击编辑图标可以修改这段文字</Text>
      </div>
      <Paragraph editable>
        段落也支持编辑功能，点击编辑图标后可以直接修改内容，按回车或点击确认按钮保存。
      </Paragraph>
    </Space>
  );
};

export default Editable;
