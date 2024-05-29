import '../Styles/AdminSignup.css';

const AdminSignup = () => {
    return ( 
            <div className="adminsignup">
            <h2>Register Here</h2>
            <form action="">
                <label>Name: </label>
                <input type="text" placeholder="Enter your name" required/> 
                <label>Email: </label>
                <input type="email" placeholder="Enter your email id" required/>
                <label>Phone: </label>
                <input type="tel" placeholder="Enter your phone number" required/>
                <label>GST_number: </label>
                <input type="text" placeholder="Enter your GST number" required/>
                <label>Travels Name: </label>
                <input type="text" placeholder="Enter your travels name" required/>
                <label>Password: </label>
                <input type="password" placeholder="Enter your password" required/>
                <button className='btn btn-primary'>Sign up</button>
            </form>
            
        </div>
     );
}
 
export default AdminSignup;