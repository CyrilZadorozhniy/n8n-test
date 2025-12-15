import { render, screen, fireEvent } from '@testing-library/react';
import CharacterCounter from './CharacterCounter';

describe('CharacterCounter', () => {
  it('renders the header, textarea, and character counts', () => {
    render(<CharacterCounter />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Character Counter');
    expect(screen.getByPlaceholderText('Type or paste your text here')).toBeInTheDocument();
    expect(screen.getAllByText(/^0$/).length > 0 || screen.getAllByText(/0 chars/i).length > 0).toBe(true);
  });

  it('initially shows 0 characters', () => {
    render(<CharacterCounter />);
    expect(screen.getByText(/0 chars/i)).toBeInTheDocument();
    expect(screen.getByText(/^0$/)).toBeInTheDocument();
  });

  it('updates the character count when typing in the textarea', () => {
    render(<CharacterCounter />);
    const textarea = screen.getByPlaceholderText('Type or paste your text here');
    fireEvent.change(textarea, { target: { value: 'hello' } });
    expect(screen.getByText(/5 chars/i)).toBeInTheDocument();
    expect(screen.getByText('5')).toBeInTheDocument();
  });

  it('displays the correct text typed in the textarea', () => {
    render(<CharacterCounter />);
    const textarea = screen.getByPlaceholderText('Type or paste your text here');
    fireEvent.change(textarea, { target: { value: 'testing 123' } });
    expect(textarea).toHaveValue('testing 123');
  });
});
