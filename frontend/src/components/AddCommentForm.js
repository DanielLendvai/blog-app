import { useState } from "react";
import axios from "axios";

const AddCommentForm = ({ articleName, onArticleUpdated }) => {
    const [name, setName] = useState("");
    const [commentText, setCommentText] = useState("");

    const addComment = async () => {
        const response = await axios.post(
            `/api/articles/${articleName}/comments`,
            {
                postedBy: name + ":",
                text: commentText,
            }
        );
        const updatedArticle = response.data;
        onArticleUpdated(updatedArticle);
        setName("");
        setCommentText("");
    };

    return (
        <div className="add-comment-form">
            <h3>Add a comment</h3>
            <label>Name: </label>
            <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
            />
            <label>Comment: </label>
            <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows="1"
                cols="40"
            />
            {(commentText.length && name.length > 0) ? (
                <button onClick={addComment}>Send comment.</button>
            ) : (
                ""
            )}
        </div>
    );
};

export default AddCommentForm;
