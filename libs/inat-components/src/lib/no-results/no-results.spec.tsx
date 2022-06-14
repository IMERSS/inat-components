import { render } from '@testing-library/react';

import NoResults from './no-results';

describe('NoResults', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<NoResults />);
    expect(baseElement).toBeTruthy();
  });
});
