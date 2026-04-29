import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'SoUi',
      fileName: (format) => `soui.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'classnames'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          classnames: 'classNames',
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
    minify: false,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      components: path.resolve(__dirname, './src/components'),
      utils: path.resolve(__dirname, './src/utils'),
      hooks: path.resolve(__dirname, './src/hooks'),
      styles: path.resolve(__dirname, './src/styles'),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        additionalData: `
          @primary-color: #1677ff;
          @primary-hover-color: #4096ff;
          @primary-active-color: #0958d9;
          @success-color: #52c41a;
          @warning-color: #faad14;
          @error-color: #ff4d4f;
          @text-color: rgba(0, 0, 0, 0.88);
          @text-color-secondary: rgba(0, 0, 0, 0.65);
          @disabled-text-color: rgba(0, 0, 0, 0.25);
          @border-color: #d9d9d9;
          @border-radius: 6px;
          @font-size-base: 14px;
          @line-height-base: 1.5715;
          @transition-duration: 0.3s;
        `,
      },
    },
  },
  server: {
    port: 3000,
  },
});
