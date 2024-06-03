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
            <Routes>
                <Route path='/' element={<AdminDashBoard/>}/>
                <Route path='/addbus' element={<AddBus/>}/>
            </Routes>
            <AdminFooter/>
        </div>
     );
}
 
export default AdminHomePage;