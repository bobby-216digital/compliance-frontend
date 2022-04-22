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
import Contact from './components/Contact'
import Splash from './components/Splash'
import TrailForm from './components/TrialForm'
import Schedule from './components/Schedule'

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <main>
    <Router>
      <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/:url" element={<App />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/:url/contact" element={<Contact />} />
          <Route path="/qa/:url" element={<App qa={true} />} />
          <Route path="/thanks" element={<div className="card">Thanks for reaching out! One of our experts will be in touch shortly.</div>} />
          <Route path="/trial" element={<TrailForm />} />
          <Route path="/schedule" element={<Schedule />} />
      </Routes>
    </Router>
    </main>
  </React.StrictMode>,
  document.getElementById('root')
);