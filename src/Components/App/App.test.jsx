import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './index';

// Mocking child components
jest.mock('../Navbar', () => {
    const React = require('react'); // Import React inside the mock
    return React.forwardRef(({ onAboutClick, onGetStartedClick, onHandleCartClick }, ref) => (
      <div>
        <button data-testid="about-btn" onClick={onAboutClick}>About</button>
        <button data-testid="get-started-btn" onClick={onGetStartedClick}>Get Started</button>
      </div>
    ));
  });

jest.mock('../ProductList', () => ({ showCart }) => (
  <div>{showCart ? 'Showing Cart' : 'Showing Products'}</div>
));

jest.mock('../AboutUs', () => () => <div>About Us Content</div>);

describe('App Component', () => {
  test('renders the App with initial components', () => {
    render(<App />);

    // Check if the Navbar, AboutUs, and Landing page are rendered
    expect(screen.getByText(/Welcome To/i)).toBeInTheDocument();
    expect(screen.getByText('Where Green Meets Serenity')).toBeInTheDocument();
    expect(screen.getByText('About Us Content')).toBeInTheDocument();
  });

  test('shows ProductList when Get Started is clicked', () => {
    const { container } = render(<App />);
  
    const getStartedButton = screen.getByTestId('get-started-btn');
    
    fireEvent.click(getStartedButton);
  
    expect(screen.getByText('Showing Products')).toBeInTheDocument();
    expect(container.querySelector('.landing-page.fade-out')).toBeInTheDocument();
  });

  test('closes ProductList and shows AboutUs when About is clicked', () => {
    const { container } = render(<App />);
    
    const getStartedButton = screen.getByTestId('get-started-btn');
    fireEvent.click(getStartedButton);

    const aboutButton = screen.getByTestId('about-btn');
    fireEvent.click(aboutButton);

    expect(screen.getByText('About Us Content')).toBeInTheDocument();
    const productListContainer = container.querySelector('.product-list-container.visible');
    expect(productListContainer).not.toBeInTheDocument();
  });

  test('applies fade-out class when Get Started is clicked', () => {
    render(<App />);

    const getStartedButton = screen.getByTestId('get-started-btn');
    
    fireEvent.click(getStartedButton);

    const landingPage = screen.getByText(/Welcome To/i).closest('.landing-page');
    expect(landingPage).toHaveClass('fade-out');
  });
});
