import styles from "../../styles/Product.module.css";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addProduct } from "../../../redux/cartSlice";

const Product = ({ product }) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const dispatch = useDispatch();

  const handleSizeChange = (sizeIndex) => {
    setSelectedSizeIndex(sizeIndex);
  };

  const handleExtraChange = (option) => {
    if (selectedExtras.includes(option)) {
      setSelectedExtras(selectedExtras.filter((extra) => extra !== option));
    } else {
      setSelectedExtras([...selectedExtras, option]);
    }
  };

  const calculateTotalPrice = () => {
    const sizePrice = selectedSizeIndex === 0 ? 0 : product.prices[selectedSizeIndex];
    const extrasPrice = selectedExtras.reduce((total, extra) => total + extra.price, 0);
    return product.price + sizePrice + extrasPrice;
  };

  const handleClick = () => {
    const totalPrice = calculateTotalPrice();
    dispatch(addProduct({ ...product, extras: selectedExtras, price: totalPrice, quantity }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={product.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{product.title}</h1>
        <span className={styles.price}>${calculateTotalPrice()}</span>
        <p className={styles.desc}>{product.desc}</p>
        {product.prices.length === 3 && (
          <div>
            <h3 className={styles.choose}>Selecciona el tamaño</h3>
            <div className={styles.sizes}>
              {product.sizeNames.map((sizeName, index) => (
                <div className={styles.size} key={index} onClick={() => handleSizeChange(index)}>
                  <Image src="/img/ico-imagen.png" layout="fill" alt="" />
                  <span className={styles.number}>{sizeName}</span>
                </div>
              ))}
            </div>
          </div>
        )}
        {product.extraOptions.length > 0 && (
          <div>
            <h3 className={styles.choose}>Opcionales</h3>
            <div className={styles.ingredients}>
              {product.extraOptions.map((option) => (
                <div className={styles.option} key={option._id}>
                  <input
                    type="checkbox"
                    id={option.text}
                    name={option.text}
                    className={styles.checkbox}
                    onChange={() => handleExtraChange(option)}
                  />
                  <label htmlFor="double">{option.text}</label>
                </div>
              ))}
            </div>
          </div>
        )}
        <div className={styles.add}>
          <input
            onChange={(e) => setQuantity(e.target.value)}
            type="number"
            defaultValue={1}
            className={styles.quantity}
          />
          <button className={styles.button} onClick={handleClick}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async ({ params }) => {
  const res = await axios.get(`http://localhost:3000/api/productid/${params.id}`);
  const product = res.data;

  // Asegurarse de incluir sizeNames en los datos del producto
  product.sizeNames = ["Chica", "Mediana", "Grande"];
  console.log('Producto obtenido:', product); // Agregar esta línea

  return {
    props: {
      product,
    },
  };
};

export default Product;
