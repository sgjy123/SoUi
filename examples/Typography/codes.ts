// Typography 组件示例代码字符串

export const basicCode = `<Space direction="vertical" style={{ width: '100%' }}>
  <Title level={1}>一级标题</Title>
  <Title level={2}>二级标题</Title>
  <Title level={3}>三级标题</Title>
  <Title level={4}>四级标题</Title>
  <Title level={5}>五级标题</Title>
  <Paragraph>这是一个段落，用于展示正文内容的样式。</Paragraph>
  <Text>普通文本</Text>
  <br />
  <Link href="https://example.com">链接文本</Link>
</Space>`;

export const textStyleCode = `<Space direction="vertical" size="middle">
  <div>
    <Text strong>加粗文本</Text>
  </div>
  <div>
    <Text italic>斜体文本</Text>
  </div>
  <div>
    <Text underline>下划线文本</Text>
  </div>
  <div>
    <Text delete>删除线文本</Text>
  </div>
  <div>
    <Text code>代码文本</Text>
  </div>
  <div>
    <Text mark>高亮文本</Text>
  </div>
  <div>
    <Text disabled>禁用文本</Text>
  </div>
  <div>
    <Text strong underline>组合样式：加粗且带下划线</Text>
  </div>
</Space>`;

export const textTypeCode = `<Space direction="vertical" size="middle">
  <div>
    <Text type="secondary">次要文本（Secondary）</Text>
  </div>
  <div>
    <Text type="success">成功文本（Success）</Text>
  </div>
  <div>
    <Text type="warning">警告文本（Warning）</Text>
  </div>
  <div>
    <Text type="danger">危险文本（Danger）</Text>
  </div>
</Space>`;

export const copyableCode = `<Space direction="vertical" style={{ width: '100%' }}>
  <div>
    <Text copyable>这段文字可以点击复制</Text>
  </div>
  <div>
    <Text
      copyable={{
        text: '自定义复制内容',
        tooltips: '点击复制',
      }}
    >
      自定义复制内容
    </Text>
  </div>
  <Paragraph copyable>
    段落也可以支持复制功能，点击右侧的复制图标即可复制整段内容。
  </Paragraph>
</Space>`;

export const editableCode = `<Space direction="vertical" style={{ width: '100%' }}>
  <div>
    <Text editable>点击编辑图标可以修改这段文字</Text>
  </div>
  <Paragraph editable>
    段落也支持编辑功能，点击编辑图标后可以直接修改内容，按回车或点击确认按钮保存。
  </Paragraph>
</Space>`;

export const ellipsisCode = `<Space direction="vertical" style={{ width: '100%' }}>
  <div>
    <h4>单行省略</h4>
    <Paragraph ellipsis>
      这是一段很长的文本内容，用于演示文本溢出时的省略效果。当文本超过指定行数时，会自动显示省略号。
    </Paragraph>
  </div>
  <div>
    <h4>多行省略（2行）</h4>
    <Paragraph ellipsis={{ rows: 2 }}>
      这是一段很长的文本内容，用于演示文本溢出时的省略效果。当文本超过指定行数时，会自动显示省略号，并且可以提供展开功能来查看完整内容。这是一段很长的文本内容，用于演示文本溢出时的省略效果。当文本超过指定行数时，会自动显示省略号。
    </Paragraph>
  </div>
  <div>
    <h4>可展开的多行省略</h4>
    <Paragraph
      ellipsis={{
        rows: 2,
        expandable: true,
        symbol: '更多',
      }}
    >
      这是一段很长的文本内容，用于演示文本溢出时的省略效果。当文本超过指定行数时，会自动显示省略号，并且可以提供展开功能来查看完整内容。这是一段很长的文本内容，用于演示文本溢出时的省略效果。当文本超过指定行数时，会自动显示省略号。
    </Paragraph>
  </div>
  <div>
    <h4>带 Tooltip 的省略</h4>
    <Text ellipsis={{ tooltip: '这是一段很长的文本内容，用于演示文本溢出时的省略效果。' }}>
      这是一段很长的文本内容，用于演示文本溢出时的省略效果。
    </Text>
  </div>
</Space>`;

export const linksCode = `<Space direction="vertical" size="middle">
  <div>
    <Link href="https://example.com">默认链接</Link>
  </div>
  <div>
    <Link href="https://example.com" target="_blank">
      新窗口打开
    </Link>
  </div>
  <div>
    <Link href="#" disabled>
      禁用链接
    </Link>
  </div>
</Space>`;
