const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const PORT = 3000;
const uri = 'mongodb://localhost:27017'; // URI de conexión a MongoDB
const dbName = 'CBD'; // Nombre de tu base de datos


app.set('view engine', 'ejs');

async function conectarMongoDB() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Conectar al servidor MongoDB
    await client.connect();

    // Seleccionar la base de datos
    const db = client.db(dbName);
    
    console.log('Conexión a la base de datos establecida:', dbName);

    return db;
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error;
  }
}

// Define una ruta para la raíz de la aplicación
app.get('/', (req, res) => {
    res.render('index'); // Renderiza la página index.ejs
});

// Iniciar el servidor y conectar a MongoDB
app.listen(PORT, async () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);

  // Conectar a MongoDB
  try {
    const db = await conectarMongoDB();

    // Pasar la conexión a las rutas que lo necesiten
    app.set('db', db);
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
  }
});


// Ejemplo de código para agregar un nuevo producto a la base de datos
app.post('/productos', (req, res) => {
    // Obtener los datos del producto del cuerpo de la solicitud
    const { nombre, precio, cantidad } = req.body;
  
    // Guardar el producto en la base de datos
    const nuevoProducto = new Producto({ nombre, precio, cantidad });
    nuevoProducto.save()
      .then(producto => {
        res.json(producto);
      })
      .catch(error => {
        console.error(error);
        res.status(500).json({ error: 'Error al agregar el producto' });
      });
  });
  