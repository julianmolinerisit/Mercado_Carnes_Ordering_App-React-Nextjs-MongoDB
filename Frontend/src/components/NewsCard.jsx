import React, { useState } from "react";
import styles from "../../styles/NewsCard.module.css";
import EditNews from "./EditNews"; // Importa el componente de edición
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import Cookies from 'js-cookie'; // Importa la librería de cookies
import Link from "next/link"; // Importa la etiqueta Link de Next.js

const NewsCard = ({ news, onEdit, onDelete, fetchNews }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
  };

  // Verifica si el token está presente en las cookies
  const authToken = Cookies.get('authToken');

  return (
    <div className={styles.newsCard}>
      <h2 className={styles.newsTitle}>
        {/* Agrega el enlace al título de la noticia */}
          {news.title}
      </h2>
      {news.subtitle && <p className={styles.newsSubtitle}>{news.subtitle}</p>}
      {news.imageUrl && (
    <Link href={`/new/${news._id}`} passHref>
      <img
        src={news.imageUrl}
        alt={news.title}
        className={styles.newsImage}
      />
  </Link>
)}
      <p className={styles.newsContent}>{news.content}</p>
      {authToken && ( // Mostrar botones solo si el token está presente en las cookies
        <div className={styles.newsActions}>
          <button className={styles.editButton} onClick={handleEditClick}>
            <FontAwesomeIcon icon={faEdit} /> Editar
          </button>
          <button
            className={styles.deleteButton}
            onClick={() => onDelete(news._id)}
          >
            <FontAwesomeIcon icon={faTrash} /> Borrar
          </button>
        </div>
      )}
      {isEditModalOpen && ( // Mostrar el modal de edición si isEditModalOpen es verdadero
        <EditNews
          news={news}
          onClose={handleEditModalClose}
          onUpdate={() => {
            handleEditModalClose();
            fetchNews(); // Llama a la función de actualización después de editar
          }}
        />
      )}
    </div>
  );
};

export default NewsCard;
