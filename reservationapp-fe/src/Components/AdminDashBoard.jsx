
import { Route, Routes } from 'react-router-dom';
import '../Styles/AdminDashBoard.css'
import AdminViewBus from './AdminViewBus';
import SearchBus from './SearchBus';
import BusView from './BusView';
// import BusView from './BusView';
const AdminDashBoard = () => {
    return ( 
        <div className="admindashboard">
           {/* <BusView/> */}
           
            <div className='filter'>
               <h2>filter</h2>
            </div>
            <div className='view'>
            <SearchBus/>
            <Routes>
            <Route path='/' element={<BusView/>}/>
                <Route path='/adminviewbus' element={<AdminViewBus/>}/>
                </Routes>
                
            </div>
            
                
           
        </div>
     );
}
 
export default AdminDashBoard;