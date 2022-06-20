import {render} from '@testing-library/react';
import {Observation} from './observation';

const defaultProps = {
	linkUrl: "",
	imageUrl: "",
};

describe('Observation', () => {
	it('should render successfully', () => {
		const {baseElement} = render(<Observation {...defaultProps}>test</Observation>);
		expect(baseElement).toBeTruthy();
	});
});
