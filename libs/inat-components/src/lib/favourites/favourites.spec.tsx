import {render} from '@testing-library/react';
import {Favourites} from './favourites';

const defaultProps = {
	year: 2022
};

describe('Favourites', () => {
	it('should render successfully', () => {
		const {baseElement} = render(<Favourites {...defaultProps} />);
		expect(baseElement).toBeTruthy();
	});
});
