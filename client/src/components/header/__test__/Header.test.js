import { render, screen } from '@testing-library/react';
import Header from '../Header';

test('renders Header component', () => {
    render(<Header />)
    const cardElement = screen.getByText(/open book/i);
    expect(cardElement).toBeInTheDocument();
})
