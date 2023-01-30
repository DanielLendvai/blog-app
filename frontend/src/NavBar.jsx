import { Link } from "react-router-dom";
import LogOut from "./components/LogOut";
import useUser from "./hooks/useUser";
import "./NavBar.css";

const NavBar = () => {
    const { user } = useUser();
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/articles">Articles</Link>
                </li>
                <li>{user ? <LogOut /> : <Link to="/login">Log-in</Link>}</li>
            </ul>
        </nav>
    );
};
export default NavBar;
