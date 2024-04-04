import React, { useState } from "react";
import styles from "../../styles/AddNews.module.css";
import axios from "axios";

const AddNews = ({ closeModal }) => {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState({});
  const maxWords = 100; // Define el número máximo de palabras permitidas

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setImage(selectedImage);

    // Mostrar una vista previa de la imagen seleccionada
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview({ ...preview, image: reader.result });
      };
      reader.readAsDataURL(selectedImage);
    }
  };

  // Actualizar el estado de previsualización cuando cambien los campos del formulario
  const handleInputChange = (e) => {
    const name = e.target.name;
    let value = e.target.value;

    // Limitar el contenido a un número máximo de palabras
    const words = value.split(/\s+/); // Dividir el contenido en palabras
    if (words.length > maxWords) {
      // Si se excede el límite de palabras, recortar el contenido
      value = words.slice(0, maxWords).join(" ");
    }

    setPreview({ ...preview, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("subtitle", subtitle);
      formData.append("content", content);
      formData.append("image", image);

      // Upload image to Cloudinary
      const cloudinaryData = new FormData();
      cloudinaryData.append("file", image);
      cloudinaryData.append("upload_preset", "uploads"); // Reemplaza con el nombre de tu preset

      const cloudinaryRes = await axios.post(
        "https://api.cloudinary.com/v1_1/ds1bvrg9n/image/upload",
        cloudinaryData
      );

      const imageUrl = cloudinaryRes.data.url;

      // Crear objeto de noticia con la URL de la imagen
      const newNews = {
        title,
        subtitle,
        content,
        imageUrl,
      };

      // Envía la noticia al servidor (ajusta la URL y ruta según tu backend)
      await axios.post("http://localhost:3000/api/news", newNews);
      console.log("Noticia agregada exitosamente");
      closeModal();
      window.location.reload();
    } catch (error) {
      console.error("Error al agregar la noticia:", error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.formContainer}>
          <h2 className={styles.title}>Agregar Noticia</h2>
          <div className={styles.item}>
            <label className={styles.label}>Título</label>
            <input
              className={styles.input}
              type="text"
              name="title"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                handleInputChange(e);
              }}
            />
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Subtítulo</label>
            <input
              className={styles.input}
              type="text"
              name="subtitle"
              value={subtitle}
              onChange={(e) => {
                setSubtitle(e.target.value);
                handleInputChange(e);
              }}
            />
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Imagen</label>
            <br />
            <input
              className={styles.inputimg}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
          <div className={styles.item}>
            <label className={styles.label}>Contenido</label>
            <textarea
              className={styles.textarea}
              rows={4}
              name="content"
              value={content}
              onChange={(e) => {
                setContent(e.target.value);
                handleInputChange(e);
              }}
            />
          </div>
          <div className={styles.buttonContainer}>
            <button className={styles.addButton} onClick={handleSubmit}>
              Crear Noticia
            </button>
            <button className={styles.closeButton} onClick={closeModal}>
              Cancelar
            </button>
          </div>
        </div>
        <div className={styles.previewContainer}>
          <div className={styles.preview}>
            <h3>Vista previa de la noticia</h3>
            <hr className={styles.separator} /> {/* Línea separadora */}
            <h4>{preview.title}</h4>
            <p>{preview.subtitle}</p>
            {preview.image ? (
              <img src={preview.image} alt="Vista previa de la imagen" />
            ) : null}
            <p>{preview.content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNews;
