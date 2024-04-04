import React, { useState } from "react";
import styles from "../../styles/OrderDetail.module.css";

const OrderDetail = ({ total, createOrder }) => {
  const [customer, setCustomer] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [deliveryTime, setDeliveryTime] = useState(null);
  const [instructions, setInstructions] = useState("");

  const handleClick = () => {
    const formattedDeliveryTime =
      deliveryTime !== null ? deliveryTimes[deliveryTime] : null;

    createOrder({
      customer,
      phoneNumber, // Include phone number in the order object
      address,
      total,
      method: 0,
      deliveryTime: formattedDeliveryTime
        ? formattedDeliveryTime.toISOString()
        : null,
      instructions,
    });
  };

  const generateDeliveryTimes = () => {
    const currentTime = new Date();
    const firstDeliveryTime = new Date(currentTime.getTime() + 20 * 60 * 1000);
    const deliveryTimes = [firstDeliveryTime];

    for (let i = 1; i < 3; i++) {
      const newTime = new Date(firstDeliveryTime.getTime() + i * 20 * 60 * 1000);
      deliveryTimes.push(newTime);
    }

    return deliveryTimes;
  };

  const deliveryTimes = generateDeliveryTimes();

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.item}>
          <label className={styles.label}>Name Surname</label>
          <input
            placeholder="Juan Doe"
            type="text"
            className={styles.input}
            onChange={(e) => setCustomer(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Phone Number</label>
          <input
            type="text"
            placeholder="+54 341 2222 555"
            className={styles.input}
            onChange={(e) => setPhoneNumber(e.target.value)} // Update phone number state
          />
        </div>
        
        <div className={styles.item}>
          <label className={styles.label}>Horario de entrega:</label>
          <div className={styles.deliveryTimes}>
            {deliveryTimes.map((time, index) => (
              <button
                key={index}
                className={`${styles.button} ${
                  deliveryTime === index ? styles.active : ""
                }`}
                onClick={() => setDeliveryTime(index)}
              >
                {time.getHours()}:{String(time.getMinutes()).padStart(2, "0")}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Dirección</label>
          <input
            rows={5}
            placeholder="Provincias Unidas 123 "
            type="text"
            className={styles.textarea}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>

        <div className={styles.item}>
          <label className={styles.label}>Instruciones (opcional):</label>
          <textarea
            rows={3}
            placeholder="Instrucciones extra..."
            type="text"
            className={styles.textarea}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </div>
    
        <div className={styles.item}>
          <label className={styles.label}>Costo del Envio:</label>
          <div className={styles.deliveryTimes}>
            <button>
              $1500,00
            </button>
          </div>
        </div>

        <button className={styles.button} onClick={handleClick}>
          ¡Pedir!
        </button>
      </div>
    </div>
  );
};

export default OrderDetail;
