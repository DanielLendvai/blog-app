import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import NotFoundPage from "./NotFoundPage";
import articles from "./article-content";
import CommentsList from "../components/CommentsList";
import AddCommentForm from "../components/AddCommentForm";
import "./Article.css";

const Article = () => {
    const [articleInfo, setArticleInfo] = useState({
        upvotes: 0,
        comments: [],
    });
    // const params = useParams();
    const { articleId } = useParams();

    useEffect(() => {
        const loadArticleInfo = async () => {
            const response = await axios.get(`/api/articles/${articleId}`);
            const newArticleInfo = response.data;
            setArticleInfo(newArticleInfo);
        };
        loadArticleInfo();
    }, [articleId]);

    // const articleId = params.articleId;
    // destructured

    const article = articles.find(article => article.name === articleId);

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
    console.log(articleInfo )
    return (
        <div className="article-container">
            <h1>{article.title}</h1>
            <div className="vote-buttons">
                <button onClick={addUpvote}>up</button>
                <button onClick={addDowvote}>down</button>
            </div>
            <p>This article has {articleInfo.upvotes} upvote(s).</p>
            {article.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
            <AddCommentForm articleName={articleId} onArticleUpdated={updatedArticle => setArticleInfo(updatedArticle)} />
            <CommentsList comments={articleInfo.comments} />
        </div>
    );
};

export default Article;
