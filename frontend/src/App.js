import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import ArticlesListPage from "./pages/ArticlesListPage";
import About from "./pages/About";
import NavBar from "./NavBar";
import LoginPage from "./pages/LoginPage";
import CreateAccountPage from "./pages/CreateAccountPage";
import NotFoundPage from "./pages/NotFoundPage";
import useUser from "./hooks/useUser";
import LogOut from "./components/LogOut";
import { Alert } from "@mui/material";
import { createTheme } from "@mui/material";

function App() {
    const { user } = useUser();
    
//main theme
    const theme = createTheme({
        palette: {
            primary: {
                main: "#000000",
            },
            secondary: {
                main: "#ff6f00",
            },
        },
    });

    return (
        <BrowserRouter>
            <div className="App">
                <NavBar />
                <LogOut />
                <div id="page-body">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route
                            path="/articles"
                            element={<ArticlesListPage />}
                        />
                        <Route
                            path="/articles/:articleId"
                            element={<Article />}
                        />
                        <Route
                            path="/login"
                            element={
                                user ? (
                                    <div>
                                        <Alert>You're already logged in.</Alert>
                                    </div>
                                ) : (
                                    <LoginPage theme={theme} />
                                )
                            }
                        />
                        <Route
                            path="/create-account"
                            element={<CreateAccountPage />}
                        />
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
