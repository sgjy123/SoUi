import React from 'react';
import Divider from '../../src/components/Divider';

const WithText: React.FC = () => {
  return (
    <div style={{ padding: '16px' }}>
      <Divider>Center Text</Divider>
      <Divider orientation="left">Left Text</Divider>
      <Divider orientation="right">Right Text</Divider>
      <Divider orientation="left" orientationMargin={20}>
        Custom Margin
      </Divider>
    </div>
  );
};

export default WithText;
