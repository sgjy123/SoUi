export const basicCode = `const [value, setValue] = useState(dayjs());
const [mode, setMode] = useState('month');

<Calendar
  value={value}
  mode={mode}
  onChange={setValue}
  onPanelChange={(date, newMode) => setMode(newMode)}
/>`;

export const cardCode = `<div style={{ width: 320 }}>
  <Calendar
    fullscreen={false}
    onChange={(date) => console.log('选中:', date.format('YYYY-MM-DD'))}
  />
</div>`;

export const cellRenderCode = `const events = {};
const today = dayjs();
events[today.format('YYYY-MM-DD')] = [
  { type: 'success', content: '团队周会' },
  { type: 'warning', content: '代码评审' },
];
events[today.add(2, 'day').format('YYYY-MM-DD')] = [
  { type: 'error', content: '版本发布' },
];

const typeColorMap = { success: '#52c41a', warning: '#faad14', error: '#ff4d4f' };

<Calendar
  cellRender={(current, info) => {
    if (info.type === 'date') {
      const dayEvents = events[current.format('YYYY-MM-DD')] || [];
      return dayEvents.length > 0 ? (
        <div>
          {dayEvents.map((evt, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 2 }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: typeColorMap[evt.type], flexShrink: 0 }} />
              <span style={{ fontSize: 12 }}>{evt.content}</span>
            </div>
          ))}
        </div>
      ) : null;
    }
    return null;
  }}
/>`;

export const disabledCode = `<Calendar
  disabledDate={(current) => {
    const isBefore = current.isBefore(dayjs(), 'day');
    const isWeekend = current.day() === 0 || current.day() === 6;
    return isBefore || isWeekend;
  }}
/>`;
