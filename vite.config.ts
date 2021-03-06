import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import checker from 'vite-plugin-checker';
import jotaiDebugLabel from 'jotai/babel/plugin-debug-label';
import jotaiReactRefresh from 'jotai/babel/plugin-react-refresh';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const common = {
    plugins: [
      react({ babel: { plugins: [jotaiDebugLabel, jotaiReactRefresh] } }),
      checker({
        typescript: true,
        eslint: {
          lintCommand: 'eslint "./src/**/*.{ts,tsx}"', // for example, lint .ts & .tsx
        },
      }),
    ],
    server: {
      port: 3001,
    },
  };

  if (mode === 'development') {
    return {
      ...common,
      server: {
        ...common.server,
        host: 'resurrectism.test',
      },
    };
  }

  return common;
});
