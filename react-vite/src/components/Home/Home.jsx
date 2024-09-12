// Home.jsx splash page
// import { useDispatch, useSelector } from "react-redux";
// import { getArtifax } from "../../redux/artifax";
// import FaxCard from "../FaxCard";
//
// import styles from "./Home.module.css";
//
// export default function Home() {
//     const dispatch = useDispatch();
//     const [loading, setLoading] = useState(true);
//     const allFax = useSelector((state) => state.artifax);
//
//     // Memoize the array of artifax to avoid unnecessary re-renders
//     const artifaxArray = useMemo(() => Object.values(allFax) || [], [allFax]);
//
//     useEffect(() => {
//         dispatch(getArtifax());
//     }, [dispatch]);
//
//     return (
//         <div className={styles.main}>
//             {allFax && Object.values(allFax).map((fax) => (
//                 <FaxCard key={fax.id} fax={fax} />
//             ))}
//         </div>
//     );
// }

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

    useEffect(() => {
        const loadFax = async () => {
            await dispatch(getArtifax());
            setLoading(false);
        };
        loadFax();
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!randomFax) {
        return <div>No Artifax found!</div>;
    }

    return (
        <div className={styles.homeContainer}>
            <h1>Welcome to ARTiFAX!</h1>
            <p>Click the image below to see all the ARTiFAX!</p>

            {/* Render the randomly selected FaxCard */}
            <FaxCard fax={randomFax} navAll={true}/>
        </div>
    );
}

