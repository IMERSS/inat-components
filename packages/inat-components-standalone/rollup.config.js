import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonJS from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import json from "@rollup/plugin-json";
import postcss from "rollup-plugin-postcss";
import { terser } from "rollup-plugin-terser";

export default [
    {
        input: "src/index.tsx",
        output: {
            file: "dist/standalone.min.js",
            format: "es",
            compact: true // does make it a bit smaller...
        },
        plugins: [
            // these two plugins ensure all dependencies are also included as part of the single generated standalone.min.js file
            resolve({
                browser: true
            }),
            commonJS({
                include: [
                    // 'node_modules/**',
                    // 'node_modules/react-dom/client',
                    // 'node_modules/isomorphic-unfetch'
                ]
            }),
            // this ensures react (and maybe other libs) get their smaller prod bundles included + not the dev code
            replace({
                'process.env.NODE_ENV': JSON.stringify('production')
            }),
            postcss({
                modules: true,
                plugins: []
            }),
            typescript(),
            json(),
            terser()
            // visualizer()
        ]
    }
];
