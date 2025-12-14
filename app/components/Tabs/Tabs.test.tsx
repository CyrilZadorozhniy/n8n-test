import { render, screen, fireEvent } from '@testing-library/react';
import Tabs from './Tabs';

vi.mock('../Calculator/Calculator', () => () => <div>Calculator Component</div>);
vi.mock('../CharacterCounter/CharacterCounter', () => () => <div>Character Counter Component</div>);

describe('Tabs component', () => {
  it('renders Calculator tab and content by default', () => {
    render(<Tabs />);
    expect(screen.getByRole('button', { name: /calculator/i })).toHaveClass('bg-white');
    expect(screen.getByText('Calculator Component')).toBeInTheDocument();
  });

  it('renders Character Counter tab and content when clicked', () => {
    render(<Tabs />);
    const characterCounterTab = screen.getByRole('button', { name: /character counter/i });
    fireEvent.click(characterCounterTab);
    expect(characterCounterTab).toHaveClass('bg-white');
    expect(screen.getByText('Character Counter Component')).toBeInTheDocument();
  });

  it('switches back to Calculator tab when clicked again', () => {
    render(<Tabs />);
    const calculatorTab = screen.getByRole('button', { name: /calculator/i });
    const characterCounterTab = screen.getByRole('button', { name: /character counter/i });

    // Switch to character counter
    fireEvent.click(characterCounterTab);
    expect(screen.getByText('Character Counter Component')).toBeInTheDocument();

    // Switch back to calculator
    fireEvent.click(calculatorTab);
    expect(screen.getByText('Calculator Component')).toBeInTheDocument();
  });
});
