import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";

export default [
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
            typescript()
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