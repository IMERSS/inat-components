## inat-components

> Currently in development. 

This repo contains some prebuilt React components to display iNaturalist data. The 
original purpose was to provide some interactive info for the BC Lepidoptera website, 
but it was written in a generic way to allow it being used by any website.

This repo stores both the component code themselves (soon to be published to npm) andthe backend scripts to scrape iNat 
data and store them in JSON files for consumption by the front-end. Typically you don't want to ping iNat on every 
request to display the data: it's slow and would hammer their servers unnecessarily. The 


### Features:
 
- Written in Typescript with well-defined typings for components and interfaces.
- Generic. Can display information for any taxon and any place. 
- Three choices of data source:
  1. feed JSON data to components via prop
  2. ping an external cached data source (recommended)
  3. ping iNaturalist API directly (not recommended)
-

### Available components 

We'll go into details about each of these components below, but here's what's available. 

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

