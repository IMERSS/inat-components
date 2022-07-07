import typescript from "@rollup/plugin-typescript";

export default [
    {
        input: "src/utils.ts",
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
    }
];