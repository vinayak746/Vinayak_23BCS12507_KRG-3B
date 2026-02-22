import { render, screen, waitFor } from '@testing-library/react';
import DashboardSummary from '../pages/DashboardSummary';

jest.mock('../data/logs', () => ({
  logs: [
    { id: 1, activity: 'Recycle', amount: 5 },
    { id: 2, activity: 'Plant', amount: 3 },
  ],
}));

describe('DashboardSummary', () => {
  it('renders summary data', async () => {
    render(<DashboardSummary />);
    await waitFor(() => {
      expect(screen.getByText(/Recycle/i)).toBeInTheDocument();
      expect(screen.getByText(/Plant/i)).toBeInTheDocument();
    });
  });
});
