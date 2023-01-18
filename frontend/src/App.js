import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Article from "./pages/Article";
import ArticlesListPage from "./pages/ArticlesListPage";
import About from "./pages/About";
import NavBar from "./NavBar";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
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
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
