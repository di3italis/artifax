// ArtId.jsx
import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getArtifaxDetails } from "../../redux/artifax";
// import artifax card component here, TBC
// import styles here

export default function ArtId() {
    const { faxId: faxIdStr } = useParams();
    console.log("faxIdStr from useParams:", faxIdStr); // Check what useParams returns
    const faxId = parseInt(faxIdStr, 10);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const fax = useSelector((state) => state.artifax[faxId]);
    // const currentUser = useSelector((state) => state.session.user);
    console.log("faxId:", faxId);
    console.log("current state.fax:", fax);

    useEffect(() => {
        const loadFax = async () => {
            await dispatch(getArtifaxDetails(faxId));
            console.log("Fax fetched, state update");
            setLoading(false);
        };
        loadFax();
    }, [dispatch, faxId]);

    if (loading) {
        console.log("Loading...");
        return <div>Loading...</div>;
    }


    // const deleteFax = async () => {
    //     await dispatch(delete_________(pin.id));
    //     await dispatch(_________());
    //     navigate(`/________`);
    // };
    
 
    // const update______ = () => {
    //     navigate(`/_____/edit/${_____}`);
    // };


    // return (
    //     <div>
    //         {allFax && allFax.map((fax) => (
    //             <FaxCard key={fax.id} fax={fax} />
    //         ))}
    //     </div>
    // );)

    if (!fax) {
        console.log("No Fax found");
        return <div>No Fax found!</div>;
    }

    return (
        <div>
                    <div key={fax.id}>
                        <div
                            style={{
                                width: "300px",
                                height: "200px",
                                backgroundImage: `url(${fax.image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                            }}
                        >
                        </div>
                        <h2>{fax.title}</h2>
                        <p>{fax.description}</p>
                    </div>
        </div>
    );
}

