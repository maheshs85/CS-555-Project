import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Home } from '../../src/components';

test('updates input field value on change', () => {
    // CSV content
  const csvContent = 'Name,Age\nJohn,30\nJane,25';

  // Create a Blob object from CSV content
  const csvBlob = new Blob([csvContent], { type: 'text/csv' });

  // Create a File object from the Blob
  const csvFile = new File([csvBlob], 'data.csv', { type: 'text/csv' });
  const { getByLabelText } = render(<Home />);

  const inputField = getByLabelText('Upload');

  // Upload the CSV file
  userEvent.upload(inputField, csvFile);

  // Assert that the file input field has been updated
  expect(inputField.files[0]).toStrictEqual(csvFile);
});

test('Does not updates input field value on change', () => {
    // Create a sample file
  const file = new File(['file contents'], 'file.txt', { type: 'text/plain' });
  const { getByLabelText } = render(<Home />);

  const inputField = getByLabelText('Upload');

  // Upload the CSV file
  userEvent.upload(inputField, file);

  // Assert that the file input field has been updated
  expect(inputField.files[0]).toStrictEqual(file);
});
