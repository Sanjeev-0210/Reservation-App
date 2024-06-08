import { Navigate } from "react-router-dom";
import React from "react";
const Protect = (Child) => {

    let x = localStorage.getItem("Admin")

    function verify() {
        if (x != null){
            return true
        }   
        else{
            return false;
        }
    }
    return (
        <div className="protect">
            {verify()?<Child/>:<Navigate to='/adminlogin'/>}
        </div>
    );
}

export default Protect;