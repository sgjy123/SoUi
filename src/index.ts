// Global Styles
import './styles/global.less';

// Button Component
export { default as Button } from './components/Button';
export type { ButtonProps, ButtonType, ButtonSize, ButtonShape, ButtonHTMLType } from './components/Button';

// Icon Component
export { default as Icon } from './components/Icon';
export type { IconProps, IconTheme } from './components/Icon';

// ConfigProvider Component
export { default as ConfigProvider } from './components/ConfigProvider';
export { useConfig, useTheme, useComponentSize, ConfigContext } from './components/ConfigProvider';
export type { ConfigProviderProps, ThemeConfig, ComponentSize } from './components/ConfigProvider/types';

// Space Component
export { default as Space } from './components/Space';
export type { SpaceProps, SpaceSize, SpaceDirection, SpaceAlign } from './components/Space';

// Typography Component
export { default as Typography } from './components/Typography';
export type {
  TypographyProps,
  TextType,
  CopyConfig,
  EditableConfig,
  EllipsisConfig,
  BaseProps,
  TitleProps,
  ParagraphProps,
  LinkProps,
} from './components/Typography';

// Tooltip Component
export { default as Tooltip } from './components/Tooltip';
export type { TooltipProps, TooltipPlacement, TooltipTrigger } from './components/Tooltip';

// Utils
export * from './utils';

// Hooks
export * from './hooks';

// Version
export const version = '1.0.0';

// Default export
export default {
  version,
};
