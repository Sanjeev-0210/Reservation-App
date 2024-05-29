import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import AdminLogin from './Components/AdminLogin';
import UserLogin from './Components/UserLogin';
import AdminSignup from './Components/AdminSignup';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
        <Route path='/userlogin' element={<UserLogin/>}/>
        <Route path='/adminsignup' element={<AdminSignup/>}/>
       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
