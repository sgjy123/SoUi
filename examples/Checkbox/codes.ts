export const basicCode = `const [checked, setChecked] = useState(true);

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>基础用法</p>
    <Checkbox>默认选项</Checkbox>
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>默认选中</p>
    <Checkbox defaultChecked>默认选中</Checkbox>
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>受控模式</p>
    <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)}>
      受控选项（{checked ? '已选中' : '未选中'}）
    </Checkbox>
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>禁用状态</p>
    <div style={{ display: 'flex', gap: 16 }}>
      <Checkbox disabled>禁用未选</Checkbox>
      <Checkbox disabled defaultChecked>禁用已选</Checkbox>
    </div>
  </div>
</div>`;

export const groupCode = `const [value, setValue] = useState(['react', 'vue']);

const options = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
];

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>通过 options 数据驱动</p>
    <Checkbox.Group
      options={options}
      value={value}
      onChange={(val) => setValue(val)}
    />
    <p style={{ marginTop: 8, fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>
      已选: {value.join(', ') || '无'}
    </p>
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>子组件方式</p>
    <Checkbox.Group defaultValue={['a']}>
      <Checkbox value="a">选项 A</Checkbox>
      <Checkbox value="b">选项 B</Checkbox>
      <Checkbox value="c">选项 C</Checkbox>
      <Checkbox value="d" disabled>选项 D（禁用）</Checkbox>
    </Checkbox.Group>
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>禁用整组</p>
    <Checkbox.Group options={options} defaultValue={['react']} disabled />
  </div>
</div>`;

export const indeterminateCode = `const plainOptions = ['苹果', '橘子', '香蕉'];
const [checkedList, setCheckedList] = useState(['苹果']);
const [indeterminate, setIndeterminate] = useState(true);
const [checkAll, setCheckAll] = useState(false);

const onChange = (list) => {
  setCheckedList(list);
  setIndeterminate(!!list.length && list.length < plainOptions.length);
  setCheckAll(list.length === plainOptions.length);
};

const onCheckAllChange = (e) => {
  setCheckedList(e.target.checked ? plainOptions : []);
  setIndeterminate(false);
  setCheckAll(e.target.checked);
};

<div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>全选 / 半选</p>
    <Checkbox
      indeterminate={indeterminate}
      onChange={onCheckAllChange}
      checked={checkAll}
    >
      全选
    </Checkbox>
  </div>
  <div style={{ paddingLeft: 8 }}>
    <Checkbox.Group
      options={plainOptions.map((v) => ({ label: v, value: v }))}
      value={checkedList}
      onChange={onChange}
    />
  </div>
</div>`;

export const themeCode = `const [val, setVal] = useState(['react', 'vue']);
const options = [
  { label: 'React', value: 'react' },
  { label: 'Vue', value: 'vue' },
  { label: 'Angular', value: 'angular' },
  { label: 'Svelte', value: 'svelte' },
];

<div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>绿色主题</p>
    <ConfigProvider
      theme={{
        primaryColor: '#52c41a',
        primaryHoverColor: '#73d13d',
        components: {
          Checkbox: { borderRadius: 6 },
        },
      }}
    >
      <Checkbox.Group
        options={options}
        value={val}
        onChange={(v) => setVal(v)}
      />
    </ConfigProvider>
  </div>
  <div>
    <p style={{ marginBottom: 8, color: 'rgba(0,0,0,0.45)', fontSize: 12 }}>紫色主题 + 大圆角</p>
    <ConfigProvider
      theme={{
        primaryColor: '#722ed1',
        primaryHoverColor: '#9254de',
        components: {
          Checkbox: { borderRadius: 8, colorBorder: '#d9d9d9' },
        },
      }}
    >
      <div style={{ display: 'flex', gap: 12 }}>
        <Checkbox defaultChecked>选项 A</Checkbox>
        <Checkbox defaultChecked>选项 B</Checkbox>
        <Checkbox>选项 C</Checkbox>
        <Checkbox disabled>禁用</Checkbox>
      </div>
    </ConfigProvider>
  </div>
</div>`;
