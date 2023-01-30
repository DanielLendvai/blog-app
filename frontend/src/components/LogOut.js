import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function LogOut() {
    const auth = getAuth();
    const navigate = useNavigate();
    return (
        <button
            onClick={() => {
                signOut(auth)
                    .then(() => {
                        navigate("/login");
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }}
        >
            Log out
        </button>
    );
}

export default LogOut;
