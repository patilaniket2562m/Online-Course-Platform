import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './custom-style.css';
import './AppLayout.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);  // ← No StrictMode wrapper

reportWebVitals();