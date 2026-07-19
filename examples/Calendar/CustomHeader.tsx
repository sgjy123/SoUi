import React, { useState } from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import { Calendar, Button, Space } from '../../src';
import type { CalendarMode, HeaderRenderConfig } from '../../src';

export default () => {
  const [value, setValue] = useState<Dayjs>(dayjs());
  const [mode, setMode] = useState<CalendarMode>('month');

  const headerRender = ({ value: panelDate, mode: currentMode, onChange, onModeChange }: HeaderRenderConfig) => {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }}>
        <Space>
          <Button size="small" onClick={() => onChange(panelDate.subtract(1, currentMode === 'month' ? 'month' : 'year'))}>
            上一{currentMode === 'month' ? '月' : '年'}
          </Button>
          <span style={{ fontWeight: 600, fontSize: 15 }}>
            {panelDate.format('YYYY年M月')}
          </span>
          <Button size="small" onClick={() => onChange(panelDate.add(1, currentMode === 'month' ? 'month' : 'year'))}>
            下一{currentMode === 'month' ? '月' : '年'}
          </Button>
        </Space>
        <Space>
          <Button size="small" onClick={() => onChange(dayjs())}>今天</Button>
          <Button
            size="small"
            type={currentMode === 'month' ? 'primary' : 'default'}
            onClick={() => onModeChange('month')}
          >
            月
          </Button>
          <Button
            size="small"
            type={currentMode === 'year' ? 'primary' : 'default'}
            onClick={() => onModeChange('year')}
          >
            年
          </Button>
        </Space>
      </div>
    );
  };

  return (
    <Calendar
      value={value}
      mode={mode}
      onChange={setValue}
      onPanelChange={(date, newMode) => setMode(newMode)}
      headerRender={headerRender}
    />
  );
};
