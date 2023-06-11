### Publishing new versions

Here's how to publish a new version of this package.

1. Go to the root of the monorepo and run `yarn install`, then `yarn boot`
2. Update the version in `packages/inat-component`'s package.json
3. Run `yarn build` to generate a fresh `/dist` folder (you can clean first, but the clean command currently also
deletes __shared, so you'll need to rebuild from the root if you do that)

Step 3 actually generates + copies over the result from the inat-components-standalone package, so in the dist folder 
you should see a standalone.min.js file. All is good! 

Now you can `npm publish`.
