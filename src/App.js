import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Form from './pages/Form';
import Signup from './pages/Signup';
import OTP from './pages/OTP';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Footer from './components/Footer';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import Forms from './pages/Forms';

import { useSelector } from 'react-redux';


function App() {

  const userToken = useSelector(state => state.auth.token);

  const adminToken = useSelector(state => state.admin.token);


  return (

    <div className="min-h-screen flex flex-col">

      <Navigation />
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/form" element={userToken ? <Form /> : <LoginFirst />} />

          <Route path="/signup" element={<Signup />} />

          <Route path="/otp" element={<OTP />} />

          <Route path="/login" element={<Login />} />

          <Route path="/profile" element={userToken ? <Profile /> : <LoginFirst />} />

          <Route path="/admin-login" element={<AdminLogin />} />

          <Route path="/dashboard" element={adminToken ? <Dashboard /> : <LoginFirst />} />

          <Route path="/forms" element={adminToken ? <Forms /> : <LoginFirst />} />

          <Route path="*" element={<NotFound />} />
        </Routes>

      </div>

      <Footer />
    </div>
  );
}

function NotFound() {

  return (

    <div className="text-center">
      <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
      <p>The requested page does not exist.</p>
    </div>
  );
}

function LoginFirst() {

  return (

    <div className="text-center py-8">
      <h2 className="text-2xl font-semibold mb-4">Please Login to Access</h2>
    </div>
  );
}


export default App;
