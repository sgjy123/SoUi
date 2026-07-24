import React, { useState } from 'react';
import { Statistic, Row, Col, Button } from '../../src';

/** 加载中状态 */
const LoadingExample = () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <Button onClick={() => setLoading(!loading)} style={{ marginBottom: 16 }}>
        {loading ? '加载完成' : '加载中'}
      </Button>
      <Row gutter={48}>
        <Col span={12}>
          <Statistic title="活跃用户" value={112893} loading={loading} />
        </Col>
        <Col span={12}>
          <Statistic title="总营收" value={93827.5} precision={2} prefix="¥" loading={loading} />
        </Col>
      </Row>
    </div>
  );
};

export default LoadingExample;
