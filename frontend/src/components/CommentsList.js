import axios from "axios";


const CommentsList = ({ articleInfo, onArticleUpdated }) => {
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
        onArticleUpdated(updatedArticle);
        console.log(articleInfo);
    };

    return (
        <>
            <h3>Comments:</h3>
            {articleInfo.comments.map((comment) => (
                <div
                    className="comment"
                    key={comment.postedBy + ": " + comment.text + num++ }
                >
                    <h4>{comment.postedBy}</h4>
                    <p>{comment.text}</p>
                    <button onClick={deleteComment}>AAA</button>
                </div>
            ))}
        </>
    );
};

export default CommentsList;
