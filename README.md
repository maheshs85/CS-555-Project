# Lie Detection Web App

## Overview
The objective of this project is to develop a web-based lie detection application utilizing EEG signals, wherein users can input their data for analysis. The application will employ advanced machine learning algorithms to accurately detect whether the inputted information is truthful or deceptive, providing users with a percentage-based accuracy assessment and additional statistical insights.

### Features
1. **Real-Time Analysis**: Processing EEG data in real-time to detect patterns indicative of deception.
2. **User Interface**: Providing a user-friendly interface for users to interact with the application and view analysis results.
   - **About Page**: An about page explaining the methodology behind the lie detection process, providing users with insights into how the EEG data is analyzed and interpreted.
   - **Results Page**: A results page displaying the outcome of the analysis, including the likelihood of deception and any relevant insights derived from the EEG data.
   - **History Section**: A history section showcasing previous uploads for users' reference and tracking purposes, allowing users to review past analyses and track their progress over time.
3. **Feedback Mechanism**: Presenting feedback to users based on the analysis, indicating the likelihood of deception.

## Prerequisites
- Node.js installed on your machine
- npm package manager

## Installation
1. Clone this repository: `git clone <repository_url>`
2. Navigate to the project directory: `cd CS-555-Project`
3. Install backend dependencies: `cd backend && npm install`
4. Install frontend dependencies: `cd frontend && npm install`

## Usage
1. Start the backend server: `cd backend && npm start`
2. Start the frontend development server: `cd frontend && npm start`
3. Open your web browser and visit `http://localhost:3000` to view the application
