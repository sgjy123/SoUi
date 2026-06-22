// examples/Dialog/codes.ts

export const basicCode = `const [open, setOpen] = useState(false);

<Button type="primary" onClick={() => setOpen(true)}>
  打开对话框
</Button>
<Dialog
  open={open}
  title="基本对话框"
  onOk={() => setOpen(false)}
  onCancel={() => setOpen(false)}
>
  <p>这是一个基本的对话框示例。</p>
</Dialog>`;

export const confirmCode = `<Button onClick={() => Dialog.confirm({
  title: '确认操作',
  content: '你确定要执行这个操作吗？',
  onOk() { console.log('确认'); },
})}>
  确认框
</Button>

<Button onClick={() => Dialog.success({
  title: '操作成功',
  content: '数据已成功保存！',
})}>
  成功
</Button>`;

export const asyncCode = `const [open, setOpen] = useState(false);
const [loading, setLoading] = useState(false);

const handleOk = () => {
  setLoading(true);
  setTimeout(() => {
    setLoading(false);
    setOpen(false);
  }, 2000);
};

<Button type="primary" onClick={() => setOpen(true)}>
  异步提交
</Button>
<Dialog
  open={open}
  title="异步对话框"
  confirmLoading={loading}
  onOk={handleOk}
  onCancel={() => setOpen(false)}
>
  <p>点击确定后将模拟一个异步操作。</p>
</Dialog>`;
