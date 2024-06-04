import { Route, Routes } from 'react-router-dom';
import '../Styles/AdminHomePage.css'
import AdminNavbar from './AdminNavbar';
import AdminDashBoard from './AdminDashBoard';
import AdminFooter from './AdminFooter';
import AddBus from './AddBus';

const AdminHomePage = () => {
    return ( 
        <div className="adminhomepage">
            <AdminNavbar/>
            <div className="container">
            <Routes>
                <Route path='/' element={<AdminDashBoard/>}/>
                <Route path='/addbus' element={<AddBus/>}/>
            </Routes>
            </div>
            <AdminFooter/>
        </div>
     );
}
 
export default AdminHomePage;