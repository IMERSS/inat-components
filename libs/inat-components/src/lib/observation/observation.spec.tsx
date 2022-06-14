import { render } from '@testing-library/react';

import Observation from './observation';

describe('Observation', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Observation />);
    expect(baseElement).toBeTruthy();
  });
});
