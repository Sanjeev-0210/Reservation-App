import axios from "axios";
import { useState } from "react";
import '../Styles/ForgotPassword.css'
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import { Link } from "react-router-dom";

const ForgotPassword = () => {

    let[email,setemail] = useState("")
    function resetpassword(e){
        e.preventDefault();
        axios.post(`http://localhost:8080/api/users/forgot-password?email=${email}`)
        .then((res)=>{
            alert("Reset Password link has been sent to entered Mail Id!!!")
        })
        .catch("Invalid Email Id!!!")
    }
    return ( 
        <div className="forgotpassword">
            <form onSubmit={resetpassword}>
            <p><Link to='/adminlogin'><ArrowCircleLeftIcon id='backicon'/></Link> Back</p>
                <h4>Enter your Email ID </h4> 
                <input value={email} onChange={(e)=>setemail(e.target.value)} type="email" required/> <br /><br />
                <button className="btn btn-danger">Reset Password</button>
            </form>
        </div>
     );
}
 
export default ForgotPassword;