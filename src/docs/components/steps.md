# Steps 步骤条

引导用户按照流程完成任务的导航条。

## 何时使用

- 当任务复杂或者具有先后顺序时
- 需要展示当前进度和后续步骤
- 表单分步填写场景
- 业务流程的状态展示

## 代码演示

### 基础用法

最简单的步骤条用法。

```tsx
import { Steps } from '@soui/ui';

export default () => (
  <Steps current={1}>
    <Steps.Step title="第一步" description="这是第一步的描述内容" />
    <Steps.Step title="第二步" description="这是第二步的描述内容" />
    <Steps.Step title="第三步" description="这是第三步的描述内容" />
    <Steps.Step title="第四步" description="这是第四步的描述内容" />
  </Steps>
);
```

### 垂直方向

垂直方向的步骤条。

```tsx
import { Steps } from '@soui/ui';

export default () => (
  <Steps current={1} direction="vertical">
    <Steps.Step title="第一步" description="这是垂直步骤条的第一步" />
    <Steps.Step title="第二步" description="这是垂直步骤条的第二步" />
    <Steps.Step title="第三步" description="这是垂直步骤条的第三步" />
  </Steps>
);
```

### 带图标

为步骤添加自定义图标。

```tsx
import { Steps, Icon } from '@soui/ui';

export default () => (
  <Steps current={2}>
    <Steps.Step 
      title="登录" 
      description="用户登录系统"
      icon={<Icon name="User" size={16} />}
    />
    <Steps.Step 
      title="验证" 
      description="身份验证过程"
      icon={<Icon name="Shield" size={16} />}
    />
    <Steps.Step 
      title="完成" 
      description="操作已完成"
      icon={<Icon name="CheckCircle" size={16} />}
    />
  </Steps>
);
```

### 小尺寸

小尺寸的步骤条。

```tsx
import { Steps } from '@soui/ui';

export default () => (
  <Steps current={1} size="small">
    <Steps.Step title="第一步" />
    <Steps.Step title="第二步" />
    <Steps.Step title="第三步" />
  </Steps>
);
```

### 受控模式

通过按钮控制步骤切换。

```tsx
import { useState } from 'react';
import { Steps, Button, Space } from '@soui/ui';

export default () => {
  const [current, setCurrent] = useState(0);

  return (
    <div>
      <Steps current={current} onChange={setCurrent}>
        <Steps.Step title="基本信息" description="填写个人基本信息" />
        <Steps.Step title="联系方式" description="验证手机号码和邮箱" />
        <Steps.Step title="身份认证" description="上传身份证件" />
        <Steps.Step title="完成注册" description="账户创建成功" />
      </Steps>
      <Space style={{ marginTop: 24 }}>
        {current > 0 && (
          <Button onClick={() => setCurrent(current - 1)}>上一步</Button>
        )}
        {current < 3 && (
          <Button type="primary" onClick={() => setCurrent(current + 1)}>下一步</Button>
        )}
      </Space>
    </div>
  );
};
```

### 进度点模式

使用小圆点代替数字图标，适合步骤较多的场景。

```tsx
import { Steps } from '@soui/ui';

export default () => (
  <>
    {/* 默认进度点 */}
    <Steps current={1} progressDot>
      <Steps.Step title="第一步" description="这是第一步的描述内容" />
      <Steps.Step title="第二步" description="这是第二步的描述内容" />
      <Steps.Step title="第三步" description="这是第三步的描述内容" />
      <Steps.Step title="第四步" description="这是第四步的描述内容" />
    </Steps>

    {/* 自定义进度点 */}
    <Steps 
      current={2}
      style={{ marginTop: 40 }}
      progressDot={(dot, { status }) => (
        <span style={{ 
          display: 'inline-block',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: status === 'finish' ? '#52c41a' : status === 'process' ? '#1890ff' : '#d9d9d9'
        }} />
      )}
    >
      <Steps.Step title="登录" description="用户登录系统" />
      <Steps.Step title="验证" description="身份验证过程" />
      <Steps.Step title="完成" description="操作已完成" />
    </Steps>
  </>
);
```

### 子标题

为步骤添加副标题，提供更丰富的信息层次。

```tsx
import { Steps } from '@soui/ui';

export default () => (
  <Steps current={1}>
    <Steps.Step 
      title="账户信息" 
      subTitle="基本资料"
      description="填写您的基本信息" 
    />
    <Steps.Step 
      title="身份验证" 
      subTitle="安全认证"
      description="完成身份验证流程" 
    />
    <Steps.Step 
      title="设置完成" 
      subTitle="成功"
      description="您的账户已设置完成" 
    />
  </Steps>
);
```

### 标签位置

控制标签的放置位置。

```tsx
import { Steps } from '@soui/ui';

export default () => (
  <>
    {/* 标签垂直放置（内容在图标下方） */}
    <Steps current={1} labelPlacement="vertical">
      <Steps.Step title="第一步" description="这是第一步的描述内容" />
      <Steps.Step title="第二步" description="这是第二步的描述内容" />
      <Steps.Step title="第三步" description="这是第三步的描述内容" />
      <Steps.Step title="第四步" description="这是第四步的描述内容" />
    </Steps>

    {/* 小尺寸 + 垂直标签 */}
    <Steps 
      current={2} 
      size="small" 
      labelPlacement="vertical"
      style={{ marginTop: 40 }}
    >
      <Steps.Step title="登录" description="用户登录" />
      <Steps.Step title="验证" description="身份验证" />
      <Steps.Step title="完成" description="操作完成" />
    </Steps>
  </>
);
```

### 禁用状态

禁用特定步骤，防止用户点击。

```tsx
import { Steps } from '@soui/ui';

export default () => (
  <Steps current={1}>
    <Steps.Step title="已完成" description="此步骤已完成" />
    <Steps.Step title="进行中" description="当前正在处理" />
    <Steps.Step title="待处理" description="等待开始" disabled />
    <Steps.Step title="未开始" description="尚未到达" disabled />
  </Steps>
);

## API

### Steps

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| current | 当前步骤，从 0 开始计数 | `number` | `0` | - |
| direction | 步骤条方向 | `'horizontal' \| 'vertical'` | `'horizontal'` | - |
| size | 步骤条尺寸 | `'default' \| 'small'` | `'default'` | - |
| labelPlacement | 标签放置位置 | `'horizontal' \| 'vertical'` | `'horizontal'` | 1.0.0 |
| progressDot | 是否使用进度点模式，或自定义渲染函数 | `boolean \| (dot: ReactNode, info: { index: number; status: StepStatus; title: ReactNode }) => ReactNode` | `false` | 1.0.0 |
| onChange | 步骤变化回调 | `(current: number) => void` | - | - |
| items | 步骤项列表 | `StepItemProps[]` | - | - |
| className | 自定义类名 | `string` | - | - |
| style | 自定义样式 | `CSSProperties` | - | - |
| children | 子节点（优先于 items） | `ReactNode` | - | - |

### Steps.Step

| 参数 | 说明 | 类型 | 默认值 | 版本 |
|------|------|------|--------|------|
| title | 标题 | `ReactNode` | - | - |
| subTitle | 子标题 | `ReactNode` | - | 1.0.0 |
| description | 描述内容 | `ReactNode` | - | - |
| icon | 图标 | `ReactNode` | - | - |
| status | 当前步骤的状态 | `'wait' \| 'process' \| 'finish' \| 'error'` | 自动计算 | - |
| disabled | 是否禁用点击 | `boolean` | `false` | 1.0.0 |
| className | 自定义类名 | `string` | - | - |
| style | 自定义样式 | `CSSProperties` | - | - |

## 主题定制

Steps 组件支持通过 ConfigProvider 进行主题定制，遵循 SoUi 三层设计令牌系统。

### 全局配置

通过 `theme` 属性配置全局样式，影响所有使用该组件的实例：

```tsx
import { ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      primaryColor: '#1677ff',     // 主色
      successColor: '#52c41a',     // 成功色
      errorColor: '#ff4d4f',       // 错误色
      borderRadius: 6,              // 圆角
      fontSize: 14,                 // 字体大小
    }}
  >
    <YourApp />
  </ConfigProvider>
);
```

### 组件级配置

通过 `theme.components.Steps` 针对 Steps 组件进行精细化配置：

```tsx
import { ConfigProvider } from '@soui/ui';

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Steps: {
          colorPrimary: '#1890ff',      // 步骤条主色
          colorSuccess: '#52c41a',      // 完成状态颜色
          colorError: '#ff4d4f',        // 错误状态颜色
          colorBorder: '#d9d9d9',       // 边框颜色
          colorText: 'rgba(0, 0, 0, 0.88)',   // 标题颜色
          colorTextSecondary: 'rgba(0, 0, 0, 0.65)', // 描述颜色
          borderRadius: 8,              // 圆角大小
          fontSize: 14,                 // 字体大小
          iconSize: 32,                 // 图标尺寸
        },
      },
    }}
  >
    <YourApp />
  </ConfigProvider>
);
```

### 配置优先级

SoUi 采用以下优先级规则（从高到低）：

```
Props 属性 > 组件级配置 > 全局配置 > CSS 变量 > Less 变量
```

### 可用的主题配置项

**颜色相关：**
- `colorPrimary` - 主色（进行中状态）
- `colorSuccess` - 成功色（已完成状态）
- `colorError` - 错误色（错误状态）
- `colorWait` - 等待状态颜色
- `colorBorder` - 边框颜色
- `colorText` - 标题颜色
- `colorTextSecondary` - 描述颜色

**尺寸相关：**
- `borderRadius` - 圆角大小（像素）
- `fontSize` - 字体大小（像素）
- `iconSize` - 图标尺寸（像素）

**新增 CSS 变量：**
- `--soui-steps-icon-size` - 图标尺寸（默认 32px）
- `--soui-steps-dot-size` - 进度点尺寸（默认 8px）

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<Steps 
  style={{
    '--soui-steps-color-primary': '#ff0000',
    '--soui-steps-font-size': '16px',
  }}
/>
```

**CSS 变量命名规范：**
- 第1层（设计令牌）：`--soui-{property}` - 不带组件前缀的全局变量
- 第2层（组件配置点）：`--soui-steps-{property}` - 带组件前缀的配置点
- 第3层（组件级覆盖）：`--soui-steps-{property}-component` - 带 `-component` 后缀的覆盖变量

## 设计原则

### ✅ 推荐用法

```tsx
// 好的示例 - 清晰的步骤描述
<Steps current={1}>
  <Steps.Step title="基本信息" description="填写个人基本信息" />
  <Steps.Step title="联系方式" description="填写手机和邮箱" />
  <Steps.Step title="完成" description="确认并提交" />
</Steps>
```

### ❌ 避免使用

```tsx
// 不好的示例 - 步骤过多或描述不清
<Steps current={5}>
  <Steps.Step title="步骤1" />
  <Steps.Step title="步骤2" />
  {/* ... 超过 5 个步骤 */}
</Steps>
```

## 无障碍访问

Steps 组件遵循 WAI-ARIA 规范：

- 使用语义化的 HTML 结构
- 支持键盘导航
- 提供清晰的状态指示
- 确保足够的颜色对比度

## FAQ

### 如何动态设置步骤状态？

可以通过 `status` 属性手动设置每个步骤的状态：

```tsx
<Steps.Step title="步骤" status="error" />
```

### 步骤条最多支持多少个步骤？

建议不超过 5 个步骤，如果步骤过多，考虑使用垂直方向或简化流程。

### 如何实现可点击切换的步骤？

使用 `onChange` 回调和受控模式：

```tsx
const [current, setCurrent] = useState(0);

<Steps current={current} onChange={setCurrent}>
  <Steps.Step title="步骤1" />
  <Steps.Step title="步骤2" />
</Steps>
```

### 如何使用进度点模式？

设置 `progressDot` 属性为 `true` 或使用自定义渲染函数：

```tsx
// 默认进度点
<Steps current={1} progressDot>
  <Steps.Step title="步骤1" />
  <Steps.Step title="步骤2" />
</Steps>

// 自定义进度点
<Steps 
  current={1}
  progressDot={(dot, { status }) => (
    <span style={{ 
      width: '10px',
      height: '10px',
      borderRadius: '50%',
      backgroundColor: status === 'finish' ? '#52c41a' : '#d9d9d9'
    }} />
  )}
>
  <Steps.Step title="步骤1" />
  <Steps.Step title="步骤2" />
</Steps>
```

### 如何禁用特定步骤？

在 Step 组件上设置 `disabled` 属性：

```tsx
<Steps current={1}>
  <Steps.Step title="已完成" />
  <Steps.Step title="进行中" />
  <Steps.Step title="待处理" disabled />
</Steps>
```

### 如何让标签显示在图标下方？

设置 `labelPlacement="vertical"`：

```tsx
<Steps current={1} labelPlacement="vertical">
  <Steps.Step title="步骤1" description="描述" />
  <Steps.Step title="步骤2" description="描述" />
</Steps>
```

## 相关资源

- [Breadcrumb 面包屑](/components/breadcrumb) - 页面层级导航
- [Menu 菜单](/components/menu) - 导航菜单
