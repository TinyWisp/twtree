import commonjs from '@rollup/plugin-commonjs'; // Convert CommonJS modules to ES6
import vue from 'rollup-plugin-vue'; // Handle .vue SFC files
import { babel } from '@rollup/plugin-babel';

export default {
    input: 'src/publish.js', // Path relative to package.json
    output: {
        name: 'twtree',
        exports: 'named',
    },
    plugins: [
        vue({
            css: true, // Dynamically inject css as a <style> tag
            compileTemplate: true, // Explicitly convert template to render function
        }),
        commonjs(),
        babel({ babelHelpers: 'runtime' }),
    ],
};
