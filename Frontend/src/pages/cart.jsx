import React, { useState, useEffect } from "react";
import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useRouter } from "next/router";
import { reset } from "../../redux/cartSlice";
import mercadopagoIcon from "../../public/img/icomercadopago.png";
import OrderDetail from "../Components/OrderDetail";

const Cart = () => {
  const [preferenceId, setPreferenceId] = useState(null);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    // Verifica si estamos en el navegador antes de ejecutar el código del cliente
    if (typeof window !== "undefined") {
      // Requiere Mercado Pago.js de manera asíncrona para evitar errores durante la construcción
      import('@mercadopago/sdk-react').then((module) => {
        const initMercadoPago = module.initMercadoPago;
        // Utiliza la variable de entorno para la clave de Mercado Pago
        initMercadoPago(process.env.NEXT_PUBLIC_MERCADO_PAGO_PUBLIC_KEY);
      }).catch((error) => {
        console.error('Error al cargar el módulo de Mercado Pago:', error);
      });
    }
  }, []);

  const createPreference = async () => {
    try {
      const productsWithNumericQuantity = cart.products.map((product) => ({
        ...product,
        quantity: Number(product.quantity),
      }));

      const response = await axios.post(
        "http://localhost:3000/create_preference",
        {
          products: productsWithNumericQuantity,
        }
      );

      const { id } = response.data;
      return id;
    } catch (error) {
      console.error("Error al crear la preferencia:", error.message);
      throw error;
    }
  };

  const handleButtonClick = async () => {
    try {
      const id = await createPreference();
      if (id) {
        // Abrir enlace de Mercado Pago en una nueva ventana
        window.open(
          `https://www.mercadopago.com.ar/checkout/v1/redirect?preference_id=${id}`,
          "_blank"
        );

        // Mostrar el detalle de la orden
        setShowOrderDetail(true);
      } else {
        console.error("Fallo al obtener el ID de preferencia");
      }
    } catch (error) {
      console.error("Error al manejar la compra:", error);
    }
  };

  const handleBuy = async () => {
    try {
      const id = await createPreference();
      if (id) {
        setPreferenceId(id);
        // No mostrar OrderDetail aquí, esperar a que se complete el pago
      } else {
        console.error("Fallo al obtener el ID de preferencia");
      }
    } catch (error) {
      console.error("Error al manejar la compra:", error);
    }
  };

  const createOrder = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/orders",
        data
      );

      if (response.status === 201) {
        dispatch(reset());
        router.push(`/orders/${response.data._id}`);
      }
    } catch (error) {
      console.error("Error al crear la orden:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th>Producto</th>
              <th>Nombre</th>
              <th>Extras</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Total</th>
            </tr>
          </tbody>
          <tbody>
            {cart.products.map((product) => (
              <tr className={styles.tr} key={product._id}>
                <td>
                  <div className={styles.imgContainer}>
                    <img
                      src={product.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td>
                  <span className={styles.extras}>
                    {product.extras.map((extra) => (
                      <span key={extra._id}>{extra.text}, </span>
                    ))}
                  </span>
                </td>
                <td>
                  <span className={styles.price}>${product.price}</span>
                </td>
                <td>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td>
                  <span className={styles.total}>
                    ${product.price * product.quantity}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}> TOTAL </h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>${cart.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${cart.total}
          </div>
          {preferenceId && (
            <div className={styles.paymentMethods}>
              <button
                className={styles.payButton}
                onClick={() => setShowOrderDetail(true)}
              >
                Pagar en Efectivo
              </button>
              <button onClick={handleButtonClick} className={styles.payButton}>
                <div className={styles.iconContainer}>
                  <img
                    src={mercadopagoIcon}
                    alt="Mercado Pago"
                    width={20} // Ajusta el ancho según tus preferencias
                    height={20} // Ajusta la altura según tus preferencias
                  />
                </div>
               Mercado Pago
              </button>
            </div>
          )}

          {!preferenceId && (
            <button onClick={handleBuy} className={styles.button}>
              ¡Pagar!
            </button>
          )}
        </div>
      </div>
      {showOrderDetail && (
  <OrderDetail
    total={cart.total}
    createOrder={createOrder}
    onOrderComplete={() => setShowOrderDetail(false)}
    cart={cart} 
  />
)}

    </div>
  );
};

export default Cart;
