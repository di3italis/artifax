// FaxCard.jsx
import { /*useEffect,*/ useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./FaxCard.module.css";


export default function FaxCard({ fax, navAll }) {
    console.log("fax.id:", fax.id, typeof fax.id);

    const isExternal = fax.image.startsWith("http");

    // If the image is external, use it directly, otherwise generate URL
    const imageUrl = isExternal ?
        fax.image 
        // : `${process.env.REACT_BASE_URL}/static/${fax.image}`;
        : <img src="{{ url_for('static', filename=fax.image) }}" alt="{{ artifax.title }}" />


    return (
        <div className={styles.card}>
            <Link to={navAll ? "/artifax" : `/artifax/${fax.id}`}>
                <div className={styles.imageContainer}>
                    <img
                        src={imageUrl}
                        alt={fax.title}
                        title={fax.title}
                        className={styles.image}
                    />
                </div>
                <div className={styles.info}>
                    <div className={styles.topRow}>
                        <div>FaxCard </div>
                    </div>
                    <div className={styles.bottomRow}>
                        <div>Fax ID: {fax.id}</div>
                    </div>
                </div>
            </Link>

        </div>
    );
}
