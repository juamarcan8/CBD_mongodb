const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;
const uri = 'mongodb://localhost:27017'; // URI de conexión a MongoDB
const dbName = 'CBD'; // Nombre de tu base de datos

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('styles'))

let client; // Definir la variable client en el alcance global

async function conectarMongoDB() {
  client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Conexión a la base de datos establecida:', dbName);
    return client.db(dbName);
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error;
  }
}

async function obtenerTiposDeColeccion() {
  try {
    const db = await conectarMongoDB(); // Llama a conectarMongoDB para obtener la base de datos
    const colecciones = await db.listCollections().toArray();
    return colecciones.map(c => c.name);
  } catch (error) {
    console.error('Error al obtener tipos de colección:', error);
    throw error;
  }
}
// Define una ruta para la raíz de la aplicación
app.get('/', (req, res) => {
    res.render('index'); // Renderiza la página index.ejs
});

app.get('/productos', async (req, res) => {
  try {
    let tiposDeColeccion = await obtenerTiposDeColeccion();
    let tipoSeleccionado = req.query.tipo;
    const db = client.db(dbName);
    if (tipoSeleccionado && tiposDeColeccion.includes(tipoSeleccionado)) {
      
      productos = await db.collection(tipoSeleccionado).find({}).toArray();
      res.render('layout', { content: 'search-form', tiposDeColeccion });
    } else {
      tipoSeleccionado = "camisetas"
      productos = await db.collection(tipoSeleccionado).find({}).toArray();
      res.render('layout', { content: 'search-form', tiposDeColeccion });
    }
  } catch (error) {
    console.error('Error al obtener tipos de colección:', error);
    res.status(500).send('Error interno del servidor');
  }
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