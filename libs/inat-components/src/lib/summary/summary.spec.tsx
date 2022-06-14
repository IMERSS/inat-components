import { render } from '@testing-library/react';

import Summary from './summary';

describe('Summary', () => {
  it('should render successfully', () => {
    const { baseElement } = render(< Summary />);
    expect(baseElement).toBeTruthy();
  });
});
