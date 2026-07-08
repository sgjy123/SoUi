import React, { useState } from 'react';
import Upload from '../../src/components/Upload';
import type { UploadFile } from '../../src/components/Upload';

const PictureCard: React.FC = () => {
  const [fileList, setFileList] = useState<UploadFile[]>([
    {
      uid: '-1',
      name: 'image1.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      type: 'image/png',
    },
    {
      uid: '-2',
      name: 'image2.jpg',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/IJOtIlfsYUlYAaChBURX.jpg',
      thumbUrl: 'https://zos.alipayobjects.com/rmsportal/IJOtIlfsYUlYAaChBURX.jpg',
      type: 'image/jpeg',
    },
  ]);

  const handlePreview = (file: UploadFile) => {
    if (file.url) {
      window.open(file.url, '_blank');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <div>
        <h4 style={{ marginBottom: 8 }}>照片墙</h4>
        <Upload
          action="https://httpbin.org/post"
          listType="picture-card"
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          onPreview={handlePreview}
          maxCount={6}
        />
      </div>
    </div>
  );
};

export default PictureCard;
