import React, { useState } from 'react';
import { TimePicker, Button, Space } from '../../src';
import dayjs from 'dayjs';

export default () => {
  const [value, setValue] = useState<dayjs.Dayjs | null>(dayjs('14:30:00', 'HH:mm:ss'));

  return (
    <Space direction="vertical">
      <TimePicker
        value={value}
        onChange={(time) => setValue(time)}
      />
      <Space>
        <Button onClick={() => setValue(dayjs())}>设为当前时间</Button>
        <Button onClick={() => setValue(null)}>清空</Button>
      </Space>
    </Space>
  );
};
