import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AboutUs from './index';

describe('AboutUs Component', () => {
  test('renders the component with the correct text', () => {
    render(<AboutUs />);
    
    expect(screen.getByText(/Welcome to Paradise Nursery/i)).toBeInTheDocument();
    expect(screen.getByText(/we are passionate about bringing nature closer to you/i)).toBeInTheDocument();
    expect(screen.getByText(/Our team of experts is dedicated to ensuring/i)).toBeInTheDocument();
    expect(screen.getByText(/create a greener, healthier world/i)).toBeInTheDocument();
  });

  test('contains the correct class names', () => {
    render(<AboutUs />);
    
    const container = screen.getByText(/Welcome to Paradise Nursery/i).closest('div');
    expect(container).toHaveClass('about-us-container');

    const paragraphs = screen.getAllByText(/our mission|our team|join us/i);
    paragraphs.forEach((p) => {
      expect(p).toHaveClass('about-us-content');
    });
  });
});
