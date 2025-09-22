// vite.popup.config.ts
import path from "path";
import { defineConfig, loadEnv } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.js";
import { viteStaticCopy } from "file:///home/project/node_modules/vite-plugin-static-copy/dist/index.js";
var __vite_injected_original_dirname = "/home/project";
var vite_popup_config_default = defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");
  const isDev = mode === "development";
  return {
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          {
            src: "manifest.json",
            dest: "."
          },
          {
            src: "icons/*",
            dest: "icons"
          },
          {
            src: "index-extension.html",
            dest: ".",
            rename: "index.html"
          }
        ]
      })
    ],
    define: {
      "process.env.GEMINI_API_KEY": JSON.stringify(env.GEMINI_API_KEY),
      "process.env.NODE_ENV": JSON.stringify(mode)
    },
    resolve: {
      alias: {
        "@": path.resolve(__vite_injected_original_dirname, ".")
      }
    },
    build: {
      outDir: "dist",
      minify: !isDev,
      sourcemap: isDev,
      target: "es2020",
      cssCodeSplit: false,
      rollupOptions: {
        input: path.resolve(__vite_injected_original_dirname, "index.tsx"),
        output: {
          format: "iife",
          entryFileNames: "popup.js",
          chunkFileNames: "popup-[hash].js",
          assetFileNames: (assetInfo) => {
            if (assetInfo.name?.endsWith(".css")) {
              return "popup.css";
            }
            return "[name].[ext]";
          },
          inlineDynamicImports: true
        }
      }
    },
    esbuild: {
      drop: isDev ? [] : ["console", "debugger"]
    },
    server: {
      fs: {
        cachedChecks: false
      },
      open: "/index.html",
      port: 5173,
      host: true
    }
  };
});
export {
  vite_popup_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5wb3B1cC5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUucG9wdXAuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5wb3B1cC5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgbG9hZEVudiB9IGZyb20gJ3ZpdGUnO1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0JztcbmltcG9ydCB7IHZpdGVTdGF0aWNDb3B5IH0gZnJvbSAndml0ZS1wbHVnaW4tc3RhdGljLWNvcHknO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSB9KSA9PiB7XG4gICAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCAnLicsICcnKTtcbiAgICBjb25zdCBpc0RldiA9IG1vZGUgPT09ICdkZXZlbG9wbWVudCc7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgIHBsdWdpbnM6IFtcbiAgICAgICAgcmVhY3QoKSxcbiAgICAgICAgdml0ZVN0YXRpY0NvcHkoe1xuICAgICAgICAgIHRhcmdldHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3JjOiAnbWFuaWZlc3QuanNvbicsXG4gICAgICAgICAgICAgIGRlc3Q6ICcuJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgc3JjOiAnaWNvbnMvKicsXG4gICAgICAgICAgICAgIGRlc3Q6ICdpY29ucydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNyYzogJ2luZGV4LWV4dGVuc2lvbi5odG1sJyxcbiAgICAgICAgICAgICAgZGVzdDogJy4nLFxuICAgICAgICAgICAgICByZW5hbWU6ICdpbmRleC5odG1sJ1xuICAgICAgICAgICAgfVxuICAgICAgICAgIF1cbiAgICAgICAgfSlcbiAgICAgIF0sXG4gICAgICBkZWZpbmU6IHtcbiAgICAgICAgJ3Byb2Nlc3MuZW52LkdFTUlOSV9BUElfS0VZJzogSlNPTi5zdHJpbmdpZnkoZW52LkdFTUlOSV9BUElfS0VZKSxcbiAgICAgICAgJ3Byb2Nlc3MuZW52Lk5PREVfRU5WJzogSlNPTi5zdHJpbmdpZnkobW9kZSlcbiAgICAgIH0sXG4gICAgICByZXNvbHZlOiB7XG4gICAgICAgIGFsaWFzOiB7XG4gICAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLicpLFxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgYnVpbGQ6IHtcbiAgICAgICAgb3V0RGlyOiAnZGlzdCcsXG4gICAgICAgIG1pbmlmeTogIWlzRGV2LFxuICAgICAgICBzb3VyY2VtYXA6IGlzRGV2LFxuICAgICAgICB0YXJnZXQ6ICdlczIwMjAnLFxuICAgICAgICBjc3NDb2RlU3BsaXQ6IGZhbHNlLFxuICAgICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgICAgaW5wdXQ6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdpbmRleC50c3gnKSxcbiAgICAgICAgICBvdXRwdXQ6IHtcbiAgICAgICAgICAgIGZvcm1hdDogJ2lpZmUnLFxuICAgICAgICAgICAgZW50cnlGaWxlTmFtZXM6ICdwb3B1cC5qcycsXG4gICAgICAgICAgICBjaHVua0ZpbGVOYW1lczogJ3BvcHVwLVtoYXNoXS5qcycsXG4gICAgICAgICAgICBhc3NldEZpbGVOYW1lczogKGFzc2V0SW5mbykgPT4ge1xuICAgICAgICAgICAgICBpZiAoYXNzZXRJbmZvLm5hbWU/LmVuZHNXaXRoKCcuY3NzJykpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3BvcHVwLmNzcyc7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuICdbbmFtZV0uW2V4dF0nO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGlubGluZUR5bmFtaWNJbXBvcnRzOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgZXNidWlsZDoge1xuICAgICAgICBkcm9wOiBpc0RldiA/IFtdIDogWydjb25zb2xlJywgJ2RlYnVnZ2VyJ10sXG4gICAgICB9LFxuICAgICAgc2VydmVyOiB7XG4gICAgICAgIGZzOiB7XG4gICAgICAgICAgY2FjaGVkQ2hlY2tzOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgb3BlbjogJy9pbmRleC5odG1sJyxcbiAgICAgICAgcG9ydDogNTE3MyxcbiAgICAgICAgaG9zdDogdHJ1ZSxcbiAgICAgIH1cbiAgICB9O1xufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUFxTyxPQUFPLFVBQVU7QUFDdFAsU0FBUyxjQUFjLGVBQWU7QUFDdEMsT0FBTyxXQUFXO0FBQ2xCLFNBQVMsc0JBQXNCO0FBSC9CLElBQU0sbUNBQW1DO0FBS3pDLElBQU8sNEJBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxNQUFNO0FBQ3RDLFFBQU0sTUFBTSxRQUFRLE1BQU0sS0FBSyxFQUFFO0FBQ2pDLFFBQU0sUUFBUSxTQUFTO0FBRXZCLFNBQU87QUFBQSxJQUNMLFNBQVM7QUFBQSxNQUNQLE1BQU07QUFBQSxNQUNOLGVBQWU7QUFBQSxRQUNiLFNBQVM7QUFBQSxVQUNQO0FBQUEsWUFDRSxLQUFLO0FBQUEsWUFDTCxNQUFNO0FBQUEsVUFDUjtBQUFBLFVBQ0E7QUFBQSxZQUNFLEtBQUs7QUFBQSxZQUNMLE1BQU07QUFBQSxVQUNSO0FBQUEsVUFDQTtBQUFBLFlBQ0UsS0FBSztBQUFBLFlBQ0wsTUFBTTtBQUFBLFlBQ04sUUFBUTtBQUFBLFVBQ1Y7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsUUFBUTtBQUFBLE1BQ04sOEJBQThCLEtBQUssVUFBVSxJQUFJLGNBQWM7QUFBQSxNQUMvRCx3QkFBd0IsS0FBSyxVQUFVLElBQUk7QUFBQSxJQUM3QztBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsR0FBRztBQUFBLE1BQ2xDO0FBQUEsSUFDRjtBQUFBLElBQ0EsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLE1BQ1IsUUFBUSxDQUFDO0FBQUEsTUFDVCxXQUFXO0FBQUEsTUFDWCxRQUFRO0FBQUEsTUFDUixjQUFjO0FBQUEsTUFDZCxlQUFlO0FBQUEsUUFDYixPQUFPLEtBQUssUUFBUSxrQ0FBVyxXQUFXO0FBQUEsUUFDMUMsUUFBUTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1IsZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCLENBQUMsY0FBYztBQUM3QixnQkFBSSxVQUFVLE1BQU0sU0FBUyxNQUFNLEdBQUc7QUFDcEMscUJBQU87QUFBQSxZQUNUO0FBQ0EsbUJBQU87QUFBQSxVQUNUO0FBQUEsVUFDQSxzQkFBc0I7QUFBQSxRQUN4QjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsSUFDQSxTQUFTO0FBQUEsTUFDUCxNQUFNLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxVQUFVO0FBQUEsSUFDM0M7QUFBQSxJQUNBLFFBQVE7QUFBQSxNQUNOLElBQUk7QUFBQSxRQUNGLGNBQWM7QUFBQSxNQUNoQjtBQUFBLE1BQ0EsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBQ0osQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
