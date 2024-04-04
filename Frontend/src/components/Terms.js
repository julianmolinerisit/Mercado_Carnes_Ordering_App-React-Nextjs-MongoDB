// components/Terms.js
import React from 'react';
import styles from '../styles/Terms.module.css';

const Terms = () => {
  return (
    <div className={styles.termsContainer}>
      <h1 className={styles.titleterms}>Términos y Condiciones</h1>

      <h2 className={styles.sutitleterms}>1. Aceptación de Términos</h2>
      <p className={styles.parrafoterms}>
        Al realizar una compra en nuestro sitio, aceptas estos términos y condiciones.
      </p>

      <h2 className={styles.sutitleterms}>2. Comunicación</h2>
      <p className={styles.parrafoterms}>
        A partir de ahora, cualquier comunicación debe hacerse al número de WhatsApp:
        <strong className={styles.strongterms}> +54 341 2527845</strong>.
      </p>

      <h2 className={styles.sutitleterms}>3. Pagos</h2>
      <p className={styles.parrafoterms}>
        Los pagos se realizarán a través de los métodos especificados en nuestro sitio.
      </p>

      <h2 className={styles.sutitleterms}>4. Envíos</h2>
      <p className={styles.parrafoterms}>
        Los productos serán enviados a la dirección proporcionada durante el proceso de compra.
      </p>

      <h2 className={styles.sutitleterms}>5. Devoluciones y Reembolsos</h2>
      <p className={styles.parrafoterms}>
        Consulta nuestra política de devoluciones y reembolsos en nuestro sitio web.
      </p>

      <h2 className={styles.sutitleterms}>6. Privacidad</h2>
      <p className={styles.parrafoterms}>
        Respetamos tu privacidad. Consulta nuestra política de privacidad en nuestro sitio web.
      </p>
    </div>
  );
};

export default Terms;
