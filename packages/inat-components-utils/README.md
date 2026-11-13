# @imerss/inat-components-utils

Writes the data files which the components of [@imerss/inat-components](https://github.com/IMERSS/inat-components)
read with their `"url"` data source. It requests each from iNaturalist's API in turn, a second apart to keep within
iNaturalist's limits, and writes it as a small JSON file holding just what the components show. See
[How it works](https://github.com/IMERSS/inat-components#how-it-works) for why.

## Usage

```
npm install @imerss/inat-components-utils
```

Write a short Node script, and run it on a schedule - e.g. every 10 or 15 minutes, with cron - so that the files stay
fresh. Write the files into a folder which your site serves, at the URL you give TaxonPanel as `dataSourceBaseUrl`.

```javascript
const { generate } = require("@imerss/inat-components-utils");

const config = {
    taxa: [{ id: 47157, str: "leps" }],
    places: [{ id: 7085, str: "bc" }],
    features: {
        recentObservations: { numResults: 100 },
        commonTaxa: { numResults: 100, numYears: 10 },
        favourites: { numResults: 100, numYears: 10 },
        stats: { numTopObservers: 10, numYears: 10 }
    }
};

generate(config, "/var/www/my-site/inat");
```

## The config

| Setting | Description |
| --- | --- |
| `taxa` | The taxa, each `{ id, str }`, as TaxonPanel's `taxon`. Files are written for each taxon in each place. |
| `places` | The places, each `{ id, str }`, as TaxonPanel's `place`. |
| `project` | Optional - `{ id, str }`, as TaxonPanel's `project`. It may stand in place of `taxa` and `places`, or be narrowed by each of them. |
| `features` | The settings of each feature, keyed by feature as above, or as the array of TaxonPanel's `features`, so that one config may serve both. |

The settings of each feature are those of TaxonPanel's, and each has its default there: `numResults` for all but
`stats`, `numYears` for all but `recentObservations`, and `numTopObservers` for `stats`. Files are written for every
feature, for all years together and for each of the last `numYears` years, matching the years which TaxonPanel offers.
Give each feature the same settings as your TaxonPanel, so that each tab finds the files it asks for.

The files' names are listed in
[the components' documentation](https://github.com/IMERSS/inat-components#the-data-files).

`generate` returns a promise which resolves once every file is written, and shows its progress on the console. A
file which could not be fetched is logged and skipped, leaving its previous version in place. The script was first
exported as `process`, which remains as another name for `generate`.
