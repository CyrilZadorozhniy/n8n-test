import { render, screen, fireEvent } from '@testing-library/react';
import NumberInputForm from './NumberInputForm';
import userEvent from '@testing-library/user-event';
import { describe, it, vi, expect } from 'vitest';

describe('NumberInputForm', () => {
  it('renders input with placeholder and button with text Add', () => {
    render(<NumberInputForm value="" onChange={vi.fn()} onAdd={vi.fn()} />);
    expect(screen.getByPlaceholderText('Enter a number')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('calls onChange when input value changes', async () => {
    const onChange = vi.fn();
    render(<NumberInputForm value="" onChange={onChange} onAdd={vi.fn()} />);
    const input = screen.getByPlaceholderText('Enter a number');
    await userEvent.type(input, '123');
    expect(onChange).toHaveBeenCalledTimes(3);
    expect(onChange).toHaveBeenCalledWith('1');
    expect(onChange).toHaveBeenCalledWith('2');
    expect(onChange).toHaveBeenCalledWith('3');
  });

  it('calls onAdd when Add button is clicked', () => {
    const onAdd = vi.fn();
    render(<NumberInputForm value="" onChange={vi.fn()} onAdd={onAdd} />);
    const button = screen.getByRole('button', { name: /add/i });
    fireEvent.click(button);
    expect(onAdd).toHaveBeenCalledTimes(1);
  });

  it('calls onAdd when Enter key is pressed in input', () => {
    const onAdd = vi.fn();
    render(<NumberInputForm value="" onChange={vi.fn()} onAdd={onAdd} />);
    const input = screen.getByPlaceholderText('Enter a number');
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(onAdd).toHaveBeenCalledTimes(1);
  });
});
