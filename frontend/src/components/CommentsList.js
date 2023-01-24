import '../App.css'
let num = 0;
const CommentsList = ({ comments }) => (
    <div className="comments-container">
        <h3>Comments:</h3>
        {comments.map((comment) => (
            <div
                className="comment"
                key={comment.postedBy + ": " + comment.text + num++ }
            >
                <h4>{comment.postedBy}</h4>
                <p>{comment.text}</p>
            </div>
        ))}
    </div>
);

export default CommentsList;