import Image from "next/image";
import styles from "../../styles/Footer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillAlt, faMoneyCheck, faCreditCard, faQrcode } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/img-footer.png" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
      <div className={styles.card}>
  <h1 className={styles.title}>Medios de pago:</h1>
  <p className={styles.text}>
    <FontAwesomeIcon icon={faMoneyBillAlt} style={{ width: "15px", color: "#fff", marginRight: "8px" }} /> Efectivo.
  </p>
  <p className={styles.text}>
    <FontAwesomeIcon icon={faCreditCard} style={{ width: "15px", color: "#fff", marginRight: "8px" }} /> Débito y crédito.
  </p>
  <p className={styles.text}>
    <FontAwesomeIcon icon={faMoneyCheck} style={{ width: "15px", color: "#fff", marginRight: "8px" }} /> Transferencia.
  </p>
  <p className={styles.text}>
    <FontAwesomeIcon icon={faQrcode} style={{ width: "15px", color: "#fff", marginRight: "8px" }} /> QR.
  </p>
</div>
        <div className={styles.card}>
          <h1 className={styles.title}>Encontranos en:</h1>
          <p className={styles.text}>
             Av. Provincias Unidas 2442.
            <br /> Rosario, Santa fe 2000
            <br /> +54 (341) 2527-455
          </p>
          <p className={styles.text}>
             Av. Provincias Unidas 1540.
            <br /> Rosario, Santa fe 2000
            <br /> +54 (341) 2547-5555
          </p>
          <p className={styles.text}>
             Av. Provincias Unidas 1540.
            <br /> Rosario, Santa fe 2000
            <br /> +54 (341) 2121-6665
          </p>
          <p className={styles.text}>
          Av. Avellaneda 540.
          <br /> Rosario, Santa fe 2000
          <br /> +54 (341) 2220-2060
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>Horarios</h1>
          <p className={styles.text}>
            LUNES A VIERNES
            <br /> 9:00 – 13:00 | 17:30 - 20:30
          </p>
          <p className={styles.text}>
            SÁBADOS Y DOMINGOS
            <br /> 9:30 – 13:00 | 17:30 - 21:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
