import React from 'react';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import Routes and Route from 'react-router-dom'
import "crypto-browserify";
import './App.css';
import UserForm from './components/UserForm';

function App() {
  return (
    <div className="App">
      <UserForm/>
      <BrowserRouter>
                {/* Wrap Routes around Route components */}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/Dashboard" element={<Dashboard />} />
                </Routes>
            </BrowserRouter>
    </div>
  );
}

export default App;
