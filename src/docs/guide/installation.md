# 安装指南

详细的安装说明和配置选项。

## 环境要求

在开始之前，请确保您的开发环境满足以下要求：

- **Node.js**: >= 14.0.0（推荐 18+）
- **npm**: >= 6.0.0
- **React**: >= 18.0.0
- **TypeScript**: >= 4.5.0（可选，强烈推荐）

## 包管理器选择

SoUi 支持所有主流的包管理器。

### npm

```bash
npm install @soui/ui
```

### yarn

```bash
yarn add @soui/ui
```

### pnpm

```bash
pnpm add @soui/ui
```

### bun

```bash
bun add @soui/ui
```

## 引入方式

### 1. 全局引入

适合快速原型开发或小型项目。

**main.tsx / index.tsx**
```tsx
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

**优点：**
- 简单直接
- 无需额外配置
- 适合学习使用

**缺点：**
- 打包体积较大
- 不支持 Tree Shaking

### 2. 按需引入（推荐）

生产环境推荐使用这种方式。

```tsx
// 直接导入需要的组件
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

**优点：**
- 支持 Tree Shaking
- 减小打包体积
- 只包含使用的组件

**缺点：**
- 需要手动导入每个组件

### 3. 路径别名引入

通过配置路径别名实现更灵活的导入。

#### Vite 配置

**vite.config.ts**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@soui': path.resolve(__dirname, './src/components'),
    },
  },
});
```

**使用示例**
```tsx
import { Button } from '@soui/button';
import { Input } from '@soui/input';
```

#### Webpack 配置

**webpack.config.js**
```javascript
module.exports = {
  resolve: {
    alias: {
      '@soui': path.resolve(__dirname, './src/components'),
    },
  },
};
```

## TypeScript 配置

如果您使用 TypeScript，建议更新配置以获得最佳体验。

**tsconfig.json**
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src"]
}
```

## CSS 处理

### PostCSS 配置

如果使用 PostCSS，需要添加 Less 支持。

**postcss.config.js**
```javascript
module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {},
  },
};
```

### Less 配置

如果需要自定义主题，可以配置 Less 变量。

**styles/variables.less**
```less
@import '@soui/ui/dist/soui.css';

// 覆盖默认变量
@primary-color: #your-color;
@border-radius-base: 4px;
```

## 构建工具集成

### Create React App

CRA 已经内置了必要的配置，直接使用即可。

```bash
npx create-react-app my-app --template typescript
cd my-app
npm install @soui/ui
```

### Vite

Vite 项目需要安装 Less 预处理器。

```bash
npm create vite@latest my-app -- --template react-ts
cd my-app
npm install @soui/ui less -D
```

### Next.js

Next.js 项目需要额外配置。

**next.config.js**
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.less$/,
      use: [
        'style-loader',
        'css-loader',
        'less-loader',
      ],
    });
    return config;
  },
};

module.exports = nextConfig;
```

## 样式隔离

如果需要使用 CSS Modules：

```tsx
import styles from './Button.module.css';
import { Button } from '@soui/ui';

function MyComponent() {
  return (
    <div className={styles.wrapper}>
      <Button className={styles.button}>按钮</Button>
    </div>
  );
}
```

**Button.module.css**
```css
.wrapper {
  padding: 16px;
}

.button {
  /* 自定义样式 */
}
```

## 常见问题

### Q: 样式没有生效？

**检查清单：**

1. ✅ 是否正确引入了 CSS 文件
   ```tsx
   import '@soui/ui/dist/soui.css';
   ```

2. ✅ CSS 文件路径是否正确
   ```tsx
   // ✅ 正确
   import '@soui/ui/dist/soui.css';
   
   // ❌ 错误
   import '@soui/ui/soui.css';
   ```

3. ✅ 检查构建工具配置
   - Vite: 确保安装了 Less
   - Webpack: 配置了 Less loader

### Q: TypeScript 报错？

**解决方案：**

1. 更新 TypeScript 到最新版本
   ```bash
   npm install typescript@latest -D
   ```

2. 重启 TypeScript 服务器
   - VS Code: `Ctrl+Shift+P` → `TypeScript: Restart TS Server`

3. 检查 tsconfig.json 配置
   ```json
   {
     "compilerOptions": {
       "moduleResolution": "bundler",
       "skipLibCheck": true
     }
   }
   ```

### Q: 打包体积太大？

**优化方案：**

1. **使用按需引入**
   ```tsx
   // ✅ 按需引入
   import { Button } from '@soui/ui';
   
   // ❌ 全量引入
   import SoUi from '@soui/ui';
   ```

2. **启用 Tree Shaking**
   
   确保 package.json 中配置了：
   ```json
   {
     "sideEffects": ["dist/*", "*.less"]
   }
   ```

3. **分析打包体积**
   ```bash
   npm install --save-dev rollup-plugin-visualizer
   ```

4. **使用 CDN**
   
   对于大型项目，可以考虑使用 CDN：
   ```html
   <link rel="stylesheet" href="https://unpkg.com/@soui/ui/dist/soui.css">
   <script src="https://unpkg.com/@soui/ui/dist/soui.umd.js"></script>
   ```

### Q: 不支持的浏览器？

**解决方案：**

1. **添加 Polyfills**
   ```bash
   npm install core-js regenerator-runtime
   ```

   ```tsx
   // 在入口文件顶部
   import 'core-js/stable';
   import 'regenerator-runtime/runtime';
   ```

2. **配置 Babel**
   
   **.babelrc**
   ```json
   {
     "presets": [
       ["@babel/preset-env", {
         "targets": {
           "ie": "11"
         }
       }]
     ]
   }
   ```

## 验证安装

创建测试页面验证安装是否成功：

```tsx
import { Button, Message } from '@soui/ui';

function TestPage() {
  return (
    <div style={{ padding: 40 }}>
      <h1>SoUi 安装测试</h1>
      <Button 
        type="primary" 
        onClick={() => Message.success('安装成功！')}
      >
        点击测试
      </Button>
    </div>
  );
}

export default TestPage;
```

如果看到按钮并能正常交互，说明安装成功！

## 下一步

- [快速开始](/guide/quick-start) - 5 分钟上手
- [设计基础](/styles/overview) - 了解设计系统
- [组件文档](/components/button) - 查看所有组件

## 获取帮助

遇到问题？

- 查看 [FAQ](/resources/faq)
- 阅读 [更新日志](/resources/changelog)
- 在 [GitHub Issues](https://github.com/souI/ui/issues) 提问
