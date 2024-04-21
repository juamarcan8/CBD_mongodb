const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const uri = 'mongodb://localhost:27017'; // URI de conexión a MongoDB
const dbName = 'CBD'; // Nombre de tu base de datos

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('styles'));

let client; // Definir la variable client en el alcance global

async function conectarMongoDB() {
  if (!client) {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
      await client.connect();
      console.log('Conexión a la base de datos establecida:', dbName);
    } catch (error) {
      console.error('Error al conectar a MongoDB:', error);
      throw error;
    }
  }
  return client.db(dbName);
}

async function obtenerTiposDeColeccion() {
  try {
    const db = await conectarMongoDB();
    const colecciones = await db.listCollections().toArray();
    return colecciones.map(c => c.name);
  } catch (error) {
    console.error('Error al obtener tipos de colección:', error);
    throw error;
  }
}

async function agregarProducto(tipo, producto) {
  try {
    const db = await conectarMongoDB();
    const result = await db.collection(tipo).insertOne(producto);
    console.log('Producto agregado:', result);
    return result;
  } catch (error) {
    console.error('Error al agregar producto:', error);
    throw error;
  }
}

// Ruta para mostrar el formulario de añadir producto
app.get('/productos/agregar', async (req, res) => {
  try {
    const tiposDeColeccion = ["category1", "category2"]; // Assuming you have an array of collection types
    res.render('layout', { content: 'add-product-form', tiposDeColeccion }); // Pass tiposDeColeccion in the data object
  } catch (error) {
    console.error('Error al mostrar formulario de agregar producto:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para manejar el formulario de añadir producto
app.post('/productos/agregar', async (req, res) => {
  try {
    const { tipo, nombre, descripcion, precio, tallas, colores, cantidad, imagenes, 'proveedor-nombre': proveedorNombre, 'proveedor-contacto': proveedorContacto } = req.body;

    const producto = {
      nombre,
      descripcion,
      precio: parseFloat(precio),
      tallas: tallas.split(',').map(talla => talla.trim()),
      colores: colores.split(',').map(color => color.trim()),
      cantidad: parseInt(cantidad),
      imagenes: imagenes.split(',').map(imagen => imagen.trim()),
      proveedor: {
        nombre: proveedorNombre,
        contacto: proveedorContacto
      }
    };

    await agregarProducto(tipo, producto);
    res.redirect('/productos');
  } catch (error) {
    console.error('Error al procesar formulario de agregar producto:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Ruta para mostrar el listado de productos
app.get('/productos', async (req, res) => {
  try {
    let tiposDeColeccion = await obtenerTiposDeColeccion();
    let tipoSeleccionado = req.query.type || "camisetas"; // si no se especifica un tipo, se usa "camisetas"
    const db = client.db(dbName);

    if (tiposDeColeccion.includes(tipoSeleccionado)) {
      const productos = await db.collection(tipoSeleccionado).find({}).toArray();
      res.render('layout', { content: 'search-form', tiposDeColeccion, productos });
    } else {
      res.status(404).send('Tipo de colección no encontrado');
    }
  } catch (error) {
    console.error('Error al obtener tipos de colección:', error);
    res.status(500).send('Error interno del servidor');
  }
});

// Define una ruta para la raíz de la aplicación
app.get('/', (req, res) => {
  res.render('index'); // Renderiza la página index.ejs
});

// Iniciar el servidor y conectar a MongoDB
app.listen(PORT, async () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
  try {
    await conectarMongoDB();
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
});
