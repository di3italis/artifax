// DeleteFaxModal.jsx
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../context/Modal";
import { useNavigate } from "react-router-dom";
import { deleteArtifax } from "../../redux/artifax";
import styles from "./DeleteFaxModal.module.css"

export default function DeleteFaxModal({ faxId, owner_id }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize useNavigate
    const currentUser = useSelector((state) => state.session.user);

    console.log("Current User:", currentUser);

    const handleDelete = async () => {
        if (currentUser.id !== owner_id ) return; // If there is no currentUser, return

        console.log("Delete Fax ID:", faxId);
        await dispatch(deleteArtifax(faxId));
        closeModal();
        navigate("/artifax/my-artifax"); // Navigate to the AllFax page after deletion
    }

    const handleKeepFax = () => {
        closeModal();
    }

  return (
    <div className={styles.deleteFaxModal}>
      <h2>Confirm Delete</h2>
      <div className={styles.deleteFaxModalContainer}>
        <p>Are you sure you want to DELETE this ARTiFAX?</p>
        <button className={styles.deleteYes} onClick={handleDelete}>
          Yes (Delete ARTiFAX)
        </button>
        <div>
          <button className={styles.deleteNo} onClick={handleKeepFax}>
            No (Keep ARTiFAX)
          </button>
        </div>
      </div>
    </div>
  );
}

