import { useState } from 'react';
import '../Styles/UserSignup.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserSignup = () => {

    let[name,setname] = useState("");
    let[email,setemail] = useState("");
    let[phone,setphone] = useState("");
    let[age,setage] = useState("");
    let[gender,setgender] = useState("");
    let[password,setpassword] = useState("");

    let navigate = useNavigate("")

    let data = {name,email,phone,age,gender,password}

    function usersignup(e){
        e.preventDefault();
        axios.post('http://localhost:8080/api/users',data)
        .then((res)=>{
            alert("Registered Successfully")
            console.log(res)
            navigate('/userlogin')
        })
        .catch((err)=>{
            alert("Registeration Failed!!!")
            console.log(err);
        })
    }

    return ( 
        <div className="usersignup">
            <h2>Create Account</h2>
            <form onSubmit={usersignup}>
                <label>Name: </label>
                <input value={name} onChange={(e)=>{setname(e.target.value)}} type="text" placeholder="Enter your name" required/> 
                <label>Email: </label>
                <input value={email} onChange={(e)=>{setemail(e.target.value)}} type="email" placeholder="Enter your email id" required/>
                <label>Phone: </label>
                <input value={phone} onChange={(e)=>{setphone(e.target.value)}} type="tel" placeholder="Enter your phone number" required/>
                <label>Age: </label>
                <input value={age} onChange={(e)=>{setage(e.target.value)}} type="number" placeholder="Enter your age" required/>
                <label>Gender: </label>
                <span><input value="Male" onChange={(e)=>{setgender(e.target.value)}} type="radio" name="gender" /><label > Male </label> 
                <input value="Female" onChange={(e)=>{setgender(e.target.value)}} type="radio" name="gender"/><label > Female</label></span>
                <label>Password: </label>
                <input value={password} onChange={(e)=>{setpassword(e.target.value)}} type="password" placeholder="Enter your password" required/>
                <button>Sign up</button>
            </form>
        </div>
     );
}
 
export default UserSignup;