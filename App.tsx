
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import SellerOnboarding from './pages/SellerOnboarding';
import SellerDashboard from './pages/SellerDashboard';
import BuyerMarketplace from './pages/BuyerMarketplace';
import AdminDashboard from './pages/AdminDashboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { UserPath } from './types';

const App: React.FC = () => {
  const [userRole, setUserRole] = useState<UserPath | null>(null);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar userRole={userRole} setUserRole={setUserRole} />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home setUserRole={setUserRole} />} />
            <Route path="/seller/onboarding" element={<SellerOnboarding />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/buyer/marketplace" element={<BuyerMarketplace />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
