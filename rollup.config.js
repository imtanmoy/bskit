import { babel } from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';
// import { terser } from 'rollup-plugin-terser';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';
import { DEFAULT_EXTENSIONS } from '@babel/core';

import packageJson from './package.json';

const extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx'];

const GLOBALS = {
    react: 'React',
    'react-dom': 'ReactDOM',
    'prop-types': 'PropTypes',
};

export default {
    input: './src/index.tsx',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
            globals: GLOBALS,
        },
        {
            file: packageJson.module,
            format: 'esm',
            exports: 'named',
            sourcemap: true,
            globals: GLOBALS,
        },
    ],
    external: Object.keys(packageJson.peerDependencies || {}),
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs({
            include: 'node_modules/**',
        }),
        typescript({
            typescript: require('typescript'),
            rollupCommonJSResolveHack: true,
            clean: true,
        }),
        babel({
            exclude: 'node_modules/**',
            // babelHelpers: 'bundled',
            // extensions: extensions,
            // include: ['src/**/*'],
        }),
        scss({
            processor: (css) =>
                postcss([autoprefixer])
                    .process(css)
                    .then((result) => result.css),
        }),
        // terser(),
    ],
};
