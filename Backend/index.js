// import express from 'express';
// import cookieParser from 'cookie-parser';
// import cors from 'cors';
// import dbConnect from './util/mongo.js';
// import { MercadoPagoConfig, Preference } from "mercadopago";
// require('dotenv').config();


// const app = express();
// const port = process.env.PORT || 3000;

// const client = new MercadoPagoConfig({
//   accessToken: "TEST-2124289627144379-010410-b2518a5ce325539f911aeadac8c624ce-1619487454",
// });

// app.use(express.json());

// // Configura CORS para permitir solicitudes desde el frontend
// app.use(
//   cors({
//     origin: 'http://localhost:3001', // Reemplaza con la dirección y el puerto de tu frontend
//     credentials: true, // Habilita el intercambio de cookies entre el frontend y el backend si es necesario
//   })
// );

// app.use(cookieParser()); // Asegúrate de importar cookie-parser si no lo has hecho

// // Importa tus rutas aquí (usando import)
// import newsRoute from './routes/api/news.js';
// import ordersRoute from './routes/api/orders.js';
// import productsRoute from './routes/api/products.js';
// import loginRoute from './routes/api/user.js'; // Rutas de autenticación de usuario
// import productidRoute from './routes/api/productid.js'; // Importa la nueva ruta de getProductById
// import getNewsByIdRoute from "./routes/api/newsid.js"; // Importa las rutas de noticias por ID
// import getOrderById from './routes/api/orderid.js'; // Asegúrate de que la ruta sea correcta

// // Usa tus rutas
// app.use('/api/news', newsRoute);
// app.use('/api/orders', ordersRoute);
// app.use('/api/products', productsRoute);
// app.use('/api/user', loginRoute); // Agrega la ruta de autenticación de usuario
// app.use('/api/productid', productidRoute); // Agrega la nueva ruta de getProductById
// app.use('/api/news/id', getNewsByIdRoute); // Agrega la nueva ruta de noticias por ID
// app.use('/api/orderid', getOrderById); // Asegúrate de que la ruta sea correcta


// // Middleware de manejo de errores personalizado
// app.use((err, req, res, next) => {
//   console.error('Error en la aplicación:', err);

//   // Determina el código de estado y el mensaje de acuerdo con el tipo de error
//   let statusCode = 500;
//   let errorMessage = 'Error interno del servidor';

//   if (err instanceof MyCustomError) {
//     statusCode = 400; // Por ejemplo, si es un error de validación personalizado
//     errorMessage = err.message;
//   }

//   res.status(statusCode).json({ message: errorMessage });
// });

// // Define la clase MyCustomError (error personalizado)
// class MyCustomError extends Error {
//   constructor(message) {
//     super(message);
//     this.name = 'MyCustomError';
//   }
// }

// // Escucha en el puerto especificado
// app.listen(port, async () => {
//   try {
//     await dbConnect();
//     console.log(`Servidor Express escuchando en el puerto ${port}`);
//   } catch (error) {
//     console.error('Error al conectar a la base de datos:', error);
//   }
// });


// // Mercado pago API
// app.get("/payment/success", (req, res) => {
//   try {
//     if (req.query.status === 'approved') {
//       // Muestra un mensaje de pago exitoso o el comprobante aquí
//       res.status(200).send('Pago aprobado. Gracias por tu compra.');
//     } else {
//       res.status(200).send('Pago no aprobado.');
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       error: "Error al manejar el éxito del pago",
//     });
//   }
// });


// app.post("/create_preference", async (req, res) => {
//   try {
//     const items = req.body.products.map(product => ({
//       title: product.title,
//       quantity: Number(product.quantity),
//       unit_price: Number(product.price),
//       currency_id: "ARS",
//     }));

//     const body = {
//       items,
//       back_urls: {
//         success: "http://localhost:3001/payment/success",
//         failure: "http://localhost:3001/cart/failure",
//         pending: "http://localhost:3001/cart/pending",
//       },
//       // auto_return: "approved",
//     };

//     const preference = new Preference(client);
//     const result = await preference.create({ body });
//     res.json({
//       id: result.id,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       error: "Error al crear la preferencia",
//     });
//   }
// });

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dbConnect from './util/mongo.js';
import { MercadoPagoConfig, Preference } from "mercadopago";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
});

app.use(express.json());

// Configura CORS para permitir solicitudes desde el frontend
app.use(
  cors({
    origin: 'http://localhost:3001', // Reemplaza con la dirección y el puerto de tu frontend
    credentials: true, // Habilita el intercambio de cookies entre el frontend y el backend si es necesario
  })
);

app.use(cookieParser()); 

// Importa tus rutas aquí (usando import)
import newsRoute from './routes/api/news.js';
import ordersRoute from './routes/api/orders.js';
import productsRoute from './routes/api/products.js';
import loginRoute from './routes/api/user.js'; 
import productidRoute from './routes/api/productid.js'; 
import getNewsByIdRoute from "./routes/api/newsid.js"; 
import getOrderById from './routes/api/orderid.js'; 

// Usa tus rutas
app.use('/api/news', newsRoute);
app.use('/api/orders', ordersRoute);
app.use('/api/products', productsRoute);
app.use('/api/user', loginRoute); 
app.use('/api/productid', productidRoute); 
app.use('/api/news/id', getNewsByIdRoute); 
app.use('/api/orderid', getOrderById); 

// Middleware de manejo de errores personalizado
app.use((err, req, res, next) => {
  console.error('Error en la aplicación:', err);

  let statusCode = 500;
  let errorMessage = 'Error interno del servidor';

  if (err instanceof MyCustomError) {
    statusCode = 400; 
    errorMessage = err.message;
  }

  res.status(statusCode).json({ message: errorMessage });
});

class MyCustomError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MyCustomError';
  }
}

app.listen(port, async () => {
  try {
    await dbConnect();
    console.log(`Servidor Express escuchando en el puerto ${port}`);
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error);
  }
});

// Mercado pago API
app.get("/payment/success", (req, res) => {
  try {
    if (req.query.status === 'approved') {
      res.status(200).send('Pago aprobado. Gracias por tu compra.');
    } else {
      res.status(200).send('Pago no aprobado.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al manejar el éxito del pago",
    });
  }
});

app.post("/create_preference", async (req, res) => {
  try {
    const items = req.body.products.map(product => ({
      title: product.title,
      quantity: Number(product.quantity),
      unit_price: Number(product.price),
      currency_id: "ARS",
    }));

    const body = {
      items,
      back_urls: {
        success: "http://localhost:3001/payment/success",
        failure: "http://localhost:3001/cart/failure",
        pending: "http://localhost:3001/cart/pending",
      },
    };

    const preference = new Preference(client);
    const result = await preference.create({ body });
    res.json({
      id: result.id,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error al crear la preferencia",
    });
  }
});
