import {render} from '@testing-library/react';

import {Summary} from './summary';
import {DataSource} from "@imerss/inat-components";

describe('Summary', () => {
	it('should render successfully', () => {
		const {baseElement} = render(<Summary placeId={1} taxonId={1} source={DataSource.url} year={2020} />);
		expect(baseElement).toBeTruthy();
	});
});
