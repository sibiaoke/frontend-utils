import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts', // 入口文件
      name: 'SibiaokeUtils', // 库的名字
      fileName: (format) => `sibiaoke-utils.${format}.js`
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['react', 'react-dom', 'ky', 'vue'],
      output: {
        // 全局变量名称，和 external 选项配合使用
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          vue: 'Vue',
          ky: 'ky',
        }
      }
    }
  },
  plugins: [
    dts({
      tsconfigPath: './tsconfig.json',
      exclude: ['src/tests/**/*', 'src/mocks/**/*']
    })
  ]
});
