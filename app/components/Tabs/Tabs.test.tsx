import { render, screen, fireEvent } from '@testing-library/react';
import Tabs from './Tabs';

describe('Tabs component', () => {
  const tabs = [
    { id: 'tab1', label: 'Tab 1' },
    { id: 'tab2', label: 'Tab 2' },
    { id: 'tab3', label: 'Tab 3' },
  ];

  it('renders all tabs with correct labels', () => {
    render(<Tabs tabs={tabs} activeTab="tab1" onChange={() => {}} />);
    tabs.forEach((tab) => {
      expect(screen.getByRole('button', { name: tab.label })).toBeInTheDocument();
    });
  });

  it('sets aria-pressed to true for the active tab and false for others', () => {
    render(<Tabs tabs={tabs} activeTab="tab2" onChange={() => {}} />);
    tabs.forEach((tab) => {
      const button = screen.getByRole('button', { name: tab.label });
      if (tab.id === 'tab2') {
        expect(button).toHaveAttribute('aria-pressed', 'true');
      } else {
        expect(button).toHaveAttribute('aria-pressed', 'false');
      }
    });
  });

  it('calls onChange callback with correct tab id when a tab is clicked', () => {
    const onChange = vi.fn();
    render(<Tabs tabs={tabs} activeTab="tab1" onChange={onChange} />);

    const tabToClick = screen.getByRole('button', { name: 'Tab 3' });
    fireEvent.click(tabToClick);

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('tab3');
  });
});
