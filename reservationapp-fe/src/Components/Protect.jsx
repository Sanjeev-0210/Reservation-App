import { Navigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Protect = ({ Child, role }) => {
    const [isVerified, setIsVerified] = useState(false);

    useEffect(() => {
        const admin = localStorage.getItem("Admin");
        const user = localStorage.getItem("User");

        if ((role === "admin" && admin) || (role === "user" && user)) {
            setIsVerified(true);
        }
    }, [role]);

    return (
        <div className="protect">
            {isVerified ? <Child /> : <Navigate to="/" />}
        </div>
    );
}

export default Protect;
