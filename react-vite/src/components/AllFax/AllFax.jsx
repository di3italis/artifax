// AllFax.jsx
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getArtifax } from "../../redux/artifax";
// import artifax card component here, TBC
// import styles here

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
        }
        loadFax();
    }, [dispatch]);

    if (loading) {
        console.log("Loading...");
        return <div>Loading...</div>
    }

    if (!artifaxArray.length) {
        console.log("No ArtFX found");
        return <div>No ArtFX found!</div>
    }


    // return (
    //     <div>
    //         {allFax && allFax.map((fax) => (
    //             <FaxCard key={fax.id} fax={fax} />
    //         ))}
    //     </div>
    // );)

    return (
        <div>
            {artifaxArray && artifaxArray.map((fax) => (
                <div key={fax.id}>
                    <h2>{fax.title}</h2>
                    <p>{fax.description}</p>
                </div>
            ))}
        </div>
    )
}
