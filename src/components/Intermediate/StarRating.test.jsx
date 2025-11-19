import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import StarRating from './StarRating';

// Mock Nav component to avoid routing issues during test
vi.mock('../Nav', () => ({
    default: () => <div data-testid="nav">Nav</div>,
}));

const renderWithRouter = (component) => {
    return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('StarRating Component', () => {
    it('renders 5 stars', () => {
        renderWithRouter(<StarRating />);
        // Lucide stars are SVGs, we can find them by role or class, but buttons are better
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(5);
    });

    it('renders the heading', () => {
        renderWithRouter(<StarRating />);
        expect(screen.getByText('Star Rating')).toBeInTheDocument();
    });

    it('displays feedback message when a star is clicked', () => {
        renderWithRouter(<StarRating />);
        const buttons = screen.getAllByRole('button');

        // Click 3rd star (index 2)
        fireEvent.click(buttons[2]);

        expect(screen.getByText('Thanks for giving 3 stars!')).toBeInTheDocument();
    });

    it('updates feedback message when a different star is clicked', () => {
        renderWithRouter(<StarRating />);
        const buttons = screen.getAllByRole('button');

        // Click 5th star (index 4)
        fireEvent.click(buttons[4]);

        expect(screen.getByText('Thanks for giving 5 stars!')).toBeInTheDocument();
    });

    it('displays singular "star" for 1 star rating', () => {
        renderWithRouter(<StarRating />);
        const buttons = screen.getAllByRole('button');

        // Click 1st star (index 0)
        fireEvent.click(buttons[0]);

        expect(screen.getByText('Thanks for giving 1 star!')).toBeInTheDocument();
    });
});
