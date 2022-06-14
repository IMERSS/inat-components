import { render } from '@testing-library/react';

import CommonTaxa from './common-taxa';

describe('CommonTaxa', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<CommonTaxa />);
    expect(baseElement).toBeTruthy();
  });
});
