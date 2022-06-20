# inat-components

> Currently in development!

This repo contains some prebuilt React components to display iNaturalist data. The goal was to provide some
interactive info for the [BC Lepidoptera](https://bcleps.weebly.com/) website so visitors could see some 
high-level information about lepidoptera (butterflies and moths) in British Columbia. But it was written in a generic
way to allow it being used by any website and for any taxon or place.

The purpose of these components is _not_ to be exhaustive. iNat contains a _huge_ amount of inforamtion about taxa,
observations, users and so forth. We're not trying to re-invent the wheel - just to provide a high-level view of the
data. For digging into the data, it's designed to link back to iNaturalist itself. As such, the data fed into the
front-end component listed below is quite limited.

This repo stores both the components themselves (published to npm under `@imerss/inat-components`) and the backend
scripts to scrape iNat data and store it in JSON files for use by the front-end components (`@imerss/inat-components-utils`).
Typically you don't want to ping iNat on every request to display the data: it's slow and would hammer their servers
unnecessarily. They also cap the number of times you can make requests to their server per second, so realistically
you'll have to set up the data scraping step for any non-trivial usage. The option to ping iNat directly from the
front-end components is really just supplied for developers so they can cut out the middle step during dev.


### Demo

> In development, but here's a sneak peak.
 
https://imerss.github.io/inat-components/


### Installation

To use the components, just use npm, pnpm or yarn - whatever you happen to be using.

```
npm install inat-components
pnpm install inat-components
yarn add inat-components
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

