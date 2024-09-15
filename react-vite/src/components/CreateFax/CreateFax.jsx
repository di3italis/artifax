// CreateFax.jsx
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createArtifax } from "../../redux/artifax";
import { useNavigate } from "react-router-dom";

export default function CreateFax() {
    const dispatch = useDispatch();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const convertImageToBinary = (image) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = function (e) {
                const arrayBuffer = e.target.result;
                const binary = new Uint8Array(arrayBuffer);

                console.log("Binary:", binary);

                resolve(binary);
            };

            reader.onerror = function (err) {
                reject(err);
            };

            reader.readAsArrayBuffer(image);
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (
            file &&
            !["image/jpeg", "image/jpg", "image/png", "image/gif"].includes(
                file.type
            )
        ) {
            setError("Only image files (jpg, jpeg, png, gif) are allowed.");
        } else {
            setImage(file);
            setError(null); // Reset error
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !description || !image) {
            setError("All fields are required.");
            return;
        }

        try {
            // Wait for image conversion to binary
            const binaryImage = await convertImageToBinary(image);
            console.log("Binary Image:", binaryImage);

            const formData = new FormData();
            formData.append("title", title); // Corrected: Use append for FormData
            formData.append("description", description);
            formData.append("image", binaryImage); // Add binary image
            // Properly inspect FormData
            for (let [key, value] of formData.entries()) {
                console.log(`${key}:`, value);
            }

            // Dispatch the createArtifax action to send the data
            dispatch(
                createArtifax(formData)
                // Uncomment to handle post-success actions
                // .then(() => {
                //     setTitle("");
                //     setDescription("");
                //     setImage(null);
                //     setError(null);  // Reset form on success
                //     navigate("/artifax");
                // })
                // .catch((err) => {
                //     setError("Error uploading artifax. Please try again.");
                //     console.error(err);
                // })
            );
        } catch (err) {
            setError("Error converting image to binary.");
            console.error(err);
        }
    };

    return (
        <div>
            <h2>Create New Artifax</h2>
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
                    <label htmlFor="image">Upload Image</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}
