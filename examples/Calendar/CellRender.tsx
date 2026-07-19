import React, { useState } from 'react';
import dayjs, { type Dayjs } from 'dayjs';
import { Calendar } from '../../src';
import type { CalendarMode, CellRenderInfo } from '../../src';

const events: Record<string, { type: 'success' | 'warning' | 'error'; content: string }[]> = {};

// 生成一些示例事件
const today = dayjs();
events[today.format('YYYY-MM-DD')] = [
  { type: 'success', content: '团队周会' },
  { type: 'warning', content: '代码评审' },
];
events[today.add(2, 'day').format('YYYY-MM-DD')] = [
  { type: 'error', content: '版本发布' },
];
events[today.subtract(1, 'day').format('YYYY-MM-DD')] = [
  { type: 'success', content: '需求评审' },
];

const typeColorMap: Record<string, string> = {
  success: '#52c41a',
  warning: '#faad14',
  error: '#ff4d4f',
};

export default () => {
  const [mode, setMode] = useState<CalendarMode>('month');

  const cellRender = (current: Dayjs, info: CellRenderInfo) => {
    if (info.type === 'date') {
      const dayEvents = events[current.format('YYYY-MM-DD')] || [];
      return dayEvents.length > 0 ? (
        <div>
          {dayEvents.map((evt, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: typeColorMap[evt.type], flexShrink: 0 }} />
              <span style={{ fontSize: 12, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {evt.content}
              </span>
            </div>
          ))}
        </div>
      ) : null;
    }
    if (info.type === 'month') {
      const monthStr = current.format('YYYY-MM');
      const count = Object.keys(events).filter((k) => k.startsWith(monthStr)).length;
      return count > 0 ? (
        <div style={{ fontSize: 12, color: '#1677ff' }}>{count} 个事件</div>
      ) : null;
    }
    return null;
  };

  return (
    <Calendar
      mode={mode}
      onPanelChange={(_, newMode) => setMode(newMode)}
      cellRender={cellRender}
    />
  );
};
