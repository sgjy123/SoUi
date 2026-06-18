// ==================== Basic 示例代码 ====================

export const basicCode = `<Space direction="vertical" style={{ width: '100%' }}>
  <Progress percent={30} />
  <Progress percent={50} status="active" />
  <Progress percent={70} status="exception" />
  <Progress percent={100} />
  <Progress percent={50} showInfo={false} />
</Space>`;

// ==================== Circle 示例代码 ====================

export const circleCode = `<Space size={24} wrap>
  <Progress type="circle" percent={75} />
  <Progress type="circle" percent={70} status="exception" />
  <Progress type="circle" percent={100} />
  <Progress type="circle" percent={50} status="active" />
</Space>`;

// ==================== Dynamic 示例代码 ====================

export const dynamicCode = `const [percent, setPercent] = useState(0);

<Space direction="vertical" style={{ width: '100%' }}>
  <Progress percent={percent} />
  <Progress type="circle" percent={percent} />
  <Space>
    <Button onClick={() => setPercent(Math.max(0, percent - 10))} disabled={percent === 0}>
      减少
    </Button>
    <Button onClick={() => setPercent(Math.min(100, percent + 10))} type="primary" disabled={percent === 100}>
      增加
    </Button>
  </Space>
</Space>`;

// ==================== Steps 示例代码 ====================

export const stepsCode = `<Space direction="vertical" style={{ width: '100%' }}>
  <Progress percent={30} steps={5} />
  <Progress percent={50} steps={5} status="active" />
  <Progress percent={70} steps={5} status="exception" />
  <Progress percent={100} steps={5} />
  <Progress percent={60} steps={8} />
</Space>`;
