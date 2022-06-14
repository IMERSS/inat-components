import { render } from '@testing-library/react';

import Favourites from './favourites';

describe('Favourites', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Favourites />);
    expect(baseElement).toBeTruthy();
  });
});
