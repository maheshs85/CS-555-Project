import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../../src/components/About';
import '@testing-library/jest-dom';

describe('About Page', () => {
  beforeEach(() => {
    render(<About />);
  });

  test('render the main headings', () => {
    expect(screen.getByRole('heading', { name: 'About Cyber Coders' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Project Objectives' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Meet the Team' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Our Technology Stack' })).toBeInTheDocument();
  });

  test('render the mission statement', () => {
    expect(screen.getByText(/Our goal is to create a web-based application/)).toBeInTheDocument();
  });

  test('confirm the project objectives section and is displayed correctly', () => {
    expect(screen.getByText(/Our main objective is to create a user-friendly platform/)).toBeInTheDocument();
  });

  test('verify the team table', () => {
    expect(screen.getByText('Mahesh Swaminathan')).toBeInTheDocument();
    expect(screen.getByText('Scrum Master, Infrastructure / Deployment')).toBeInTheDocument();
    expect(screen.getByText('Yash Gandhi')).toBeInTheDocument();
    expect(screen.getByText('Frontend - UX/UI')).toBeInTheDocument();
    expect(screen.getByText('Arpit Shah')).toBeInTheDocument();
    expect(screen.getByText('Frontend - Components')).toBeInTheDocument();
    expect(screen.getByText('Prajith Reddy Mule')).toBeInTheDocument();
    expect(screen.getByText('Quality Assurance')).toBeInTheDocument();
    expect(screen.getByText('Siddharth Kaza')).toBeInTheDocument();
    expect(screen.getByText('Backend - Data Processing and ML')).toBeInTheDocument();
    expect(screen.getByText('Tushar Batla')).toBeInTheDocument();
    expect(screen.getByText('Backend - Servers / API Development')).toBeInTheDocument();
  
  });

  test('verify technology stack', () => {
    expect(screen.getByText('Database')).toBeInTheDocument();
    expect(screen.getByText('MongoDB')).toBeInTheDocument();
    expect(screen.getByText('Backend Framework')).toBeInTheDocument();
    expect(screen.getByText('Node.JS, Express.js, Mongoose')).toBeInTheDocument();
    expect(screen.getByText('Machine Learning Library')).toBeInTheDocument();
    expect(screen.getByText('EEG Deep Learning Library')).toBeInTheDocument();
    expect(screen.getByText('Data processing')).toBeInTheDocument();
    expect(screen.getByText('Numpy, Scipy, Pandas')).toBeInTheDocument();
    expect(screen.getByText('Infrastructure and Deployment')).toBeInTheDocument();
    expect(screen.getByText('Github actions, Heroku')).toBeInTheDocument();
    expect(screen.getByText('Development tools')).toBeInTheDocument();
    expect(screen.getByText('Git, VSCode, Jira')).toBeInTheDocument();
    expect(screen.getByText('Frontend Framework')).toBeInTheDocument();
    expect(screen.getByText('React.js, HTML/CSS, Bootstrap, JavaScript/TypeScript')).toBeInTheDocument();

  });

});