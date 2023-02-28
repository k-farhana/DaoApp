import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home/home';
import Admin from './components/Admin/admin';
import User from './components/Dao/dao';
import User1 from './components/Admin/admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/dao' element={<User />} />
        <Route path='/' element={<Home />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </Router>
    // <User1 />
  );
}

export default App;