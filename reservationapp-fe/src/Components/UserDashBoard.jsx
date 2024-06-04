import { Route, Routes } from "react-router-dom";
import BusView from "./BusView";


const UserDashBoard = () => {
    return ( 
        <div className="userdashboard">
            <Routes>
                <Route path='/' element={<BusView/>}/>
                <Route path='/busview' element={<BusView/>}/>
           </Routes>
        </div>
     );
}
 
export default UserDashBoard;