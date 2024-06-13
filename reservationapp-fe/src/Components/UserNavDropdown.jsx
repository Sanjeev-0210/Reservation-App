import { Link, useNavigate } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const UserNavDropdown = () => {

    let navigate = useNavigate("");

  function logout(e){
    e.preventDefault();
    alert("You have been Logged Out Successfully!!!")
    navigate('/userlogin')
  }

    return ( 
        <div className="usernavdropdown">
            <DropdownButton id="dropdown-basic-button" title="Account">
      <Dropdown.Item><Link className='item' to='/userhomepage'>Edit Profile</Link></Dropdown.Item>
      <Dropdown.Item ><Link className='item' to='/userhomepage/busview'>Bus Lists</Link></Dropdown.Item>
      <Dropdown.Item href="#/action-3" className='item'>Booking History</Dropdown.Item>
      <Dropdown.Item><Link className='item' onClick={logout}>Log out</Link></Dropdown.Item>
    </DropdownButton>
        </div>
     );
}
 
export default UserNavDropdown;