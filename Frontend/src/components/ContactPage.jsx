import React, { useState } from "react";
import styles from "../../styles/ContactPage.module.css"; // Asegúrate de importar tus estilos CSS aquí

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Crear un objeto con los datos del formulario
    const data = {
      nombre: formData.name,
      correo: formData.email,
      mensaje: formData.message,
    };

    try {
      // Enviar los datos del formulario a través de una solicitud POST a FormSubmit
      const response = await fetch(
        "https://formsubmit.co/ajax/your@email.com",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        // Formulario enviado exitosamente, puedes mostrar un mensaje de confirmación
        console.log("Formulario enviado exitosamente");
      } else {
        // Manejo de errores en caso de que la solicitud falle
        console.error("Error al enviar el formulario");
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Contacto</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className={styles.label}>
            Nombre:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div>
          <label htmlFor="email" className={styles.label}>
            Correo Electrónico:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className={styles.input}
          />
        </div>
        <div>
          <label htmlFor="message" className={styles.label}>
            Mensaje:
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            className={styles.textarea}
          />
        </div>
        <div>
          <button type="submit" className={styles.button}>
            Enviar
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactPage;
