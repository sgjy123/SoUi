import { useMemo } from 'react';

// 自动扫描所有示例组件
const componentModules = import.meta.glob('../../examples/*/*.tsx', { eager: true });
// 自动扫描所有示例源码 (使用 ?raw)
const codeModules = import.meta.glob('../../examples/*/*.tsx', { eager: true, query: '?raw', import: 'default' });

export const useExampleLoader = (componentPath: string, exampleName: string) => {
  return useMemo(() => {
    // 构造路径匹配键
    const compKey = `../../examples/${componentPath}/${exampleName}.tsx`;
    const Component = (componentModules[compKey] as any)?.default;
    const code = codeModules[compKey] as string || '// 源码加载中...';
    return { Component, code };
  }, [componentPath, exampleName]);
};
