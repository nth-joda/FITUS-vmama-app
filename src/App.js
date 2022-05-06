import Auth from "./components/auth/Auth";
import Dashboard from "./components/dashboard/Dashboard";

import { BrowserRouter as Router,Routes, Route, Link } from 'react-router-dom';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Auth />}></Route>
          <Route exact path='/login' element={<Auth />}></Route>
          <Route exact path='/dashboard' element={<Dashboard />}></Route>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
