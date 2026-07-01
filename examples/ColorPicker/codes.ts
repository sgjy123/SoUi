export const basicCode = `const [color, setColor] = useState('#1677ff');

<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <ColorPicker value={color} onChange={setColor} />
  <span>{color}</span>
</div>`;

export const sizeCode = `const [color, setColor] = useState('#1677ff');

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div>
    <span>小号：</span>
    <ColorPicker size="small" value={color} onChange={setColor} />
  </div>
  <div>
    <span>中号：</span>
    <ColorPicker size="middle" value={color} onChange={setColor} />
  </div>
  <div>
    <span>大号：</span>
    <ColorPicker size="large" value={color} onChange={setColor} />
  </div>
</div>`;

export const variantCode = `const [color, setColor] = useState('');

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div>
    <span>可清除：</span>
    <ColorPicker value={color} onChange={setColor} allowClear />
  </div>
  <div>
    <span>显示文本：</span>
    <ColorPicker value="#52c41a" showText />
  </div>
  <div>
    <span>禁用：</span>
    <ColorPicker value="#1677ff" disabled />
  </div>
  <div>
    <span>无透明度：</span>
    <ColorPicker value="#1677ff" disabledAlpha />
  </div>
</div>`;

export const formatCode = `const [color, setColor] = useState('#1677ff');

<div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
  <ColorPicker value={color} onChange={setColor} format="rgb" showText />
  <span>{color}</span>
</div>`;

export const presetsCode = `const brandPresets = [
  { label: '品牌色', colors: ['#1677ff', '#52c41a', '#fa8c16', '#f5222d', '#722ed1'] },
  { label: '柔和色', colors: ['#ff9a9e', '#fad0c4', '#a18cd1', '#fbc2eb', '#84fab0'] },
  { label: '灰阶', colors: ['#000', '#333', '#666', '#999', '#ccc', '#fff'] },
];

<ColorPicker presets={brandPresets} />`;

export const customTriggerCode = `<ColorPicker>
  <button style={{ background: color, color: '#fff', borderRadius: 6 }}>
    选择颜色
  </button>
</ColorPicker>

<ColorPicker>
  <div style={{ width: 32, height: 32, borderRadius: 6, background: color }} />
</ColorPicker>`;

export const placementCode = `const placements = ['bottomLeft', 'bottomRight', 'topLeft', 'topRight'];

{placements.map((p) => (
  <ColorPicker key={p} placement={p} />
))}`;

export const themeConfigCode = `<ConfigProvider
  theme={{
    components: {
      ColorPicker: {
        colorPrimary: '#52c41a',
        borderRadius: 10,
        colorBorder: '#b7eb8f',
      },
    },
  }}
>
  <ColorPicker />
</ConfigProvider>`;
