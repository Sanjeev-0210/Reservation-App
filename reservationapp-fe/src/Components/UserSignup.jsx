import '../Styles/UserSignup.css'

const UserSignup = () => {
    return ( 
        <div className="usersignup">
            <h2>Create Account</h2>
            <form action="">
                <label>Name: </label>
                <input type="text" placeholder="Enter your name" required/> 
                <label>Email: </label>
                <input type="email" placeholder="Enter your email id" required/>
                <label>Phone: </label>
                <input type="tel" placeholder="Enter your phone number" required/>
                <label>Age: </label>
                <input type="number" placeholder="Enter your GST number" required/>
                <label >Gender: </label>
                <span><input type="radio" name="Gender"/><label > Male </label> <input type="radio" name="Gender"/><label > Female</label></span>
                <label>Password: </label>
                <input type="password" placeholder="Enter your password" required/>
                <button>Sign up</button>
            </form>
        </div>
     );
}
 
export default UserSignup;