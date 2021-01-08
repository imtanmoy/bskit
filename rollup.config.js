import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import typescript from 'rollup-plugin-typescript2';
import scss from 'rollup-plugin-scss';
import autoprefixer from 'autoprefixer';
import postcss from 'postcss';

import packageJson from './package.json';

export default {
    input: './src/index.tsx',
    output: [
        {
            file: packageJson.main,
            format: 'cjs',
            exports: 'named',
            sourcemap: true,
        },
        {
            file: packageJson.module,
            format: 'esm',
            exports: 'named',
            sourcemap: true,
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        commonjs(),
        typescript(),
        scss({
            processor: (css) =>
                postcss([autoprefixer])
                    .process(css)
                    .then((result) => result.css),
        }),
    ],
};
