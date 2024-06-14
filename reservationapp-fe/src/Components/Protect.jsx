import { Navigate } from "react-router-dom";
import React from "react";

const Protect = ({ Child}) => {

        let x = localStorage.getItem("Admin");
        let y = localStorage.getItem("User");

    function verify(){
        if (y!=null) {
            return true;
        }
        else if(x!=null){
            return true;
        }
        else{
            return false;
        }
    }

    return (
        <div className="protect">
            {verify() ? <Child /> : <Navigate to="/" />}
        </div>
    );
}

export default Protect;
