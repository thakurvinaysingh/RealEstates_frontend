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
import DashboardProvider from "./context/DashboardContext.jsx";
import PrivateRoute from './routes/PrivateRoute';
import ScrollToTop from "./components/ScrollToTop";

import './index.css';

function App() {
  return (
    <Router>
        <ScrollToTop />
          <Routes>
         
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<Properties />} />
            <Route path="/property/:slug" element={<PropertyDetails />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            {/* <Route path="/disclaimer" element={<Disclaimer />} />

            <Route path="/privacy-policy" element={<PrivacyPolicy />} /> */}
           
            {/* <Route path="/dashboard/investment" element={<Investment />} />
            <Route path="/dashboard/transaction" element={<Transaction />} />
            <Route path="/dashboard/withdraw" element={<Withdraw />} />
            <Route path="/dashboard/account" element={<Account />} /> */}
          

           {/* Protected routes */}
        <Route element={<PrivateRoute />}>
         
          <Route
            path="/dashboard/*"
            element={
              <DashboardProvider>
                <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                  <Route path="investment" element={<Investment />} />
                  <Route path="transaction" element={<Transaction />} />
                  <Route path="withdraw" element={<Withdraw />} />
                  <Route path="account" element={<Account />} />
                </Routes>
              </DashboardProvider>
            }
          />
        </Route>
          </Routes>
 
    </Router>
  );
}

export default App;