// EditFaxModal.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editArtifax } from "../../redux/artifax";
import { useModal } from "../../context/Modal";
import styles from "./EditFaxModal.module.css";

export default function EditFaxModal({ faxId }) {
    const dispatch = useDispatch();
    const { closeModal } = useModal();

    // Get the current artifax from state
    const currentFax = useSelector((state) => state.artifax[faxId]);

    // Initialize local state for title and description
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState(null);

    // Prepopulate the form with the current artifax data
    useEffect(() => {
        if (currentFax) {
            setTitle(currentFax.title);
            setDescription(currentFax.description);
        }
    }, [currentFax]);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description) {
            setError("All fields are required.");
            return;
        }

        const formData = { faxId, title, description };

        try {
            // Dispatch the editArtifax action to update the data
            await dispatch(editArtifax(formData));
            closeModal(); // Close the modal after successful submission
        } catch (error) {
            setError("An error occurred while updating the artifax.");
            console.error(error);
        }
    };

    return (
        <div className={styles.editFaxModal}>
            <h2>Edit Artifax</h2>
            {error && <p className={styles.error}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Save Changes</button>
                <button type="button" onClick={closeModal}>Cancel</button>
            </form>
        </div>
    );
}

