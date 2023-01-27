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

function App() {
    const { user, setIsLoading } = useUser();
    
    return (
        <BrowserRouter>
            <div className="App">
                <NavBar />
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
                                        <p>You already logged in.</p>
                                        <button>Log out.</button>
                                    </div>
                                ) : (
                                    <LoginPage />
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
