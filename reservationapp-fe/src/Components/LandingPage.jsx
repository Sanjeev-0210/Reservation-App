import { Link } from "react-router-dom";
import '../Styles/LandingPage.css'
const LandingPage = () => {
    return ( 
        <div className="landingpage">
            <Link to="/adminlogin">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ21cd980vRRom8-XON3Cez8fGy5F51LOuCCg&usqp=CAU" alt="" />
            <h2>Admin</h2>
            </Link>
            <Link to="/userlogin">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSyjvJkVvUJj7jdYXfe-5my0bOgTtqG04Y7bozaG6WFUg&s" alt="" />
            <h2>User</h2>
            </Link>
        </div>
     );
}
 
export default LandingPage;