import { Card } from "@mui/material";
import { Link } from "react-router-dom";
const ArticlesList = ({ articles }) => {
    return (
        <>
            {articles.map((article) => (
                <Card
                    key={article.name}
                    variant="outlined"
                    sx={{ padding: "10px" }}
                >
                    <div>
                        <Link
                            className="article-list-item"
                            to={`/articles/${article.name}`}
                        >
                            <p><strong>{article.title}</strong></p>
                            <p>{article.content[0].substring(0, 150)}...</p>
                        </Link>
                    </div>
                </Card>
            ))}
        </>
    );
};
export default ArticlesList;
