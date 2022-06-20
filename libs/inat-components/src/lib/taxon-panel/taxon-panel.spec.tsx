import {render} from '@testing-library/react';

import TaxonPanel from './taxon-panel';

describe('TaxonPanel', () => {
	it('should render successfully', () => {
		const {baseElement} = render(<TaxonPanel />);
		expect(baseElement).toBeTruthy();
	});
});
