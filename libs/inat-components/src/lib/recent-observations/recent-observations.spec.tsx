import {render} from '@testing-library/react';
import {RecentObservations} from './recent-observations';

describe('RecentObservations', () => {
	it('should render successfully', () => {
		const {baseElement} = render(<RecentObservations/>);
		expect(baseElement).toBeTruthy();
	});
});
