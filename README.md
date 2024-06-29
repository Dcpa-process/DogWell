# DogWell

This is a web application for booking dog walking modules using a calendar-like view with 15-minute slots. The app is integrated with Firebase for authentication and Firestore for storing booking data.

## Features

- User authentication using Firebase
- Calendar-like view for selecting slots
- Color-coded slots to indicate availability
- Booking of up to 3 slots at a time
- Real-time updates of slot availability

## Setup

1. Clone the repository.
2. Add a GitHub Secret named `FIREBASE_CONFIG` with your Firebase configuration JSON.
3. Ensure your GitHub Actions workflow fetches this secret and creates the `firebase_config.js` file.

## Deployment

This project is deployed using GitHub Pages. The deployment script will fetch the Firebase configuration from the repository secrets before building and deploying the project.
