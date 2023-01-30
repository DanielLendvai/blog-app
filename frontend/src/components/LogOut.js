import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Button, ThemeProvider, createTheme } from "@mui/material";

function LogOut() {
    const auth = getAuth();
    const navigate = useNavigate();

    const theme = createTheme({
        palette: {
            primary: {
                main: "#000000",
            },
            secondary: {
                main: "#454322",
            },
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <Button
                sx={{ position: "fixed", bottom: "0", fontSize: "16px" }}
                color="primary"
                size="medium"
                variant="outlined"
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
            </Button>
        </ThemeProvider>
    );
}

export default LogOut;
