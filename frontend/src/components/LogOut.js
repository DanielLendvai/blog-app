import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Button, ThemeProvider, createTheme } from "@mui/material";

function LogOut() {
    const auth = getAuth();
    const navigate = useNavigate();

    return (
        <Link
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
        </Link>
    );
}

export default LogOut;
