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

export const customCode = `<Button onClick={() => setOpen1(true)}>自定义宽度</Button>
<Dialog
  open={open1}
  title="自定义宽度"
  width={600}
  onOk={() => setOpen1(false)}
  onCancel={() => setOpen1(false)}
>
  <p>通过 width 属性设置对话框宽度为 600px。</p>
</Dialog>

<Button onClick={() => setOpen2(true)}>居中显示</Button>
<Dialog
  open={open2}
  title="居中对话框"
  centered
  onOk={() => setOpen2(false)}
  onCancel={() => setOpen2(false)}
>
  <p>通过 centered 属性让对话框垂直居中显示。</p>
</Dialog>

<Button onClick={() => setOpen3(true)}>自定义按钮文字</Button>
<Dialog
  open={open3}
  title="自定义按钮文字"
  okText="提交"
  cancelText="返回"
  onOk={() => setOpen3(false)}
  onCancel={() => setOpen3(false)}
>
  <p>通过 okText 和 cancelText 自定义按钮文字。</p>
</Dialog>`;

export const useDialogCode = `const [dialog, contextHolder] = Dialog.useDialog();

const showConfirm = () => {
  dialog.confirm({
    title: '确认操作',
    content: '使用 useDialog Hook 可以继承 ConfigProvider 的主题上下文。',
    onOk() { console.log('确认'); },
  });
};

const showSuccess = () => {
  dialog.success({
    title: '操作成功',
    content: '这是通过 useDialog Hook 调用的成功提示。',
  });
};

return (
  <>
    {contextHolder}
    <Space>
      <Button onClick={showConfirm}>确认框</Button>
      <Button onClick={showSuccess}>成功</Button>
    </Space>
  </>
);`;

export const customFooterCode = `<Button onClick={() => setOpen1(true)}>自定义底部</Button>
<Dialog
  open={open1}
  title="自定义底部"
  footer={
    <Space>
      <Button onClick={() => setOpen1(false)}>取消</Button>
      <Button type="primary" onClick={() => setOpen1(false)}>自定义按钮</Button>
    </Space>
  }
>
  <p>通过 footer 属性自定义对话框底部内容。</p>
</Dialog>

<Button onClick={() => setOpen2(true)}>隐藏底部</Button>
<Dialog
  open={open2}
  title="隐藏底部"
  footer={null}
  onCancel={() => setOpen2(false)}
>
  <p>设置 footer={null} 可以隐藏对话框底部。</p>
</Dialog>`;
