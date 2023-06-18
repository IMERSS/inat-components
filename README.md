# inat-components

This repo contains some pre-built React components to display iNaturalist data on your own sites. The original goal was to
provide add an [interactive page to the BC Lepidoptera website](https://bcleps.weebly.com/inat.html) so visitors could 
see some high-level information about lepidoptera (butterflies and moths) spotted in British Columbia. But the code 
was written to allow it to be re-used by any website and for any taxon or place.

This repo stores both the components themselves (published to npm under `@imerss/inat-components`) and the backend
scripts to scrape iNat data and store it in JSON files for use by the front-end components (`@imerss/inat-components-utils`).
See below for an explanation of why that's necessary.

You have a choice with the front-end components to display any of four pieces of information:
- recent observations
- common taxa
- most favourited
- general summary (graph)

The main TaxonPanel component displays the information in tabbed format. Everything from text, labels and styles can be
customized, including which tabs appear.

### Demo

- Simple: https://imerss.github.io/inat-components/
- Live example: https://bcleps.weebly.com/inat.html


### How it works

![diagram](./resources/images/flow-diagram.png)

1. iNaturalist stores all the of the data about observations, taxonomy, observers and so on. They kindly provide a 
[public API](https://api.inaturalist.org/v1/docs/) (Application Programming Interface) to allow developers to request
data programmatically. The inat-components repo relies on that API to request the data that you need.
2. In between the iNat API and your own website is a script (`@imerss/inat-components-utils`) that does the job of calling
iNat and storing the data you want into separate data files. This code can run wherever you want - your own website 
is probably the most convenient. But wherever it is, it has to put the data files in a place that can be called by a
website (i.e. an http/https location).
3. The front-end code running on your website then makes requests to the data files. They are designed to be as small 
as possible and contain the minimal amount of data needed. This ensures the requests are as quick as possible so the 
user viewing your site doesn't have to wait. 

_Why the need for #2? Why not just call the iNat API from your own website?_ A few reasons: 
- First it's slow. The iNaturalist server has to do a lot of work on their end to retrieve the information for each API request. 
- Secondly, the response will contain a ton of information you don't need. 
- Lastly, iNaturalist limits the number of times you can make requests to their server per second, so they would be likely 
to shut down your access to their API.

### Installation

To use the components in your React code, just use npm, pnpm or yarn - whatever package manager you want. 

```
npm install @imerss/inat-components
pnpm install @imerss/inat-components
yarn add @imerss/inat-components
```

### Features:

- Written in Typescript with typings for components and interfaces.
- Generic. Can display information for any taxon and any place.
- Three choices of data source:
    1. feed JSON data to components via prop (requires you to generate the data)
    2. ping an external cached data source (recommended - this lib contains a tool to generate that data for you)
    3. ping iNaturalist API directly (not recommended, but handy for local development)
- Default styling provided, but you can override anything you want.
- Option to customize the labels of the various components, plus overwrite the loader.


### Available components

We'll go into details about each of these components below, but here's what's available.

`<TaxonPanel />`

This is a pre-built panel containing all visualization data available, grouped into tabs: recent observations, common
taxa, favourites and a summary tab. You get less control using this component than all the others below, but it means
you don't have to write any code.

`<RecentObservations />`

This component shows a grid of recent observations made within a particular taxon. Since the purpose of this is to
show _recent_ sightings, you'll want the data source refreshed fairly frequently, e.g. every 10 or 15 minutes.

`<CommonTaxa />`

This component shows a grid of the most common taxa within a particular taxon, place and time period, e.g. the most
common beetles spotted in Canada in the current year.

`<Favourites />`

This component shows a grid of the most common taxa within a particular taxon, place and time period, e.g. the most
common beetles spotted in Canada in the current year.

`<Summary />`

This shows a high-level summary of the selected taxon and place. It shows information such as total number of
observations, total number of observers, a histogram of data observations per month, top observers, total number of
species and observation/species counts of the next taxonomical sub-level, e.g. if you specified an Order as the primary
taxon ID, it would provide family-level stats (Kingdom -> Phylum -> Class -> Order -> Family -> Genus -> Species).


## Local dev env

### Demo code 

Let's start with running your local dev environment. To run the demo application, do this:

- check out this repo and navigate to the root folder in your terminal, then run:
- `nvm install` (or `nvm use`) to get the right node version
- `yarn install`
- `yarn boot`
- `yarn build`
- `yarn dev`

That'll open up a browser in dev mode where you can play around with the code and see how it works. It's loading the
content of `apps/demo`.

> Please note that due to an issue with [Rollup](https://github.com/rollup/plugins/issues/1466), shared code between 
the `inat-components` and `inat-components-utils` packages (found in the `/packages` folder) is actually stored in the
root `shared/` folder. That is copied into 2 separate `src/__shared/` folders within each package during dev mode, so 
don't edit the code there! Always edit the code in the root shared/ folder or your changes will be lost. Does this suck?
Yes it does.

### Standalone version

A second way to run things locally is with the _standalone_ version. This is actually just a simple, single HTML page
that links to a standalone version of the script (a single JS file, pre-bundled with everything you need). You can
then use simple JS + CSS to pass in whatever values you need to configure the application. For more information 
[see the package documentation](./packages/inat-components-standalone/README.md).

## Changelog

#### @imerss/inat-components

- `2.0.1` - Jun 17th 2022, doc updates.
- `2.0.0` - Jun 17th 2022, misc updates and new standalone.min.js added to `/dist`.
- `1.1.2` - Aug 6th 2022, initial version.

#### @imerss/inat-components-utils

- `1.1.2` - Aug 6th 2022, initial version.
