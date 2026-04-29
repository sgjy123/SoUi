import { createContext } from 'react';
import type { ConfigContextProps } from './types';

/**
 * 全局配置上下文
 */
const ConfigContext = createContext<ConfigContextProps | undefined>(undefined);

ConfigContext.displayName = 'ConfigContext';

export default ConfigContext;
