import { Link, useNavigate } from "react-router-dom";
import '../Styles/UserLogin.css'
import { useState } from "react";
import axios from "axios";

const UserLogin = () => {
    let [email,setemail] = useState("");
    let [password,setpassword] = useState("");

    let navigate = useNavigate("");

    function login(e){
        e.preventDefault();
        axios.post(`http://localhost:8080/api/users/verify-by-email?email=${email}&password=${password}`)
        .then((res)=>{
            console.log(res);
            alert("Login Successfully!!!");
            navigate('/userhomepage');
        })
            
        .catch((err)=>{
            alert("Login Failed!!!")
        })
        
    }
    return ( 
        <div className="userlogin">
            <form onSubmit={login}>
                <h2>User Login</h2>
                <input value={email} onChange={(e) => { setemail(e.target.value) }} type="text" placeholder="Enter the email id" required/> <br /> <br />
                <input value={password} onChange={(e) => { setpassword(e.target.value) }} type="password" placeholder="Enter the password" required/> <br /> <br />
                <button className='btn btn-primary'>Login</button>
                <p>Didn't have an account? <Link to='/usersignup'> Sign up</Link></p> 
            </form>
        </div>
     );
}
 
export default UserLogin;