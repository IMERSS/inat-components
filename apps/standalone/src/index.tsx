import React from 'react';
import ReactDOM from 'react-dom/client';
import TaxonPanel from '@imerss/inat-components';
import taxonPanelProps from './inat.config';

const root = ReactDOM.createRoot(document.getElementById('inat-components') as HTMLElement);
root.render(
	<TaxonPanel
		{...taxonPanelProps}
	/>
);
