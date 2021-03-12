// rollup.config.js
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/content.ts',
  output: {
    dir: 'dist'
  },
  plugins: [
    typescript({lib: ["es5", "es6", "dom"], target: "es6"})
  ],
};
