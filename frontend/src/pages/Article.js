import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import articles from "./article-content";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import useUser from "../hooks/useUser";
import "./Article.css";
import { Paper } from "@mui/material";


const Article = () => {
    const [articleInfo, setArticleInfo] = useState({
        upvotes: 0,
        comments: [],
    });
    const { articleId } = useParams();
    

    const { user, isLoading } = useUser();
    console.log(user);

    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await axios.get(`/api/articles/${articleId}`);
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        };
        loadArticleInfo();
    }, [articleId]);

    const article = articles.find((article) => article.name === articleId);

    const addUpvote = async () => {
        const response = await axios.put(`/api/articles/${articleId}/upvote`);
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    };
    const addDowvote = async () => {
        const response = await axios.put(`/api/articles/${articleId}/downvote`);
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
    };


    if (!article) {
        return <NotFoundPage />;
    }

    return (
        <div className="article-container">
            
            <h1>{article.title}</h1>
            {user ? (
                <div className="vote-buttons">
                    <button onClick={addUpvote}>up</button>
                    <button onClick={addDowvote}>down</button>
                </div>
            ) : (
                "Please log-in to rate."
            )}
            <p>This article has {articleInfo.upvotes} upvote(s).</p>
            <Paper
                sx={{
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                }}
                elevation={3}
            >
                {article.content.map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                ))}
            </Paper>
            <Paper
                sx={{
                    display: "flex",
                    width: "800px",
                    maxHeight: "200px",
                    gap: "20px",
                    padding: "20px",
                }}
            >
                {user ? (
                    <AddCommentForm
                        articleName={articleId}
                        onArticleUpdated={(updatedArticle) =>
                            setArticleInfo(updatedArticle)
                        }
                    />
                ) : (
                    "Please log-in to add comments."
                )}
                <CommentsList
                    articleInfo={articleInfo}
                    setArticleInfo={setArticleInfo}
                />
            </Paper>
        </div>
    );
};

export default Article;
