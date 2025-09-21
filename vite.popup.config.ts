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
              src: 'manifest.json',
              dest: '.'
            },
            {
              src: 'icons/*',
              dest: 'icons'
            },
            {
              src: 'index-extension.html',
              dest: '.',
              rename: 'index.html'
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
        outDir: 'dist',
        minify: !isDev,
        sourcemap: isDev,
        target: 'es2020',
        cssCodeSplit: false,
        rollupOptions: {
          input: path.resolve(__dirname, 'index.tsx'),
          output: {
            format: 'iife',
            entryFileNames: 'popup.js',
            chunkFileNames: 'popup-[hash].js',
            assetFileNames: (assetInfo) => {
              if (assetInfo.name?.endsWith('.css')) {
                return 'popup.css';
              }
              return '[name].[ext]';
            },
            inlineDynamicImports: true
          }
        }
      },
      esbuild: {
        drop: isDev ? [] : ['console', 'debugger'],
      },
      server: {
        fs: {
          cachedChecks: false,
        },
        open: '/index.html',
        port: 5173,
        host: true,
      }
    };
});