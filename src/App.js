import React, { useState, useEffect } from "react";
import Auth from "./components/auth/Auth";
import Dashboard from "./components/dashboard/Dashboard";
import ResetPassword from "./components/auth/resetPassword/ResetPassword";
import AppRouter from "./AppRouter";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <AppRouter></AppRouter>
      </Router>
    </div>
  );
}

export default App;
