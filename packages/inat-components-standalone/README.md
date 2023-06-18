# Standalone

The purpose of this private, non-published package is provide a way to generate a standalone version of the script:
i.e. the raw JS and CSS files that you can then copy for use on your own site.

All you need to do is download a JS file to your site, and add a script tag containing the configuration of whatever 
data you want to see. It will then automatically insert the code into your webpage at the appropriate location.


### Try it out locally

The simplest way to see how it works is to try it our with this code base. Here's how:

- check out this repo and navigate to the root folder in your terminal, then run:
- `nvm install` (or `nvm use`) to get the right node version
- `yarn install`
- `yarn boot`
- `yarn build`
- `yarn standalone`

That'll open up a browser window with a simple dev server running. It's loading this file in this package:
`./public/index.html`

You can just edit that file and refresh the page to see your changes.

Once you've edited the files to your satisfaction, you can just download the `standalone.min.js` file (also available
in the @imerss/inat-components package under `/dist/standalone.min.js`) and add your custom configuration. 
