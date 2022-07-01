import {render} from '@testing-library/react';
import Tabs from '../tabs';
import {Tab} from "../../../index";

const defaultProps = {
	selectedTab: Tab.recent,
	onChangeTab: () => null,
	features: {}
};

describe('Tabs', () => {
	it('should render successfully', () => {
		const {baseElement} = render(<Tabs {...defaultProps} />);
		expect(baseElement).toBeTruthy();
	});
});
