import { useState } from "react";
import TaxonPanel, { DataSource } from "@imerss/inat-components";
import SettingsRow from "./settings-row/settings-row";
import "./app.module.scss";
import { ItemConfig } from "../../../../shared";

const config = {
	taxa: [
		{ title: "Butterflies and moth", id: 47157, str: "leps" },
		// { title: "Beetles", id: 47208, str: "beetles" },
		// { title: "Birds", id: 3, str: "birds" }
	],
	places: [
		{ title: "BC", id: 7085, str: "bc" },
		// { title: "Alberta", id: 6834, str: "alberta" }
	],
	features: {
		recentObservations: {
			numResults: 100
		},
		commonTaxa: {
			numResults: 100,
			numYears: 10
		},
		favourites: {
			numResults: 100,
			numYears: 10
		},
		stats: {
			numTopObservers: 10
		}
	}
};

const App = () => {
	const [taxonId, setTaxonId] = useState(config.taxa[0].id);
	const [placeId, setPlaceId] = useState(config.places[0].id);
	const [dataSource, setDataSource] = useState(DataSource.autoLoad);
	const [itemWidth, setItemWidth] = useState(180);

	const taxon = config.taxa.find((t) => t.id == taxonId) as ItemConfig;
	const place = config.places.find((p) => p.id == placeId) as ItemConfig;

	return (
		<>
			<SettingsRow
				taxonId={taxonId}
				onChangeTaxon={setTaxonId}
				placeId={placeId}
				onChangePlace={setPlaceId}
				dataSource={dataSource}
				onChangeDataSource={setDataSource}
				itemWidth={itemWidth}
				onChangeItemWidth={setItemWidth}
				taxa={config.taxa}
				places={config.places}
			/>
			<TaxonPanel
				taxon={{ id: taxon.id, str: taxon.str }}
				place={place}
				dataSource={dataSource}
				itemWidth={itemWidth}
				baseUrl="https://sisyphean.ca/inat"
				classes={{
					pageHeadings: "page-headings",
					tabDesc: "inat-tab-desc",
					observationLabelTitle: "obs-title",
					recentObservationsPanel: "recentObservationsPanel",
					commonTaxaPanel: "commonTaxaPanel",
					favouritesPanel: "favouritesPanel",
					statsPanel: "statsPanel",
				}}
				tabDescs={{
					recentDesc: "This page lists recent observations.",
					mostCommonDesc: "These are the most common species.",
					mostFavouritedDesc: "These are the most favourited observations.",
					generalStatsDesc: ""
				}}
			/>
		</>
	);
}

export default App;
