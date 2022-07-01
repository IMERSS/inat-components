import {render} from '@testing-library/react';

import { CommonTaxa } from '../common-taxa';

const defaultProps = {
	year: 2022
};

describe('CommonTaxa', () => {
	it('should render successfully', () => {
		const {baseElement} = render(<CommonTaxa {...defaultProps} />);
		expect(baseElement).toBeTruthy();
	});
});
