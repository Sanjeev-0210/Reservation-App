import { Route, Routes } from 'react-router-dom';
import '../Styles/UserHomePage.css'
import AdminFooter from './AdminFooter';
import UserNavbar from './UserNavbar';
import UserDashBoard from './UserDashBoard';
// import BusView from './BusView';
import BookBus from './BookBus';
import BookingHistory from './BookingHistory';

const UserHomePage = () => {
    return ( 
        <div className="userhomepage">
        <UserNavbar/>
        <div className="container">
        <Routes>
            <Route path='/*' element={<UserDashBoard/>}/>
            {/* <Route path='/busview' element={<BusView/>}/> */}
            <Route path='/bookbus/:id' element={<BookBus/>}/>
            <Route path='/bookinghistory' element={<BookingHistory/>}/>
        </Routes>
        </div>
        <AdminFooter/>
        </div>
     );
}
 
export default UserHomePage;