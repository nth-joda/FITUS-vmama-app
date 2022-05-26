import React, { useState, useEffect } from "react";
import Auth from "./components/auth/Auth";
import Dashboard from "./components/dashboard/Dashboard";
<<<<<<< HEAD
import ResetPassword from "./components/auth/resetPassword/ResetPassword"
import Page404 from "./components/dashboard/page404/Page404";
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import './App.css';

=======
import ResetPassword from "./components/auth/resetPassword/ResetPassword";
import AppRouter from "./AppRouter";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";
>>>>>>> c48c8df173de0ca6cab0714c38028e3eee157c10

function App() {
  return (
    <div className="App">
      <Router>
<<<<<<< HEAD
        <Routes>
          <Route exact path='/' element={<Auth />}></Route>
          <Route exact path='/login' element={<Auth />}></Route>
          <Route exact path='/dashboard' element={<Dashboard />}></Route>
          <Route exact path='/vouchers' element={<Dashboard />}></Route>
          <Route exact path='/resetPassword' element={<ResetPassword />}></Route>
          <Route exact path='/errorPage' element={<Page404/>}></Route>
        </Routes>

=======
        <AppRouter></AppRouter>
>>>>>>> c48c8df173de0ca6cab0714c38028e3eee157c10
      </Router>
    </div>
  );
}

export default App;
