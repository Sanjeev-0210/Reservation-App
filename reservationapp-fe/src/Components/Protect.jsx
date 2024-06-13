import { Navigate } from "react-router-dom";
import React from "react";
const Protect = ({Child}) => {

    let x = localStorage.getItem("Admin")
    let y = localStorage.getItem("User")

    function verifyx() {
        if (x != null){
            return true
        }   
        else{
            return false;
        }
    }

    // function verifyy() {
    //     if (y != null){
    //         return true
    //     }   
    //     else{
    //         return false;
    //     }
    // }

    return (
        <div className="protect">
            {verifyx()?<Child/>:<Navigate to='/adminlogin'/>}
            {/* {verifyy()?<Child/>:<Navigate to='/'/>} */}
        </div>
    );
}

export default Protect;