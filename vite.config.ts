import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    const isDev = mode === 'development';
    
    return {
      plugins: [
        react({
          jsxRuntime: 'automatic'
        }),
        viteStaticCopy({
          targets: [
            {
              src: 'manifest.json',
              dest: '.'
            },
            {
              src: 'icons/*',
              dest: 'icons'
            },
            {
              src: 'styles/*',
              dest: 'styles'
            },
            {
              src: 'index-extension.html',
              dest: '.',
              rename: 'index.html'
            },
            {
              src: 'fullapp.html',
              dest: '.'
            },
            {
              src: 'offscreen.html',
              dest: '.'
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
          '@': path.resolve(__dirname, './'),
        }
      },
      build: {
        minify: !isDev,
        sourcemap: isDev,
        target: 'es2020',
        cssCodeSplit: false,
        rollupOptions: {
          input: {
            popup: path.resolve(__dirname, 'popup.tsx'),
            fullapp: path.resolve(__dirname, 'fullapp.tsx'),
            background: path.resolve(__dirname, 'background/index.ts'),
            offscreen: path.resolve(__dirname, 'offscreen.ts')
          },
          output: {
            format: 'iife',
            entryFileNames: '[name].js',
            chunkFileNames: '[name]-[hash].js',
            assetFileNames: (assetInfo) => {
              if (assetInfo.name === 'index.css') {
                return 'popup.css';
              }
              return '[name].[ext]';
            },
          }
        }
      },
      esbuild: {
        drop: isDev ? [] : ['console', 'debugger'],
      }
    };
});
