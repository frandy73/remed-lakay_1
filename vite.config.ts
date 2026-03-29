import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [
      react(), 
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['icon.png'],
        manifest: {
          name: 'Remèd Lakay',
          short_name: 'Remèd',
          description: 'Gid 100 plant medsin an Ayiti ak asistan AI Konpè Fèy',
          theme_color: '#556B2F',
          background_color: '#FFFDD0',
          display: 'standalone',
          icons: [
            {
              src: 'icon.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any maskable'
            }
          ]
        }
      })
    ],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.CHATPDF_API_KEY': JSON.stringify(env.CHATPDF_API_KEY),
      'process.env.CHATPDF_SOURCE_ID': JSON.stringify(env.CHATPDF_SOURCE_ID),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      port: 5173,
      host: '0.0.0.0',
      hmr: process.env.DISABLE_HMR !== 'true',
      proxy: {
        '/api/chatpdf': {
          target: 'https://api.chatpdf.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/chatpdf/, ''),
        },
      },
    },
  };
});
