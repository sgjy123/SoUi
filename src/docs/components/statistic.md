---
title: Statistic 数值统计
---

# Statistic 数值统计

展示统计数据，支持数值格式化、千分位、精度控制、倒计时等。

## 何时使用

- 需要突出展示某个数字（如用户数、金额、转化率）
- 数据看板、Dashboard 页面
- 活动倒计时场景

## 代码示例

### 基础用法

```tsx
import { Statistic, Row, Col } from '@soui/ui';

export default () => (
  <Row gutter={48}>
    <Col span={12}>
      <Statistic title="活跃用户数" value={112893} />
    </Col>
    <Col span={12}>
      <Statistic title="账户余额" value={93.28} precision={2} suffix="元" />
    </Col>
  </Row>
);
```

### 前缀和后缀

```tsx
import { Statistic, Row, Col, Icon } from '@soui/ui';

export default () => (
  <Row gutter={48}>
    <Col span={12}>
      <Statistic
        title="反馈数"
        value={1128}
        prefix={<Icon name="Comment" size={20} />}
      />
    </Col>
    <Col span={12}>
      <Statistic
        title="增长率"
        value={9.3}
        precision={1}
        suffix="%"
        prefix={<Icon name="Up" size={20} style={{ color: '#52c41a' }} />}
      />
    </Col>
  </Row>
);
```

### 精度与千分位

```tsx
import { Statistic, Row, Col } from '@soui/ui';

export default () => (
  <Row gutter={48}>
    <Col span={8}>
      <Statistic title="总金额" value={1234567.89} precision={2} prefix="¥" />
    </Col>
    <Col span={8}>
      <Statistic title="无千分位" value={1234567} groupSeparator="" />
    </Col>
    <Col span={8}>
      <Statistic title="自定义分隔符" value={1234567} groupSeparator="." />
    </Col>
  </Row>
);
```

### 倒计时

```tsx
import { Statistic, Row, Col } from '@soui/ui';

const { Countdown } = Statistic;

export default () => {
  const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 60 * 30;

  return (
    <Row gutter={48}>
      <Col span={12}>
        <Countdown
          title="倒计时"
          value={deadline}
          onFinish={() => console.log('倒计时结束')}
        />
      </Col>
      <Col span={12}>
        <Countdown
          title="包含天数"
          value={deadline}
          format="DD 天 HH:mm:ss"
        />
      </Col>
    </Row>
  );
};
```

### 加载中状态

```tsx
import { Statistic, Row, Col, Button, useState } from '@soui/ui';

export default () => {
  const [loading, setLoading] = useState(true);

  return (
    <div>
      <Button onClick={() => setLoading(!loading)} style={{ marginBottom: 16 }}>
        {loading ? '加载完成' : '加载中'}
      </Button>
      <Row gutter={48}>
        <Col span={12}>
          <Statistic title="活跃用户" value={112893} loading={loading} />
        </Col>
        <Col span={12}>
          <Statistic title="总营收" value={93827.5} precision={2} prefix="¥" loading={loading} />
        </Col>
      </Row>
    </div>
  );
};
```

### 主题定制

```tsx
import { Statistic, Row, Col, ConfigProvider, Icon } from '@soui/ui';

const { Countdown } = Statistic;

export default () => (
  <ConfigProvider
    theme={{
      components: {
        Statistic: {
          colorTextHeading: '#8c8c8c',
          colorText: '#1677ff',
          fontSizeHeading: 14,
          fontSize: 32,
        },
      },
    }}
  >
    <Row gutter={48}>
      <Col span={8}>
        <Statistic title="总用户" value={28394} prefix={<Icon name="User" size={20} />} />
      </Col>
      <Col span={8}>
        <Statistic title="转化率" value={68.5} precision={1} suffix="%" />
      </Col>
      <Col span={8}>
        <Countdown title="活动剩余" value={Date.now() + 3600000} format="HH:mm:ss" />
      </Col>
    </Row>
  </ConfigProvider>
);
```

## API

### Statistic

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | ReactNode | - |
| value | 数值 | number \| string | - |
| precision | 精度（小数位数） | number | - |
| prefix | 前缀 | ReactNode | - |
| suffix | 后缀 | ReactNode | - |
| groupSeparator | 千分位分隔符 | string | `','` |
| formatter | 自定义格式化函数 | `(value: number \| string) => ReactNode` | - |
| valueStyle | 数值区域自定义样式 | CSSProperties | - |
| loading | 加载中状态 | boolean | `false` |
| className | 自定义类名 | string | - |
| style | 自定义样式 | CSSProperties | - |

### Statistic.Countdown

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 标题 | ReactNode | - |
| value | 目标时间戳（毫秒） | number | - |
| format | 时间格式 | string | `'HH:mm:ss'` |
| prefix | 前缀 | ReactNode | - |
| suffix | 后缀 | ReactNode | - |
| valueStyle | 数值区域自定义样式 | CSSProperties | - |
| onFinish | 倒计时结束回调 | `() => void` | - |
| onChange | 倒计时变化回调 | `(value: number) => void` | - |

**format 格式说明：**

| 占位符 | 说明 |
| --- | --- |
| DD | 天数（补零） |
| D | 天数 |
| HH | 小时（累计，补零） |
| H | 小时（累计） |
| mm | 分钟（补零） |
| m | 分钟 |
| ss | 秒（补零） |
| s | 秒 |
| SSS | 毫秒（3位） |
| SS | 毫秒（2位） |
| S | 毫秒（1位） |

## 主题定制

通过 `ConfigProvider` 的 `theme.components.Statistic` 配置：

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| colorTextHeading | 标题文本颜色 | string | `'rgba(0, 0, 0, 0.65)'` |
| colorText | 数值文本颜色 | string | `'rgba(0, 0, 0, 0.88)'` |
| fontSizeHeading | 标题字号（像素） | number | `14` |
| fontSize | 数值字号（像素） | number | `24` |
