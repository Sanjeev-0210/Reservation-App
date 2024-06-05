import { useState } from 'react';
import '../Styles/ResetPassword.css'
const ResetPassword = () => {
    let[newpwd,setnewpwd] = useState("")
    let[confirmpwd,setconfirmpwd] = useState("")

    function reset(){
        if(newpwd===confirmpwd){
            alert("Password reset successfully!!")
        }
        else{
            alert("Password Mismatched!!!")
        }
       
    }

    return ( 
        <div className="resetpassword">
            <h2>Reset Password</h2>
            <form onSubmit={reset}>
                <label htmlFor="">New Password</label>
                <input value={newpwd} onChange={(e)=>setnewpwd(e.target.value)} type="text" required/> 
                <label htmlFor="">Confirm New Password</label>
                <input value={confirmpwd} onChange={(e)=>setconfirmpwd(e.target.value)} type="password" required/>
                <button className='btn btn-primary'>Reset Password</button>
            </form>
        </div>
     );
}
 
export default ResetPassword;