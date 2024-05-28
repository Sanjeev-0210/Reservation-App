import { Link } from "react-router-dom";
import '../Styles/AdminLogin.css'

const AdminLogin = () => {
    return ( 
        <div className="adminlogin">
            <form action="">
                <h2>Admin Login</h2>
                <input type="text" placeholder="Enter the username" required/> <br /> <br />
                <input type="password" placeholder="Enter the password" required/> <br /> <br />
                <button className='btn btn-danger'>Login</button>
                <p>Are you new to page? <Link to='/adminsignup'> Register here</Link></p> 
            </form>
        </div>
     );
}
 
export default AdminLogin;