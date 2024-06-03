import { Link } from 'react-router-dom';
import '../Styles/AdminFooter.css'
const AdminFooter = () => {
    return (
        <div className="adminfooter">
            <div className='links'>
                <div id='about'>
                    <Link to='/adminhomepage'> <h2><span>go</span>ibibo<sup>.in</sup></h2></Link>
                    <p>gobibio is the world's largest online bus ticket booking service trusted by over 
                        25 million happy customers globally. gobibio offers bus ticket booking through its website, 
                        iOS and Android mobile apps for all major routes.</p>
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className='rights'></div>
        </div>
    );
}

export default AdminFooter;