import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import NewsList from "../components/NewsList";
import AddNewsButton from "../components/AddNewsButton";
import AddNews from "../components/AddNews";
import styles from "../styles/News.module.css";
import Cookies from 'js-cookie'; // Importa la librería de cookies

export default function NewsPage({ newsList }) {
  const router = useRouter();
  const [close, setClose] = useState(true);

  useEffect(() => {
    // Detect if the initial load has failed (based on an error flag in the URL)
    const initialLoadFailed = router.query.initialLoadFailed === "true";

    if (initialLoadFailed) {
      const redirectTimer = setTimeout(() => {
        router.push("/newspage");
      }, 2000);

      return () => clearTimeout(redirectTimer);
    }
  }, [router.query]);

  // Verifica si el token está presente en las cookies
  const authToken = Cookies.get('authToken');

  return (
    <div className={styles.container}>
      <Head>
        <title>News Page</title>
        <meta name="description" content="Latest news and updates" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {authToken && <AddNewsButton setClose={setClose} />} {/* Muestra el botón solo si el token está presente en las cookies */}
      <NewsList newsList={newsList} />

      {!close && <AddNews closeModal={() => setClose(true)} />}
    </div>
  );
}

export const getServerSideProps = async (ctx) => {
  const myCookie = ctx.req?.cookies || {};

  try {
    const res = await axios.get("http://localhost:3000/api/news");
    return {
      props: {
        newsList: res.data,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/newspage?initialLoadFailed=true",
        permanent: false,
      },
    };
  }
};
