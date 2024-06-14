import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import '../Styles/BookBus.css'
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

const BookBus = () => {

    let params = useParams("")
    let navigate = useNavigate("")
    let [count, setcount] = useState(1);

    let user = JSON.parse(localStorage.getItem("User"))


    let[bus_id,setbus_id] = useState("")
    let [name, setname] = useState("")
    let [bus_no, setbus_no] = useState("");
    let [departure_date, setdeparture_date] = useState("");
    let [from_loc, setfrom_loc] = useState("");
    let [to_loc, setto_loc] = useState("");
    let [cost_per_seat, setcost_per_seat] = useState("");

    useEffect(()=>{
        axios.get(`http://localhost:8080/api/bus/${params.id}`)
        .then((res) => {
            console.log(res.data.data);
            setbus_id(res.data.data.id)
            setname(res.data.data.name)
            setbus_no(res.data.data.bus_no)
            setdeparture_date(res.data.data.departure_date)
            setfrom_loc(res.data.data.from_loc)
            setto_loc(res.data.data.to_loc)
            setcost_per_seat(res.data.data.cost_per_seats)
        })
        .catch((err) => {
            console.log(err);
        })
    })

    const [currentIndex, setCurrentIndex] = useState(0);

    const images = [
        'https://2.wlimg.com/product_images/bc-full/2021/9/8250647/sleeper-coach-bus-body-1631249676-5984194.jpeg',
        'https://thumbs.dreamstime.com/b/bhopal-india-february-interior-sleeper-bus-ind-187460177.jpg',
        'https://i.pinimg.com/originals/25/ea/56/25ea5660424c809eab85d4a081a35c29.jpg',
        'https://i.pinimg.com/originals/ad/09/04/ad0904f91e1fd142609be7b1c4eef8e9.jpg'
        // Add more image URLs as needed
    ];

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };

    function add() {
        setcount(count + 1);
        // console.log(count);
    }
    function minus() {
        if (count > 1)
            setcount(count - 1);
        // console.log(count);
    }


    function bookticket(count){
        axios.post(`http://localhost:8080/api/tickets/${bus_id}/${user.id}/${count}`)
        .then((res)=>{
            // console.log(res.data.data);
            alert("Bus Tickets Booked Successfully!!!")
            navigate('/userhomepage')
        })
        .catch((err)=>{
            console.log(err);
            alert("Invalid Bus!!!")
        })
    }


    return (
        <div className="bookbus">
            <div className="img">
                <button className="prev" onClick={prevSlide}>&lt;</button>
                <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
                <button className="next" onClick={nextSlide}>&gt;</button>
            </div>
            <div className="content">
                <div><h5>Boarding & Dropping </h5>
                    <p>From: {from_loc}</p>
                    <p>To: {to_loc}</p></div>
                <div>
                    <h5>Bus Name  & Bus Number</h5>
                    <p>{name}</p>
                    <p>{bus_no}</p>
                    </div>
                    <div>
                    <h5>Departure date</h5>
                    <p>{departure_date}</p>
                </div>

                <div><h5>Cost per Seat</h5>
                    <p>{cost_per_seat}</p></div>
                <div><h5>No. of Seats</h5>
                    <p><RemoveIcon className="icon" onClick={minus} /> {count} <AddIcon className="icon" onClick={add} /></p></div>
                <div><h5>Amount to be Pay:</h5>
                <p>₹ {count * cost_per_seat}</p></div>

                <div><button className="btn btn-danger" onClick={()=>bookticket(count)}>Proceed to Book</button></div>

            </div>
        </div>
    );
}

export default BookBus;