import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../styles/NewsList.module.css";
import NewsCard from "./NewsCard";

const NewsList = ({ newsList, admin }) => {
  const [filterOption, setFilterOption] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [updatedNewsList, setUpdatedNewsList] = useState(newsList);

  const filteredNews = filterOption === "latest" ? newsList.slice(0, 3) : newsList;

  const searchedNews = filteredNews.filter(
    (news) =>
      news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      news.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = async (news) => {
    try {
      // Realizar llamada a la API para editar la noticia
      const res = await axios.put(
        `http://localhost:3000/api/news/${news._id}`,
        {
          title: news.title,
          subtitle: news.subtitle,
          content: news.content,
        }
      );
      console.log("Noticia editada:", res.data);
    } catch (error) {
      console.error("Error al editar la noticia:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/news/${id}`);
      setUpdatedNewsList(updatedNewsList.filter((news) => news._id !== id));
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={styles.container}>
      {/* Barra de filtro */}
      <div className={styles.filterBar}>
        <label htmlFor="filter">Mostrar:</label>
        <select
          id="filter"
          value={filterOption}
          onChange={(e) => setFilterOption(e.target.value)}
        >
          <option value="all">Todas</option>
          <option value="latest">Últimas 3</option>
        </select>
      </div>

      {/* Barra de búsqueda */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Buscar noticias..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Cuadrícula de noticias */}
      <div className={styles.newsGrid}>
        {searchedNews.map((news) => (
          <NewsCard
            key={news._id}
            news={news}
            onEdit={handleEdit}
            onDelete={handleDelete}
            showEditDelete={admin}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsList;
