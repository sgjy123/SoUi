import React from 'react';
import Divider from '../../src/components/Divider';

const CustomColor: React.FC = () => {
  return (
    <div style={{ padding: '16px' }}>
      <p>Default color</p>
      <Divider />
      
      <p>Custom color</p>
      <Divider color="#1677ff" />
      
      <p>Dashed with custom color</p>
      <Divider dashed color="#52c41a" />
      
      <p>With text and custom color</p>
      <Divider color="#faad14">Custom Color Text</Divider>
    </div>
  );
};

export default CustomColor;
