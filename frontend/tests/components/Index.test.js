<<<<<<< HEAD
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Login from '../../src/components/Login/index';
jest.mock('axios'); //mocking axois so that we can simulate HTTP requests
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'


const setItemMock = jest.fn(); //to mock a function.This allows us to use localstroage so that we don't have to use browser's local stroage. 
Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: setItemMock
  },
  writable: true
});

beforeEach(() => {
  jest.clearAllMocks(); //to clear all mock functions before running the test
});

test('login component submits user credentials successfully and stores response token in localstorage ', async () => {
  const fakeResponse = { data: 'fake_token' };
  axios.post.mockResolvedValueOnce({ data: fakeResponse }); //this simulates a successful API call that resilves with fake response and token above

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter> //Upon wrapping it in routing, the test did not work so I used MemoryRouter instead. 
  );

  fireEvent.change(screen.getByPlaceholderText('Email'), //simulates user input in email
  { target: { value: 'user@example.com' } }); //mimicks the user entering the credentials
  fireEvent.change(screen.getByPlaceholderText('Password'), 
  { target: { value: 'validPassword123' } });
  fireEvent.click(screen.getByText('Sign In')); //simluates the user clicking the sign in button.

  await waitFor(() => { //waits for login to be completed before calling the API
    expect(axios.post).toHaveBeenCalledWith ('http://localhost:8080/api/auth', {
      email: 'user@example.com',
      password: 'validPassword123'
    });

    expect(setItemMock).toHaveBeenCalledWith('token', 'fake_token'); //token received from login API was stored correctly and in local storage.
});
});



test('Handling error for login submission in the event of invalid credentials being provided', async () => {
    
    const errorMessage = "Invalid credentials"; //we simulate a failed login attempt
    axios.post.mockRejectedValueOnce({
      response: {
        status: 401,
        data: { message: errorMessage }
      }
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), 
    { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), 
    { target: { value: 'wrongPassword' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument(); //checks to see if the error message is displayed to the user 
    });
  });
=======
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Login from '../../src/components/Login/index';
jest.mock('axios'); //mocking axois so that we can simulate HTTP requests
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom'


const setItemMock = jest.fn(); //to mock a function.This allows us to use localstroage so that we don't have to use browser's local stroage. 
Object.defineProperty(window, 'localStorage', {
  value: {
    setItem: setItemMock
  },
  writable: true
});

beforeEach(() => {
  jest.clearAllMocks(); //to clear all mock functions before running the test
});

test('login component submits user credentials successfully and stores response token in localstorage ', async () => {
  const fakeResponse = { data: 'fake_token' };
  axios.post.mockResolvedValueOnce({ data: fakeResponse }); //this simulates a successful API call that resilves with fake response and token above

  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter> //Upon wrapping it in routing, the test did not work so I used MemoryRouter instead. 
  );

  fireEvent.change(screen.getByPlaceholderText('Email'), //simulates user input in email
  { target: { value: 'user@example.com' } }); //mimicks the user entering the credentials
  fireEvent.change(screen.getByPlaceholderText('Password'), 
  { target: { value: 'validPassword123' } });
  fireEvent.click(screen.getByText('Sign In')); //simluates the user clicking the sign in button.

  await waitFor(() => { //waits for login to be completed before calling the API
    expect(axios.post).toHaveBeenCalledWith ('http://localhost:8080/api/auth', {
      email: 'user@example.com',
      password: 'validPassword123'
    });

    expect(setItemMock).toHaveBeenCalledWith('token', 'fake_token'); //token received from login API was stored correctly and in local storage.
});
});



test('Handling error for login submission in the event of invalid credentials being provided', async () => {
    
    const errorMessage = "Invalid credentials"; //we simulate a failed login attempt
    axios.post.mockRejectedValueOnce({
      response: {
        status: 401,
        data: { message: errorMessage }
      }
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Email'), 
    { target: { value: 'user@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), 
    { target: { value: 'wrongPassword' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

    await waitFor(() => {
      expect(screen.getByText(errorMessage)).toBeInTheDocument(); //checks to see if the error message is displayed to the user 
    });
  });
>>>>>>> Arpit
