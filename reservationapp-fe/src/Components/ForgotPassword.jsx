import axios from "axios";
import { useState } from "react";

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
                <label>Email</label>
                <input value={email} onChange={(e)=>setemail(e.target.value)} type="email" required/>
                <button className="btn btn-danger">Reset Password</button>
            </form>
        </div>
     );
}
 
export default ForgotPassword;