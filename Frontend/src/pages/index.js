import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import Featured from "../Components/Featured";
import ProductList from "../Components/ProductList";
import AddButton from "../Components/AddButton";
import Add from "../Components/Add";
import Loader from "../components/Loader";
import styles from "../styles/Home.module.css";
import Cookies from 'js-cookie';

export default function Home({ productList: initialProductList }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [productList, setProductList] = useState(initialProductList);
  const [close, setClose] = useState(true);

  // Verifica si el token está presente en las cookies
  const authToken = Cookies.get('authToken');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/products");
        setProductList(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Puedes manejar errores aquí según tus necesidades
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>Mercado de carnes premium </title>
        <meta name="description" content="La mejor carne de la ciudad." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      {loading && <Loader />}
      
      <Featured />
      {authToken && <AddButton setClose={setClose} />}
      <ProductList productList={productList} />
      {!close && <Add setClose={setClose} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || {};

  try {
    const res = await axios.get("http://localhost:3000/api/products");
    return {
      props: {
        productList: res.data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/?initialLoadFailed=true",
        permanent: false,
      },
    };
  }
};
