// AllFax.jsx
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArtifax } from "../../redux/artifax";
import FaxCard from "../FaxCard";
import styles from './AllFax.module.css';

export default function AllFax() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const allFax = useSelector((state) => state.artifax);
    console.log("current state.artifax:", allFax);

    // Memoize the array of artifax to avoid unnecessary re-renders
    const artifaxArray = useMemo(() => Object.values(allFax) || [], [allFax]);
    console.log("artifaxArray:", artifaxArray);

    useEffect(() => {
        const loadFax = async () => {
            await dispatch(getArtifax());
            console.log("Faxes fetched, state update");
            setLoading(false);
        };
        loadFax();
    }, [dispatch]);

    if (loading) {
        console.log("Loading...");
        return <div>Loading...</div>;
    }

    if (!artifaxArray.length) {
        console.log("No ArtFX found");
        return <div>No ArtFX found!</div>;
    }

    return (
        <div className={styles.main}>
            <div className={styles.header}>
                <h1>Community Artifax Gallery</h1>
            </div>
            <div className={styles.cardContainer}>
            {artifaxArray && artifaxArray.map((fax) => (
                <FaxCard key={fax.id} fax={fax} />
            ))}
            </div>
        </div>
    );
}
