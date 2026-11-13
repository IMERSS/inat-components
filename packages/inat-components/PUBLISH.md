### Publishing new versions

Here's how to publish a new version of this package.

1. Go to the root of the monorepo and run `npm install`
2. Update the version in `packages/inat-component`'s package.json
3. Run `npm run build` to generate a fresh `/dist` folder (run `npm run clean` first to be sure of one)

Step 3 actually generates + copies over the result from the inat-components-standalone package, so in the dist folder 
you should see a standalone.min.js file. All is good! 

Now you can `npm publish`.
