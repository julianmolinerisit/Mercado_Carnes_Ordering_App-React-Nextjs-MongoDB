import styles from "../../styles/ProductList.module.css";
import ProductCard from "./ProductCard";

const ProductList = ({ productList }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Las carnes más sabrosas de la ciudad</h1>
      <p className={styles.desc} id="products">
      {/* Viví una experiencia culinaria donde la calidad y los sabores  son los protagonistas.*/} Nuestras carnes, seleccionadas, son un tributo a la pasión por la gastronomía. Desde jugosos bifes de cuadril hasta crocantes y sabrosas nuggets de pollo, cada bocado es un festival de sabores que une a la familia en torno a la mesa. 
      {/* Descubre la excelencia en cada corte y crea momentos inolvidables con las carnes más sabrosas de la ciudad. */}
      </p>
      <div className={styles.wrapper}>
        {productList.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
