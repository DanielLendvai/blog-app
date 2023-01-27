import { Card } from "@mui/material";
import { Link } from "react-router-dom";
const ArticlesList = ({ articles }) => {
    return (
        <>
            {articles.map((article) => (
                <Card key={article.name} variant="outlined" sx={{"padding":"20px"}}>
                    <Link
                        
                        className="article-list-item"
                        to={`/articles/${article.name}`}
                    >
                        <h2>{article.title}</h2>
                        <p>{article.content[0].substring(0, 150)}...</p>
                    </Link>
                </Card>
            ))}
        </>
    );
};
export default ArticlesList;
