// CreateFax.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createArtifax } from "../../redux/artifax";
import styles from './CreateFax.module.css';


export default function CreateFax() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [prompt, setPrompt] = useState("");
    const { loading } = useSelector((state) => state.artifax);
    const [error, setError] = useState(null);
    // const allFax = useSelector((state) => state.artifax);
    const [newFax, setNewFax] = useState(null);

    // // Memoize the array of artifax to avoid unnecessary re-renders
    // const artifaxArray = useMemo(() => Object.values(allFax) || [], [allFax]);
    // console.log("artifaxArray:", artifaxArray);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !prompt) {
            setError("All fields are required.");
            return;
        }

        try {
            let formData = {};
            formData = { title, description, prompt };

            const res = await dispatch(createArtifax(formData));
            setNewFax(res);
            console.log("New Fax created:", res);
        } catch (error) {
            setError("An error occurred, unable to generate image.");
            console.error(error);
        }
    };

    return (
        <div>
            <div>
                <h1>Create New Artifax</h1>
                <h2> Collaborative Art With a Robot!</h2>
            </div>
            {error && <p>{error}</p>}
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
                <div>
                    <label htmlFor="prompt">Enter Prompt</label>
                    <textarea
                        id="prompt"
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>Generate</button>
            </form>

            {loading && (
                <div className={styles.spinnerContainer}>
                    <div className={styles.spinner}></div>
                    <p>Generating image...</p>
                </div>
            )}

            {error && <p>Error: {error}</p>}

            {newFax && (
                <div>
                    <h3>Generated Image</h3>
                    <div className={styles.imageContainer}>
                        <img className={styles.image} src={newFax.image} alt="New Artifax" />
                    </div>
                </div>
            )}
        </div>
    );
}
