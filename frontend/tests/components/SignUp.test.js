import React from 'react';
import { render, fireEvent, waitFor, screen, getByRole } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import Signup from '../../src/components/SignUp/index';
import '@testing-library/jest-dom/extend-expect'

// Mock axios module to prevent actual HTTP requests during testing
jest.mock('axios');

describe('Signup component', () => {
  test('should submit form successfully', async () => {
    // Mock axios post request to simulate successful submission
    axios.post.mockResolvedValueOnce({ data: { message: 'User created successfully' } });

    // Render the Signup component
    const { getByPlaceholderText, getByText } = render(<Router><Signup /></Router>);

    // Fill in form fields
    fireEvent.change(getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.submit(getByText('Sign Up'));

    // Wait for axios request to resolve and check if navigation to /login occurs
    await waitFor(() => {
      expect(window.location.pathname).toBe('/login');
    });
  });

  test('should display error message on failed form submission', async () => {
    // Mock axios post request to simulate failed submission
    axios.post.mockRejectedValueOnce({ response: { data: { message: 'Email already exists' }, status: 409 } });

    // Render the Signup component
    const { getByText, getByPlaceholderText } = render(<Router><Signup /></Router>);

    // Fill in form fields
    fireEvent.change(getByPlaceholderText('First Name'), { target: { value: 'John' } });
    fireEvent.change(getByPlaceholderText('Last Name'), { target: { value: 'Doe' } });
    fireEvent.change(getByPlaceholderText('Email'), { target: { value: 'john@example.com' } });
    fireEvent.change(getByPlaceholderText('Password'), { target: { value: 'password123' } });

    // Submit the form
    fireEvent.submit(getByText('Sign Up'));

    // Wait for error message to be displayed
    await waitFor(() => {
      expect(getByText('Email already exists')).toBeInTheDocument();
    });
  });
});
