import React, { useState } from 'react';
import Upload from '../../src/components/Upload';
import type { UploadFile } from '../../src/components/Upload';
import Button from '../../src/components/Button';

const BeforeUpload: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [message, setMessage] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {message && (
            <div style={{ marginTop: 8, padding: '8px 12px', background: '#fff2f0', border: '1px solid #ffccc7', borderRadius: 6, color: '#ff4d4f', fontSize: 13 }}>
                {message}
            </div>
        )}
      <div>
        <h4 style={{ marginBottom: 8 }}>文件大小限制（2MB）</h4>
        <Upload
          action="https://httpbin.org/post"
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          beforeUpload={(file) => {
            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
              setMessage(`文件 "${file.name}" 超过 2MB 限制，已阻止上传`);
              setTimeout(() => setMessage(''), 3000);
            }
            return isLt2M;
          }}
        >
          <Button>上传文件（限2MB）</Button>
        </Upload>
      </div>

      <div>
        <h4 style={{ marginBottom: 8 }}>文件类型限制（仅图片）</h4>
        <Upload
          action="https://httpbin.org/post"
          accept="image/*"
          multiple
          beforeUpload={(file) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
              setMessage(`"${file.name}" 不是图片文件`);
              setTimeout(() => setMessage(''), 3000);
              return false;
            }
            return true;
          }}
          onChange={({ fileList }) => setFileList(fileList)}
        >
          <Button>仅上传图片</Button>
        </Upload>
      </div>

      <div>
        <h4 style={{ marginBottom: 8 }}>异步校验（模拟服务端检查）</h4>
        <Upload
          action="https://httpbin.org/post"
          beforeUpload={async (file) => {
            setMessage(`正在校验 "${file.name}"...`);
            // 模拟异步校验
            await new Promise((resolve) => setTimeout(resolve, 1000));
            const allowed = !file.name.includes('forbidden');
            if (!allowed) {
              setMessage(`"${file.name}" 包含禁用关键词，上传被拒绝`);
              setTimeout(() => setMessage(''), 3000);
              return false;
            }
            setMessage('');
            return true;
          }}
          onChange={({ fileList }) => setFileList(fileList)}
        >
          <Button>异步校验（文件名含"forbidden"会被拒绝）</Button>
        </Upload>
      </div>
    </div>
  );
};

export default BeforeUpload;
