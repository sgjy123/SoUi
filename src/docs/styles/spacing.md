# 间距系统

SoUi 使用基于 **4px** 的间距系统，确保视觉节奏的一致性和和谐感。

## 基础单位

所有间距都是 **4px** 的倍数，这是我们设计系统的最小单位。

```less
@size-unit: 4px;
@size-step: 4px;
```

## 间距 Scale

我们提供了一套完整的间距变量，适用于不同的场景。

<SpacingTable 
  :spacing="[
    { token: 'xs', less: '@margin-xs / @padding-xs', value: '4px', usage: '极小间距，用于紧密排列的元素' },
    { token: 'sm', less: '@margin-sm / @padding-sm', value: '8px', usage: '小间距，用于相关元素的间隔' },
    { token: 'md', less: '@margin-md / @padding-md', value: '16px', usage: '中等间距，默认的内部和外部间距' },
    { token: 'lg', less: '@margin-lg / @padding-lg', value: '24px', usage: '大间距，用于区块之间的间隔' },
    { token: 'xl', less: '@margin-xl / @padding-xl', value: '32px', usage: '超大间距，用于页面级布局' },
  ]"
/>

## 使用场景

### Padding（内边距）

用于组件内部的间距控制。

```less
// Card 组件
.card {
  padding: @padding-md; // 16px
  
  .header {
    padding-bottom: @padding-sm; // 8px
  }
  
  .body {
    padding-top: @padding-sm; // 8px
  }
}

// Button 组件
.button {
  padding: @padding-xs @padding-md; // 4px 16px
}
```

### Margin（外边距）

用于组件之间的间距控制。

```less
// 表单元素
.form-item {
  margin-bottom: @margin-md; // 16px
  
  .label {
    margin-right: @margin-sm; // 8px
  }
}

// 列表项
.list-item {
  margin-bottom: @margin-sm; // 8px
  
  &:last-child {
    margin-bottom: 0;
  }
}
```

## 响应式间距

在不同屏幕尺寸下使用不同的间距：

```less
.container {
  padding: @padding-md; // 默认 16px
  
  @media (max-width: @screen-sm) {
    padding: @padding-sm; // 小屏幕 8px
  }
  
  @media (min-width: @screen-lg) {
    padding: @padding-lg; // 大屏幕 24px
  }
}
```

## 垂直节奏

保持良好的垂直节奏，让内容更易读：

```less
// 标题与内容的间距
h1 { margin-bottom: @margin-lg; } // 24px
h2 { margin-bottom: @margin-md; } // 16px
h3 { margin-bottom: @margin-sm; } // 8px

p {
  margin-bottom: @margin-md; // 16px
  line-height: 1.5715;
}
```

## 组合使用示例

### Card 布局

```tsx
<Card className="custom-card">
  <div className="card-header">
    <h3>卡片标题</h3>
    <p className="subtitle">副标题</p>
  </div>
  <div className="card-body">
    <p>这是卡片内容，使用了标准的间距系统。</p>
  </div>
  <div className="card-footer">
    <Button type="primary">确定</Button>
    <Button>取消</Button>
  </div>
</Card>
```

```less
.custom-card {
  .card-header {
    padding-bottom: @padding-md; // 16px
    margin-bottom: @padding-md;   // 16px
    border-bottom: 1px solid @border-color-split;
    
    h3 {
      margin-bottom: @margin-xs; // 4px
    }
    
    .subtitle {
      margin: 0;
    }
  }
  
  .card-body {
    padding: @padding-md 0; // 16px 0
  }
  
  .card-footer {
    padding-top: @padding-md; // 16px
    margin-top: @padding-md;  // 16px
    border-top: 1px solid @border-color-split;
    
    button + button {
      margin-left: @margin-sm; // 8px
    }
  }
}
```

### 表单布局

```tsx
<Form>
  <Form.Item label="用户名">
    <Input />
  </Form.Item>
  <Form.Item label="邮箱">
    <Input />
  </Form.Item>
  <Form.Item>
    <Button type="primary">提交</Button>
    <Button style={{ marginLeft: 8 }}>取消</Button>
  </Form.Item>
</Form>
```

```less
.form {
  .form-item {
    margin-bottom: @margin-md; // 16px
    
    .label {
      display: inline-block;
      width: 80px;
      margin-right: @margin-sm; // 8px
    }
    
    .input-wrapper {
      display: inline-block;
      width: calc(100% - 88px);
    }
  }
  
  .button-group {
    padding-top: @padding-lg; // 24px
    
    button + button {
      margin-left: @margin-sm; // 8px
    }
  }
}
```

## 最佳实践

### ✅ 推荐用法

```less
// 1. 使用预定义的间距变量
.element {
  padding: @padding-md;
  margin: @margin-lg;
}

// 2. 保持间距的一致性
.section {
  padding: @padding-xl; // 统一使用 32px
  
  > * + * {
    margin-top: @margin-md; // 元素之间统一 16px
  }
}

// 3. 使用相对单位
.responsive-box {
  padding: @padding-md;
  
  @media (max-width: @screen-md) {
    padding: @padding-sm;
  }
}
```

### ❌ 避免使用

```less
// 1. 避免魔法数字
.element {
  padding: 13px; // ❌ 不推荐
  margin: 7px;   // ❌ 不推荐
}

// 2. 避免混用不同体系
.element {
  padding: 16px;     // ❌ 硬编码
  margin: @margin-lg; // ✅ 使用变量
}

// 3. 避免过度精确
.element {
  margin: 15.5px; // ❌ 不要使用小数
}
```

## 常用间距模式

以下是经过验证的常用间距组合：

### 紧凑布局

```less
.compact {
  padding: @padding-sm; // 8px
  gap: @margin-xs;      // 4px
}
```

### 标准布局

```less
.standard {
  padding: @padding-md; // 16px
  gap: @margin-sm;      // 8px
}
```

### 宽松布局

```less
.loose {
  padding: @padding-lg; // 24px
  gap: @margin-md;      // 16px
}
```

## CSS Variables 使用

在运行时动态调整间距：

```tsx
// 通过 ConfigProvider 配置
<ConfigProvider
  theme={{
    spacingUnit: 4, // 可以自定义基础单位
  }}
>
  <App />
</ConfigProvider>

// 或使用 CSS 变量
<div style={{ 
  '--soui-spacing-md': '20px' 
} as React.CSSProperties}>
  <Card>自定义间距的卡片</Card>
</div>
```

## 工具类

SoUi 提供了一些常用的间距工具类：

```html
<!-- Padding -->
<div class="soui-p-0">无内边距</div>
<div class="soui-p-sm">小内边距</div>
<div class="soui-p-md">中等内边距</div>
<div class="soui-p-lg">大内边距</div>

<!-- Margin -->
<div class="soui-m-0">无边距</div>
<div class="soui-m-sm">小边距</div>
<div class="soui-m-md">中等边距</div>
<div class="soui-m-lg">大边距</div>

<!-- 方向性 -->
<div class="soui-mt-md">上边距</div>
<div class="soui-mr-sm">右边距</div>
<div class="soui-mb-lg">下边距</div>
<div class="soui-ml-xs">左边距</div>
```

## 相关资源

- [色彩系统](/styles/colors) - 了解颜色使用
- [排版系统](/styles/typography) - 学习文字排版
- [Mixins](/styles/mixins) - 更多样式工具
