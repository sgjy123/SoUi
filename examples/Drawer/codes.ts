export const basicCode = `const [open, setOpen] = useState(false);

<Space>
  <Button type="primary" onClick={() => setOpen(true)}>
    打开抽屉
  </Button>
  <Drawer
    title="基础抽屉"
    placement="right"
    open={open}
    onClose={() => setOpen(false)}
  >
    <p>这是抽屉的内容区域。</p>
    <p>抽屉从右侧滑出，适合展示详情、表单等信息。</p>
  </Drawer>
</Space>`;

export const placementCode = `const [open, setOpen] = useState(false);
const [placement, setPlacement] = useState('right');

const showDrawer = (p) => {
  setPlacement(p);
  setOpen(true);
};

<Space>
  <Button onClick={() => showDrawer('top')}>顶部</Button>
  <Button onClick={() => showDrawer('right')}>右侧</Button>
  <Button onClick={() => showDrawer('bottom')}>底部</Button>
  <Button onClick={() => showDrawer('left')}>左侧</Button>
  <Drawer
    title={placement + ' 方向抽屉'}
    placement={placement}
    open={open}
    onClose={() => setOpen(false)}
  >
    <p>抽屉从 {placement} 方向滑出。</p>
    <p>支持 top、right、bottom、left 四个方向。</p>
  </Drawer>
</Space>`;

export const extraCode = `const [open, setOpen] = useState(false);

<Space>
  <Button type="primary" onClick={() => setOpen(true)}>
    打开抽屉
  </Button>
  <Drawer
    title="抽屉标题"
    placement="right"
    open={open}
    onClose={() => setOpen(false)}
    extra={
      <Space>
        <Button size="small" onClick={() => setOpen(false)}>取消</Button>
        <Button type="primary" size="small" onClick={() => setOpen(false)}>确定</Button>
      </Space>
    }
    footer={
      <Space>
        <Button onClick={() => setOpen(false)}>取消</Button>
        <Button type="primary" onClick={() => setOpen(false)}>提交</Button>
      </Space>
    }
  >
    <p>抽屉支持 extra 属性在标题右侧添加额外操作区。</p>
    <p>抽屉支持 footer 属性在底部添加操作按钮。</p>
    <p>这在表单提交场景中非常常见。</p>
  </Drawer>
</Space>`;

export const sizeCode = `const [openDefault, setOpenDefault] = useState(false);
const [openLarge, setOpenLarge] = useState(false);
const [openCustom, setOpenCustom] = useState(false);

<Space>
  <Button onClick={() => setOpenDefault(true)}>默认尺寸 (378px)</Button>
  <Button onClick={() => setOpenLarge(true)}>大尺寸 (736px)</Button>
  <Button onClick={() => setOpenCustom(true)}>自定义 (500px)</Button>

  <Drawer
    title="默认尺寸"
    placement="right"
    size="default"
    open={openDefault}
    onClose={() => setOpenDefault(false)}
  >
    <p>默认宽度为 378px。</p>
  </Drawer>

  <Drawer
    title="大尺寸"
    placement="right"
    size="large"
    open={openLarge}
    onClose={() => setOpenLarge(false)}
  >
    <p>大尺寸宽度为 736px。</p>
  </Drawer>

  <Drawer
    title="自定义宽度"
    placement="right"
    size={500}
    open={openCustom}
    onClose={() => setOpenCustom(false)}
  >
    <p>自定义宽度为 500px。</p>
    <p>size 属性支持 number 和 string 类型。</p>
  </Drawer>
</Space>`;
