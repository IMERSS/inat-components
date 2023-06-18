# Standalone

The purpose of this private, non-published package is provide a way to generate a standalone version of the script:
i.e. the raw JS and CSS files that you can then copy for use on your own site. You don't need to use React or worry
about builds or anything like that: you just add the JS file to your website somewhere, include it in your page and run
some JS to render your data.

The standalone JS code is found in the `@imerss/inat-components` package here: `dist/standalone.min.js`, but it's also 
generated locally in this package if you choose to run the script (see the next section).

### Try it out locally

- check out this repo and navigate to the root folder in your terminal, then run:
- `nvm install` (or `nvm use`) to get the right node version
- `yarn install`
- `yarn boot`
- `yarn build`
- `yarn standalone`

That'll open up a browser window with a simple dev server running. It's loading this file in this package:
`./public/index.html`

You can just edit that file and refresh the page to see your changes.

Once you've edited the files to your satisfaction, you can just download the `standalone.min.js` file (as mentioned, 
also available in the `@imerss/inat-components` npm package under `/dist/standalone.min.js`) and add your custom
configuration. 


### Example Setup 

The following code is similar to what you'll see in the `./public/index.html` file. It shows you how to include the file
and initialize the taxon panel in your web page. It also provides a few example styles in case you want to target specific 
DOM nodes.

```html
<html>
<head>
    <script src="./static/js/standalone.min.js"></script>
</head>
<body>

<div id="panel"></div>

<style>
    /* some general styles to make the page look less than awful */
    body {
        font-family: verdana;
        font-size: 12px;
    }

    /*
    This block provides an example of how to style the various elements. It's not intended to be pretty - it's just to
    give you an idea of how the styles can be applied. The classnames themselves are entirely up to you: just change them
    here and in the JS `generalClasses` configuration below.

    The component includes its own styles for some things to abstract away things like layout, positioning, and providing
    a few base styles so it doesn't look too awful out the box. So in a couple of cases you'll need to increase the
    specificity on your rule to overwrite what you need, as illustrated below.

    .inat-tabs li {
        color: red;
    }
    .inat-tabs li:nth-child(3) {
        color: white;
        background-color: green;
    }
    .inat-years-dropdown {
        border: 5px solid red;
    }
    h1.inat-page-headings {
        border-bottom: 6px solid pink;
    }
    .inat-observation-label-title {
        color: blueviolet;
    }
    .inat-observation-label-data {
        color: yellowgreen;
    }
    .inat-observation-label-name a {
        color: deeppink;
    }
    label.inat-observation-count {
        color: seagreen;
    }
    .inat-tab-desc {
        color: darkorange;
    }
    .inat-observers-list h3 {
        border-bottom: 4px solid orange;
    }
    .inat-stats-count-summary li {
        border-bottom: 4px solid lightblue;
    }
    */
</style>

<script>
    inatComponents.initTaxonPanel("panel", {
        // this'll probably be the trickiest bit for people. The standalone script *requires* you have a data source
        // set up containing the data you need. This example uses the data source for the BC Lepidopterist Guild site,
        // see the URL below. We have a script running on that server to auto-update those files. You'll need to do the
        // same. See the documentation on https://github.com/IMERSS/inat-components and specifically the
        // @imerss/inat-components-utils package
        taxon: {
            id: 47157,
            str: "leps"
        },
        place: {
            id: 7085,
            str: "bc"
        },
        dataSource: "url",
        dataSourceBaseUrl: "https://sisyphean.ca/inat",
        itemWidth: 180,

        // this controls which tabs appear in the interface. You can remove anything you don't want or re-order them.
        // if you only choose a single feature, the tabs won't appear.
        features: [
            {
                feature: "recentObservations",
                numResults: 100,
                desc: "This page lists the most recent butterfly and moth observations made in BC. Click on any of them to go to the inaturalist site for more information.",
            },
            {
                feature: "commonTaxa",
                numResults: 100,
                numYears: 10,
                desc: "This page lists the most commonly reported species in BC. You can use the dropdown at the top right to filter the results to a particular year."
            },
            {
                feature: 'favourites',
                numResults: 100,
                numYears: 10,
                desc: "Any time iNaturalist users encounter an observation they like, they can choose to \"favourite\" it. This page lists the most favourited moth and butterfly observations made in BC."
            },
            {
                feature: "stats",
                numTopObservers: 10,
                observersListClass: "inat-observers-list",
                statsCountSummaryClass: "inat-stats-count-summary",
            },
        ],
        generalClasses: {
            tabsElement: "inat-tabs",
            yearsDropdown: "inat-years-dropdown",
            pageHeadings: "inat-page-headings",
            observationLabelTitle: "inat-observation-label-title",
            observationLabelDate: "inat-observation-label-data",
            observationLabelName: "inat-observation-label-name",
            observationCount: "inat-observation-count",
            tabDesc: "inat-tab-desc"
        }
    });
</script>

</body>
</html>
```

### How do I use my own taxon + place information?

Ahh! That's the tricky part! See the [documentation in the root of this monorepo](https://github.com/IMERSS/inat-components/tree/main). 
You'll need to generate those files separately with the `@imerss/inat-components-utils` repo so they exist somewhere
on a website for this site to link to.
