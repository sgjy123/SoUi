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

export const lunarCode = `const [value, setValue] = useState(dayjs());
const [mode, setMode] = useState('month');

<Calendar
  showLunar
  value={value}
  mode={mode}
  onChange={setValue}
  onPanelChange={(date, newMode) => setMode(newMode)}
/>`;

export const customHeaderCode = `const [value, setValue] = useState(dayjs());
const [mode, setMode] = useState('month');

<Calendar
  value={value}
  mode={mode}
  onChange={setValue}
  onPanelChange={(date, newMode) => setMode(newMode)}
  headerRender={({ value: panelDate, mode: currentMode, onChange, onModeChange }) => (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 12px', borderBottom: '1px solid #f0f0f0' }}>
      <Space>
        <Button size="small" onClick={() => onChange(panelDate.subtract(1, currentMode === 'month' ? 'month' : 'year'))}>
          上一{currentMode === 'month' ? '月' : '年'}
        </Button>
        <span style={{ fontWeight: 600 }}>{panelDate.format('YYYY年M月')}</span>
        <Button size="small" onClick={() => onChange(panelDate.add(1, currentMode === 'month' ? 'month' : 'year'))}>
          下一{currentMode === 'month' ? '月' : '年'}
        </Button>
      </Space>
      <Space>
        <Button size="small" onClick={() => onChange(dayjs())}>今天</Button>
        <Button size="small" type={currentMode === 'month' ? 'primary' : 'default'} onClick={() => onModeChange('month')}>月</Button>
        <Button size="small" type={currentMode === 'year' ? 'primary' : 'default'} onClick={() => onModeChange('year')}>年</Button>
      </Space>
    </div>
  )}
/>`;
