import { useState } from "react";
import { Paper, Alert } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

const CreateAccountPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const createAccount = async () => {
        try {
            if (password !== confirmPassword) {
                setError("Passwords are not the same.");
                return;
            }
            await createUserWithEmailAndPassword(getAuth(), email, password);
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
            <h1>Create account</h1>
            {error && <Alert severity="error">{error}</Alert>}
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
            <input
                value={confirmPassword}
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter your password"
            />
            <button onClick={createAccount}>Create account</button>
            <Link to="/login">Already have an account? Log-in here.</Link>
        </Paper>
    );
};
export default CreateAccountPage;
