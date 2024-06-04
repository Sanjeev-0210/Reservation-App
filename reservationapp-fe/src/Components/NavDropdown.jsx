import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../Styles/NavDropdown.css'
import { Link, useNavigate } from 'react-router-dom';

function NavDropdown() {
  
  let navigate = useNavigate("");

  function logout(e){
    e.preventDefault();
    alert("You have been Logged Out Successfully!!!")
    navigate('/adminlogin')
  }

  return (
    <DropdownButton id="dropdown-basic-button" title="Account">
      <Dropdown.Item><Link className='item' to='/adminhomepage/addbus'>Add Bus</Link></Dropdown.Item>
      <Dropdown.Item ><Link className='item' to='/adminhomepage/busview'>Bus Lists</Link></Dropdown.Item>
      <Dropdown.Item href="#/action-3" className='item'>Edit Profile</Dropdown.Item>
      <Dropdown.Item><Link className='item' onClick={logout}>Log out</Link></Dropdown.Item>
    </DropdownButton>
  );
}

export default NavDropdown;