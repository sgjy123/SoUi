import React from 'react';
import Pagination from '../../src/components/Pagination';

const Sizes: React.FC = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <div style={{ marginBottom: 8, color: '#666' }}>默认尺寸</div>
        <Pagination total={100} />
      </div>
      <div>
        <div style={{ marginBottom: 8, color: '#666' }}>小尺寸</div>
        <Pagination total={100} size="small" />
      </div>
      <div>
        <div style={{ marginBottom: 8, color: '#666' }}>简洁模式</div>
        <Pagination total={100} simple />
      </div>
    </div>
  );
};

export default Sizes;
