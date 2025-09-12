import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import 'antd/dist/reset.css'; // Ant Design CSS
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Events from './pages/Events';
import JoinUs from './pages/JoinUs';
import Payment from './pages/Payment';
import Footer from './components/Footer';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/admin/Dashboard';
import Volunteers from './pages/admin/Volunteers';
import AdminEvents from './pages/admin/Events';
import Donations from './pages/admin/Donations';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import AdminSignUp from './pages/admin/AdminSignUp';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import './styles/global/App.css';
import AdminContactMessages from './pages/admin/contact';
import AdminUsers from './pages/admin/Users';
const AppContent = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  React.useEffect(() => {
    const body = document.body;
    const root = document.getElementById('root');
    
    if (isAdminRoute) {
      // Admin pages styling
      body.className = 'admin-page-body';
      root.className = 'admin-page-root';
      body.style.background = '#f0f2f5';
      body.style.backgroundAttachment = 'initial';
      body.style.minHeight = '100vh';
      body.style.margin = '0';
      body.style.padding = '0';
      body.style.overflow = 'hidden';
    } else {
      // Public pages (including Home) -> White background
      body.className = '';
      root.className = '';
      body.style.background = '#ffffff'; // White page background
      body.style.backgroundAttachment = 'fixed';
      body.style.minHeight = '100vh';
      body.style.overflow = 'visible';
    }

    return () => {
      if (!isAdminRoute) {
        body.className = '';
        root.className = '';
        body.style.background = '#ffffff';
        body.style.backgroundAttachment = 'fixed';
        body.style.overflow = 'visible';
      }
    };
  }, [isAdminRoute]);

  if (isAdminRoute) {
    return (
      <div className="admin-layout" style={{ height: '100vh', overflow: 'hidden', margin: 0, padding: 0 }}>
        <Routes>
          <Route path="/admin" element={<AdminSignUp />} />
          <Route path="/admin/dashboard" element={<AdminLayout><Dashboard /></AdminLayout>} />
          <Route path="/admin/volunteers" element={<AdminLayout><Volunteers /></AdminLayout>} />
          <Route path="/admin/events" element={<AdminLayout><AdminEvents /></AdminLayout>} />
          <Route path="/admin/donations" element={<AdminLayout><Donations /></AdminLayout>} />
          <Route path="/admin/contact" element={<AdminLayout><AdminContactMessages /></AdminLayout>} />
          <Route path="/admin/users" element={<AdminLayout><AdminUsers /></AdminLayout>} />
          {/* Add more admin routes as needed */}
        </Routes>
      </div>
    );
  }

  // Public Pages layout (Home, About, etc.)
  return (
    <div className="App">
      <Navigation />
      <main style={{ background: '#fff', minHeight: '100vh' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/events" element={<Events />} />
          <Route path="/join" element={<JoinUs />} />
          <Route path="/payment" element={<Payment />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
