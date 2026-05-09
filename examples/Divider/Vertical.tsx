import React from 'react';
import Divider from '../../src/components/Divider';

const Vertical: React.FC = () => {
  return (
    <div style={{ padding: '16px' }}>
      <span>Home</span>
      <Divider type="vertical" />
      <span>Products</span>
      <Divider type="vertical" />
      <span>About</span>
      <Divider type="vertical" />
      <span>Contact</span>
    </div>
  );
};

export default Vertical;
