export const basicCode = `<Anchor
  items={[
    { key: '1', href: '#section-1', title: '第一部分' },
    { key: '2', href: '#section-2', title: '第二部分' },
    { key: '3', href: '#section-3', title: '第三部分' },
    { key: '4', href: '#section-4', title: '第四部分' },
  ]}
/>`;

export const horizontalCode = `<Anchor
  direction="horizontal"
  items={[
    { key: '1', href: '#h-section-1', title: '功能特性' },
    { key: '2', href: '#h-section-2', title: '技术架构' },
    { key: '3', href: '#h-section-3', title: '使用指南' },
    { key: '4', href: '#h-section-4', title: '常见问题' },
  ]}
/>`;

export const staticCode = `<Anchor
  affix={false}
  showInkInFixed
  items={[
    { key: '1', href: '#static-section-1', title: '设计原则' },
    { key: '2', href: '#static-section-2', title: '组件规范' },
    { key: '3', href: '#static-section-3', title: '主题定制' },
  ]}
/>`;

export const itemsModeCode = `const items = [
  {
    key: 'guide',
    href: '#items-guide',
    title: '开发指南',
    children: [
      { key: 'quick', href: '#items-quick', title: '快速上手' },
      { key: 'install', href: '#items-install', title: '安装部署' },
    ],
  },
  {
    key: 'component',
    href: '#items-component',
    title: '组件文档',
    children: [
      { key: 'button', href: '#items-button', title: '按钮 Button' },
      { key: 'input', href: '#items-input', title: '输入框 Input' },
    ],
  },
  {
    key: 'api',
    href: '#items-api',
    title: 'API 参考',
  },
];

<Anchor items={items} />`;

export const onChangeCode = `const [activeSection, setActiveSection] = useState('#section-1');

<Anchor
  onChange={(link) => setActiveSection(link)}
  items={[
    { key: '1', href: '#section-1', title: '第一节：入门' },
    { key: '2', href: '#section-2', title: '第二节：进阶' },
    { key: '3', href: '#section-3', title: '第三节：最佳实践' },
  ]}
/>
<div>当前高亮：{activeSection}</div>`;

export const offsetCode = `<Anchor
  offsetTop={80}
  targetOffset={60}
  items={[
    { key: '1', href: '#section-1', title: '概览' },
    { key: '2', href: '#section-2', title: 'API 设计' },
    { key: '3', href: '#section-3', title: '注意事项' },
  ]}
/>`;

export const boundsCode = `<Anchor
  bounds={300}
  offsetTop={80}
  items={[
    { key: '1', href: '#section-1', title: '特性一' },
    { key: '2', href: '#section-2', title: '特性二' },
    { key: '3', href: '#section-3', title: '特性三' },
  ]}
/>`;

export const replaceCode = `<Anchor
  replace
  items={[
    { key: '1', href: '#section-1', title: '页面布局' },
    { key: '2', href: '#section-2', title: '表单操作' },
    { key: '3', href: '#section-3', title: '数据请求' },
  ]}
/>`;

export const linkChildrenCode = `<Anchor>
  <Anchor.Link href="#section-1" title="基础用法" />
  <Anchor.Link href="#section-2" title="动态渲染" />
  <Anchor.Link href="#section-3" title="子锚点">
    <Anchor.Link href="#sub-1" title="子锚点 1" />
    <Anchor.Link href="#sub-2" title="子锚点 2" />
  </Anchor.Link>
</Anchor>`;

export const scrollContainerCode = `const containerRef = useRef<HTMLDivElement>(null);

<div ref={containerRef} style={{ maxHeight: 480, overflow: 'auto' }}>
  <div id="section-1">内容 1</div>
  <div id="section-2">内容 2</div>
  <div id="section-3">内容 3</div>
</div>

<Anchor
  getContainer={() => containerRef.current || window}
  items={[
    { key: '1', href: '#section-1', title: '快速开始' },
    { key: '2', href: '#section-2', title: '安装配置' },
    { key: '3', href: '#section-3', title: '常见问题' },
  ]}
/>`;

export const themeCode = `<ConfigProvider
  theme={{
    primaryColor: '#722ed1',
    components: {
      Anchor: {
        colorPrimary: '#722ed1',
        fontSize: 16,
        linkPadding: 8,
        inkWidth: 3,
      },
    },
  }}
>
  <Anchor
    items={[
      { key: '1', href: '#section-1', title: '框架' },
      { key: '2', href: '#section-2', title: '规范' },
      { key: '3', href: '#section-3', title: '资源' },
    ]}
  />
</ConfigProvider>`;
