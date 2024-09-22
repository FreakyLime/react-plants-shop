import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductPrice from './index';
import styles from './ProductPrice.module.css';

describe('ProductPrice', () => {
  test('renders the regular price when no sale is provided', () => {
    render(<ProductPrice cost={100} />);

    const regularPrice = screen.getByText('$100');
    expect(regularPrice).toBeInTheDocument();
    expect(regularPrice).not.toHaveClass(styles.oldPrice);
    expect(screen.queryByText('sale')).not.toBeInTheDocument();
  });

  test('renders the sale price and the old price when sale is provided', () => {
    render(<ProductPrice cost={100} sale={80} />);

    const regularPrice = screen.getByText('$100');
    const salePrice = screen.getByText('$80');

    expect(regularPrice).toBeInTheDocument();
    expect(regularPrice).toHaveClass(styles.oldPrice);
    expect(salePrice).toBeInTheDocument();
  });

  test('renders with additional class names', () => {
    render(<ProductPrice cost={100} className="extra-class" />);

    const productPriceContainer = screen.getByText('$100').closest('div');
    expect(productPriceContainer).toHaveClass('extra-class');
  });
});
