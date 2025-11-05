import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import './App.css'
import Login from './admin/pages/Login'
import Home from './admin/pages/Home'
import Userhome from './user/pages/Userhome';
import Mainhome from './user/pages/Mainhome';

function App() {
  const [count, setCount] = useState(0)

  return (
      <>
      <Router>
        <Routes>
          <Route path="/" element={<Mainhome /> } />
          <Route path="/user" element={<Userhome /> } />
          <Route path="/admin" element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>

      </Router>
      
      
      </>
  )
}

export default App
