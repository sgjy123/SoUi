import React, { useState } from 'react';
import Upload from '../../src/components/Upload';
import type { UploadFile } from '../../src/components/Upload';
import Button from '../../src/components/Button';

const PictureList: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'photo1.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      type: 'image/png',
    },
    {
      uid: '-2',
      name: 'photo2.jpg',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/IJOtIlfsYUlYAaChBURX.jpg',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/IJOtIlfsYUlYAaChBURX.jpg',
      type: 'image/jpeg',
    },
    {
      uid: '-3',
      name: 'document.pdf',
      status: 'done',
      url: 'https://example.com/doc.pdf',
      type: 'application/pdf',
    },
  ]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h4 style={{ marginBottom: 8 }}>图片列表模式</h4>
        <p style={{ color: '#666', fontSize: 13, marginBottom: 12 }}>
          listType="picture" 以缩略图列表展示，图片文件显示缩略图，其他文件显示图标。
        </p>
        <Upload
          action="https://httpbin.org/post"
          listType="picture"
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          accept="image/*"
          multiple
        >
          <Button>上传图片</Button>
        </Upload>
      </div>
    </div>
  );
};

export default PictureList;
