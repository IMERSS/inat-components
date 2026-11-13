## Developer notes

### Getting started

1. Clone the repo
2. In the root folder, run `nvm install` to ensure you're running the compatible version of node (see NVM for more info on that command).
3. run `npm install`, which also links the packages of the monorepo together as npm workspaces
4. run `npm run build`

### The packages

The repo is an npm workspaces monorepo:

| Folder | Package | Published |
| --- | --- | --- |
| `packages/inat-components` | `@imerss/inat-components` - the React components, built with Rollup into `dist`, together with the standalone script | yes |
| `packages/inat-components-utils` | `@imerss/inat-components-utils` - the script writing the data files, built with Rollup into `dist` | yes |
| `packages/inat-components-shared` | `@imerss/inat-components-shared` - the API calls, typings and helpers which both of the above use | no - compiled into each of their bundles, see its `rollup.js` |
| `packages/inat-components-standalone` | builds `standalone.min.js`, the components bundled with React into one script, with webpack | no - copied into `@imerss/inat-components`'s `dist` |
| `apps/demo` | a demo app for trying out the components | no |

The standalone package and the demo app use the built packages, from their `dist` folders, so build the packages
before starting either of them.

### Commands

Run these in the root folder:

- `npm run build` - builds `@imerss/inat-components`, with the standalone script, and `@imerss/inat-components-utils`.
- `npm run clean` - deletes the packages' built files.
- `npm run demo` - starts the demo app in `apps/demo` at `http://localhost:3000`, with watchers that rebuild the packages as they change.
- `npm run dev` - starts the watchers alone.
- `npm run standalone` - builds the standalone script, and serves `packages/inat-components-standalone/public/index.html`
  at `http://localhost:8080`, opening it in your browser. Edits to that page are copied into the build as you make
  them - refresh the page to see them. Edits to the components need `npm run build`, and the command run again.
- `npm run generate` - writes the data files of the demo app's config, `apps/demo/src/inat.config.json`, into
  `apps/demo/public/source`, using `@imerss/inat-components-utils`.

### Publishing

See [PUBLISH.md](./packages/inat-components/PUBLISH.md). `@imerss/inat-components-utils` is published in the same way,
from its own folder, after `npm run build`. Update the changelog in the [README](./README.md) for each release.
