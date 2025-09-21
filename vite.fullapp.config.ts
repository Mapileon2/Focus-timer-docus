import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const isDev = mode === 'development';
    
    return {
      plugins: [
        react(),
        viteStaticCopy({
          targets: [
            {
              src: 'fullapp.html',
              dest: '.'
            },
            {
              src: 'styles/*',
              dest: 'styles'
            }
          ]
        })
      ],
      define: {
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.NODE_ENV': JSON.stringify(mode)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      },
      build: {
        minify: !isDev,
        sourcemap: isDev,
        target: 'es2020',
        rollupOptions: {
          input: path.resolve(__dirname, 'fullapp.tsx'),
          output: {
            format: 'iife',
            entryFileNames: 'fullapp.js',
            chunkFileNames: 'fullapp-[hash].js',
            assetFileNames: '[name].[ext]',
            inlineDynamicImports: true
          }
        }
      },
      esbuild: {
        drop: isDev ? [] : ['console', 'debugger'],
      }
    };
});