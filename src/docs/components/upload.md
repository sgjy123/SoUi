# Upload 上传

文件选择上传和拖拽上传控件。

## 何时使用

- 当需要上传一个或一些文件时
- 当需要展示上传进度时
- 当需要使用拖拽方式上传文件时
- 当需要以图片卡片形式展示已上传文件时

## 代码演示

### 基础用法

最基本的文件上传功能，点击按钮选择文件上传。支持受控和非受控两种模式。

```tsx
import { Upload, Button } from '@soui/ui';

const Basic = () => {
  const [fileList, setFileList] = useState([]);

  return (
    <Upload
      action="https://httpbin.org/post"
      fileList={fileList}
      onChange={({ fileList }) => setFileList(fileList)}
    >
      <Button type="primary">点击上传</Button>
    </Upload>
  );
};
```

### 拖拽上传

使用 `Upload.Dragger` 或设置 `draggable` 属性，支持拖拽文件到指定区域上传。

```tsx
import { Upload } from '@soui/ui';

const DraggerDemo = () => (
  <Upload.Dragger
    action="https://httpbin.org/post"
    multiple
    onChange={({ fileList }) => console.log(fileList)}
  />
);
```

### 照片墙

设置 `listType="picture-card"` 以卡片形式展示图片，支持预览和删除。

```tsx
import { Upload } from '@soui/ui';

const PictureCard = () => {
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://via.placeholder.com/102',
    },
  ]);

  return (
    <Upload
      action="https://httpbin.org/post"
      listType="picture-card"
      fileList={fileList}
      onChange={({ fileList }) => setFileList(fileList)}
      onPreview={(file) => window.open(file.url)}
      maxCount={6}
    />
  );
};
```

### 手动上传

设置 `manualUpload` 阻止自动上传，在合适的时机手动触发。

```tsx
import { Upload, Button } from '@soui/ui';

const ManualUpload = () => {
  const [fileList, setFileList] = useState([]);

  return (
    <div>
      <Upload
        action="https://httpbin.org/post"
        fileList={fileList}
        onChange={({ fileList }) => setFileList(fileList)}
        manualUpload
      >
        <Button>选择文件</Button>
      </Upload>
      <Button type="primary" style={{ marginTop: 12 }}>
        开始上传
      </Button>
    </div>
  );
};
```

### 上传前校验

通过 `beforeUpload` 可以在上传前校验文件，返回 `false` 阻止上传，返回 `Promise` 支持异步处理。

```tsx
import { Upload, Button } from '@soui/ui';

const BeforeUpload = () => (
  <Upload
    action="https://httpbin.org/post"
    beforeUpload={(file) => {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        alert('文件大小不能超过 2MB！');
      }
      return isLt2M;
    }}
  >
    <Button>上传小于2MB的文件</Button>
  </Upload>
);
```

### 自定义上传

通过 `customRequest` 覆盖默认的上传行为，适用于需要自定义上传逻辑的场景。

```tsx
import { Upload, Button } from '@soui/ui';

const CustomRequest = () => (
  <Upload
    customRequest={({ file, onProgress, onSuccess }) => {
      // 模拟上传进度
      let percent = 0;
      const timer = setInterval(() => {
        percent += 20;
        onProgress(percent);
        if (percent >= 100) {
          clearInterval(timer);
          onSuccess({ url: 'mock-url' });
        }
      }, 200);
    }}
  >
    <Button>自定义上传</Button>
  </Upload>
);
```

## API

### Upload

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| action | 上传地址 | `string` | - |
| method | 上传请求的 HTTP method | `'POST' \| 'PUT' \| 'PATCH'` | `'POST'` |
| name | 发到后台的文件参数名 | `string` | `'file'` |
| data | 上传时附带的额外参数 | `object \| (file: UploadFile) => object` | - |
| headers | 设置上传的请求头部 | `object` | - |
| withCredentials | 上传请求时是否携带 cookie | `boolean` | `false` |
| defaultFileList | 默认已经上传的文件列表 | `UploadFile[]` | - |
| fileList | 已上传的文件列表（受控） | `UploadFile[]` | - |
| onChange | 文件状态变化时的回调 | `(info: UploadChangeParam) => void` | - |
| onRemove | 点击移除文件时的回调，返回 `false` 阻止移除 | `(file: UploadFile) => boolean \| Promise<boolean \| void>` | - |
| beforeUpload | 上传文件之前的钩子，返回 `false` 阻止上传 | `(file: File, fileList: File[]) => boolean \| Promise<File \| boolean>` | - |
| customRequest | 自定义上传请求实现 | `(options: UploadRequestOption) => void \| { abort: () => void }` | - |
| multiple | 是否支持多选文件 | `boolean` | `false` |
| accept | 接受上传的文件类型（同 input accept） | `string` | - |
| disabled | 是否禁用 | `boolean` | `false` |
| maxCount | 限制上传数量，超出后隐藏上传按钮 | `number` | - |
| showUploadList | 是否展示文件列表，可配置预览和删除图标 | `boolean \| { showRemoveIcon?: boolean; showPreviewIcon?: boolean }` | `true` |
| listType | 上传列表的内建样式 | `'text' \| 'picture' \| 'picture-card'` | `'text'` |
| draggable | 是否启用拖拽上传 | `boolean` | `false` |
| manualUpload | 是否手动上传（不自动上传） | `boolean` | `false` |
| onPreview | 点击文件链接或预览图标时的回调 | `(file: UploadFile) => void` | - |
| onDownload | 点击下载文件时的回调 | `(file: UploadFile) => void` | - |

### UploadFile

| 参数 | 说明 | 类型 | 默认值 |
|------|------|------|--------|
| uid | 唯一标识 | `string` | - |
| name | 文件名 | `string` | - |
| status | 上传状态 | `'uploading' \| 'done' \| 'error' \| 'removed'` | - |
| percent | 上传进度百分比 | `number` | - |
| url | 下载地址 | `string` | - |
| thumbUrl | 缩略图地址 | `string` | - |
| response | 服务端响应内容 | `any` | - |
| error | 错误信息 | `any` | - |
| type | 文件类型 | `string` | - |
| size | 文件大小（字节） | `number` | - |
| originFileObj | 原始 File 对象 | `File` | - |

### UploadChangeParam

| 参数 | 说明 | 类型 |
|------|------|------|
| file | 当前操作的文件对象 | `UploadFile` |
| fileList | 当前的文件列表 | `UploadFile[]` |

### Upload.Dragger

拖拽上传组件，继承 Upload 的所有属性。

```tsx
<Upload.Dragger action="https://example.com/upload">
  <p>点击或拖拽文件到此区域上传</p>
</Upload.Dragger>
```

## 主题定制

Upload 作为标准 React 组件渲染在 ConfigProvider 的 DOM 树内，通过 CSS 变量继承自动获取主题配置，无需额外桥接。

### 组件级配置

通过 `theme.components.Upload` 针对组件进行精细化配置：

```tsx
<ConfigProvider
  theme={{
    components: {
      Upload: {
        colorPrimary: '#722ed1',
        borderRadius: 8,
        colorBorder: '#d9d9d9',
        fontSize: 14,
      },
    },
  }}
>
  <Upload action="/api/upload">
    <Button>上传文件</Button>
  </Upload>
</ConfigProvider>
```

### 配置优先级

配置优先级从高到低：

1. **Props (style/className)** - 直接传入的样式属性
2. **组件级配置** - `theme.components.Upload` 中的配置
3. **CSS 变量** - 全局 CSS 自定义属性
4. **Less 变量** - 默认值

### 可用的主题配置项

| 配置项 | 说明 | 类型 | 默认值 |
|--------|------|------|--------|
| colorPrimary | 主色 | `string` | `'#1677ff'` |
| colorPrimaryHover | 主色悬停 | `string` | `'#4096ff'` |
| borderRadius | 圆角大小（像素） | `number` | `6` |
| colorBorder | 边框颜色 | `string` | `'#d9d9d9'` |
| colorBg | 背景色 | `string` | `'#fff'` |
| fontSize | 字体大小（像素） | `number` | `14` |
| text | 文本颜色 | `string` | `'rgba(0,0,0,0.88)'` |
| textSecondary | 次要文本颜色 | `string` | `'rgba(0,0,0,0.65)'` |
| textDisabled | 禁用文本颜色 | `string` | `'rgba(0,0,0,0.25)'` |
| colorError | 错误色 | `string` | `'#ff4d4f'` |
| colorSuccess | 成功色 | `string` | `'#52c41a'` |

### 自定义 CSS 变量

对于更高级的定制需求，可以直接覆盖 CSS 变量：

```tsx
<Upload
  style={{
    '--soui-upload-border-radius': '12px',
    '--soui-upload-color-border': '#722ed1',
  }}
/>
```

## 设计原则

### ✅ 推荐用法

```tsx
// 提供明确的 action 上传地址
<Upload action="/api/upload">
  <Button>上传文件</Button>
</Upload>

// 使用 beforeUpload 做文件校验
<Upload
  beforeUpload={(file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) alert('只能上传图片文件');
    return isImage;
  }}
/>

// 限制上传数量
<Upload maxCount={5} />
```

### ❌ 避免使用

```tsx
// 不要在 onChange 中直接修改 file 对象
<Upload onChange={({ file }) => { file.name = 'new'; }} />

// 不要在 fileList 中包含 status 为 'removed' 的文件
```

## 无障碍访问

- 上传按钮支持键盘焦点和 Enter/Space 键触发
- 删除操作提供 `aria-label="删除"` 标签
- 预览操作提供 `aria-label="预览"` 标签
- 禁用状态下设置 `tabIndex={-1}` 阻止焦点

## FAQ

### 如何自定义上传请求？

使用 `customRequest` 属性可以完全控制上传行为，例如使用 axios 或 fetch：

```tsx
<Upload
  customRequest={({ file, onProgress, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('file', file);
    
    fetch('/api/upload', { method: 'POST', body: formData })
      .then(res => res.json())
      .then(data => onSuccess(data))
      .catch(err => onError(err));
  }}
/>
```

### 如何实现上传前压缩图片？

在 `beforeUpload` 中使用 Canvas 压缩图片，返回压缩后的 File 对象：

```tsx
<Upload
  beforeUpload={async (file) => {
    if (file.type.startsWith('image/')) {
      const compressed = await compressImage(file, 0.8);
      return compressed;
    }
    return file;
  }}
/>
```

### maxCount 达到上限后如何显示提示？

`maxCount` 达到上限后会自动隐藏上传按钮，你可以在外部配合文案提示：

```tsx
<Upload maxCount={3} fileList={fileList}>
  {fileList.length < 3 && <Button>上传文件</Button>}
</Upload>
```

## 相关资源

- [Button 按钮](/components/button)
- [Progress 进度条](/components/progress)
