import React, { useState } from 'react';
import Upload from '../../src/components/Upload';
import type { UploadFile } from '../../src/components/Upload';
import Button from '../../src/components/Button';

const CustomRequest: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const mockUpload = ({ file, onProgress, onSuccess, onError }: any) => {
    let percent = 0;
    const timer = setInterval(() => {
      percent += Math.floor(Math.random() * 15) + 5;
      if (percent >= 100) {
        percent = 100;
        clearInterval(timer);
        // 90% 概率成功
        if (Math.random() > 0.1) {
          onSuccess({ url: `https://example.com/files/${file.name}` });
        } else {
          onError(new Error('模拟上传失败'));
        }
      }
      onProgress(Math.min(percent, 100));
    }, 300);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h4 style={{ marginBottom: 8 }}>模拟上传（含进度和随机失败）</h4>
        <Upload
          customRequest={mockUpload}
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          multiple
        >
          <Button type="primary">选择文件</Button>
        </Upload>
      </div>
    </div>
  );
};

export default CustomRequest;
