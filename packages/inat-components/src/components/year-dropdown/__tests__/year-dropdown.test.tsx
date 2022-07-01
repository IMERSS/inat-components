import {render} from '@testing-library/react';
import YearDropdown from '../year-dropdown';

const defaultProps = {
	value: "1",
	onChange: () => null
};

describe('YearDropdown', () => {
	it('should render successfully', () => {
		const {baseElement} = render(<YearDropdown {...defaultProps} />);
		expect(baseElement).toBeTruthy();
	});
});
