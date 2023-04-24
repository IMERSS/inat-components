import { useState } from "react";
import TaxonPanel, { DataSource, DataSourceEnum } from "@imerss/inat-components";
import SettingsRow from "./settings-row/settings-row";
import "./app.module.scss";
const config = require("../inat.config.json");


const App = () => {
	const [taxonId, setTaxonId] = useState(config.taxa[0].id);
	const [placeId, setPlaceId] = useState(config.places[0].id);
	const [dataSource, setDataSource] = useState<DataSource>(DataSourceEnum.autoLoad);
	const [itemWidth, setItemWidth] = useState(180);
	const taxon = config.taxa.find((t: any) => t.id === taxonId) as any;
	const place = config.places.find((p: any) => p.id === placeId) as any;

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
