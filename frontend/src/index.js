import React from 'react';
import ReactDOM from 'react-dom/client'; // Use the new API
import App from './App';
import './index.css'; // Assuming you have a global stylesheet

// Create the root element
const rootElement = document.getElementById('root');

// Use ReactDOM.createRoot
const root = ReactDOM.createRoot(rootElement);

// Render the app
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);