import styles from "../../styles/Add.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";


const AddButton = ({ setClose }) => {
  return (
    <div onClick={() => setClose(false)} className={styles.mainAddButton}>
     <FontAwesomeIcon icon={faPlus} style={{ width: "15px", color: "#fff", marginRight: "8px" }} />
      Agregar Producto
    </div>
  );
};

export default AddButton;
