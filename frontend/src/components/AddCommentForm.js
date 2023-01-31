import { useState } from "react";
import axios from "axios";
import useUser from "../hooks/useUser";

const AddCommentForm = ({ articleName, onArticleUpdated }) => {
    const [name, setName] = useState("");
    const [commentText, setCommentText] = useState("");
    const { user } = useUser();

    const addComment = async () => {
        const token = user && (await user.getIdToken());
        const headers = token ? { authtoken: token } : {};
        const response = await axios.post(
            `/api/articles/${articleName}/comments`,
            {
                postedBy: name + ":",
                text: commentText,
            },
            {
                headers,
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
            {user && <span>You are posting as {user.email}</span>}
            <textarea
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                rows="2"
                cols="40"
            />
            {commentText.length > 0 ? (
                <button onClick={addComment}>Send comment.</button>
            ) : (
                ""
            )}
        </div>
    );
};

export default AddCommentForm;
