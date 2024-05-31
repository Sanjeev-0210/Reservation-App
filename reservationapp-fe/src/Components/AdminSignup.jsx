import { useState } from 'react';
import '../Styles/AdminSignup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AdminSignup = () => {

    let[name,setname] = useState("");
    let[email,setemail] = useState("");
    let[phone,setphone] = useState("");
    let[gst_number,setgst_number] = useState("");
    let[travels_name,settravels_name] = useState("");
    let[password,setpassword] = useState("");

    let navigate = useNavigate("")

    let data = {name,email,phone,gst_number,travels_name,password}

    function adminsignup(e){
        e.preventDefault();
        axios.post('http://localhost:8080/api/admins',data)
        .then((res)=>{
            alert("Data Added Successfully")
            console.log(res)
            navigate('/adminlogin')
        })
        .catch((err)=>{
            alert("Data Added Failed!!!")
            console.log(err);
        })
        
    }

    return ( 
            <div className="adminsignup">
            <h2>Register Here</h2>
            <form onSubmit={adminsignup}>
                <label>Name: </label>
                <input value={name} onChange={(e)=>{setname(e.target.value)}} type="text" placeholder="Enter your name" required/> 
                <label>Email: </label>
                <input value={email} onChange={(e)=>{setemail(e.target.value)}} type="email" placeholder="Enter your email id" required/>
                <label>Phone: </label>
                <input value={phone} onChange={(e)=>{setphone(e.target.value)}}  type="tel" placeholder="Enter your phone number" required/>
                <label>GST_number: </label>
                <input value={gst_number} onChange={(e)=>{setgst_number(e.target.value)}} type="text" placeholder="Enter your GST number" required/>
                <label>Travels Name: </label>
                <input value={travels_name} onChange={(e)=>{settravels_name(e.target.value)}} type="text" placeholder="Enter your travels name" required/>
                <label>Password: </label>
                <input value={password} onChange={(e)=>{setpassword(e.target.value)}} type="password" placeholder="Enter your password" required/>
                <button>Sign up</button>
            </form>
            
        </div>
     );
}
 
export default AdminSignup;