import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import { createHtmlPlugin } from 'vite-plugin-html';
// https://vite.dev/config/
export default defineConfig({
    server: {
        port: 5173,
        proxy: {
            '/v1/api': {
                target: 'http://localhost:3052',
                changeOrigin: true,
            },
        },
    },
    plugins: [
        react(),
        tailwindcss(),
        ViteImageOptimizer({
            webp: { quality: 80 },
            jpg: { quality: 80 },
            png: { quality: 80 },
        }),
        createHtmlPlugin({
            minify: false,
        }),
    ],
    resolve: {
        alias: {
            '@': '/src',
            '@components': '/src/components',
            '@pages': '/src/pages',
            '@hooks': '/src/hooks',
            '@services': '/src/services',
            '@utils': '/src/utils',
            '@constants': '/src/constants',
            '@app-types': '/src/types',
            '@stores': '/src/stores',
            '@assets': '/src/assets',
            '@styles': '/src/styles',
            '@routes': '/src/routes',
            '@base': '/src/base',
            '@features': '/src/features',
        },
    },
});
