import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NumberInputForm from './NumberInputForm';

describe('NumberInputForm', () => {
  it('renders input and button correctly', () => {
    render(<NumberInputForm value="" onChange={() => {}} onAdd={() => {}} />);
    expect(screen.getByPlaceholderText(/enter a number/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
  });

  it('calls onChange when input value changes', async () => {
    const user = userEvent.setup();
    const handleChange = vi.fn();
    render(<NumberInputForm value="" onChange={handleChange} onAdd={() => {}} />);
    const input = screen.getByPlaceholderText(/enter a number/i);
    await user.clear(input);
    await user.type(input, '123');
    expect(handleChange).toHaveBeenCalledTimes(3);
    expect(handleChange).toHaveBeenCalledWith('1');
    expect(handleChange).toHaveBeenCalledWith('12');
    expect(handleChange).toHaveBeenCalledWith('123');
  });

  it('calls onAdd when Enter key is pressed in the input', async () => {
    const user = userEvent.setup();
    const handleAdd = vi.fn();
    render(<NumberInputForm value="" onChange={() => {}} onAdd={handleAdd} />);
    const input = screen.getByPlaceholderText(/enter a number/i);
    await user.type(input, '{Enter}');
    expect(handleAdd).toHaveBeenCalledTimes(1);
  });

  it('calls onAdd when the Add button is clicked', async () => {
    const user = userEvent.setup();
    const handleAdd = vi.fn();
    render(<NumberInputForm value="" onChange={() => {}} onAdd={handleAdd} />);
    const button = screen.getByRole('button', { name: /add/i });
    await user.click(button);
    expect(handleAdd).toHaveBeenCalledTimes(1);
  });
});
