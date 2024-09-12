// FaxCard.jsx
import { /*useEffect,*/ useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./FaxCard.module.css";


export default function FaxCard({ fax }) {
    console.log("fax.id:", fax.id, typeof fax.id);

    return (
        <div className={styles.card}>
            <Link to={`/artifax/${fax.id}`}>
                <div className={styles.imageContainer}>
                    <img
                        src={fax.image}
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
