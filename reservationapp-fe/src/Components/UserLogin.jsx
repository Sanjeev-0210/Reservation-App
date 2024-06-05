import { Link, useNavigate } from "react-router-dom";
import '../Styles/UserLogin.css'
import { useState } from "react";
import axios from "axios";

const UserLogin = () => {
    let [email,setemail] = useState("");
    let [password,setpassword] = useState("");
    let[otp,setotp] = useState("");

    let navigate = useNavigate("");

    let showotp = document.getElementById("otp")
    let btnotp = document.getElementById("btnotp")
    let showlogin = document.getElementById("login")

    function loginotp(e){
        e.preventDefault();
        axios.post(`http://localhost:8080/api/users/verify-by-email?email=${email}&password=${password}`)
        .then((res)=>{
            showotp.style.display="block"
            alert("OTP sent Successfully!!!")
            btnotp.style.display="none"
            showlogin.style.display="flex"
            console.log(res.data);
            localStorage.setItem("Admin",JSON.stringify(res.data.data))
        })
            
        .catch((err)=>{
            alert("Login Failed!!!")
        })
    }
    function login(e){
        e.preventDefault();
        if(otp==="123456"){
            alert("Login Successfully!!!");
            navigate('/userhomepage');
       
        }
    }

    return ( 
        <div className="userlogin">
            <form onSubmit={loginotp}>
                <h2>User Login</h2>
                <input value={email} onChange={(e) => { setemail(e.target.value) }} type="text" placeholder="Enter the email id" required/> <br /> <br />
                <input value={password} onChange={(e) => { setpassword(e.target.value) }} type="password" placeholder="Enter the password" required/> <br /> <br />
                <div id="otp"><label>Enter the valid OTP:</label><input type="text" value={otp} onChange={(e)=>{setotp(e.target.value)}} /></div>
                <button id="btnotp" className='btn btn-primary'>Get OTP</button>
                <button id="login" className='btn btn-primary' onClick={login}>Login</button>
                <p>Didn't have an account? <Link to='/usersignup'> Sign up</Link></p> 
            </form>
        </div>
     );
}
 
export default UserLogin;