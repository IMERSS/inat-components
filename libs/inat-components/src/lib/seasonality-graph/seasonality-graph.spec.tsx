import { render } from '@testing-library/react';

import SeasonalityGraph from './seasonality-graph';

describe('SeasonalityGraph', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<SeasonalityGraph />);
    expect(baseElement).toBeTruthy();
  });
});
