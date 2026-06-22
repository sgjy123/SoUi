import React, { useState, useEffect } from 'react';
import Icon from '../components/Icon';
import ConfigProvider, { useConfig } from '../components/ConfigProvider';
import type { ThemeConfig } from '../components/ConfigProvider/types';
import './style.less';

// 预设主题配置
export const themes = {
  // 主题1: 蓝色科技风（默认）
  blue: {
    name: '蓝色科技',
    theme: {
      primaryColor: '#1677ff',
      primaryHoverColor: '#4096ff',
      primaryActiveColor: '#0958d9',
      successColor: '#52c41a',
      warningColor: '#faad14',
      errorColor: '#ff4d4f',
      infoColor: '#1677ff',
      borderRadius: 6,
      components: {
        Menu: {
          colorPrimary: '#1677ff',
          itemSelectedBg: 'rgba(22, 119, 255, 0.1)',
          itemSelectedColor: '#1677ff',
        },
      },
    } as ThemeConfig,
  },
  // 主题2: 绿色清新风
  green: {
    name: '绿色清新（大尺寸）',
    theme: {
      primaryColor: '#52c41a',
      primaryHoverColor: '#73d13d',
      primaryActiveColor: '#389e0d',
      successColor: '#52c41a',
      warningColor: '#faad14',
      errorColor: '#ff4d4f',
      infoColor: '#52c41a',
      borderRadius: 8,
      fontSize: 22,
      maxWidth: 400,
      components: {
        Menu: {
          colorPrimary: '#52c41a',
          itemSelectedBg: 'rgba(82, 196, 26, 0.1)',
          itemSelectedColor: '#52c41a',
        },
        Alert: {
          borderRadius: 8,
          fontSize: 14,
          titleFontSize: 16,
          iconSize: 20,
          colorSuccessBg: '#f0fff0',
          colorSuccessBorder: '#80ff80',
          colorErrorBg: '#fff0f0',
          colorErrorBorder: '#ff8080',
        },
        Notification: {
          borderRadius: 8,
          fontSize: 18,
          descriptionFontSize: 12,
          iconSize: 22,
          closeIconSize: 18,
          padding: '16px',
          zIndex: 1030,
          colorBg: '#fff',
        },
      },
    } as ThemeConfig,
  },
};

export type ThemeKey = keyof typeof themes;

interface ThemeSwitcherProps {
  onThemeChange?: (themeKey: ThemeKey) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ onThemeChange }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeKey>('blue');
  const [visible, setVisible] = useState(false);

  // 从 localStorage 读取保存的主题
  useEffect(() => {
    const savedTheme = localStorage.getItem('soui-theme') as ThemeKey;
    if (savedTheme && themes[savedTheme]) {
      setCurrentTheme(savedTheme);
      onThemeChange?.(savedTheme);
    }
  }, []);

  // 切换主题
  const handleThemeChange = (themeKey: ThemeKey) => {
    setCurrentTheme(themeKey);
    localStorage.setItem('soui-theme', themeKey);
    onThemeChange?.(themeKey);
    setVisible(false);
  };

  return (
    <div className="soui-theme-switcher">
      {/* 主题切换按钮 */}
      <button
        className="soui-theme-btn"
        onClick={() => setVisible(!visible)}
        title="切换主题"
      >
        <Icon name="ColorFilter" size={18} />
      </button>

      {/* 主题选择面板 */}
      {visible && (
        <>
          {/* 遮罩层 */}
          <div className="soui-theme-overlay" onClick={() => setVisible(false)} />

          {/* 主题列表 */}
          <div className="soui-theme-panel">
            <div className="soui-theme-panel-header">
              <span>选择主题</span>
            </div>
            <div className="soui-theme-list">
              {(Object.keys(themes) as ThemeKey[]).map((key) => {
                const theme = themes[key];
                const isActive = currentTheme === key;

                return (
                  <button
                    key={key}
                    className={`soui-theme-item ${isActive ? 'active' : ''}`}
                    onClick={() => handleThemeChange(key)}
                  >
                    <div
                      className="soui-theme-color-preview"
                      style={{ backgroundColor: theme.theme.primaryColor }}
                    />
                    <span className="soui-theme-name">{theme.name}</span>
                    {isActive && (
                      <Icon name="Check" size={14} className="soui-theme-check" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// 带主题配置的包装组件
interface ThemeProviderWrapperProps {
  children: React.ReactNode;
}

export const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({ children }) => {
  const [themeKey, setThemeKey] = useState<ThemeKey>('blue');

  return (
    <ConfigProvider theme={themes[themeKey].theme}>
      {children}
      <ThemeSwitcher onThemeChange={setThemeKey} />
    </ConfigProvider>
  );
};

export default ThemeSwitcher;
