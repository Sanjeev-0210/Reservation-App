import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useState } from 'react';
import '../Styles/SearchBus.css'
import { useNavigate } from 'react-router-dom';

const SearchBus = () => {

    let navigate = useNavigate("")

    let [from_loc, setfrom_loc] = useState("")
    let [to_loc, setto_loc] = useState("")
    let [departure_date, setdeparture_date] = useState("")

    let [data, setdata] = useState([])
    let [NFBus, setNFBus] = useState("")
    let [loading, setLoading] = useState(false);

    function searchbuses(e) {
        e.preventDefault()
        setLoading(true)
        axios.get(`http://localhost:8080/api/bus/findBuses?from_loc=${from_loc}&to_loc=${to_loc}&date=${departure_date}`)
            .then((res) => {
                if (res.data.data) {
                    console.log(res.data);
                    setdata(res.data.data)
                    setNFBus("");
                }
                else {
                    setdata([]);
                    setNFBus("Huh-ohh! No Bus Found on specified Date");
                }
            })
            .catch((err) => {
                console.log(err);
                setdata([]);
                setNFBus("Huh-ohh! No Bus Found on specified Date")
            })
            .finally(() => {
                setLoading(false)
            })
    }

    function bookseat(id) {
        navigate(`/userhomepage/bookbus/${id}`)

    }



    return (
        <div className="searchbus">
            <h1>India's No. 1 Online Bus Ticket Booking Site</h1>
            <div className="search-input">
                <form onSubmit={searchbuses}>
                    <input value={from_loc} onChange={(e) => { setfrom_loc(e.target.value) }} type="text" placeholder="From Location" required />
                    <input value={to_loc} onChange={(e) => { setto_loc(e.target.value) }} type="text" placeholder="To Location" required />
                    <input value={departure_date} onChange={(e) => { setdeparture_date(e.target.value) }} type="date" required />
                    <button>Search <SearchIcon /></button>
                </form>
            </div>

            <div className='lists'>
                <div className="sort">
                    <h5>SortBy:</h5>
                </div>
                {loading ? <p>Loading...</p> :
                    data.length > 0 ? data.map((item) => {
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

                                <div><button onClick={() => bookseat(item.id)} className="btn btn-primary">Book Seats</button></div>

                            </div>
                        )
                    }) : <h1>{NFBus}</h1>}

            </div>
        </div>
    );
}

export default SearchBus;