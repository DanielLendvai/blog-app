import { Button, Paper, TextField, ThemeProvider } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const LoginPage = ({theme}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const logIn = async () => {
        try {
            await signInWithEmailAndPassword(getAuth(), email, password);
            navigate("/articles");
        } catch (e) {
            setError(e.message);
        }
    };

    return (
        <ThemeProvider theme={theme}>
        <Paper 
            sx={{
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "20px",
            }}
        >
            <h1>Log in</h1>
            {error && <p className="error">{error}</p>}
            <TextField
            variant="standard"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                type="email"
            />
            <TextField
            variant="standard"
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
            />
            <Button color="primary" variant="outlined" onClick={logIn}>Log-in</Button>
            <Link underline="none" to="/create-account">Create your account here.</Link>
        </Paper>
        </ThemeProvider>
    );
};
export default LoginPage;
