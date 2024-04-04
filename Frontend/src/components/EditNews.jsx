import React, { useState } from "react";
import styles from "../../styles/EditNews.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const EditNews = ({ news, onClose }) => {
  const { _id, title: initialTitle, subtitle: initialSubtitle, content: initialContent } = news;
  const [title, setTitle] = useState(initialTitle);
  const [subtitle, setSubtitle] = useState(initialSubtitle);
  const [content, setContent] = useState(initialContent);
  const [error, setError] = useState(null);
  const [isHidden, setIsHidden] = useState(false);

  const handleUpdate = async () => {
    try {
      const updatedNews = {
        title,
        subtitle,
        content,
      };

      await axios.put(
        `http://localhost:3000/api/news/${news._id}`, // Asegúrate de que news._id sea el ID correcto
        updatedNews
      );

      // Recarga la página después de editar con éxito
      window.location.reload();
    } catch (error) {
      console.error(error);
      setError("Hubo un error al actualizar la noticia. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <div className={`${styles.container} ${isHidden ? styles.hidden : ""}`}>
      <h2>Editar Noticia</h2>
      {error && <p className={styles.error}>{error}</p>}
      <div className={styles.item}>
        <label className={styles.label}>Título</label>
        <input
          className={styles.input}
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={styles.item}>
        <label className={styles.label}>Subtítulo</label>
        <input
          className={styles.input}
          type="text"
          value={subtitle}
          onChange={(e) => setSubtitle(e.target.value)}
        />
      </div>
      <div className={styles.item}>
        <label className={styles.label}>Contenido</label>
        <textarea
          className={styles.input}
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <button className={styles.updateButton} onClick={handleUpdate}>
        Actualizar
      </button>
      <button
        className={styles.closeButton}
        onClick={() => {
          setIsHidden(true);
          onClose();
        }}
      >
        Cerrar
      </button>
    </div>
  );
};

export default EditNews;
