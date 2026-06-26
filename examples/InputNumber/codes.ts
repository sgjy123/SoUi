export const basicCode = `const [val, setVal] = useState(3);

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>基础用法</p>
    <InputNumber defaultValue={3} min={1} max={10} />
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>受控模式</p>
    <InputNumber value={val} onChange={(v) => setVal(v)} />
    <span style={{ marginLeft: 12, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>当前值: {val}</span>
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>步进 0.1，精度 2 位</p>
    <InputNumber defaultValue={1.5} step={0.1} precision={2} min={0} max={5} />
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>禁用 / 只读</p>
    <div style={{ display: 'flex', gap: 12 }}>
      <InputNumber defaultValue={5} disabled />
      <InputNumber defaultValue={5} readOnly />
    </div>
  </div>
</div>`;

export const sizeCode = `<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>小尺寸 (small)</p>
    <InputNumber size="small" defaultValue={1} min={0} max={100} />
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>中尺寸 (middle)</p>
    <InputNumber size="middle" defaultValue={50} min={0} max={100} />
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>大尺寸 (large)</p>
    <InputNumber size="large" defaultValue={100} min={0} max={1000} />
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>带前缀</p>
    <InputNumber prefix="¥" defaultValue={100} min={0} style={{ width: 180 }} />
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>前后置标签</p>
    <InputNumber addonBefore="价格" addonAfter="元" defaultValue={99} min={0} style={{ width: 260 }} />
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>隐藏控制按钮</p>
    <InputNumber controls={false} defaultValue={10} />
  </div>
</div>`;

export const variantCode = `const [val1, setVal1] = useState(null);
const [val2, setVal2] = useState(null);

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>错误状态</p>
    <InputNumber status="error" value={val1} onChange={(v) => setVal1(v)} placeholder="请输入正数" min={0} />
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>警告状态</p>
    <InputNumber status="warning" value={val2} onChange={(v) => setVal2(v)} placeholder="库存预警" min={0} />
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>自定义格式化（百分比）</p>
    <InputNumber
      defaultValue={50} min={0} max={100}
      formatter={(v) => v + '%'}
      parser={(v) => parseFloat((v || '').replace('%', ''))}
      style={{ width: 160 }}
    />
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>自定义格式化（千分位）</p>
    <InputNumber
      defaultValue={1000000} min={0}
      formatter={(v) => (v + '').replace(/\\B(?=(\\d{3})+(?!\\d))/g, ',')}
      parser={(v) => parseFloat((v || '').replace(/,/g, ''))}
      style={{ width: 200 }}
    />
  </div>
</div>`;

export const themeCode = `const [val, setVal] = useState(10);

<div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>绿色主题</p>
    <ConfigProvider
      theme={{
        primaryColor: '#52c41a',
        primaryHoverColor: '#73d13d',
        components: { InputNumber: { borderRadius: 8 } },
      }}
    >
      <InputNumber value={val} onChange={(v) => setVal(v)} min={0} max={100} />
    </ConfigProvider>
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>紫色主题 + 大圆角</p>
    <ConfigProvider
      theme={{
        primaryColor: '#722ed1',
        primaryHoverColor: '#9254de',
        components: { InputNumber: { borderRadius: 10, colorBorder: '#d3adf7', controlHeight: 38 } },
      }}
    >
      <div style={{ display: 'flex', gap: 12 }}>
        <InputNumber defaultValue={5} min={0} max={100} />
        <InputNumber defaultValue={20} prefix="¥" min={0} />
        <InputNumber defaultValue={50} disabled />
      </div>
    </ConfigProvider>
  </div>
</div>`;
