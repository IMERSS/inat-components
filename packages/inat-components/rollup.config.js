import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";

export default [

    // front-end components + generate() node utils method, exposed as "@imerss/inat-components"
    {
        input: "src/index.ts",
        output: {
            dir: "dist",
            format: "es"
        },
        external: [
            "react"
        ],
        plugins: [
            postcss({
                modules: true,
                plugins: []
            }),
            typescript()
        ]
    },

    // the standalone version of the script
    // {
    //     input: "src/standalone.tsx",
    //     output: {
    //         dir: "dist",
    //         format: "cjs"
    //     },
    //     external: [
    //         "react"
    //     ],
    //     plugins: [
    //         postcss({
    //             modules: true,
    //             plugins: []
    //         }),
    //         typescript()
    //     ]
    // },

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
