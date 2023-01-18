import { useParams } from "react-router-dom";
import NotFoundPage from "./NotFoundPage";
import articles from "./article-content";
import "./Article.css";

const Article = () => {
    // const params = useParams();
    // const articleId = params.articleId;
    // destructured
    const { articleId } = useParams();
    const article = articles.find((article) => article.name === articleId);

    if (!article) {
        return <NotFoundPage />;
    }
    
    console.log(article);

    return (
        <div className="article-container">
            <h1>{article.title}</h1>
            {article.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
            ))}
        </div>
    );
};

export default Article;
