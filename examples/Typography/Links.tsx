import React from 'react';
import Typography from '../../src/components/Typography';
import Space from '../../src/components/Space';

const { Link } = Typography;

const Links: React.FC = () => {
  return (
    <Space direction="vertical" size="middle">
      <div>
        <Link href="https://example.com">默认链接</Link>
      </div>
      <div>
        <Link href="https://example.com" target="_blank">
          新窗口打开
        </Link>
      </div>
      <div>
        <Link href="#" disabled>
          禁用链接
        </Link>
      </div>
    </Space>
  );
};

export default Links;
