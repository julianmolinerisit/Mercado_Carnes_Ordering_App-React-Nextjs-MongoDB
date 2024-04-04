import React, { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import axios from "axios";
import Cookies from "js-cookie";
import Image from "next/image";
import styles from "../../styles/Admin.module.css";
import EditProduct from "../../Components/EditProduct";
 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimes,
  faEdit,
  faTrash,
  faArrowRight,
  faMapMarker,
  faExternalLinkAlt,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";

const Index = ({ orders, products }) => {
  const [productList, setProductList] = useState(products);
  const [orderList, setOrderList] = useState(orders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProducts, setShowProducts] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const status = ["En preparación", "En camino", "Entregado", "Finalizado"];
  const paymentStatus = ["Pago", "Impago"];
  const [paymentStatusColor, setPaymentStatusColor] = useState({});

  const router = useRouter();

  useEffect(() => {
    const authToken = Cookies.get("authToken");

    if (!authToken) {
      router.push("/admin/login");
    } else {
      setIsLoading(false);
    }

    const intervalId = setInterval(() => {
      location.reload();
    }, 60000);

    return () => clearInterval(intervalId);
  }, [router]); // Agrega 'router' al array de dependencias

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:3000/api/products/${id}`
      );
      setProductList(productList.filter((product) => product._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/orders/${id}`
      );

      if (response.status === 200) {
        const updatedOrderList = orderList.filter((order) => order._id !== id);
        setOrderList(updatedOrderList);
      } else {
        console.error("Error al eliminar el pedido:", response.data);
      }
    } catch (error) {
      console.error("Error al realizar la solicitud DELETE:", error);
    }
  };

  const handleStatus = async (id) => {
    const item = orderList.find((order) => order._id === id);
    const currentStatus = item.status;

    try {
      const res = await axios.put(`http://localhost:3000/api/orders/${id}`, {
        status: currentStatus + 1,
      });
      setOrderList((prevOrderList) => {
        const updatedOrderList = prevOrderList.map((order) =>
          order._id === id ? res.data : order
        );
        return updatedOrderList;
      });
    } catch (err) {
      console.log(err);
    }
  };

  const handlePaymentStatus = async (id) => {
    try {
      const item = orderList.find((order) => order._id === id);
      const currentStatus = item.paymentStatus;
  
      // Cambia el estado del pago al siguiente
      const nextPaymentStatus = currentStatus === 0 ? 1 : 0;
  
      const res = await axios.put(`http://localhost:3000/api/orders/${id}`, {
        paymentStatus: nextPaymentStatus,
      });
  
      console.log(`Payment status updated for order ${id}. New status: ${nextPaymentStatus}`);
  
      setOrderList((prevOrderList) => {
        const updatedOrderList = prevOrderList.map((order) =>
          order._id === id ? res.data : order
        );
        return updatedOrderList;
      });
  
      // Actualiza el color según el nuevo estado del pago
      setPaymentStatusColor((prevPaymentStatusColor) => ({
        ...prevPaymentStatusColor,
        [id]: nextPaymentStatus === 1 ? styles.paid : styles.pending,
      }));
  
      console.log(`Color set for order ${id}: ${nextPaymentStatus === 1 ? styles.paid : styles.pending}`);
  
      // Nueva llamada para actualizar el estado del pago en el backend
      await axios.put(`http://localhost:3000/api/orders/updatePaymentStatus/${id}`, {
        paymentStatus: nextPaymentStatus,
      });
  
    } catch (err) {
      console.log(err);
    }
  };
  

  // const handlePaymentStatusClick = async (id) => {
  //   const item = orderList.find((order) => order._id === id);
  //   const currentPaymentStatus = item.paymentStatus;

  //   try {
  //     const nextPaymentStatus = currentPaymentStatus === "Paid" ? "Pending" : "Paid";
  //     const res = await axios.put(`http://localhost:3000/api/orders/${id}`, {
  //       paymentStatus: nextPaymentStatus,
  //     });

  //     setOrderList((prevOrderList) => {
  //       const updatedOrderList = prevOrderList.map((order) =>
  //         order._id === id ? { ...order, paymentStatus: res.data.paymentStatus } : order
  //       );
  //       return updatedOrderList;
  //     });

  //     setPaymentStatusColor((prevPaymentStatusColor) => ({
  //       ...prevPaymentStatusColor,
  //       [id]: nextPaymentStatus === "Paid" ? styles.paid : styles.pending,
  //     }));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <div className={styles.container1}>
      <div className={styles.buttons}>
        <button
          className={`${styles.button} ${showProducts ? styles.active : ""}`}
          onClick={() => setShowProducts(true)}
        >
          Ver Productos
        </button>
        <button
          className={`${styles.button} ${!showProducts ? styles.active : ""}`}
          onClick={() => setShowProducts(false)}
        >
          Ver Ordenes
        </button>
      </div>
      <div className={styles.container}>
        {showProducts ? (
          <div className={styles.item}>
            <table className={styles.table}>
              <tbody>
                <tr className={styles.trTitle}>
                  <th>Imagen</th>
                  <th>Id</th>
                  <th>Título</th>
                  <th>Precio</th>
                  <th>Acción</th>
                </tr>
              </tbody>
              {productList.map((product) => (
                <tbody key={product._id}>
                  <tr className={styles.trTitle}>
                    <td>
                      <Image
                        src={product.img}
                        width={50}
                        height={50}
                        objectFit="cover"
                        alt=""
                      />
                    </td>
                    <td> {product._id.slice(-12)} </td>
                    <td>{product.title}</td>
                    <td>${product.price}</td>
                    <td>
                      <button
                        className={styles.button}
                        onClick={() => {
                          setSelectedProduct(product);
                          setIsModalOpen(true);
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} /> Editar
                      </button>
                      <button
                        className={styles.button2}
                        onClick={() => handleDelete(product._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} /> Borrar
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        ) : (
          <div className={styles.item}>
            <table className={styles.table}>
              <tbody>
                <tr className={styles.trTitle}>
                  <th>Id</th>
                  <th>Cliente</th>
                  <th>Producto</th>
                  <th>Total</th>
                  <th>Pago</th>
                  <th>Estado del Pago</th>
                  <th>Instrucciones</th>
                  <th>Dirección</th>
                  <th>Número de tel.</th>
                  <th>Entrega Estimada</th>
                  <th>Estado</th>
                  <th>Acción</th>
                </tr>
              </tbody>
              {orderList.map((order) => (
                <tbody key={order._id}>
                  <tr className={styles.trTitle}>
                    <td> {order._id.slice(-5)} </td>
                    <td>{order.customer}</td>
                    <td>
                      {/* Mostrar los productos y cantidades */}
                      {order.products.map((product) => (
                        <div key={product._id}>
                          <p>{product.title}</p>
                          <p>Cantidad: {product.quantity}</p>
                        </div>
                      ))}
                    </td>
                    <td>${order.total}</td>
                    <td
                      className={`${styles.paymentCell} ${
                        paymentStatusColor[order._id]
                      }`}
                    >
                      {order.method === 0 ? (
                        <span className={styles.pending1}>Cash</span>
                      ) : (
                        <span className={styles.paid1}>Mercado Pago</span>
                      )}
                    </td>
                    <td
                      className={`${styles.paymentStatus} ${
                        paymentStatusColor[order._id]
                      }`}
                      onClick={() => handlePaymentStatus(order._id)}
                    >
                      <td
                        className={`${styles.paymentStatus} ${
                          paymentStatusColor[order._id]
                        }`}
                        onClick={() => handlePaymentStatus(order._id)}
                      >
                        {paymentStatus[order.paymentStatus]}
                      </td>
                    </td>
                    <td>{order.instructions}</td>
                    <td>
                      <a
                        href={`https://www.google.com/maps/search/${encodeURIComponent(
                          order.address
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {order.address}{" "}
                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                      </a>
                    </td>
                    <td>
                      {" "}
                      {order.phoneNumber}{" "}
                      <a
                        href={`https://api.whatsapp.com/send?phone=${order.phoneNumber}&text=¡Gracias por tu compra!`}
                        target="_blank"
                      >
                        <FontAwesomeIcon icon={faEnvelope} />{" "}
                      </a>
                      <a href={`tel:${order.phoneNumber}`}>
                        <FontAwesomeIcon icon={faPhone} />
                      </a>
                    </td>
                    <td>
                      {order.deliveryTime
                        ? new Date(order.deliveryTime).toLocaleTimeString(
                            "es-AR",
                            {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            }
                          )
                        : ""}
                    </td>
                    <td>{status[order.status]}</td>
                    <td>
                      <button
                        className={styles.buttonntx}
                        onClick={() => handleStatus(order._id)}
                      >
                        <FontAwesomeIcon icon={faArrowRight} />
                      </button>
                      <button
                        className={styles.button1}
                        onClick={() => handleDeleteOrder(order._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
            </table>
          </div>
        )}
        {isModalOpen && (
          <EditProduct
            product={selectedProduct}
            onClose={() => setIsModalOpen(false)}
            onUpdate={(updatedProduct) => {
              const updatedProductIndex = productList.findIndex(
                (product) => product._id === updatedProduct._id
              );

              if (updatedProductIndex !== -1) {
                const updatedProductList = [...productList];
                updatedProductList[updatedProductIndex] = updatedProduct;
                setProductList(updatedProductList);
              }

              setIsModalOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  console.log("Token en getServerSideProps:", myCookie.token);

  if (myCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    };
  }

  const productRes = await axios.get("http://localhost:3000/api/products");
  const orderRes = await axios.get("http://localhost:3000/api/orders");

  return {
    props: {
      orders: orderRes.data,
      products: productRes.data,
    },
  };
};

export default Index;
