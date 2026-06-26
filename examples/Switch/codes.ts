export const basicCode = `const [checked, setChecked] = useState(true);

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>基础用法</p>
    <Switch />
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>默认选中</p>
    <Switch defaultChecked />
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>受控模式</p>
    <Switch checked={checked} onChange={(val) => setChecked(val)} />
    <span style={{ marginLeft: 8, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
      {checked ? '开' : '关'}
    </span>
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>禁用状态</p>
    <div style={{ display: 'flex', gap: 16 }}>
      <Switch disabled />
      <Switch disabled defaultChecked />
    </div>
  </div>
</div>`;

export const variantCode = `const [checked1, setChecked1] = useState(true);
const [checked2, setChecked2] = useState(false);

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>两种尺寸</p>
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Switch defaultChecked />
      <Switch defaultChecked size="small" />
    </div>
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>带文字内容</p>
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Switch
        checked={checked1}
        onChange={setChecked1}
        checkedChildren="开"
        unCheckedChildren="关"
      />
      <Switch
        checked={checked2}
        onChange={setChecked2}
        checkedChildren="ON"
        unCheckedChildren="OFF"
      />
      <Switch
        checkedChildren="1"
        unCheckedChildren="0"
        size="small"
      />
    </div>
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>自定义样式</p>
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Switch
        defaultChecked
        style={{ '--soui-switch-color-primary': '#52c41a' }}
      />
      <Switch
        defaultChecked
        style={{ '--soui-switch-color-primary': '#fa541c' }}
      />
      <Switch
        defaultChecked
        style={{ '--soui-switch-border-radius': '4px' }}
      />
    </div>
  </div>
</div>`;

export const loadingCode = `const [loading, setLoading] = useState(true);
const [checked, setChecked] = useState(true);

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>加载中状态</p>
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Switch loading defaultChecked />
      <Switch loading />
      <Switch loading size="small" defaultChecked />
    </div>
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>切换加载状态</p>
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      <Switch
        loading={loading}
        checked={checked}
        onChange={(val) => setChecked(val)}
      />
      <Switch
        loading={loading}
        checked={checked}
        onChange={(val) => setChecked(val)}
        size="small"
      />
      <button
        style={{
          padding: '4px 12px',
          borderRadius: 4,
          border: '1px solid #d9d9d9',
          cursor: 'pointer',
          fontSize: 12,
        }}
        onClick={() => setLoading(!loading)}
      >
        {loading ? '关闭加载' : '开启加载'}
      </button>
    </div>
  </div>
</div>`;

export const themeCode = `<div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>绿色主题</p>
    <ConfigProvider
      theme={{
        primaryColor: '#52c41a',
        primaryHoverColor: '#73d13d',
        components: {
          Switch: { borderRadius: 12 },
        },
      }}
    >
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Switch defaultChecked checkedChildren="开" unCheckedChildren="关" />
        <Switch defaultChecked size="small" />
        <Switch />
      </div>
    </ConfigProvider>
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>紫色主题 + 方角</p>
    <ConfigProvider
      theme={{
        primaryColor: '#722ed1',
        primaryHoverColor: '#9254de',
        components: {
          Switch: { borderRadius: 4, colorBg: 'rgba(0,0,0,0.15)' },
        },
      }}
    >
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Switch defaultChecked checkedChildren="ON" unCheckedChildren="OFF" />
        <Switch defaultChecked size="small" />
        <Switch disabled defaultChecked />
      </div>
    </ConfigProvider>
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>自定义关闭态颜色</p>
    <ConfigProvider
      theme={{
        components: {
          Switch: { colorBg: '#d9d9d9', colorBgHover: '#bfbfbf' },
        },
      }}
    >
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Switch />
        <Switch defaultChecked />
      </div>
    </ConfigProvider>
  </div>
</div>`;
