import React from 'react';
import { Typography } from '../../src';

const { Text } = Typography;

export default () => {
  const [value, setValue] = React.useState('可编辑的文本');
  return (
    <Text editable={{ onChange: setValue }}>{value}</Text>
  );
};
