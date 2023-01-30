import { Paper } from "@mui/material";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import LogOut from "../components/LogOut";

const LoginPage = () => {
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
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                type="email"
            />
            <input
                value={password}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Your password"
            />
            <button onClick={logIn}>Log-in</button>
            <Link to="/create-account">Create your account here.</Link>
        </Paper>
    );
};
export default LoginPage;
