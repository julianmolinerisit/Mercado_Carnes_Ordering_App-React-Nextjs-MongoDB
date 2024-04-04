import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import NewsCard from "../components/NewsCard";
import NewPost from "../components/AddNews";
import styles from "../../styles/News.module.css";
import AddNewsButton from "../components/AddNewsButton";

const NewsComponent = ({
  admin,
  newsList,
  isLoggedIn, // Asegúrate de importar esto desde tu contexto de autenticación
  isAddNewsButtonVisible, // Asegúrate de definir esto según tus necesidades
  isModalOpen,
  setIsModalOpen,
  closeModal,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  const filteredNews = newsList.filter((news) => {
    const titleMatch = news.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    if (filter === "all") {
      return titleMatch;
    } else if (filter === "recent") {
      // Implementa tu lógica para el filtro de noticias recientes
    }
  });

  return (
    <div className={styles.container}>
      {isAddNewsButtonVisible && <AddNewsButton setIsModalOpen={setIsModalOpen} />}
      <h1 className={styles.title}>Noticias</h1>
      <div className={styles.filters}>{/* Filtros */}</div>
      <div className={styles.newsList}>
        {filteredNews.map((news) => (
          <Link key={news._id} href={`/blog/news/${news._id}`} passHref>
            <div className={styles.newsItem}>
              <NewsCard
                key={news._id}
                news={news}
                onEdit={handleEdit} // Asegúrate de definir esta función
                onDelete={handleDelete} // Asegúrate de definir esta función
                showEditDelete={admin}
              />
            </div>
          </Link>
        ))}
      </div>
      {isModalOpen && (
        <NewPost onClose={closeModal} setIsModalOpen={setIsModalOpen} />
      )}
    </div>
  );
};

export default NewsComponent;