import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/:url" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);