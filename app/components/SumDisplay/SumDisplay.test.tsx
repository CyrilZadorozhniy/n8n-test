import { render, screen } from '@testing-library/react';
import SumDisplay from './SumDisplay';

describe('SumDisplay', () => {
  it('renders the sum correctly with the label', () => {
    render(<SumDisplay sum={42} />);
    const displayElement = screen.getByText(/Sum: 42/i);
    expect(displayElement).toBeInTheDocument();
    expect(displayElement).toHaveClass('text-lg');
  });
});
