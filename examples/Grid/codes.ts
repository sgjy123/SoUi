// Grid 示例代码字符串

export const basicCode = `<>  <Row>
    <Col span={12}>
      <div style={{
        background: '#1677ff',
        color: '#fff',
        textAlign: 'center',
        padding: '16px 8px',
        borderRadius: '6px',
        minHeight: '40px'
      }}>col-12</div>
    </Col>
    <Col span={12}>
      <div style={{
        background: '#1677ff',
        color: '#fff',
        textAlign: 'center',
        padding: '16px 8px',
        borderRadius: '6px',
        minHeight: '40px'
      }}>col-12</div>
    </Col>
  </Row>
  <Row>
    <Col span={8}>
      <div style={{
        background: '#1677ff',
        color: '#fff',
        textAlign: 'center',
        padding: '16px 8px',
        borderRadius: '6px',
        minHeight: '40px'
      }}>col-8</div>
    </Col>
    <Col span={8}>
      <div style={{
        background: '#1677ff',
        color: '#fff',
        textAlign: 'center',
        padding: '16px 8px',
        borderRadius: '6px',
        minHeight: '40px'
      }}>col-8</div>
    </Col>
    <Col span={8}>
      <div style={{
        background: '#1677ff',
        color: '#fff',
        textAlign: 'center',
        padding: '16px 8px',
        borderRadius: '6px',
        minHeight: '40px'
      }}>col-8</div>
    </Col>
  </Row>
  <Row>
    <Col span={6}>
      <div style={{
        background: '#1677ff',
        color: '#fff',
        textAlign: 'center',
        padding: '16px 8px',
        borderRadius: '6px',
        minHeight: '40px'
      }}>col-6</div>
    </Col>
    <Col span={6}>
      <div style={{
        background: '#1677ff',
        color: '#fff',
        textAlign: 'center',
        padding: '16px 8px',
        borderRadius: '6px',
        minHeight: '40px'
      }}>col-6</div>
    </Col>
    <Col span={6}>
      <div style={{
        background: '#1677ff',
        color: '#fff',
        textAlign: 'center',
        padding: '16px 8px',
        borderRadius: '6px',
        minHeight: '40px'
      }}>col-6</div>
    </Col>
    <Col span={6}>
      <div style={{
        background: '#1677ff',
        color: '#fff',
        textAlign: 'center',
        padding: '16px 8px',
        borderRadius: '6px',
        minHeight: '40px'
      }}>col-6</div>
    </Col>
  </Row>
</>`;

export const gutterCode = `<Row gutter={16}>
  <Col span={6}>
    <div style={{
      background: '#e6f7ff',
      border: '1px solid #91d5ff',
      textAlign: 'center',
      padding: '16px 8px',
      borderRadius: '6px',
      minHeight: '40px',
      color: '#1677ff'
    }}>col-6</div>
  </Col>
  <Col span={6}>
    <div style={{
      background: '#e6f7ff',
      border: '1px solid #91d5ff',
      textAlign: 'center',
      padding: '16px 8px',
      borderRadius: '6px',
      minHeight: '40px',
      color: '#1677ff'
    }}>col-6</div>
  </Col>
  <Col span={6}>
    <div style={{
      background: '#e6f7ff',
      border: '1px solid #91d5ff',
      textAlign: 'center',
      padding: '16px 8px',
      borderRadius: '6px',
      minHeight: '40px',
      color: '#1677ff'
    }}>col-6</div>
  </Col>
  <Col span={6}>
    <div style={{
      background: '#e6f7ff',
      border: '1px solid #91d5ff',
      textAlign: 'center',
      padding: '16px 8px',
      borderRadius: '6px',
      minHeight: '40px',
      color: '#1677ff'
    }}>col-6</div>
  </Col>
</Row>`;

export const offsetCode = `<>
  <Row>
    <Col span={6}>
      <div style={{
        background: '#fff1f0',
        border: '1px solid #ffa39e',
        textAlign: 'center',
        padding: '16px 8px',
        borderRadius: '6px',
        minHeight: '40px',
        color: '#ff4d4f'
      }}>col-6</div>
    </Col>
    <Col span={6} offset={6}>
      <div style={{
        background: '#fff1f0',
        border: '1px solid #ffa39e',
        textAlign: 'center',
        padding: '16px 8px',
        borderRadius: '6px',
        minHeight: '40px',
        color: '#ff4d4f'
      }}>col-6 offset-6</div>
    </Col>
  </Row>
  <Row>
    <Col span={6} offset={6}>
      <div style={{
        background: '#fff1f0',
        border: '1px solid #ffa39e',
        textAlign: 'center',
        padding: '16px 8px',
        borderRadius: '6px',
        minHeight: '40px',
        color: '#ff4d4f'
      }}>col-6 offset-6</div>
    </Col>
    <Col span={6} offset={6}>
      <div style={{
        background: '#fff1f0',
        border: '1px solid #ffa39e',
        textAlign: 'center',
        padding: '16px 8px',
        borderRadius: '6px',
        minHeight: '40px',
        color: '#ff4d4f'
      }}>col-6 offset-6</div>
    </Col>
  </Row>
</>`;

export const responsiveCode = `<Row>
  <Col xs={2} sm={4} md={6} lg={8} xl={10}>
    <div style={{
      background: '#f9f0ff',
      border: '1px solid #d3adf7',
      textAlign: 'center',
      padding: '16px 8px',
      borderRadius: '6px',
      minHeight: '40px',
      color: '#722ed1'
    }}>col</div>
  </Col>
  <Col xs={20} sm={16} md={12} lg={8} xl={4}>
    <div style={{
      background: '#f9f0ff',
      border: '1px solid #d3adf7',
      textAlign: 'center',
      padding: '16px 8px',
      borderRadius: '6px',
      minHeight: '40px',
      color: '#722ed1'
    }}>col</div>
  </Col>
  <Col xs={2} sm={4} md={6} lg={8} xl={10}>
    <div style={{
      background: '#f9f0ff',
      border: '1px solid #d3adf7',
      textAlign: 'center',
      padding: '16px 8px',
      borderRadius: '6px',
      minHeight: '40px',
      color: '#722ed1'
    }}>col</div>
  </Col>
</Row>`;

export const alignmentCode = `<>
  <Row justify="center">
    <Col span={4}>
      <div style={{
        background: '#faad14',
        color: '#fff',
        textAlign: 'center',
        padding: '16px 8px',
        borderRadius: '6px',
        minHeight: '40px'
      }}>col-4</div>
    </Col>
    <Col span={4}>
      <div style={{
        background: '#faad14',
        color: '#fff',
        textAlign: 'center',
        padding: '16px 8px',
        borderRadius: '6px',
        minHeight: '40px'
      }}>col-4</div>
    </Col>
  </Row>
  <Row align="middle" style={{ height: '100px' }}>
    <Col span={4}>
      <div style={{
        background: '#faad14',
        color: '#fff',
        textAlign: 'center',
        padding: '16px 8px',
        borderRadius: '6px',
        minHeight: '40px'
      }}>col-4</div>
    </Col>
    <Col span={4}>
      <div style={{
        background: '#faad14',
        color: '#fff',
        textAlign: 'center',
        padding: '16px 8px',
        borderRadius: '6px',
        minHeight: '40px'
      }}>col-4</div>
    </Col>
    <Col span={4}>
      <div style={{
        background: '#faad14',
        color: '#fff',
        textAlign: 'center',
        padding: '16px 8px',
        borderRadius: '6px',
        minHeight: '40px'
      }}>col-4</div>
    </Col>
  </Row>
</>`;
