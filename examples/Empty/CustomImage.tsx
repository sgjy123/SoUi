import React from 'react';
import Empty from '../../src/components/Empty';

const CustomImage: React.FC = () => {
  return (
    <div style={{ display: 'flex', gap: 48 }}>
      <Empty
        description="自定义 URL 图片"
        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
        imageStyle={{ width: 120, height: 120 }}
      />
      <Empty
        description="自定义 SVG 节点"
        image={
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="36" fill="#f0f5ff" stroke="#1677ff" strokeWidth="2" />
            <path d="M28 40h24M40 28v24" stroke="#1677ff" strokeWidth="2" strokeLinecap="round" />
          </svg>
        }
      />
    </div>
  );
};

export default CustomImage;
