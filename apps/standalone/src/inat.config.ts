import { TaxonPanelProps } from "@imerss/inat-components/src";

const config: TaxonPanelProps = {
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
	features: {
		recentObservations: {
			numResults: 100,
			desc: "This page lists the most recent butterfly and moth observations made in BC. Click on any of them to go to the inaturalist site for more information.",
		},
		commonTaxa: {
			numResults: 100,
			numYears: 10,
			desc: "This page lists the most commonly reported species in BC. You can use the dropdown at the top right to filter the results to a particular year."
		},
		favourites: {
			numResults: 100,
			numYears: 10,
			desc: "Any time iNaturalist users encounter an observation they like, they can choose to \"favourite\" it. This page lists the most favourited moth and butterfly observations made in BC."
		},
		stats: {
			numTopObservers: 10,
			observersListClass: "inat-observers-list",
			statsCountSummaryClass: "inat-stats-count-summary",
		}
	},

	generalClasses: {
		tabsElement: "inat-tabs",
		yearsDropdown: "inat-years-dropdown",
		pageHeadings: "inat-page-headings",
		observationLabelTitle: "inat-observation-label-title",
		observationLabelDate: "inat-observation-label-data",
		observationLabelName: "inat-observation-label-name",
		tabDesc: "inat-tab-desc"
	}
}

export default config;
