import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import '../Styles/NavDropdown.css'
import { Link } from 'react-router-dom';

function NavDropdown() {
  return (
    <DropdownButton id="dropdown-basic-button" title="Account">
      <Dropdown.Item><Link className='item' to='/adminhomepage/addbus'>Add Bus</Link></Dropdown.Item>
      <Dropdown.Item href="#/action-2" className='item'>Bus Lists</Dropdown.Item>
      <Dropdown.Item href="#/action-3" className='item'>Edit Profile</Dropdown.Item>
      <Dropdown.Item href="#/action-4" className='item'>Log out</Dropdown.Item>
    </DropdownButton>
  );
}

export default NavDropdown;