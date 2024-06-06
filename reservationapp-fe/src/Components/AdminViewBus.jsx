import axios from "axios";
import { useEffect, useState } from "react";
import '../Styles/BusView.css'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useNavigate } from "react-router-dom";


const AdminViewBus = () => {

    let navigate = useNavigate("");

    let [bus, setbus] = useState([])
    let [force,setforce] = useState(true)

    useEffect(() => {
        axios.get('http://localhost:8080/api/bus')
            .then((res) => {
                console.log(res);
                setbus(res.data.data)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [force])  //----> Force rendering


    function removeBus(id, bus_no) {
        axios.delete(`http://localhost:8080/api/bus/${id}`)
            .then((res) => {
                setforce(false)
                alert(`Bus Number ${bus_no} has been Removed from the Bus lists!!!`)
                console.log(res);
            })
            .catch((err) => {
                alert("Can't Remove Bus from the List!!!")
            })
    }

    function editBus(id){
        navigate(`/adminhomepage/editbus/${id}`)
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
                        <div><h2>From Location</h2>
                            <p>{item.from_loc}</p></div>
                        <div><h2>To Location</h2>
                            <p>{item.to_loc}</p></div>
                        <div><h2>Bus Number</h2>
                            <p>{item.bus_no}</p></div>
                        <div><button className="btn btn-danger">Book Seats</button>

                        </div>
                        <p onClick={() => editBus(item.id)} style={{ color: 'white', cursor: 'pointer' }}><EditNoteIcon /></p>
                        <p onClick={() => removeBus(item.id, item.bus_no) } style={{ color: 'white', cursor: 'pointer' }}><DeleteForeverIcon /></p>
                    </div>
                )
            })}

        </div>
    );
}

export default AdminViewBus;