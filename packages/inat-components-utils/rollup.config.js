import typescript from "@rollup/plugin-typescript";
import commonjs from "@rollup/plugin-commonjs";
import {sharedSources} from "../inat-components-shared/rollup.js";

export default [
    {
        input: "src/utils.ts",
        output: {
            dir: "dist",
            format: "cjs"
        },
        external: [
            "react",
            "fs",
            "sleep-promise",
            "cli-progress",
            "isomorphic-unfetch",
            "date-fns"
        ],
        plugins: [
            typescript({include: ["src/**/*.ts", sharedSources]}),
            commonjs() // TODO needed any more?
        ]
    }
];
