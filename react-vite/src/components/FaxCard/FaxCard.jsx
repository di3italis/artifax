// FaxCard.jsx
import { Link } from "react-router-dom";
import styles from "./FaxCard.module.css";


export default function FaxCard({ fax, navAll }) {
    console.log("fax.id:", fax.id, typeof fax.id);

    return (
        <div className={styles.card}>
            <Link to={navAll ? "/artifax" : `/artifax/${fax.id}`}>
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
                        <div>{fax.title}</div>
                    </div>
                    <div className={styles.bottomRow}>
                        <div>artifax by: {fax.username}</div>
                    </div>
                </div>
            </Link>

        </div>
    );
}
