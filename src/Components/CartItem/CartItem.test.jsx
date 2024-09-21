import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import '@testing-library/jest-dom';
import CartItem from './index';
import { updateQuantity, removeItem } from '../../Reducers/cartActions';

const mockStore = configureStore([]);

describe('CartItem Component', () => {
  let store;
  const mockContinueShopping = jest.fn();

  beforeEach(() => {
    store = mockStore({
      cart: {
        items: [
          { id: 1, name: 'Product 1', cost: 10, sale: 8, quantity: 2, image: 'image1.jpg' },
          { id: 2, name: 'Product 2', cost: 15, sale: null, quantity: 1, image: 'image2.jpg' },
        ],
      },
    });

    store.dispatch = jest.fn(); // Mock dispatch function
  });

  test('renders cart items and buttons', () => {
    render(
      <Provider store={store}>
        <CartItem onContinueShopping={mockContinueShopping} />
      </Provider>
    );

    expect(screen.getByText(/Total Cart Amount:/)).toBeInTheDocument();
    expect(screen.getByTestId('item-1')).toBeInTheDocument();
    expect(screen.getByTestId('increase-1')).toBeInTheDocument();
    expect(screen.getByTestId('decrease-1')).toBeInTheDocument();
    expect(screen.getByTestId('delete-1')).toBeInTheDocument();
  });

  test('increments quantity of item', () => {
    render(
      <Provider store={store}>
        <CartItem onContinueShopping={mockContinueShopping} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId('increase-1'));

    expect(store.dispatch).toHaveBeenCalledWith(updateQuantity({ id: 1, quantity: 3 }));
  });

  test('decrements quantity of item', () => {
    render(
      <Provider store={store}>
        <CartItem onContinueShopping={mockContinueShopping} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId('decrease-1'));

    expect(store.dispatch).toHaveBeenCalledWith(updateQuantity({ id: 1, quantity: 1 }));
  });

  test('removes item when quantity is 1 and decrement is clicked', () => {
    render(
      <Provider store={store}>
        <CartItem onContinueShopping={mockContinueShopping} />
      </Provider>
    );

    fireEvent.click(screen.getByTestId('decrease-2'));

    expect(store.dispatch).toHaveBeenCalledWith(removeItem(2));
  });

  test('calls continue shopping function', () => {
    render(
      <Provider store={store}>
        <CartItem onContinueShopping={mockContinueShopping} />
      </Provider>
    );

    fireEvent.click(screen.getByText('Continue Shopping'));

    expect(mockContinueShopping).toHaveBeenCalled();
  });
});
