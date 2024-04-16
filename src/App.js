import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './pages/Profile/Profile';
import { Home } from './pages/Home/Home';
import Login from './pages/Login/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import Match from './pages/Matches/Match';
import UserProfile from './pages/userProfile/userProfile';
import About from './pages/AboutUsPage/AboutUs';
import { Navigate } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/home" element={<Home />} />
          <Route path="/match" element={<Match />} />
          <Route path="/user" element={<UserProfile/>} />
          <Route path="/About" element={<About/>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
