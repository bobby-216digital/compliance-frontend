import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './index.css';
import App from './App';
import Admin from './Admin'

ReactDOM.render(
  <React.StrictMode>
    <main>
    <Router>
      <Routes>
          <Route path="/:url" element={<App />} />
          <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
    </main>
  </React.StrictMode>,
  document.getElementById('root')
);