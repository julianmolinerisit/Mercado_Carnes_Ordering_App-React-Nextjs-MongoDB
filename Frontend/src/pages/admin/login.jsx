import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
import styles from '../../styles/Login.module.css';
import Cookies from 'js-cookie';


const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  
  const handleClick = async () => {
    if (!username || !password) {
      // Muestra una alerta si faltan campos
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos.',
      });
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3000/api/user/login', {
        username,
        password,
      });
    
      console.log('Respuesta del servidor en login.js:', response);
    
      if (response.status === 200 && response.data.token) {
        // Inicio de sesión exitoso, guarda el token en una cookie
        const token = response.data.token;
        Cookies.set('authToken', token);
        router.push('/admin');
      } else if (response.status === 401) {
        // Muestra una alerta si las credenciales son incorrectas
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Usuario o contraseña incorrectos.',
        });
      } else {
        // Maneja otros posibles errores
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Se produjo un error al iniciar sesión. Por favor, inténtalo nuevamente.',
        });
      }
    } catch (err) {
      // Error al iniciar sesión
      console.error('Error al realizar la solicitud en login.js:', err);
    
      // Muestra una alerta de error genérico si no es un error específico de usuario/contraseña incorrectos
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Se produjo un error al iniciar sesión. Por favor, inténtalo nuevamente.',
      });
    
      // Agrega esto para ver el error completo en la consola
      console.error('Error completo:', err.response);
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Ingreso al Panel</h1>
        <input
          placeholder="username"
          className={styles.input}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          className={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleClick} className={styles.button}>
          Ingresar
        </button>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    </div>
  );
};


export default Login;
