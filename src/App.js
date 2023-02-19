import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/home';
import Admin from './components/Admin/admin';
import User from './components/User/user';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<User />} />
        <Route path='/user' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;