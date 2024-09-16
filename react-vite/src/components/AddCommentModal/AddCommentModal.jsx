// AddCommentModal.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addComment } from "../../redux/comment";
import { useModal } from "../../context/Modal";
import styles from "./AddCommentModal.module.css";

export default function AddCommentModal({ faxId }) {
    const dispatch = useDispatch();
    const [text, setText] = useState("");
    const [error, setError] = useState(null);
    const { closeModal } = useModal();



    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!text) {
            setError("Comment text is required.");
            return;
        }


        try {
            let formData = {};
            formData = { faxId, text }

            const res = await dispatch(addComment(formData));
            setText(res);
            console.log("New Comment created:", res);
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
                <button type="submit" onClick={handleSubmit}>Add Comment</button>
                <button type="button" onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
}
