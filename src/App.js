import Auth from "./components/auth/Auth";
import Dashboard from "./components/dashboard/Dashboard";
import ResetPassword from "./components/auth/resetPassword/ResetPassword"
import Page404 from "./components/dashboard/page404/Page404";
import { BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import './App.css';


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' element={<Auth />}></Route>
          <Route exact path='/login' element={<Auth />}></Route>
          <Route exact path='/dashboard' element={<Dashboard />}></Route>
          <Route exact path='/vouchers' element={<Dashboard />}></Route>
          <Route exact path='/resetPassword' element={<ResetPassword />}></Route>
          <Route exact path='/errorPage' element={<Page404/>}></Route>
        </Routes>

      </Router>
    </div>
  );
}

export default App;
