import robot404 from "../../images/robot404.webp";
import styles from "./ErrorPage.module.css";

export default function ErrorPage() {
    return (
        <>
            <div className={styles.container}>
                <div className={styles.heading}>
                    OOPS!!! Looks like we made a wrong turn somewhere!
                </div>
                <div className={styles.oops}>
                    <img
                        className={styles.image}
                        src={robot404}
                        alt="404-robot-image"
                    />
                </div>
            </div>
        </>
    );
}
