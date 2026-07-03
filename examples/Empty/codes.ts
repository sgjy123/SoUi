export const basicCode = `<Empty />`;

export const simpleCode = `<Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />`;

export const withActionCode = `<Empty description="暂无数据，请添加内容">
  <Button type="primary">立即添加</Button>
</Empty>`;

export const customImageCode = `<div style={{ display: 'flex', gap: 48 }}>
  <Empty
    description="自定义 URL 图片"
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    imageStyle={{ width: 120, height: 120 }}
  />
  <Empty
    description="自定义 SVG 节点"
    image={
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
        <circle cx="40" cy="40" r="36" fill="#f0f5ff" stroke="#1677ff" strokeWidth="2" />
        <path d="M28 40h24M40 28v24" stroke="#1677ff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    }
  />
</div>`;

export const themeConfigCode = `<ConfigProvider
  theme={{
    primaryColor: '#722ed1',
    components: {
      Empty: {
        iconColor: '#722ed1',
        iconBg: 'rgba(114, 46, 209, 0.08)',
        descriptionColor: 'rgba(114, 46, 209, 0.65)',
      },
    },
  }}
>
  <Empty description="紫色主题空状态" />
</ConfigProvider>

<ConfigProvider
  theme={{
    primaryColor: '#13c2c2',
    components: {
      Empty: {
        iconColor: '#13c2c2',
        iconBg: 'rgba(19, 194, 194, 0.08)',
        imageHeight: 160,
      },
    },
  }}
>
  <Empty description="青色主题空状态" />
</ConfigProvider>`;
