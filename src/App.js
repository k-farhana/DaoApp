import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Admin from './components/Admin/admin';
import User from './components/User/user';
  
function App() {
  return (
    <Router>
      <Navbar />
      <br/><br/><br/><br/>
      <Routes>
      <Route path='/user' element={<User />} />
      <Route path='/admin' element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;