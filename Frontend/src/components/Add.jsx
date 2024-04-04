import { useState, useEffect } from "react";
import styles from "../../styles/Add.module.css";
import axios from "axios";

const Add = ({ setClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [prices, setPrices] = useState(["", "", ""]);
  const [extra, setExtra] = useState({ text: "", price: "" });
  const [extraOptions, setExtraOptions] = useState([]);
  const [showPriceInputs, setShowPriceInputs] = useState(true);
  const [initialPrice, setInitialPrice] = useState("");

  useEffect(() => {
    if (showPriceInputs) {
      setInitialPrice(prices[0]); // Set initial price to the price of "Chica"
    }
  }, [showPriceInputs, prices]);

  const handleCreate = async () => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "uploads");

    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/ds1bvrg9n/image/upload",
        data
      );

      const url = uploadRes.data.url;

      const newProduct = {
        title,
        desc,
        price: parseFloat(initialPrice),
        prices: showPriceInputs ? prices.map(parseFloat) : [],
        extraOptions,
        img: url,
      };

      await axios.post("http://localhost:3000/api/products", newProduct);
      setClose(true);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const handleExtraInput = (e) => {
    setExtra({ ...extra, [e.target.name]: e.target.value });
  };

  const handleExtra = () => {
    setExtraOptions((prev) => [...prev, extra]);
    setExtra({ text: "", price: "" }); // Clear the extra input fields
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>
          X
        </span>
        <h2>Agregar Producto</h2>
        <div className={styles.item}>
          <label className={styles.label}>Seleccionar imagen</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} className={styles.inputimg}/>
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Título</label>
          <input
            className={styles.input}
            type="text"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Descripción</label>
          <input
            className={styles.input}
            rows={4}
            type="text"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Precio Inicial</label>
          <input
            className={styles.input}
            type="number"
            placeholder="Precio Inicial"
            value={initialPrice !== null ? initialPrice : ""}
            onChange={(e) => setInitialPrice(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Mostrar Tamaños</label>
          <button
            className={styles.toggleButton}
            onClick={() => setShowPriceInputs(!showPriceInputs)}
          >
            {showPriceInputs ? "Ocultar" : "Mostrar"} Tamaños
          </button>
        </div>
        {showPriceInputs && (
          <div className={styles.item}>
            <label className={styles.label}>Precio de Tamaños</label>
            <div className={styles.priceContainer}>
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="Chica"
                value={prices[0]}
                onChange={(e) => setPrices([e.target.value, prices[1], prices[2]])}
              />
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="Mediana"
                value={prices[1]}
                onChange={(e) => setPrices([prices[0], e.target.value, prices[2]])}
              />
              <input
                className={`${styles.input} ${styles.inputSm}`}
                type="number"
                placeholder="Grande"
                value={prices[2]}
                onChange={(e) => setPrices([prices[0], prices[1], e.target.value])}
              />
            </div>
          </div>
        )}
        <div className={styles.item}>
          <label className={styles.label}>Opciones Extras</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Item"
              name="text"
              value={extra.text}
              onChange={handleExtraInput}
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Precio"
              name="price"
              value={extra.price}
              onChange={handleExtraInput}
            />
            <button className={styles.extraButton} onClick={handleExtra}>
              Agregar
            </button>
          </div>
          <div className={styles.extraItems}>
            {extraOptions.map((option, index) => (
              <span key={index} className={styles.extraItem}>
                {option.text}
              </span>
            ))}
          </div>
        </div>
        <button className={styles.addButton} onClick={handleCreate}>
          Crear
        </button>
      </div>
    </div>
  );
};

export default Add;
