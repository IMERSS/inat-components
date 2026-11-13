# @imerss/inat-components

The [inat-components repo](https://github.com/IMERSS/inat-components) contains some pre-built React components to
display iNaturalist data on your own sites. The original goal was to add an 
[interactive page to the BC Lepidoptera website](https://bcleps.weebly.com/inat.html) so visitors could see some
high-level information about lepidoptera (butterflies and moths) spotted in British Columbia. But the code
was written to allow it to be re-used by any website and for any taxon or place.

This package holds the React components, with their typings, and `dist/standalone.min.js`, a single script holding
the components and React together, for sites which don't use React.

```
npm install @imerss/inat-components
```

```jsx
import TaxonPanel from "@imerss/inat-components";

<TaxonPanel
    taxon={{ id: 47157, str: "leps" }}
    place={{ id: 7085, str: "bc" }}
    dataSource="url"
    dataSourceBaseUrl="https://example.org/inat"
    features={[{ feature: "recentObservations" }, { feature: "commonTaxa" }, { feature: "favourites" }, { feature: "stats" }]}
/>
```

See the [main documentation](https://github.com/IMERSS/inat-components) for every setting, the individual components,
the data files which [@imerss/inat-components-utils](https://www.npmjs.com/package/@imerss/inat-components-utils)
writes for the `"url"` data source, and the
[standalone version](https://github.com/IMERSS/inat-components/tree/main/packages/inat-components-standalone).
