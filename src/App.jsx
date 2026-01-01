import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './pages/Login';
import Otp from './pages/Otp';
import Home from './pages/Home';
import Details from './pages/Details';

export default function App() {
  const [phone, setPhone] = useState("");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login setPhone={setPhone} />} />
        <Route path="/otp" element={<Otp phone={phone} />} />
        <Route path="/home" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}