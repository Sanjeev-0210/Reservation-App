import { Link } from 'react-router-dom';
import '../Styles/UserNavbar.css'
import UserNavDropdown from './UserNavDropdown';

const UserNavbar = () => {
    return ( 
        <div className="usernavbar">
             <div id="logo">
           <Link to='/userhomepage'> <h2><span>do</span>ibibo<sup>.in</sup></h2></Link>
           </div>
           <div id="options">
            <UserNavDropdown/>
           </div>
        </div>
     );
}
 
export default UserNavbar;