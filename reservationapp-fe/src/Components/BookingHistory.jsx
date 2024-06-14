import axios from "axios"
import { useEffect, useState } from "react"
import '../Styles/BookingHistory.css'

const BookingHistory = () => {
    let [tickets, settickets] = useState([])

    let user = JSON.parse(localStorage.getItem("User"))
    useEffect(() => {
        let user = JSON.parse(localStorage.getItem("User"))
      axios.get(`http://localhost:8080/api/tickets/${user.id}`)
        .then((res) => {
          console.log(res.data.data);
          settickets(res.data.data)
        })
        .catch((err) => {
          console.log(err);
        })
    }, [])


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

    return ( 
        <div className="bookinghistory">
                <h2>Booking <span>History</span></h2> <br />
                <div id="container">
                <div className="img">
                <button className="prev" onClick={prevSlide}>&lt;</button>
                <img src={images[currentIndex]} alt={`Slide ${currentIndex}`} />
                <button className="next" onClick={nextSlide}>&gt;</button>
            </div>
            <div id="user_detail"><h2>User Detail</h2>
            <p>Name: {user.name}</p>
            <p>Age: {user.age}</p>
            <p>Gender: {user.gender}</p>
            <p>Phone: {user.phone}</p>
            <p>Email: {user.email}</p>
            </div>
                </div>
                {tickets.map((x)=>{
                  return(
                   <div>
                    
                    <div className="content">
                <p><b>Source: </b> <br /> {x.source}</p>
                <p><b>Destination: </b> <br /> {x.destination}</p>
                <p><b>Date of Journey:</b> <br /> {x.dateAndTimeOfBooking}</p>
                <p><b>No. of Seats:</b> <br /> {x.numberOfSeatsBooked}</p>
                <p><b>Cost:</b> <br /> ₹ {x.cost}</p>
                <hr />
                </div>
                   </div>
                  )
                })}
            
    </div>
     );
}
 
export default BookingHistory;