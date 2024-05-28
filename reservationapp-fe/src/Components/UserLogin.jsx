import { Link } from "react-router-dom";
import '../Styles/UserLogin.css'

const UserLogin = () => {
    return ( 
        <div className="userlogin">
            <form action="">
                <h2>User Login</h2>
                <input type="text" placeholder="Enter the username" required/> <br /> <br />
                <input type="password" placeholder="Enter the password" required/> <br /> <br />
                <button className='btn btn-primary'>Login</button>
                <p>Are you new to page? <Link to='/usersignup'> Register here</Link></p> 
            </form>
        </div>
     );
}
 
export default UserLogin;