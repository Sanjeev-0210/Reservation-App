import axios from "axios";
import { useState } from "react";
import '../Styles/AddBus.css'

const AddBus = () => {

   let[name,setname]=useState("");
   let[bus_no,setbus_no]=useState("");
   let[departure_date,setdeparture_date]=useState("");
   let[from_loc,setfrom_loc]=useState("");
   let[to_loc,setto_loc]=useState("");
   let[no_of_seats,setno_of_seats]=useState("");

    let busdata = {name,bus_no,departure_date,from_loc,to_loc,no_of_seats}

    let admin = JSON.parse(localStorage.getItem("Admin"))
    console.log(admin);
    // console.log(typeof(admin));//string

    function addbus(e){
        e.preventDefault();
        axios.post(`http://localhost:8080/api/bus/${admin.id}`,busdata)
        .then((res)=>{
            alert("Bus has been Added Successfully!!!")
            console.log(res.data);
        })
        .catch((err)=>{
            console.log(err);
            alert("Couldn't add bus,Invalid Admin ID!!!")
        })
        
    }

    return ( 
        <div className="addbus">
            <h2>Add Bus</h2>
        <form onSubmit={addbus}>
            <label >Name</label>
            <input value={name} onChange={(e)=>{setname(e.target.value)}} type="text" required/>
            <label >Bus number</label>
            <input value={bus_no} onChange={(e)=>{setbus_no(e.target.value)}} type="text" required/>
            <label >Departure Date</label>
            <input value={departure_date} onChange={(e)=>{setdeparture_date(e.target.value)}} type="date" required/>
            <label >From Location</label>
            <input value={from_loc} onChange={(e)=>{setfrom_loc(e.target.value)}} type="text" required/>
            <label >To Location</label>
            <input value={to_loc} onChange={(e)=>{setto_loc(e.target.value)}} type="text" required/>
            <label >Number of Seats</label>
            <input value={no_of_seats} onChange={(e)=>{setno_of_seats(e.target.value)}} type="number" required/>
            <button className="btn">Add</button>
        </form>
        </div>
     );
}
 
export default AddBus;