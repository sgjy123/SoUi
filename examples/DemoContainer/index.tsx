import React, { useState } from 'react';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import Button from '../../src/components/Button';
import Space from '../../src/components/Space';
import Icon from '../../src/components/Icon';
import Typography from '../../src/components/Typography';
import Tooltip from '../../src/components/Tooltip';
import Popconfirm from '../../src/components/Popconfirm';
import Divider from '../../src/components/Divider';
import { Row, Col } from '../../src/components/Grid';
import Layout from '../../src/components/Layout';
import FloatButton from '../../src/components/FloatButton';
import Breadcrumb from '../../src/components/Breadcrumb';
import Steps from '../../src/components/Steps';
import Anchor from '../../src/components/Anchor';
import Affix from '../../src/components/Affix';
import Alert from '../../src/components/Alert';
import Message from '../../src/components/Message';
import Progress from '../../src/components/Progress';
import Notification from '../../src/components/Notification';
import Loading from '../../src/components/Loading';
import Skeleton from '../../src/components/Skeleton';
import Dialog from '../../src/components/Dialog';
import Drawer from '../../src/components/Drawer';
import Result from '../../src/components/Result';
import Watermark from '../../src/components/Watermark';
import Table from '../../src/components/Table';
import Pagination from '../../src/components/Pagination';
import Input from '../../src/components/Input';
import Select from '../../src/components/Select';
import Radio from '../../src/components/Radio';
import Segmented from '../../src/components/Segmented';
import Avatar from '../../src/components/Avatar';
import GlowBorder from '../../src/components/GlowBorder';
import Statistic from '../../src/components/Statistic';
import Timeline from '../../src/components/Timeline';
import Checkbox from '../../src/components/Checkbox';
import InputNumber from '../../src/components/InputNumber';
import Switch from '../../src/components/Switch';
import Cascader from '../../src/components/Cascader';
import TreeSelect from '../../src/components/TreeSelect';
import Tree from '../../src/components/Tree';
import Calendar from '../../src/components/Calendar';
import Waterfall from '../../src/components/Waterfall';
import Tabs from '../../src/components/Tabs';
import Dropdown from '../../src/components/Dropdown';
import Tag from '../../src/components/Tag';
import Card from '../../src/components/Card';
import Badge from '../../src/components/Badge';
import Carousel from '../../src/components/Carousel';
import Descriptions from '../../src/components/Descriptions';
import Image from '../../src/components/Image';
import Collapse from '../../src/components/Collapse';
import PopCard from '../../src/components/PopCard';
import Rate from '../../src/components/Rate';
import ColorPicker from '../../src/components/ColorPicker';
import DatePicker from '../../src/components/DatePicker';
import RangePicker from '../../src/components/DatePicker/RangePicker';
import TimePicker from '../../src/components/TimePicker';
import Transfer from '../../src/components/Transfer';
import Empty from '../../src/components/Empty';
import Slider from '../../src/components/Slider';
import Upload from '../../src/components/Upload';
import dayjs from 'dayjs';
import ConfigProvider from '../../src/components/ConfigProvider';
import './style.less';

interface DemoContainerProps {
  title: string;
  description?: string;
  code: string; // 通过 ?raw 导入的源码字符串
  component?: React.FC; // 可选：传入真实组件用于预览（性能更好）
  scope?: Record<string, any>;
}

const DemoContainer: React.FC<DemoContainerProps> = ({
  title,
  description,
  code,
  component: Component,
  scope = {},
}) => {
  const [showCode, setShowCode] = useState(false);

  // 默认的可用组件和库
  const defaultScope = {
    React,
    useState: React.useState,
    useEffect: React.useEffect,
    useMemo: React.useMemo,
    useCallback: React.useCallback,
    Button,
    Space,
    Icon,
    Typography,
    Title: Typography.Title,
    Paragraph: Typography.Paragraph,
    Text: Typography.Text,
    Link: Typography.Link,
    Tooltip,
    Popconfirm,
    Divider,
    Row,
    Col,
    Layout,
    Header: Layout.Header,
    Sider: Layout.Sider,
    Content: Layout.Content,
    Footer: Layout.Footer,
    FloatButton,
    Breadcrumb,
    Steps,
    Step: Steps.Step,
    Anchor,
    AnchorLink: Anchor.Link,
    Affix,
    Alert,
    Message,
    Progress,
    Notification,
    Loading,
    Skeleton,
    Dialog,
    Drawer,
    Result,
    Watermark,
    Table,
    Pagination,
    Input,
    TextArea: Input.TextArea,
    Select,
    Radio,
    RadioGroup: Radio.Group,
    RadioButton: Radio.Button,
    Segmented,
    Avatar,
    AvatarGroup: Avatar.Group,
    GlowBorder,
    Statistic,
    Countdown: Statistic.Countdown,
    Timeline,
    TimelineItem: Timeline.Item,
    Checkbox,
    CheckboxGroup: Checkbox.Group,
    InputNumber,
    Switch,
    Cascader,
    TreeSelect,
    Tree,
    Calendar,
    Waterfall,
    Tabs,
    Dropdown,
    Tag,
    CheckableTag: Tag.CheckableTag,
    Card,
    CardGrid: Card.Grid,
    CardMeta: Card.Meta,
    Badge,
    Ribbon: Badge.Ribbon,
    Carousel,
    Descriptions,
    DescriptionsItem: Descriptions.Item,
    Image,
    ImagePreviewGroup: Image.PreviewGroup,
    Collapse,
    CollapsePanel: Collapse.Panel,
    PopCard,
    Rate,
    ColorPicker,
    DatePicker,
    RangePicker,
    TimePicker,
    Transfer,
    Empty,
    Slider,
    Upload,
    dayjs,
    ConfigProvider,
    ...scope,
  };

  return (
    <div className="soui-demo-container">
      <div className="soui-demo-header">
        <h3>{title}</h3>
      </div>

      {description && (
        <div className="soui-demo-description">
          <p>{description}</p>
        </div>
      )}

      {/* 如果传入了真实组件，优先渲染真实组件以获得更好的 HMR 体验 */}
      {Component ? (
        <div className="soui-demo-preview">
          <Component />
        </div>
      ) : (
        <LiveProvider code={code} scope={defaultScope}>
          <div className="soui-demo-preview">
            <LivePreview />
            <LiveError />
          </div>
        </LiveProvider>
      )}

      <div className="soui-demo-actions">
        <button
          className={`soui-demo-code-toggle ${showCode ? 'active' : ''}`}
          onClick={() => setShowCode(!showCode)}
        >
          {showCode ? '隐藏代码' : '查看代码'}
        </button>
      </div>

      {showCode && (
        <LiveProvider code={code} scope={defaultScope}>
          <div className="soui-demo-code">
            <LiveEditor />
          </div>
        </LiveProvider>
      )}
    </div>
  );
};

export default DemoContainer;
