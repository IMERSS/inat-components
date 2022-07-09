import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";

export default [
    {
        input: "src/utils.ts",
        output: {
            dir: "dist",
            format: "cjs"
        },
        external: [
            "react"
        ],
        plugins: [
            typescript(),
            commonjs() // TODO needed any more?
        ]
    }
];