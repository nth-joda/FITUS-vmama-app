import React from "react";

import AppRouter from "./AppRouter";
import {
  BrowserRouter as Router,

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
