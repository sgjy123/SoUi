# 快速开始

只需几分钟，您就可以在项目中开始使用 SoUi 组件库。

## 环境准备

SoUi 基于 React 18+ 和 TypeScript 构建，请确保您的开发环境满足以下要求：

- **React**: >= 18.0.0
- **React DOM**: >= 18.0.0
- **TypeScript**: >= 4.5.0（推荐）
- **Node.js**: >= 14.0.0

## 安装

### 方式一：npm

```bash
npm install @soui/ui
```

### 方式二：yarn

```bash
yarn add @soui/ui
```

### 方式三：pnpm

```bash
pnpm add @soui/ui
```

## 引入方式

### 全局引入

适合小型项目或快速原型开发。

```tsx
// main.tsx 或 index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import SoUi from '@soui/ui';
import '@soui/ui/dist/soui.css';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SoUi.ConfigProvider>
      <App />
    </SoUi.ConfigProvider>
  </React.StrictMode>
);
```

### 按需引入（推荐）

适合生产环境，支持 Tree Shaking，减小打包体积。

```tsx
// 直接导入组件
import { Button, Input, Card } from '@soui/ui';
import '@soui/ui/dist/soui.css';

function App() {
  return (
    <Card title="标题">
      <Input placeholder="请输入" />
      <Button type="primary">提交</Button>
    </Card>
  );
}
```

### 路径别名引入

通过配置路径别名实现更灵活的按需加载。

**vite.config.ts**
```typescript
export default {
  resolve: {
    alias: {
      '@soui': '/src/components',
    },
  },
};
```

**使用示例**
```tsx
import { Button } from '@soui/button';
import { Input } from '@soui/input';
```

## 第一个组件

让我们创建一个简单的登录表单：

```tsx
import { useState } from 'react';
import { Card, Form, Input, Button, Message } from '@soui/ui';

export default function LoginForm() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    setLoading(true);
    try {
      // 模拟登录请求
      await new Promise(resolve => setTimeout(resolve, 1000));
      Message.success('登录成功');
    } catch (error) {
      Message.error('登录失败');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      paddingTop: '100px' 
    }}>
      <Card style={{ width: 400 }}>
        <h2 style={{ marginBottom: 24, textAlign: 'center' }}>
          用户登录
        </h2>
        <Form onFinish={handleSubmit}>
          <Form.Item
            label="用户名"
            name="username"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>
          
          <Form.Item
            label="密码"
            name="password"
            rules={[{ required: true, message: '请输入密码' }]}
          >
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          
          <Form.Item>
            <Button 
              type="primary" 
              htmlType="submit" 
              loading={loading}
              block
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}
```

## 主题配置

### 基础配置

使用 ConfigProvider 进行全局主题配置：

```tsx
import { ConfigProvider } from '@soui/ui';

function App() {
  return (
    <ConfigProvider
      theme={{
        primaryColor: '#1677ff',
        borderRadius: 6,
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
      }}
    >
      {/* 你的应用 */}
    </ConfigProvider>
  );
}
```

### 暗黑模式

一键切换到暗黑模式：

```tsx
import { ConfigProvider, theme } from '@soui/ui';

function App() {
  const isDark = true; // 根据用户偏好设置
  
  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
      }}
    >
      <YourApp />
    </ConfigProvider>
  );
}
```

### 动态主题

支持运行时动态切换主题：

```tsx
import { useState } from 'react';
import { ConfigProvider, Switch, Button } from '@soui/ui';

function App() {
  const [isDark, setIsDark] = useState(false);

  return (
    <ConfigProvider
      theme={{
        algorithm: isDark ? theme.darkAlgorithm : theme.defaultAlgorithm,
        primaryColor: isDark ? '#177ddc' : '#1677ff',
      }}
    >
      <div style={{ padding: 20 }}>
        <Switch
          checked={isDark}
          onChange={setIsDark}
          checkedChildren="暗色"
          unCheckedChildren="亮色"
        />
        <div style={{ marginTop: 20 }}>
          <Button type="primary">主要按钮</Button>
        </div>
      </div>
    </ConfigProvider>
  );
}
```

## TypeScript 支持

SoUi 提供完整的 TypeScript 类型定义：

```tsx
import { Button, ButtonProps } from '@soui/ui';

interface MyButtonProps extends ButtonProps {
  customProp?: string;
}

const MyButton: React.FC<MyButtonProps> = ({ 
  customProp, 
  children, 
  ...props 
}) => {
  return (
    <Button {...props}>
      {customProp}: {children}
    </Button>
  );
};

// 使用时有完整的类型提示
<MyButton type="primary" customProp="测试">
  按钮
</MyButton>
```

## 常见问题

### Q: 样式没有生效？

确保正确引入了 CSS 文件：

```tsx
// ✅ 正确
import '@soui/ui/dist/soui.css';

// ❌ 错误 - 忘记引入样式
import { Button } from '@soui/ui';
```

### Q: 如何自定义样式？

有多种方式可以自定义组件样式：

```tsx
// 方式 1: 使用 className
<Button className="my-custom-button">按钮</Button>

// 方式 2: 使用 style
<Button style={{ color: 'red' }}>按钮</Button>

// 方式 3: 使用 CSS Modules
import styles from './Button.module.css';
<Button className={styles.button}>按钮</Button>

// 方式 4: 使用 Less 变量
@import '@soui/ui/dist/soui.css';

.my-button {
  background-color: @primary-color;
}
```

### Q: 打包体积太大？

1. **确保按需引入**
   ```tsx
   // ✅ 按需引入
   import { Button, Input } from '@soui/ui';
   
   // ❌ 全量引入
   import SoUi from '@soui/ui';
   ```

2. **检查是否重复打包**
   ```bash
   npm install --save-dev rollup-plugin-visualizer
   ```

3. **启用 Tree Shaking**
   确保 package.json 中配置了 `sideEffects`

### Q: 不支持的浏览器？

SoUi 支持现代浏览器：

- Chrome >= 90
- Firefox >= 88
- Safari >= 14
- Edge >= 90

如需支持旧版浏览器，需要添加 polyfills：

```bash
npm install core-js regenerator-runtime
```

```tsx
// 在入口文件顶部添加
import 'core-js/stable';
import 'regenerator-runtime/runtime';
```

## 下一步

- [样式系统](/styles/overview) - 了解设计基础
- [组件总览](/components/button) - 查看所有可用组件
- [主题定制](/theming/config-provider) - 深入学习主题配置
- [最佳实践](/guide/best-practices) - 学习使用技巧

## 获取帮助

- 查看 [FAQ](/resources/faq)
- 阅读 [更新日志](/resources/changelog)
- 在 [GitHub](https://github.com/souI/ui/issues) 提问
