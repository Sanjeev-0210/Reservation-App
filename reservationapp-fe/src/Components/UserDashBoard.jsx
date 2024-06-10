import { Route, Routes } from "react-router-dom";
import BusView from "./BusView";
import SearchBus from "./SearchBus";
import '../Styles/UserDashBoard.css'


const UserDashBoard = () => {
    return ( 
        <div className="userdashboard">
             <div className='filter'>
              
            </div>
            <div className="view">
            <SearchBus/>
            <Routes>
                <Route path='/' element={<BusView/>}/>
                <Route path='/busview' element={<BusView/>}/>
           </Routes>
            </div>
        </div>
     );
}
 
export default UserDashBoard;