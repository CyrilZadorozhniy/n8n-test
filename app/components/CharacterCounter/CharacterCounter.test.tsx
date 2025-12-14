import { render, screen, fireEvent } from '@testing-library/react';
import CharacterCounter from './CharacterCounter';
import { describe, it, expect } from 'vitest';

describe('CharacterCounter', () => {
  it('renders the heading and textarea', () => {
    render(<CharacterCounter />);
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Character Counter');
    expect(screen.getByPlaceholderText('Enter your text here...')).toBeInTheDocument();
  });

  it('initially displays character count as 0', () => {
    render(<CharacterCounter />);
    expect(screen.getByText(/Characters: 0/i)).toBeInTheDocument();
  });

  it('updates character count as user types', () => {
    render(<CharacterCounter />);
    const textarea = screen.getByPlaceholderText('Enter your text here...');
    fireEvent.change(textarea, { target: { value: 'hello' } });
    expect(screen.getByText(/Characters: 5/i)).toBeInTheDocument();
    fireEvent.change(textarea, { target: { value: 'hello world' } });
    expect(screen.getByText(/Characters: 11/i)).toBeInTheDocument();
  });
});
