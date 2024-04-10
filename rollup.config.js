import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import image from '@rollup/plugin-image';
import { string } from "rollup-plugin-string";
import terser from '@rollup/plugin-terser';
import pkg from './package.json';

const CONFIGURATIONS = [];

const PLUGINS_COMMON = [
    resolve(), // so Rollup can find libraries
    commonjs(), // so Rollup can convert libraries to an ES modules

    image({
        include: [
            "**/assets/**.png",
            "**/assets/**.jpg",
        ],
        exclude: []
    }),
    string({
        include: [
            "**/assets/*.svg",
            "**/assets/*.csv",
        ],
        exclude: []
    })
];

const PLUGINS_MIN = [
    terser({
        sourceMap: true,
        format: {
            comments: false
        }
    })
];

const OUTPUTS = [
    {
        // browser-friendly UMD build
        name: 'SandSagaScenarioBuilder',
        file: `dist/sand-saga_community_${pkg.scenario}.umd.js`,
        format: 'umd',
        sourcemap: true,
    },
    {
        // browser-friendly UMD build, MINIMIZED
        name: 'SandSagaScenarioBuilder',
        file: `dist/sand-saga_community_${pkg.scenario}.umd.min.js`,
        format: 'umd',
        sourcemap: true,
        plugins: PLUGINS_MIN
    }
]

CONFIGURATIONS.push({
    input: `src/main.js`,
    plugins: PLUGINS_COMMON,
    output: OUTPUTS
});

export default CONFIGURATIONS;
