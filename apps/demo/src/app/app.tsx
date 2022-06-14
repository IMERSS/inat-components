import {useState} from "react";
import TaxonPanel, {DataSource} from "@imerss/inat-components";
import SettingsRow from "./settings-row/settings-row";
import * as C from "./constants";
import "./app.module.scss";

export function App() {
	const [taxonId, setTaxonId] = useState(C.DEFAULT_TAXON_ID);
	const [placeId, setPlaceId] = useState(C.DEFAULT_PLACE_ID);
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
			/>
			<TaxonPanel
				taxonId={taxonId}
				placeId={placeId}
				dataSource={dataSource}
			/>
		</>
	);
}

export default App;
