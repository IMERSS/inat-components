# Standalone

> *** Note: this isn't published yet. It'll be in version 2.0.0 (aka 1.2.0).

The purpose of this (private, non-published) package is provide a way to generate a standalone version of the script:
i.e. the raw JS and CSS files that you can then copy for use on your own site.

To maximize re-usability, version 2.0.0 of this script separates the configuration settings from the code itself.
Here's how it all works.

TODO doc


### Try it out locally

Quick instructions to get it running:
- check out this repo and navigate to the root folder in your terminal, then run:
- `nvm install` (or `nvm use`) to get the right node version
- `yarn install`
- `yarn boot`
- `yarn build`
- `yarn standalone`

That'll open up a browser window with a simple dev server running. It's loading this file in this package:
`./public/index.html`

You can just edit that file and refresh the page to see your changes.
