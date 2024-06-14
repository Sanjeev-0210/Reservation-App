import { Link } from 'react-router-dom';
import '../Styles/AdminFooter.css'
const AdminFooter = () => {
    return (
        <div className="adminfooter">
            <div className='links'>
                <div id='about'>
                    <Link to='/adminhomepage'> <h2><span>do</span>ibibo<sup>.in</sup></h2></Link>
                    <p>dobibio is the world's largest online bus ticket booking service trusted by over 
                        25 million happy customers globally. dobibio offers bus ticket booking through its website, 
                        iOS and Android mobile apps for all major routes.</p>
                </div>
                <div className='sub-link'>
                    <ul >
                        <h4>About dobibio</h4>
                        <Link><li>About us</li></Link>
                        <Link><li>Investor Relations</li></Link>
                        <Link><li>Contact us</li></Link>
                        <Link><li>Mobile version</li></Link>
                        <Link><li>Sitemap</li></Link>
                        <Link><li>Offers</li></Link>
                        <Link><li>Careers</li></Link>
                        <Link><li>Values</li></Link>
                    </ul>

                </div>
                <div className='sub-link'>
                <ul >
                        <h4>Info</h4>
                        <Link><li>T&C</li></Link>
                        <Link><li>Privacy policy</li></Link>
                        <Link><li>FAQ</li></Link>
                        <Link><li>Blog</li></Link>
                        <Link to='/adminsignup'><li>Admin registration</li></Link>
                        <Link to='/usersignup'><li>User registration</li></Link>
                        <Link><li>Insurance partner</li></Link>
                        <Link><li>User agreement</li></Link>
                        <Link><li>Bus Timetable</li></Link>
                    </ul>
                </div>
                <div className='sub-link'>
                <ul >
                        <Link><h4>Global Sites</h4></Link>
                        <Link><li>India</li></Link>
                        <Link><li>Singapore</li></Link>
                        <Link><li>Malaysia</li></Link>
                        <Link><li>Indonesia</li></Link>
                        <Link><li>Peru</li></Link>
                        <Link><li>Colombia</li></Link>
                        <Link><li>Cambodia</li></Link>
                        <Link><li>Vietnam</li></Link>
                    </ul>
                </div>
                <div className='sub-link'>
                <ul >
                        <h4>Our Partners</h4>
                        <Link><li>Dobibio Bus</li></Link>
                        <Link><li>Dobibio Hotels</li></Link>
                        <Link><li>BlueBus</li></Link>
                        <Link><li>Makeyourtrip Hotels</li></Link>
                    </ul>
                </div>
            </div>
            <hr />
            <div className='rights'>
                <p>Ⓒ 2024 Dobibio India Pvt Ltd. All rights reserved</p>

            </div>
        </div>
    );
}

export default AdminFooter;