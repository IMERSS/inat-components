import React from 'react';
import ReactDOM from 'react-dom/client';
import TaxonPanel, { DataSource } from '@imerss/inat-components';
import config from './inat.config.json';

const root = ReactDOM.createRoot(document.getElementById('inat-components') as HTMLElement);
root.render(
	<TaxonPanel
		taxonId={config.taxa[0].taxonId}
		placeId={config.places[0].placeId}
		dataSource={DataSource.url}
		config={config}
		baseUrl="http://sisyphean.ca/inat"
		itemWidth={180}
		classes={{
			tabs: "inat-tabs",
			yearsDropdown: "inat-years-dropdown",
			pageHeadings: "inat-page-headings",
			observationLabelTitle: "inat-observation-label-title",
			observationLabelDate: "inat-observation-label-data",
			observationLabelName: "inat-observation-label-name",
			observersList: "inat-observers-list",
			statsCountSummary: "inat-stats-count-summary",
			tabDesc: "inat-tab-desc"
		}}
		tabDescs={{
			recentDesc: "This dpage lists the most recent butterfly and moth observations made in BC. Click on any of them to go to the inaturalist site for more information.",
			mostCommonDesc: "This page lists the most commonly reported species in BC. You can use the dropdown at the top right to filter the results to a particular year.",
			mostFavouritedDesc: "Any time iNaturalist users encounter an observation they like, they can choose to \"favourite\" it. This page lists the most favourited moth and butterfly observations made in BC."
		}}
	/>
);