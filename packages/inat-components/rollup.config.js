// import * as react from 'react';
// import * as reactDom from 'react-dom';
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonJS from "@rollup/plugin-commonjs";
import replace from "@rollup/plugin-replace";
import json from "@rollup/plugin-json";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";
// import { visualizer } from "rollup-plugin-visualizer";

export default [

    // front-end components + generate() node utils method, exposed as "@imerss/inat-components"
    {
        input: "src/index.ts",
        output: {
            dir: "dist",
            format: "es"
        },

        // these let's rollup know that these are external scripts + can be excluded from the final bundle without
        // any warnings. TODO: check these are peer deps.
        external: [
            "react",
            "fs",
            "react-charts",
            "date-fns",
            "react-spinners",
            "react-spinners/MoonLoader.js",
            "isomorphic-unfetch",
            "react/jsx-runtime"
        ],
        plugins: [
            postcss({
                modules: true,
                plugins: []
            }),
            typescript()
        ],
    },

    // the standalone version of the script
    {
        input: "src/standalone.tsx",
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
    },

    // not beautiful, but rolls up all typings for export
    {
        input: "src/index.ts",
        output: {
            dir: "dist",
            format: "es"
        },
        plugins: [
            dts()
        ]
    }
];
