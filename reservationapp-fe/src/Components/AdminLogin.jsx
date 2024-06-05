import { Link, useNavigate } from "react-router-dom";
import '../Styles/AdminLogin.css'
import { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
    let [email, setemail] = useState("");
    let [password, setpassword] = useState("");

    let[otp,setotp] = useState("");

    let navigate = useNavigate("");

    let showotp = document.getElementById("otp")
    let btnotp = document.getElementById("btnotp")
    let showlogin = document.getElementById("login")

    function loginotp(e) {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/admins/verify-by-email?email=${email}&password=${password}`)
        .then((res)=>{
            showotp.style.display="block"
            alert("OTP sent Successfully!!!")
            btnotp.style.display="none"
            showlogin.style.display="flex"
            console.log(res.data);
            localStorage.setItem("Admin",JSON.stringify(res.data.data))
        })
        .catch((err)=>{
            alert("Invalid Email or Password!!!")
            // alert(err.message)
        })
    }
    function login(e){
        e.preventDefault();
        if(otp==="123456"){
            alert("Logging Successfully!!!")
        navigate('/adminhomepage')
       
        }
    }


    return (
        <div className="adminlogin">
            <form onSubmit={loginotp}>
                <h2>Admin Login</h2>
                <input value={email} onChange={(e) => { setemail(e.target.value) }} type="email" placeholder="Enter the email id" required /> <br /> <br />
                <input value={password} onChange={(e) => { setpassword(e.target.value) }} type="password" placeholder="Enter the password" required /> <br /> <br />
                <div id="otp"><label>Enter the valid OTP:</label><input type="text" value={otp} onChange={(e)=>{setotp(e.target.value)}} /></div>
                <button id="btnotp" className='btn btn-danger'>Get OTP</button>
                <button id="login" className='btn btn-danger' onClick={login}>Login</button>
                <div id="link">
                    <p>Are you new to page? <Link to='/adminsignup'> Register here</Link></p>
                    <p ><Link style={{color:"white"}} to='/forgot-password'>forgot password?</Link></p>
                </div>
                
            </form>
        </div>
    );
}

export default AdminLogin;