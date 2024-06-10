import { Route, Routes } from 'react-router-dom';
import '../Styles/AdminHomePage.css'
import AdminNavbar from './AdminNavbar';
import AdminDashBoard from './AdminDashBoard';
import AdminFooter from './AdminFooter';
import AddBus from './AddBus';
import EditBus from './EditBus';

const AdminHomePage = () => {
    return ( 
        <div className="adminhomepage">
            
            <AdminNavbar/>
            <div className="container">
            {/* <div class="overlay"></div> */}
            <Routes>
                <Route path='/*' element={<AdminDashBoard/>}/>
                <Route path='/addbus' element={<AddBus/>}/>
                <Route path='/editbus/:id' element={<EditBus/>}/>
                
            </Routes>
            </div>
            <AdminFooter/>
        </div>
     );
}
 
export default AdminHomePage;