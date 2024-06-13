import axios from "axios";
import { useEffect, useState } from "react";
import '../Styles/BusView.css'
import { useNavigate } from "react-router-dom";

const BusView = () => {

    let [bus, setbus] = useState([])
    let navigate = useNavigate("")

    useEffect(() => {
        axios.get('http://localhost:8080/api/bus')
            .then((res) => {
                console.log(res);
                setbus(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    function bookseat(id){
       navigate(`/userhomepage/bookbus/${id}`)

    }

    return (
        <div className="busview">
            {bus.map((item) => {
                return (
                    <div className="buslists">
                        <div>
                            <h2>Bus Name</h2>
                            <p>{item.name}</p> </div>
                        <div><h2>Seats Available</h2>
                            <p><i>{item.no_of_seats}</i></p></div>
                        <div><h2>Departure date</h2>
                            <p>{item.departure_date}</p></div>
                            <div><h2>Bus Number</h2>
                            <p>{item.bus_no}</p></div>
                        <div><h2>From Location</h2>
                            <p>{item.from_loc}</p></div>
                        <div><h2>To Location</h2>
                            <p>{item.to_loc}</p></div>
                        
                        <div><button className="btn btn-danger" onClick={()=>bookseat(item.id)} >Book Seats</button></div>

                    </div>
                )
            })}

        </div>
    );
}

export default BusView;