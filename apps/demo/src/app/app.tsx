import { useState } from "react";
import TaxonPanel, { DataSource, DataSourceEnum } from "@imerss/inat-components";
import SettingsRow from "./settings-row/settings-row";
import "./app.module.scss";

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
			numResults: 100,
			desc: "This page lists recent observations.",
			className: "recentObservationsPanel"
		},
		commonTaxa: {
			numResults: 100,
			numYears: 10,
			desc: "These are the most common species.",
			className: "commonTaxaPanel"
		},
		favourites: {
			numResults: 100,
			numYears: 10,
			desc: "These are the most favourited observations.",
			className: "favouritesPanel",
		},
		stats: {
			numTopObservers: 10,
			className: "statsPanel",
		}
	}
};

const App = () => {
	const [taxonId, setTaxonId] = useState(config.taxa[0].id);
	const [placeId, setPlaceId] = useState(config.places[0].id);
	const [dataSource, setDataSource] = useState<DataSource>(DataSourceEnum.autoLoad);
	const [itemWidth, setItemWidth] = useState(180);
	const taxon = config.taxa.find((t) => t.id === taxonId) as any;
	const place = config.places.find((p) => p.id === placeId) as any;

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
				taxon={taxon}
				place={place}
				dataSource={dataSource}
				dataSourceBaseUrl="https://sisyphean.ca/inat"
				itemWidth={itemWidth}
				features={config.features}
				generalClasses={{
					pageHeadings: "page-headings",
					tabDesc: "inat-tab-desc",
					observationLabelTitle: "obs-title",
				}}
			/>
		</>
	);
}

export default App;
