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

    // rolls up all typings for export
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
