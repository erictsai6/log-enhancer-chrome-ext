// rollup.config.js
import typescript from "@rollup/plugin-typescript";
import vuePlugin from "rollup-plugin-vue";
import resolve from "rollup-plugin-node-resolve";
import commonJS from "rollup-plugin-commonjs";
import alias from '@rollup/plugin-alias';


export default {
  input: "src/content/main.js",
  output: {
    file: 'dist/main.js',
    format: "iife",
  },
  plugins: [        
    alias({
			// resolve: [ '.js', '.ts' ],
			entries: [
				{ find: 'vue', replacement: 'node_modules/vue/dist/vue.runtime.esm-browser.js' }
			]
    }),

    // typescript({ lib: ["es5", "es6", "dom"], target: "es6" }),
    resolve({
      browser: true,
    }),
    commonJS(),
    vuePlugin({
      css: true,
      target: 'browser',
    }),
    // vuePlugin(),    
  ],
};
