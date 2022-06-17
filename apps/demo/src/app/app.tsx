import {useState} from "react";
import TaxonPanel, {DataSource} from "@imerss/inat-components";
import SettingsRow from "./settings-row/settings-row";
import config from "../../inat.config.json";
import "./app.module.scss";

console.log({ config });

const App = () => {
	const [taxonId, setTaxonId] = useState(config.taxa[0].taxonId);
	const [placeId, setPlaceId] = useState(config.places[0].placeId);
	const [dataSource, setDataSource] = useState(DataSource.autoLoad);

	return (
		<>
			<SettingsRow
				taxonId={taxonId}
				onChangeTaxon={setTaxonId}
				placeId={placeId}
				onChangePlace={setPlaceId}
				dataSource={dataSource}
				onChangeDataSource={setDataSource}
				config={config}
			/>
			<TaxonPanel
				taxonId={taxonId}
				placeId={placeId}
				dataSource={dataSource}
				features={config.features}
				sourceFolder="http://localhost:7777"
			/>
		</>
	);
}

export default App;
