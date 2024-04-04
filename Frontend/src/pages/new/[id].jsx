import React from "react";
import axios from "axios";
import styles from "../../styles/NewsDetail.module.css";

const NewsDetail = ({ news }) => {
  if (!news) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>{news.title}</h1>
      <p className={styles.subtitle}>{news.subtitle}</p>
      {news.imageUrl && (
        <img src={news.imageUrl} alt={news.title} className={styles.image} />
      )}
      <p className={styles.content}>{news.content}</p>
    </div>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { id } = params;

  try {
    const response = await axios.get(`http://localhost:3000/api/news/${id}`);
    const news = response.data;

    return {
      props: {
        news,
      },
    };
  } catch (error) {
    console.error("Error fetching news detail:", error);

    return {
      props: {
        news: null,
      },
    };
  }
}

export default NewsDetail;
