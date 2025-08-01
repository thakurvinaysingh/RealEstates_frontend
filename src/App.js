import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Investment from './pages/Investment';
import Transaction from './pages/Transaction';
import Withdraw from './pages/Withdraw';
import Account from './pages/Account';


import './index.css';

function App() {
  return (
    <Router>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:id" element={<PropertyDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            {/* <Route path="/disclaimer" element={<Disclaimer />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}

            <Route path="/dashboard/investment" element={<Investment />} />
            <Route path="/dashboard/transaction" element={<Transaction />} />
            <Route path="/dashboard/withdraw" element={<Withdraw />} />
            <Route path="/dashboard/account" element={<Account />} />
          </Routes>
 
    </Router>
  );
}

export default App;