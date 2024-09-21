import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import '@testing-library/jest-dom';
import Navbar from './index';

const mockStore = (initialState) => {
    return createStore((state = initialState) => state);
};

describe('Navbar Component', () => {
    const onAboutClick = jest.fn();
    const onGetStartedClick = jest.fn();
    const onHandleCartClick = jest.fn();

    beforeEach(() => {
        render(
            <Provider store={mockStore({ cart: { items: [] } })}>
                <Navbar 
                    onAboutClick={onAboutClick}
                    onGetStartedClick={onGetStartedClick}
                    onHandleCartClick={onHandleCartClick}
                />
            </Provider>
        );
    });

    test('calls onAboutClick when About link is clicked', () => {
        fireEvent.click(screen.getByRole('button', { name: /About/i }));
        expect(onAboutClick).toHaveBeenCalled();
    });

    test('calls onGetStartedClick when Shop link is clicked', () => {
        fireEvent.click(screen.getByRole('button', { name: /Shop/i }));
        expect(onGetStartedClick).toHaveBeenCalled();
    });

    test('calls onHandleCartClick when Cart link is clicked', () => {
        fireEvent.click(screen.getByRole('button', { name: /Cart/i }));
        expect(onHandleCartClick).toHaveBeenCalled();
    });

    test('toggles the nav links when the burger icon is clicked', () => {
        const burger = screen.getByRole('button', { name: /Toggle menu/i });
    
        fireEvent.click(burger);
        const navLinks = screen.getByTestId('nav-links');

        expect(navLinks).toHaveClass('open');

        fireEvent.click(burger);

        expect(navLinks).not.toHaveClass('open');
    });
});
