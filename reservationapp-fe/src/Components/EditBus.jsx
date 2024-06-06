import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../Styles/AddBus.css'

const EditBus = () => {

    let params = useParams();
    let navigate = useNavigate("");

    let[name,setname]=useState("");
   let[bus_no,setbus_no]=useState("");
   let[departure_date,setdeparture_date]=useState("");
   let[from_loc,setfrom_loc]=useState("");
   let[to_loc,setto_loc]=useState("");
   let[no_of_seats,setno_of_seats]=useState("");


    useEffect(()=>{
        axios.get(`http://localhost:8080/api/bus/${params.id}`)
    .then((res)=>{
        console.log(res.data.data);
        setname(res.data.data.name)
        setbus_no(res.data.data.bus_no)
        setdeparture_date(res.data.data.departure_date)
        setfrom_loc(res.data.data.from_loc)
        setto_loc(res.data.data.to_loc)
        setno_of_seats(res.data.data.no_of_seats)
    })
    .catch((err)=>{
        console.log(err);
    })
    },[])

    let busdata = {name,bus_no,departure_date,from_loc,to_loc,no_of_seats}

    function editbus(e){
        e.preventDefault();
        axios.put(`http://localhost:8080/api/bus/${params.id}`,busdata)
        .then((res)=>{
            alert("Bus has been Edited Successfully!!!")
            navigate('/adminhomepage/adminviewbus')
            console.log(res.data);
        })
        .catch((err)=>{
            console.log(err);
            alert("Couldn't Edit bus,Invalid Bus ID!!!")
        })
        
    }

    return ( 
        <div className="addbus">
            <h2>Edit Bus</h2>
        <form onSubmit={editbus}>
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
            <button className="btn">Edit</button>
        </form>
        </div>
     );
}
 
export default EditBus;