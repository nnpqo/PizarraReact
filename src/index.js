import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Appp from './Appp';
import Inicio from './components/Inicio';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Appp />
  </React.StrictMode>
);

reportWebVitals();
