# Result 结果

用于反馈一系列操作任务的处理结果。

## 何时使用

- 当有重要操作需告知用户处理结果时使用
- 操作成功、失败或需要确认的反馈页面
- 页面级状态展示（如 403、404、500 等 HTTP 状态）
- 表单提交、数据导入等操作的最终反馈

## 代码演示

### 基础用法

成功状态的反馈结果，带有标题、描述和操作按钮。

```tsx
import { Result, Button } from '@soui/ui';

export default () => (
  <Result
    status="success"
    title="操作成功"
    subTitle="您的订单已成功提交，我们将尽快为您处理。"
    extra={[
      <Button key="back" type="primary">返回</Button>,
      <Button key="buy">查看详情</Button>,
    ]}
  />
);
```

### 所有状态

展示所有可用的结果状态：success、error、warning、info 和 HTTP 状态码。

```tsx
import { Result, Button, Space } from '@soui/ui';

export default () => (
  <Space direction="vertical" style={{ width: '100%' }}>
    <Result
      status="success"
      title="成功"
      subTitle="操作已成功完成"
    />
    <Result
      status="error"
      title="错误"
      subTitle="操作过程中发生错误"
    />
    <Result
      status="warning"
      title="警告"
      subTitle="请注意以下警告信息"
    />
    <Result
      status="info"
      title="提示"
      subTitle="这是一条提示信息"
    />
    <Result
      status="403"
      title="403"
      subTitle="抱歉，您没有权限访问此页面"
      extra={[<Button key="back" type="primary">返回首页</Button>]}
    />
    <Result
      status="404"
      title="404"
      subTitle="抱歉，您访问的页面不存在"
      extra={[<Button key="back" type="primary">返回首页</Button>]}
    />
    <Result
      status="500"
      title="500"
      subTitle="抱歉，服务器出错了"
      extra={[<Button key="back" type="primary">返回首页</Button>]}
    />
  </Space>
);
```

### 自定义图标

通过 icon 属性自定义结果图标。

```tsx
import { Result, Button, Icon } from '@soui/ui';

export default () => (
  <Result
    icon={<Icon name="SmilingFace" size={72} color="success" />}
    title="自定义图标"
    subTitle="您可以通过 icon 属性自定义图标"
    extra={[
      <Button key="back" type="primary">返回</Button>,
    ]}
  />
);
```

### 自定义内容

在副标题下方添加额外的内容区域。

```tsx
import { Result, Button, Typography } from '@soui/ui';

const { Paragraph } = Typography;

export default () => (
  <Result
    status="info"
    title="您需要完成以下步骤"
    extra={[
      <Button key="primary" type="primary">开始操作</Button>,
    ]}
  >
    <Paragraph>
      1. 首先，您需要完善个人资料信息。
    </Paragraph>
    <Paragraph>
      2. 然后，完成身份验证流程。
    </Paragraph>
    <Paragraph>
      3. 最后，设置您的偏好选项。
    </Paragraph>
  </Result>
);
```

## API

### 属性

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| status | 结果状态，决定默认图标和颜色 | `'success' \| 'error' \| 'info' \| 'warning' \| '404' \| '403' \| '500'` | `'info'` | - |
| title | 标题 | `React.ReactNode` | - | - |
| subTitle | 副标题 | `React.ReactNode` | - | - |
| icon | 自定义图标，优先级高于 status 对应的默认图标 | `React.ReactNode` | - | - |
| extra | 操作区域，通常放置按钮 | `React.ReactNode` | - | - |
| children | 内容区域，在 subTitle 下方 | `React.ReactNode` | - | - |

## 主题定制

Result 组件支持通过 ConfigProvider 进行主题定制，遵循 SoUi 三层设计令牌系统。

Result 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.Result` 针对组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Result: {
        fontSize: 14,
        titleFontSize: 24,
        iconSize: 64,
        colorSuccess: '#52c41a',
        colorError: '#ff4d4f',
        // ... 其他组件专属配置
      },
    },
  }}
>
  <YourApp />
</ConfigProvider>
```

### 配置优先级

配置优先级从高到低：

1. **Props (style/className)** - 直接传入的样式属性
2. **组件级配置** - `theme.components.Result` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| borderRadius | 圆角大小（像素） | `number` | `6` |
| fontSize | 字体大小（像素） | `number` | `14` |
| titleFontSize | 标题字号（像素） | `number` | `24` |
| subTitleFontSize | 副标题字号（像素） | `number` | `14` |
| iconSize | 图标尺寸（像素） | `number` | `64` |
| colorSuccess | 成功状态颜色 | `string` | `#52c41a` |
| colorError | 错误状态颜色 | `string` | `#ff4d4f` |
| colorWarning | 警告状态颜色 | `string` | `#faad14` |
| colorInfo | 信息状态颜色 | `string` | `#1677ff` |

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<Result 
  style={{
    '--soui-result-title-font-size': '28px',
    '--soui-result-icon-size': '80px',
  }}
/>
```

## 设计原则

### ✅ 推荐用法

```tsx
// 使用预定义的状态类型
<Result status="success" title="操作成功" subTitle="描述信息" />

// HTTP 状态码用于页面级反馈
<Result status="404" title="404" subTitle="页面不存在" extra={[<Button>返回</Button>]} />

// 使用 extra 放置操作按钮
<Result extra={[<Button type="primary">确认</Button>, <Button>取消</Button>]} />
```

### ❌ 避免使用

```tsx
// 不要在 title 中使用过多文字
<Result title="这是一段非常非常长的标题文字，不建议这样使用" />

// 不要省略标题，确保用户能理解结果含义
<Result subTitle="一些描述" />

// 不要在 content 区域放置过多内容，应该使用 extra 放置操作按钮
<Result><ComplexContent /></Result>
```

## 无障碍访问

组件遵循 WAI-ARIA 规范：

- 使用 `role="status"` 传达结果状态
- 确保标题和副标题具有清晰的语义结构
- 操作按钮应提供明确的键盘操作支持

## FAQ

### Result 和 Alert 有什么区别？

- **Result** 用于页面级或大区块的结果反馈，通常包含图标、标题、描述和操作按钮
- **Alert** 用于局部警告提示，更适合在表单、内容块中展示简短的警告信息

### 如何自定义 HTTP 状态码的图标？

HTTP 状态码（403、404、500）默认使用内置的 SVG 插图，您可以通过 `icon` 属性完全自定义：

```tsx
<Result status="404" icon={<CustomIcon />} title="404" />
```

### 如何在 Result 中显示列表或表格？

使用 `children` 属性添加额外内容：

```tsx
<Result title="操作结果" subTitle="以下项目处理失败">
  <Table dataSource={failedItems} columns={columns} />
</Result>
```

## 相关资源

- [Alert 警告提示](/components/alert)
- [Dialog 对话框](/components/dialog)
- [Message 全局提示](/components/message)
