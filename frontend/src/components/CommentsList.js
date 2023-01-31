import axios from "axios";
import "../App.css"

const CommentsList = ({ articleInfo, setArticleInfo }) => {
let num = 0;
    const deleteComment = async () => {
        const response = await axios.delete(
            `/api/articles/${articleInfo.name}/comments`,
            {
                postedBy: articleInfo.comments.postedBy,
                text: articleInfo.comments.text
            }
        );
        const updatedArticle = response.data;
        setArticleInfo(updatedArticle);
        
    };
    console.log(articleInfo.comments);
    return (
        <div className="comments-container">
            <h3><i>Comments: </i></h3>
            {articleInfo.comments.map((comment) => (
                <div
                    className="comment"
                    key={comment.postedBy + ": " + comment.text + num++ }
                >
                    <h4>{comment.postedBy}</h4>
                    <p>{comment.text}</p>
                    {/* <button onClick={deleteComment}>Delete</button> */}
                </div>
            ))}
        </div>
    );
};

export default CommentsList;
