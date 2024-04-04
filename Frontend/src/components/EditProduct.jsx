import React, { useState } from "react";
import styles from "../../styles/Edit.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const EditProduct = ({ product, onClose, onUpdate }) => {
  const [title, setTitle] = useState(product.title);
  const [desc, setDesc] = useState(product.desc);
  const [price, setPrice] = useState(product.price);
  const [prices, setPrices] = useState([...product.prices]);
  const [extraOptions, setExtraOptions] = useState([...product.extraOptions]);
  const [isHidden, setIsHidden] = useState(false);

  const handlePriceChange = (index, value) => {
    const updatedPrices = [...prices];
    updatedPrices[index] = parseFloat(value);
    setPrices(updatedPrices);
  };

  const handleExtraOptionChange = (index, field, value) => {
    const updatedOptions = [...extraOptions];
    updatedOptions[index][field] = value;
    setExtraOptions(updatedOptions);
  };

  const handleUpdate = async () => {
    try {
      const updatedProduct = {
        title,
        desc,
        price,
        prices,
        extraOptions,
      };

      const response = await axios.put(
        `http://localhost:3000/api/products/${product._id}`,
        updatedProduct
      );

      onUpdate(response.data); // Update the product in the list
      onClose(); // Close the modal
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={`${styles.container} ${isHidden ? styles.hidden : ""}`}>
      <span onClick={() => { setIsHidden(true); onClose(); }} className={styles.close}>
        <FontAwesomeIcon icon={faTimes} />
      </span>
      <h2>Editar Producto</h2>
      <div className={styles.item}>
        {/* Display the image */}
        <div className={styles.imageContainer}>
          <img src={product.img} alt={product.title} className={styles.image} />
        </div>
        <label className={styles.label}>Título</label>
        <input
          className={styles.input}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={styles.item}>
        <label className={styles.label}>Descripción</label>
        <input
          className={styles.input}
          rows={4}
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className={styles.item}>
        <label className={styles.label}>Precio</label>
        <div className={styles.priceContainer}>
          <input
            className={`${styles.input} ${styles.inputSm}`}
            type="number"
            placeholder="Precio"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
          />
        </div>
      </div>
      <div className={styles.item}>
        <label className={styles.label}>Precios tamaños</label>
        <div className={styles.priceContainer}>
          {prices.map((price, index) => (
            <div key={index} className={styles.priceItem}>
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder={`Tamaño ${index + 1}`}
                value={price}
                onChange={(e) => handlePriceChange(index, e.target.value)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className={styles.item}>
        <label className={styles.label}>Opciones Extras</label>
        <div className={styles.extra}>
          {extraOptions.map((option, index) => (
            <div key={index} className={styles.extraItem}>
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="text"
                placeholder="Item"
                value={option.text}
                onChange={(e) =>
                  handleExtraOptionChange(index, "text", e.target.value)
                }
              />
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="Precio"
                value={option.price}
                onChange={(e) =>
                  handleExtraOptionChange(index, "price", e.target.value)
                }
              />
            </div>
          ))}
        </div>
      </div>
      <button className={styles.updateButton} onClick={handleUpdate}>
        Actualizar
      </button>  
    </div>
  );
};

export default EditProduct;
