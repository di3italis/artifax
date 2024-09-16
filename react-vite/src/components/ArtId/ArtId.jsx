// ArtId.jsx
import { useEffect, useState, useMemo } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getArtifaxDetails } from "../../redux/artifax";
import { getComments } from "../../redux/comment";
import OpenModalButton from "../OpenModalButton";
import EditFaxModal from "../EditFaxModal/EditFaxModal.jsx";
import DeleteFaxModal from "../DeleteFaxModal";
import AddCommentModal from "../AddCommentModal";
import EditCommentModal from "../EditCommentModal";
import DeleteCommentModal from "../DeleteCommentModal";
// import styles here

export default function ArtId() {
    const { faxId: faxIdStr } = useParams();
    const faxId = parseInt(faxIdStr, 10);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    const fax = useSelector((state) => state.artifax[faxId]);
    const allComments = useSelector((state) => state.comments);
    const loadingComments = useSelector((state) => state.comments.loading);

    const currentUser = useSelector((state) => state.session.user);

    const commentsArray = useMemo(() => Object.values(allComments) || [], [allComments]);


    useEffect(() => {
        const loadComments = async () => {
            await dispatch(getComments(faxId));
        }
    
        const loadFax = async () => {
            await dispatch(getArtifaxDetails(faxId));
            setLoading(false);
        };

        loadComments();
        loadFax();
    }, [dispatch, faxId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!fax) {
        console.log("No Fax found");
        return <div>No Fax found!</div>;
    }

    // const commentsArray = Object.values(comments);
    console.log("commentsArray:", commentsArray);
    // const commentsArray = useMemo(() => Object.values(comments) || [], [comments]);

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
                    buttonText={"Delete Artifax"}
                    modalComponent={<DeleteFaxModal faxId={fax.id} owner_id={fax.owner_id} />}
                />
            )} 

            {currentUser?.id === fax.owner_id && (
                <OpenModalButton
                    buttonText={"Edit Artifax"}
                    modalComponent={<EditFaxModal faxId={fax.id} />}
                />
            )}

            <div>
                <h3>Comments</h3>
                {commentsArray.length > 0 ? (
                    commentsArray
                    .filter(comment => comment && comment.id)
                        .map((comment) => (
                        <div key={comment.id}>
                            <p>{comment.text}</p>
                            <p>User {comment.username}</p>

                            {currentUser?.id === comment.owner_id && (
                                <>
                                    <OpenModalButton
                                        buttonText={"Edit Comment"}
                                        modalComponent={
                                            <EditCommentModal 
                                                commentId={comment.id} 
                                                owner_id={comment.owner_id} 
                                                text={comment.text} 
                                            />
                                        }
                                    />
                                    <OpenModalButton
                                        buttonText={"Delete Comment"}
                                        modalComponent={
                                            <DeleteCommentModal 
                                                commentId={comment.id} 
                                                owner_id={comment.owner_id} 
                                            />
                                        }
                                    />
                                </>
                            )}
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
                {/* Add Comment Button */}
                {currentUser && (
                    <OpenModalButton
                        buttonText={"Add Comment"}
                        modalComponent={<AddCommentModal faxId={faxId} />}
                    />
                )}
            </div>

        </div>
    ); 
}
