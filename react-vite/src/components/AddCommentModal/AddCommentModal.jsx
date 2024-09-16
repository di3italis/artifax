// AddCommentModal.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../redux/comment"; // Assuming you have an addComment thunk
import { useModal } from "../../context/Modal";
import styles from "./AddCommentModal.module.css"; // You can reuse or create new styles

export default function AddCommentModal({ faxId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    const [text, setText] = useState("");
    const [error, setError] = useState(null);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!text.trim()) {
            setError("Comment text is required.");
            return;
        }

        const formData = { faxId, text };

        try {
            await dispatch(addComment(formData)); // Dispatch the addComment action to add the new comment
            closeModal(); // Close the modal after successful submission
        } catch (error) {
            setError("An error occurred while adding the comment.");
            console.error(error);
        }
    };

    return (
        <div className={styles.addCommentModal}>
            <h2>Add Comment</h2>
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
                <button type="submit">Add Comment</button>
                <button type="button" onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
}

