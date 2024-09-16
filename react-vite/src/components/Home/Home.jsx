// Home.jsx splash page

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getArtifax } from "../../redux/artifax";
import FaxCard from "../FaxCard"; // Import the FaxCard component
import styles from './Home.module.css'; // Import your styles

export default function SplashPage() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const allFax = useSelector((state) => state.artifax);
    
    // Memoize the array of artifax to avoid unnecessary re-renders
    const artifaxArray = useMemo(() => Object.values(allFax) || [], [allFax]);

    // Randomly select one artifax from the list
    const randomFax = useMemo(() => {
        if (artifaxArray.length > 0) {
            const randomIndex = Math.floor(Math.random() * artifaxArray.length);
            return artifaxArray[randomIndex];
        }
        return null;
    }, [artifaxArray]);

    useEffect([dispatch], () => {
        const loadFax = async () => {
            await dispatch(getArtifax());
            setLoading(false);
        };
        loadFax();
    });

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!randomFax) {
        return <div>No Artifax found!</div>;
    }

    return (
        <div className={styles.homeContainer}>
            <div className={styles.header}>
                <h1>Welcome to ARTiFAX!</h1>
                <div className={styles.subtitle}>Click the image below to see all the ARTiFAX!</div>
            </div>

            {/* Render the randomly selected FaxCard */}
            <FaxCard fax={randomFax} navAll={true}/>
        </div>
    );
}

