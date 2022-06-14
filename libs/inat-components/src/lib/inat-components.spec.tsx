import { render } from '@testing-library/react';

import InatComponents from './inat-components';

describe('InatComponents', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<InatComponents />);
    expect(baseElement).toBeTruthy();
  });
});
