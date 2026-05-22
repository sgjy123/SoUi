export const basicCode = `<Breadcrumb>
  <Breadcrumb.Item>首页</Breadcrumb.Item>
  <Breadcrumb.Item href="">应用中心</Breadcrumb.Item>
  <Breadcrumb.Item href="">应用列表</Breadcrumb.Item>
  <Breadcrumb.Item>某个应用</Breadcrumb.Item>
</Breadcrumb>`;

export const separatorCode = `<>
  <Breadcrumb separator=">">
    <Breadcrumb.Item>首页</Breadcrumb.Item>
    <Breadcrumb.Item href="">应用中心</Breadcrumb.Item>
    <Breadcrumb.Item>应用列表</Breadcrumb.Item>
  </Breadcrumb>

  <Breadcrumb separator="-">
    <Breadcrumb.Item>首页</Breadcrumb.Item>
    <Breadcrumb.Item href="">应用中心</Breadcrumb.Item>
    <Breadcrumb.Item>应用列表</Breadcrumb.Item>
  </Breadcrumb>
</>`;

export const withItemsCode = `const items = [
  { title: '首页', href: '' },
  { title: '应用中心', href: '' },
  { title: '应用列表' },
];

<Breadcrumb items={items.map(item => ({ children: item.title, href: item.href }))} />`;

export const customStyleCode = `<ConfigProvider
  theme={{
    components: {
      Breadcrumb: {
        colorLink: '#52c41a',
        colorLinkHover: '#73d13d',
        fontSize: 16,
      },
    },
  }}
>
  <Breadcrumb>
    <Breadcrumb.Item>首页</Breadcrumb.Item>
    <Breadcrumb.Item href="">应用中心</Breadcrumb.Item>
    <Breadcrumb.Item>应用列表</Breadcrumb.Item>
  </Breadcrumb>
</ConfigProvider>`;

export const withIconCode = `<Breadcrumb>
  <Breadcrumb.Item icon={<Icon name="Home" size={14} />}>首页</Breadcrumb.Item>
  <Breadcrumb.Item href="" icon={<Icon name="Application" size={14} />}>
    应用中心
  </Breadcrumb.Item>
  <Breadcrumb.Item href="" icon={<Icon name="List" size={14} />}>
    应用列表
  </Breadcrumb.Item>
  <Breadcrumb.Item icon={<Icon name="File" size={14} />}>某个应用</Breadcrumb.Item>
</Breadcrumb>`;
