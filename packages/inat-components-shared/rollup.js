/*
 * Rollup settings for a package which bundles @imerss/inat-components-shared, imported into its rollup.config.js.
 *
 * This package is never published, so a package's bundle and its typings must hold its code rather than import it.
 * In the JavaScript build, @rollup/plugin-typescript resolves "@imerss/inat-components-shared" to its source through
 * the "paths" of tsconfig.base.json. Those paths also stop TypeScript treating the source as an external library, which
 * it would decline to compile. rollup-plugin-dts doesn't follow them, and needs inlineShared.
 * The paths here are relative to the package being built, a sibling of this one, from whose folder Rollup is run.
 */

import path from "path";

const sharedName = "@imerss/inat-components-shared";

/**
 * The shared sources, to add to @rollup/plugin-typescript's `include`, which by default compiles only the files within
 * the package being built.
 */
export const sharedSources = "../inat-components-shared/src/**/*.ts";

/**
 * A Rollup plugin resolving imports of the shared package to its source, so that rollup-plugin-dts bundles its
 * typings, rather than leaving the published typings importing a package which is never published. Place it before
 * dts().
 * @return {Object} The plugin
 */
export const inlineShared = function () {
    return {
        name: "inline-inat-components-shared",
        resolveId: function (source) {
            return source === sharedName ? path.resolve("../inat-components-shared/src/index.ts") : null;
        }
    };
};
