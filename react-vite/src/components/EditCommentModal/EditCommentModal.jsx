// EditCommentModal.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editComment } from "../../redux/comment";
import { useModal } from "../../context/Modal";
import styles from "./EditCommentModal.module.css";

export default function EditCommentModal({ commentId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const currentComment = useSelector((state) => state.comments[commentId]);

    // const currentFax = useSelector((state) => state.artifax);
    // const faxId = currentFax.id;
    // const allComments = useSelector((state) => state.comments);
    

    // Initialize local state for the comment text
    const [text, setText] = useState("");
    const [error, setError] = useState(null);

    // Prepopulate the form with the current comment text
    useEffect(() => {
        if (currentComment) {
            setText(currentComment.text);
        }
    }, [currentComment]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!text) {
            setError("Comment text is required.");
            return;
        }

        const formData = { commentId, text };

        try {
            // Dispatch the editComment action to update the comment
            await dispatch(editComment(formData));
            closeModal(); // Close the modal after successful submission
        } catch (error) {
            setError("An error occurred while updating the comment.");
            console.error(error);
        }
    };

    return (
        <div className={styles.editCommentModal}>
            <h2>Edit Comment</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="text">Comment</label>
                    <textarea
                        id="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
}

