import { InitStandalone } from "./types/standalone";
import TaxonPanel from "./components/taxon-panel/taxon-panel";
import { DataSource } from "../../../shared";

const initStandalone: InitStandalone = (id, props) => {
	return (
		<TaxonPanel
			taxonId={taxonId}
			placeId={placeId}
			dataSource={DataSource.url}
			config={config}
			itemWidth={itemWidth}
			baseUrl="https://sisyphean.ca/inat"
			classes={{}}
			tabDescs={{}}
		/>
	);
};

/*
inatComponents.initStandalone(
	'inat-components',
	{
		placeId: '...',
		placeStr: '', // blurgh.
		taxonId: '...'
		taxonStr: '',
		itemWidth: 180,
		baseUrl: '',
		classes: {},
		tabDesc: {},
	}
);
*/

// @ts-ignore
window.inatComponents = {
	initStandalone
};
