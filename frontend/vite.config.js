import { defineConfig } from 'vite'
// import { injectHtml } from 'vite-plugin-html';
import react from '@vitejs/plugin-react'
// import * as path from 'path'
const path = require('path')
export default defineConfig({
  plugins: [
    react()
    // html-webpack-plugin -> vite-plugin-html
    // 在 CRA 中使用 html-webpack-plugin 調整 HTML 文件，
    // vite 可以透過 vite-plugin-html 調整 HTML 文件
    // injectHtml({
    //   data: {
    //     htmlWebpackPlugin: {
    //       options: {
    //         mayVar: 'variable',
    //       },
    //     },
    //   },
    // }),
  ],

  //  webpack.alias -> resolve.alias
  // CRA 中 alias 在 webpack 下，vite 在 resolve 下
  resolve: {
    // eslint-disable-next-line no-undef
    alias: {
      // eslint-disable-next-line no-undef
      '@/': path.resolve(__dirname, './src'),
      // eslint-disable-next-line no-undef
      '@/config': path.resolve(__dirname, './src/config'),
      // eslint-disable-next-line no-undef
      '@/components': path.resolve(__dirname, './src/components'),
      // eslint-disable-next-line no-undef
      '@/styles': path.resolve(__dirname, './src/styles'),
      // eslint-disable-next-line no-undef
      '@/utils': path.resolve(__dirname, './src/utils'),
      // eslint-disable-next-line no-undef
      '@/common': path.resolve(__dirname, './src/common'),
      // eslint-disable-next-line no-undef
      '@/assets': path.resolve(__dirname, './src/assets'),
      // eslint-disable-next-line no-undef
      '@/pages': path.resolve(__dirname, './src/pages'),
      // eslint-disable-next-line no-undef
      '@/routes': path.resolve(__dirname, './src/routes'),
      // eslint-disable-next-line no-undef
      '@/layouts': path.resolve(__dirname, './src/layouts'),
      // eslint-disable-next-line no-undef
      '@/hooks': path.resolve(__dirname, './src/hooks'),
      // eslint-disable-next-line no-undef
      '@/store': path.resolve(__dirname, './src/store')
    },
    extensions: ['.js', '.json', '.ts', '.tsx']
  },

  // webpack.DefinePlugin -> define
  // 有時候會透過 webpack.DefinePlugin 去設定一些全域的 replacement，vite 也可以設定。
  define: {
    __PAGE_TITLE__: JSON.stringify('標題')
  },

  server: {
    host: 'localhost',
    https: false,
    port: 8080,
    // http-proxy-middleware -> proxy
    // Cra 可以透過另外安裝套件 http-proxy-middleware
    // 來設置 proxy，vite 則是直接支援 proxy。
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  },

  build: {
    // 把輸出路徑設定成跟 CRA 相同的 `build/`
    outDir: 'build',

    // 在 vite 中，dev server 是不用額外配置多入口設定的，
    // 但 production build 還是 rollup 來完成，
    // 所以要另外設置 rollupOptions。
    rollupOptions: {
      input: {
        // eslint-disable-next-line no-undef
        popup: path.resolve(__dirname, 'index.html'),
        // eslint-disable-next-line no-undef
        content: path.resolve(__dirname, 'src/content.js')
      },
      output: {
        entryFileNames: 'static/js/[name].js'
      }
    }
  }
})
