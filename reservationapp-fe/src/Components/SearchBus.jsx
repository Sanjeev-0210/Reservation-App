import SearchIcon from '@mui/icons-material/Search';
import axios from 'axios';
import { useState } from 'react';

const SearchBus = () => {

    let [from_loc, setfrom_loc] = useState("")
    let [to_loc, setto_loc] = useState("")
    let [departure_date, setdeparture_date] = useState("")

    let [data,setdata] = useState([])

    function searchbuses(e) {
        e.preventDefault()
        axios.get(`http://localhost:8080/api/bus/findBuses?from_loc=${from_loc}&to_loc=${to_loc}&date=${departure_date}`)
            .then((res) => {
                console.log(res.data);
                setdata(res.data.data)
                alert("Buses Found")

            })
            .catch((err) => {
                console.log(err);
                alert("Bus Not Found")
            })
    }



    return (
        <div className="searchbus">
            <div className="search-input">
                <form onSubmit={searchbuses}>
                    <input value={from_loc} onChange={(e) => { setfrom_loc(e.target.value) }} type="text" placeholder="From Location" />
                    <input value={to_loc} onChange={(e) => { setto_loc(e.target.value) }} type="text" placeholder="To Location" />
                    <input value={departure_date} onChange={(e) => { setdeparture_date(e.target.value) }} type="date" />
                    <button>Search <SearchIcon /></button>
                </form>
            </div>
            <div className='lists'>
            {data.map((item) => {
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
                        
                        <div><button className="btn btn-danger">Book Seats</button></div>

                    </div>
                )
            })}
            </div>
        </div>
    );
}

export default SearchBus;