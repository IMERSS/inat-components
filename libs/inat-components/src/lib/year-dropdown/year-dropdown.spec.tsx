import { render } from '@testing-library/react';

import YearDropdown from './year-dropdown';

describe('YearDropdown', () => {
  it('should render successfully', () => {
    const { baseElement } = render(< YearDropdown />);
    expect(baseElement).toBeTruthy();
  });
});
