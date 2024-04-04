import React from 'react';
import styles from '../styles/Loader.module.css';
import Image from "next/image";

const Loader = () => (
  <div className={styles.loaderWrapper}>
    <img
      src="/img/icon-mercadocarnes.png"
      alt="Loading..."
      className={styles.loaderImage}
      width= {250} // Reemplaza TAMAÑO_DESEADO con el ancho deseado
      height={150} // Reemplaza ALTURA_DESEADA con la altura deseada
    />
  </div>
);

export default Loader;
