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
	/>
);