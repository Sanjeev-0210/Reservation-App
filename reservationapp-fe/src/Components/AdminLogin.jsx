import { Link, useNavigate } from "react-router-dom";
import '../Styles/AdminLogin.css'
import { useState } from "react";
import axios from "axios";

const AdminLogin = () => {
    let [email, setemail] = useState("");
    let [password, setpassword] = useState("");

    let navigate = useNavigate("");

    function login(e) {
        e.preventDefault();
        axios.post(`http://localhost:8080/api/admins/verify-by-email?email=${email}&password=${password}`)
        .then((res)=>{
            alert("Logging Successfully!!!")
            console.log(res);
            navigate('/adminhomepage')
        })
        .catch((err)=>{
            alert("Logging Failed!!!")
        })

    }


    return (
        <div className="adminlogin">
            <form onSubmit={login}>
                <h2>Admin Login</h2>
                <input value={email} onChange={(e) => { setemail(e.target.value) }} type="email" placeholder="Enter the email id" required /> <br /> <br />
                <input value={password} onChange={(e) => { setpassword(e.target.value) }} type="password" placeholder="Enter the password" required /> <br /> <br />
                <button className='btn btn-danger'>Login</button>
                <p>Are you new to page? <Link to='/adminsignup'> Register here</Link></p>
            </form>
        </div>
    );
}

export default AdminLogin;