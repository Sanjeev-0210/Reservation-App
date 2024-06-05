
import { Route, Routes } from 'react-router-dom';
import '../Styles/AdminDashBoard.css'
import BusView from './BusView';
import AdminViewBus from './AdminViewBus';
const AdminDashBoard = () => {
    return ( 
        <div className="admindashboard">
           {/* <BusView/> */}
           
            <div className='filter'>
               <h2>filter</h2>
            </div>
            <div className='view'>
            <Routes>
            <Route path='/' element={<BusView/>}/>
                <Route path='/adminviewbus' element={<AdminViewBus/>}/>
                </Routes>
            </div>
                
           
        </div>
     );
}
 
export default AdminDashBoard;