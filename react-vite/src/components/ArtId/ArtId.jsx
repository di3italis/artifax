// ArtId.jsx
import { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getArtifaxDetails } from "../../redux/artifax";
import OpenModalButton from "../OpenModalButton";
// import EditFaxModal from "../EditFaxModal";
import DeleteFaxModal from "../DeleteFaxModal";
// import styles here

export default function ArtId() {
    const { faxId: faxIdStr } = useParams();
    console.log("faxIdStr from useParams:", faxIdStr); // Check what useParams returns
    const faxId = parseInt(faxIdStr, 10);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const fax = useSelector((state) => state.artifax[faxId]);
    const currentUser = useSelector((state) => state.session.user);
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

    if (!fax) {
        console.log("No Fax found");
        return <div>No Fax found!</div>;
    }

    return (
        <div>
            <div key={fax.id}>
                <div
                    style={{
                        width: "800px",
                        height: "400px",
                        backgroundImage: `url(${fax.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                ></div>
                <h2>{fax.title}</h2>
                <p>{fax.description}</p>
            </div>
            {currentUser?.id === fax.owner_id && (
            <OpenModalButton
                buttonText={"Delete"}
                modalComponent={<DeleteFaxModal faxId={fax.id}  owner_id={fax.owner_id}/>}
            />
            )} 
        </div>
    );
}
