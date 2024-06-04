
import { Route, Routes } from 'react-router-dom';
import '../Styles/AdminDashBoard.css'
import BusView from './BusView';
const AdminDashBoard = () => {
    return ( 
        <div className="admindashboard">
           {/* <BusView/> */}
           <Routes>
                <Route path='/' element={<BusView/>}/>
                <Route path='/busview' element={<BusView/>}/>
           </Routes>
        </div>
     );
}
 
export default AdminDashBoard;