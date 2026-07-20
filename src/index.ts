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

// Popconfirm Component
export { default as Popconfirm } from './components/Popconfirm';
export type { PopconfirmProps, PopconfirmPlacement, PopconfirmTrigger } from './components/Popconfirm';

// Divider Component
export { default as Divider } from './components/Divider';
export type { DividerProps, DividerType, DividerOrientation } from './components/Divider';

// Grid Component
export { Row, Col } from './components/Grid';
export type { RowProps, RowJustify, RowAlign } from './components/Grid';
export type { ColProps, BreakpointObject } from './components/Grid';

// Layout Component
export { default as Layout } from './components/Layout';
export type {
  LayoutProps,
  HeaderProps,
  SiderProps,
  ContentProps,
  FooterProps,
} from './components/Layout';

// Menu Component
export { default as Menu } from './components/Menu';
export type { MenuProps, MenuMode, MenuItemType } from './components/Menu';

// FloatButton Component
export { default as FloatButton } from './components/FloatButton';
export type { FloatButtonProps, FloatButtonType, FloatButtonShape, FloatButtonSize, FloatButtonTriggerType, FloatButtonPosition } from './components/FloatButton';

// Breadcrumb Component
export { default as Breadcrumb } from './components/Breadcrumb';
export type { BreadcrumbProps, BreadcrumbItemProps } from './components/Breadcrumb';

// Steps Component
export { default as Steps } from './components/Steps';
export type { StepsProps, StepItemProps, StepStatus, StepsDirection, StepsSize, StepsLabelPlacement } from './components/Steps';

// Anchor Component
export { default as Anchor } from './components/Anchor';
export type { AnchorProps, AnchorItem, AnchorLinkProps, AnchorDirection } from './components/Anchor';

// Affix Component
export { default as Affix } from './components/Affix';
export type { AffixProps } from './components/Affix';

// Dialog Component
export { default as Dialog } from './components/Dialog';
export type { DialogProps, DialogConfirmConfig, DialogReturnType, DialogOkType, DialogHookInstance, DialogInstance } from './components/Dialog';

// Drawer Component
export { default as Drawer } from './components/Drawer';
export type { DrawerProps, DrawerPlacement, DrawerSize } from './components/Drawer';

// Alert Component
export { default as Alert } from './components/Alert';
export type { AlertProps, AlertType } from './components/Alert';

// Message Component
export { default as Message } from './components/Message';
export type { MessageConfig, MessageType, MessageInstance } from './components/Message';

// Progress Component
export { default as Progress } from './components/Progress';
export type { ProgressProps, ProgressType, ProgressStatus, ProgressSize, ProgressGradient, ProgressSuccess } from './components/Progress';

// Notification Component
export { default as Notification } from './components/Notification';
export type { NotificationConfig, NotificationPlacement, NotificationType, NotificationApi, NotificationGlobalConfig } from './components/Notification';

// Loading Component
export { default as Loading } from './components/Loading';
export type { LoadingProps, LoadingSize } from './components/Loading';

// Skeleton Component
export { default as Skeleton } from './components/Skeleton';
export type { SkeletonProps, SkeletonAvatarProps, SkeletonButtonProps, SkeletonInputProps, SkeletonImageProps, SkeletonTitleProps, SkeletonParagraphProps, SkeletonSize, SkeletonAvatarShape, SkeletonButtonShape } from './components/Skeleton';

// Result Component
export { default as Result } from './components/Result';
export type { ResultProps, ResultStatus } from './components/Result';

// Table Component
export { default as Table } from './components/Table';
export type { TableProps, ColumnType, TableSize, SortOrder, AlignType, PaginationConfig, RowSelectionConfig, ExpandableConfig } from './components/Table';

// Pagination Component
export { default as Pagination } from './components/Pagination';
export type { PaginationProps, PaginationSize } from './components/Pagination';

// Input Component
export { default as Input } from './components/Input';
export type { InputProps, InputSize, InputStatus, TextAreaProps, PasswordProps, SearchProps } from './components/Input';
export { TextArea, Password, Search } from './components/Input';

// Select Component
export { default as Select } from './components/Select';
export type { SelectProps, SelectSize, SelectStatus, SelectMode, OptionType, OptionGroupType, GroupedOptionType, SelectRef } from './components/Select';

// Radio Component
export { default as Radio } from './components/Radio';
export type { RadioProps, RadioGroupProps, RadioSize, RadioOptionType, RadioButtonStyle } from './components/Radio';

// Checkbox Component
export { default as Checkbox } from './components/Checkbox';
export type { CheckboxProps, CheckboxGroupProps, CheckboxSize } from './components/Checkbox';

// InputNumber Component
export { default as InputNumber } from './components/InputNumber';
export type { InputNumberProps, InputNumberSize, InputNumberStatus } from './components/InputNumber';

// Switch Component
export { default as Switch } from './components/Switch';
export type { SwitchProps, SwitchSize } from './components/Switch';

// Cascader Component
export { default as Cascader } from './components/Cascader';
export type { CascaderProps, CascaderSize, CascaderStatus, CascaderExpandTrigger, CascaderOption, CascaderFieldNames, CascaderRef, CascaderPlacement, CascaderShowCheckedStrategy, CascaderPanelProps } from './components/Cascader';

// TreeSelect Component
export { default as TreeSelect } from './components/TreeSelect';
export type { TreeSelectProps, TreeSelectSize, TreeSelectStatus, TreeSelectOption, TreeSelectFieldNames, TreeSelectRef, TreeSelectShowCheckedStrategy } from './components/TreeSelect';

// Tree Component
export { default as Tree } from './components/Tree';
export type { TreeProps, TreeNodeData, TreeFieldNames } from './components/Tree';

// Rate Component
export { default as Rate } from './components/Rate';
export type { RateProps, RateSize } from './components/Rate';

// ColorPicker Component
export { default as ColorPicker } from './components/ColorPicker';
export type { ColorPickerProps, ColorPickerSize, ColorPickerPlacement, PresetColorGroup } from './components/ColorPicker';
export type { ColorFormat } from './components/ColorPicker/utils';

// DatePicker Component
export { default as DatePicker } from './components/DatePicker';
export type { DatePickerProps, DatePickerSize, DatePickerPlacement } from './components/DatePicker';
export { default as RangePicker } from './components/DatePicker/RangePicker';
export type { RangePickerProps, RangeValue } from './components/DatePicker/RangePicker';
export type { PickerMode } from './components/DatePicker/utils';

// TimePicker Component
export { default as TimePicker } from './components/TimePicker';
export type { TimePickerProps, TimePickerSize, TimePickerPlacement, TimePickerStatus } from './components/TimePicker';
export { RangePicker as TimePickerRange } from './components/TimePicker';
export type { TimeRangePickerProps, TimeRangeValue } from './components/TimePicker';

// Transfer Component
export { default as Transfer } from './components/Transfer';
export type { TransferProps, TransferItem, TransferKey, TransferDirection, RenderResult, TransferLocale } from './components/Transfer';

// Empty Component
export { default as Empty } from './components/Empty';
export type { EmptyProps } from './components/Empty';

// Slider Component
export { default as Slider } from './components/Slider';
export type { SliderProps, SliderOrientation, SliderMarks, SliderMark, SliderTooltipConfig, SliderRangeConfig } from './components/Slider';

// Upload Component
export { default as Upload } from './components/Upload';
export type { UploadProps, UploadFile, UploadFileStatus, UploadListType, UploadChangeParam, UploadRequestOption } from './components/Upload';

// Form Component
export { default as Form, useForm } from './components/Form';
export type {
  FormProps,
  FormItemProps,
  FormListProps,
  FormInstance,
  FormLayout,
  FormSize,
  FormListFieldData,
  FormListOperations,
  RuleConfig,
  Rule,
} from './components/Form';

// Calendar Component
export { default as Calendar } from './components/Calendar';
export type { CalendarProps, CalendarMode, HeaderRenderConfig, CellRenderInfo } from './components/Calendar';

// Waterfall Component
export { default as Waterfall } from './components/Waterfall';
export type { WaterfallProps, WaterfallItem, WaterfallBreakpoints, WaterfallLayoutInfo } from './components/Waterfall';

// Tabs Component
export { default as Tabs } from './components/Tabs';
export type { TabsProps, TabItem, TabsType, TabsSize, TabPosition, EditAction } from './components/Tabs';

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
