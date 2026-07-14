// ==================== Basic Example ====================

export const basicCode = `<Space>
  <Popconfirm
    title="确定要删除这条数据吗？"
    onConfirm={() => console.log('confirmed')}
    onCancel={() => console.log('cancelled')}
  >
    <Button type="primary">删除</Button>
  </Popconfirm>
  <Popconfirm
    title="你确定要执行这个操作吗？"
    okText="是的"
    cancelText="不用了"
  >
    <Button>执行操作</Button>
  </Popconfirm>
  <Popconfirm
    title="确认提交？"
    disabled
  >
    <Button disabled>提交（禁用）</Button>
  </Popconfirm>
</Space>`;

// ==================== Placement Example ====================

export const placementCode = `const positions = [
  { label: '上方', placement: 'top' },
  { label: '左上', placement: 'topLeft' },
  { label: '右上', placement: 'topRight' },
  { label: '下方', placement: 'bottom' },
  { label: '左下', placement: 'bottomLeft' },
  { label: '右下', placement: 'bottomRight' },
  { label: '左侧', placement: 'left' },
  { label: '左上对齐', placement: 'leftTop' },
  { label: '左下对齐', placement: 'leftBottom' },
  { label: '右侧', placement: 'right' },
  { label: '右上对齐', placement: 'rightTop' },
  { label: '右下对齐', placement: 'rightBottom' },
];

<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, maxWidth: 500 }}>
  {positions.map(({ label, placement }) => (
    <Popconfirm
      key={placement}
      title={\`弹出方向：\${label}\`}
      placement={placement}
    >
      <Button style={{ width: '100%' }}>{label}</Button>
    </Popconfirm>
  ))}
</div>`;

// ==================== Custom Content Example ====================

export const customContentCode = `<Space direction="vertical" size={16}>
  <Popconfirm
    title="确认删除"
    description="删除后将无法恢复，请确认是否继续？"
  >
    <Button danger>带描述的确认框</Button>
  </Popconfirm>

  <Popconfirm
    title="自定义图标"
    icon={<Icon name="Info" size={16} style={{ color: '#1677ff' }} />}
  >
    <Button>自定义图标</Button>
  </Popconfirm>

  <Popconfirm
    title="危险操作"
    description="此操作将永久删除所有数据！"
    icon={<Icon name="CloseOne" size={16} style={{ color: '#ff4d4f' }} />}
    okText="删除"
    okButtonProps={{ danger: true }}
  >
    <Button danger>危险操作确认</Button>
  </Popconfirm>

  <Popconfirm
    title="仅确认（无取消按钮）"
    showCancel={false}
    okText="我知道了"
  >
    <Button>仅确认按钮</Button>
  </Popconfirm>
</Space>`;

// ==================== Async Close Example ====================

export const asyncCloseCode = `const [open, setOpen] = useState(false);

const handleConfirm = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
      setOpen(false);
    }, 2000);
  });
};

<Space>
  <Popconfirm
    title="点击确定后 2 秒关闭"
    onConfirm={handleConfirm}
    onCancel={() => setOpen(false)}
    open={open}
    onOpenChange={setOpen}
  >
    <Button type="primary">异步关闭（Promise）</Button>
  </Popconfirm>

  <Popconfirm
    title="确定要提交吗？"
    onConfirm={() => {
      console.log('submitted');
    }}
  >
    <Button>普通确认</Button>
  </Popconfirm>
</Space>`;
