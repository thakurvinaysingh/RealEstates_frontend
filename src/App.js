import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Properties from './pages/Properties';
import PropertyDetails from './pages/PropertyDetails';
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

//admin
import Layout from "./components/admin/layout/Layout";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminPropertyList from "./pages/admin/PropertyList";
import AdminCreateProperty from "./pages/admin/CreateProperty";
import AdminEditProperty from "./pages/admin/EditProperty";
import AdminUsersOnePage from './pages/admin/UserAdmin.jsx';
import AdminUserViewPage from './pages/admin/AdminUserViewPage.jsx';

import './index.css';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/property/:slug" element={<PropertyDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* Admin routes */}
        <Route path="/admin" element={<Layout><AdminDashboard /></Layout>} />
        <Route path="/admin/properties" element={<Layout><AdminPropertyList /></Layout>} />
        <Route path="/admin/properties/create" element={<Layout><AdminCreateProperty /></Layout>} />
        <Route path="/admin/properties/edit/:id" element={<AdminEditProperty />} />
        <Route path="/admin/users-list" element={<Layout><AdminUsersOnePage /></Layout>} />
        <Route path="/admin/users/:userId" element={<Layout><AdminUserViewPage /></Layout>} />

        {/* Protected routes */}
        <Route element={<PrivateRoute />}>
          <Route
            path="/dashboard/*"
            element={
              <DashboardProvider>
                <Routes>
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
