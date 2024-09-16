// MyArtifact.jsx
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { myArtifax } from "../../redux/artifax";
import FaxCard from "../FaxCard";
import styles from './MyArtifax.module.css'

export default function MyArtifax() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const currentUser = useSelector((state) => state.session.user);
    const artifax = useSelector((state) => state.artifax);
    console.log("current state.artifax:", artifax);


    useEffect(() => {
        const loadFax = async () => {
            const res = await dispatch(myArtifax());
            if (res) {
                // console.log("Faxes fetched, state update");
                // console.log("artifaxArray:", artifaxArray);
                setLoading(false);
            } else {
                console.log("Failed to load faxes", res);

            }
        };
        loadFax();
    }, [dispatch]);

    // Memoize artifax array and pass `artifax` as a dependency
    const artifaxArray = useMemo(() => Object.values(artifax) || [], [artifax]);
    console.log("artifaxArray:", artifaxArray);

    if (!currentUser) {
        console.log("No user found");
        return <div>Please login or sign up to see your Artifax.</div>;
    }

    if (loading) {
        console.log("Loading...");
        return (
            <div>
                {loading && (
                <div className={styles.spinnerContainer}>
                    <div className={styles.spinner}></div>
                    <p>Loading...</p>
                </div>
                )}
            </div>
        );

    }

    if (!artifaxArray.length) {
        console.log("No ArtFX found");
        return <div>No ArtFX found!</div>;
    }



    return (
        <div className={styles.main}>
            <div className={styles.pageTitle}>My Artifax</div>
            {!loading && artifaxArray && artifaxArray.map((fax) => (
                <FaxCard key={fax.id} fax={fax} />
            ))}
        </div>
    );
}
