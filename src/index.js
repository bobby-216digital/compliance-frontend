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
import Header from './components/Header'

ReactDOM.render(
  <React.StrictMode>
    <Header />
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