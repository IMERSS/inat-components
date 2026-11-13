# Demo app 

This app provides a simple dev environment in which to play around with the `TaxonPanel` component of
`@imerss/inat-components`, choosing its data source, taxon, place and item width.


### How to run

In the root of the monorepo, run:

- `npm install`
- `npm run build`
- `npm run demo`

That starts a dev server for this app at `http://localhost:3000` and opens it in a browser. The app uses the built
packages in their `dist` folders, which `npm run demo` keeps rebuilding as their code changes, so the browser reloads
with each change.

### How to build

When you're done tinkering, run `npm run build` in the monorepo root. That builds `@imerss/inat-components` into
`packages/inat-components/dist`, together with the standalone script, `standalone.min.js`, which is built in
`packages/inat-components-standalone/build`, and `@imerss/inat-components-utils` into its own `dist`. 
