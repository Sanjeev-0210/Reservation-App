import { Route, Routes } from 'react-router-dom';
import '../Styles/AdminHomePage.css'
import AdminNavbar from './AdminNavbar';
import AdminDashBoard from './AdminDashBoard';
import AdminFooter from './AdminFooter';

const AdminHomePage = () => {
    return ( 
        <div className="adminhomepage">
            <AdminNavbar/>
            <Routes>
                <Route path='/' element={<AdminDashBoard/>}/>
            </Routes>
            <AdminFooter/>
        </div>
     );
}
 
export default AdminHomePage;