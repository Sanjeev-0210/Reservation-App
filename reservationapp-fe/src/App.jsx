import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import LandingPage from './Components/LandingPage';
import AdminLogin from './Components/AdminLogin';
import UserLogin from './Components/UserLogin';
import AdminSignup from './Components/AdminSignup';
import UserSignup from './Components/UserSignup';
import AdminHomePage from './Components/AdminHomePage';
import ErrorPage from './Components/ErrorPage';
import UserHomePage from './Components/UserHomePage';
import ForgotPassword from './Components/ForgotPassword';
import ResetPassword from './Components/ResetPassword';
import Protect from './Components/Protect';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
        <Route path='/*' element={<ErrorPage/>}/>
        <Route path="/" element={<LandingPage/>}/>
        <Route path='/adminlogin' element={<AdminLogin/>}/>
        <Route path='/userlogin' element={<UserLogin/>}/>
        <Route path='/adminsignup' element={<AdminSignup/>}/>
        <Route path='/usersignup' element={<UserSignup/>}/>
        <Route path='/forgot-password' element={<ForgotPassword/>}/>
        <Route path='/reset-password' element={<ResetPassword/>}/>
        <Route path='/adminhomepage/*' element={<Protect Child={AdminHomePage}/>}/>
        {/* <Route path='/adminhomepage/*' element={<AdminHomePage/>}/> */}
        <Route path='/userhomepage/*' element={<UserHomePage/>}/>
       </Routes>
       </BrowserRouter>
    </div>
  );
}

export default App;
