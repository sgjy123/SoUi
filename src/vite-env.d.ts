declare module '*?raw' {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
  glob<T = any>(pattern: string, options?: { eager?: boolean; query?: string; import?: string }): Record<string, T>;
}
