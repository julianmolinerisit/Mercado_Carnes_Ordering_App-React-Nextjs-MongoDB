import React from "react";
import styles from "../../styles/Add.module.css"; // Importa los estilos específicos para el botón

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const AddNewsButton = ({ setClose }) => {
  return (
    <div onClick={() => setClose(false)} className={styles.mainAddButton}>
      <FontAwesomeIcon
        icon={faPlus}
        style={{ width: "15px", color: "#fff", marginRight: "8px" }}
      />
      Agregar Noticia
    </div>
  );
};

export default AddNewsButton;
