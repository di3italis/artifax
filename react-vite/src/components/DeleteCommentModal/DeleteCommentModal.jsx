// DeleteCommentModal.jsx
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { deleteComment } from "../../redux/comment"; // Assuming you have this thunk
import styles from "./DeleteCommentModal.module.css";

export default function DeleteCommentModal({ commentId, owner_id }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const currentUser = useSelector((state) => state.session.user);

    const handleDelete = async () => {
        if (currentUser.id !== owner_id) return; // If the current user is not the owner, return

        console.log("Delete Comment ID:", commentId);
        await dispatch(deleteComment(commentId)); // Dispatch the delete comment action
        closeModal();
    };

    const handleKeepComment = () => {
        closeModal(); // Close the modal without deleting
    };

    return (
        <div className={styles.deleteCommentModal}>
            <h2>Confirm Delete</h2>
            <div className={styles.deleteCommentModalContainer}>
                <p>Are you sure you want to DELETE this comment?</p>
                <button className={styles.deleteYes} onClick={handleDelete}>
                    Yes (Delete Comment)
                </button>
                <div>
                    <button className={styles.deleteNo} onClick={handleKeepComment}>
                        No (Keep Comment)
                    </button>
                </div>
            </div>
        </div>
    );
}

