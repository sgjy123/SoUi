import React, { useState } from 'react';
import Pagination from '../../src/components/Pagination';

const Changer: React.FC = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <Pagination
        total={500}
        current={current}
        pageSize={pageSize}
        showSizeChanger
        showQuickJumper
        showTotal={(total, range) => `第 ${range[0]}-${range[1]} 条 / 共 ${total} 条`}
        onChange={(page, size) => { setCurrent(page); setPageSize(size); }}
      />
      <Pagination
        total={500}
        showSizeChanger
        pageSizeOptions={[5, 10, 20, 50]}
        showTotal={(total) => `共 ${total} 条`}
      />
    </div>
  );
};

export default Changer;
