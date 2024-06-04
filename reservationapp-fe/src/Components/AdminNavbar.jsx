import NavDropdown from "./NavDropdown";
import '../Styles/AdminNavbar.css'
import { Link } from "react-router-dom";

const AdminNavbar = () => {
    return ( 
        <div className="adminnavbar">
           <div id="logo">
           <Link to='/adminhomepage'> <h2><span>do</span>ibibo<sup>.in</sup></h2></Link>
           </div>
           <div id="options">
            <NavDropdown/>
           </div>
        </div>
     );
}
 
export default AdminNavbar;