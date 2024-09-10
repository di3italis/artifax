// AllFax.jsx
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
// import thunks here, TBC
// import artifax card component here, TBC
// import styles here

export default function AllFax() {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const allFax = useSelector((state) => {
        console.log("current state.allFax:", state.allFax)
        return Object.values(state.allFax) || [];
    });

    useEffect(() => {
        const loadFax = async () => {
            await dispatch(getFax());
            console.log("Faxes fetched, state update");
            setLoading(false);
        }
        loadFax();
    }, [dispatch]);

    if (loading) {
        console.log("Loading...");
        return <div>Loading...</div>
    }

    if (!allFax.length) {
        console.log("No ArtFX found");
        return <div>No ArtFX found!</div>
    }


    return (
        <div>
            {allFax && allFax.map((fax) => (
                <FaxCard key={fax.id} fax={fax} />
            ))}
        </div>
    );)
}
