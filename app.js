const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
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
 
 async function agregarProducto(tipo, producto, cantidad) {
  try {
    const db = await conectarMongoDB();
    const result = await db.collection(tipo).insertOne(producto);
    for (talla of producto.tallas) {
      for (color of producto.colores){
        await db.collection(tipo).updateOne({
          "_id" :  new ObjectId(producto._id)
        }, {
          $inc: { ["stock." + talla + "." + color]: cantidad }
        })
      }
    }
    return result;
  } catch (error) {
    console.error('Error al agregar producto:', error);
    throw error;
  }
 }

 async function eliminarProducto(productoId) {
  try {
    const db = await conectarMongoDB();
    const result = await db.collection('camisetas').deleteOne({ _id: new ObjectId(productoId) });
   
    return result;
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
}

 
 // Ruta para mostrar el formulario de añadir producto
 app.get('/productos/agregar', async (req, res) => {
  try {
     let tiposDeColeccion = await obtenerTiposDeColeccion();
     res.render('layout', { content: 'add-product-form', tiposDeColeccion });
  } catch (error) {
     console.error('Error al mostrar formulario de agregar producto:', error);
     res.status(500).send('Error interno del servidor');
  }
 });
 
 // Ruta para manejar el formulario de añadir producto
 app.post('/productos/agregar', async (req, res) => {
  try {
     const { tipo, nombre, descripcion, precio, tallas, colores,cantidad, imagenes, 'proveedor-nombre': proveedorNombre, 'proveedor-contacto': proveedorContacto } = req.body;
 
     const producto = {
       nombre,
       descripcion,
       precio: parseFloat(precio),
       tallas: tallas.split(',').map(talla => talla.trim()),
       colores: colores.split(',').map(color => color.trim()),
       imagenes: imagenes.split(',').map(imagen => imagen.trim()),
       proveedor: {
         nombre: proveedorNombre,
         contacto: proveedorContacto
       }
     };
 
     await agregarProducto(tipo, producto,parseInt(cantidad, 10));
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
    let tipoSeleccionado = req.query.tipo || "camisetas"; // Si no se especifica tipo, se usa "camisetas"
    let tallaSeleccionada = req.query.talla;
    let colorSeleccionado = req.query.color;
    let tallasDisponibles = ["S", "M", "L", "XL","30","32","34","36"];
    let coloresDisponibles = ["azul", "gris","blanco","negro","azul claro","azul oscuro","caqui", "verde militar"];
    const db = client.db(dbName);

    if (tiposDeColeccion.includes(tipoSeleccionado)) {
      let filtro = {};

      if (tallaSeleccionada && colorSeleccionado) {
        filtro[`stock.${tallaSeleccionada}.${colorSeleccionado}`] = { $gt: 0 };
      }

      let productos = await db.collection(tipoSeleccionado).find(filtro).toArray();
      res.render('layout', {
        content: 'search-form',
        tiposDeColeccion,
        tallasDisponibles,
        coloresDisponibles,
        productos,
        tipoSeleccionado,
        tallaSeleccionada,
        colorSeleccionado
      });
    } else {
      res.status(404).send('Tipo de producto no válido');
    }
  } catch (error) {
    console.error('Error al obtener tipos de colección:', error);
    res.status(500).send('Error interno del servidor');
  }
});


async function buscarProductoPorId(db, id) {
  const colecciones = ['camisetas', 'pantalones', 'faldas', 'sudaderas', 'zapatos', 'chaquetas', 'vestidos', 'accesorios', 'bolsos'];

  for (let coleccion of colecciones) {
    const producto = await db.collection(coleccion).findOne({ _id: new ObjectId(id) });
    if (producto) {
      return {producto,coleccion};
    }
  }

  return null; // Si no se encuentra en ninguna colección
}

// Ruta para mostrar los detalles de un producto
app.get('/producto/:id', async (req, res) => {
  try {
    const db = await conectarMongoDB();
    const productoId = req.params.id;

    // Comprobar si productoId es un ObjectId válido
    if (!ObjectId.isValid(productoId)) {
      return res.status(400).send('ID de producto no válido');
    }


    const {producto,coleccion} = await buscarProductoPorId(db, productoId);

    if (producto) {
      res.render('layout', { content: 'product-details', producto });
    } else {
      res.status(404).send('Producto no encontrado en ninguna colección');
    }
  } catch (error) {
    console.error('Error al obtener detalles del producto:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.post('/producto/:id/eliminar', async (req, res) => {
  try {
    const productoId = req.params.id;

    if (!ObjectId.isValid(productoId)) {
      return res.status(400).send('ID de producto no válido');
    }

    await eliminarProducto(productoId);
    res.redirect('/productos');
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    res.status(500).send('Error interno del servidor');
  }
});

app.get('/stock/:idProducto', async (req, res) => {
  try {
    const db = await conectarMongoDB();
    const idProducto = req.params.idProducto;

    // Buscar el producto por su ID
    const {producto,coleccion} = await buscarProductoPorId(db, idProducto);
    
    if (!producto) {
      // Si no se encuentra el producto, renderizar una vista de error o redirigir a otra página
      // Aquí asumo que tienes una vista de error llamada 'error.ejs'
      return res.render('error', { message: 'Producto no encontrado' });
    }

    // Obtener el stock del producto
    const stock = await obtenerStockPorProducto(db, idProducto);
  
    // Renderizar la vista de stock con el producto y el stock
    res.render('stock', { idProducto, producto, stock, error: null });
  } catch (error) {
    console.error('Error al buscar el producto:', error);
    res.render('error', { message: 'Error interno del servidor' });
  }
});

app.get("/aumentarStock", async (req, res) => {
  try {
    const db = await conectarMongoDB();
    const { producto, talla, color } = req.query;
  

    const {prenda,coleccion} = await buscarProductoPorId(db,producto);
    db.collection(coleccion).updateOne({ "_id": new ObjectId(producto) },
    { $inc: { ["stock." + talla + "." + color]: 1 } }
    );
    res.redirect(`/stock/${producto}`);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
 
});
app.get("/reducirStock", async (req, res) => {
  try {
    const db = await conectarMongoDB();
    const { producto, talla, color } = req.query;

    const { prenda, coleccion } = await buscarProductoPorId(db, producto);
    
    const productoActual = await db.collection(coleccion).findOne({ "_id": new ObjectId(producto) });
    const stockActual = productoActual.stock[talla][color];
    
    if (stockActual > 0) {
      await db.collection(coleccion).updateOne(
        { "_id": new ObjectId(producto) },
        { $inc: { ["stock." + talla + "." + color]: -1 } }
      );
      res.redirect(`/stock/${producto}`);
    } else {
      res.status(400).send('No se puede reducir el stock, ya está en 0');
    }
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

async function obtenerStockPorProducto(db, idProducto) {
  const {producto,coleccion} = await buscarProductoPorId(db,idProducto)
  return producto.stock;
}

app.get('/alerta/stock', async (req, res) => {
  try {
    const db = client.db(dbName);
    const productosConBajoStock = new Set();
    const colecciones = await obtenerTiposDeColeccion()
    const tallas = ["S", "M", "L", "XL", "30", "32", "34", "36"]; // Todas las tallas posibles
    const coloresDisponibles = await obtenerColoresPrendas(db);

    for (let coleccion of colecciones) {
      for (let talla of tallas) {
        for (let color of coloresDisponibles) {
          const productos = await db.collection(coleccion).find({
            [`stock.${talla}.${color}`]: { $lt: 5 }
          }).toArray();
          productos.forEach(producto => productosConBajoStock.add(JSON.stringify(producto)));
        }
      }
    }
    
    const productosConBajoStockArray = Array.from(productosConBajoStock).map(producto => JSON.parse(producto));
    
    res.render('alerta', {
      content: 'alerta-stock',
      productosConBajoStock: productosConBajoStockArray
    });
  } catch (error) {
    console.error('Error al obtener productos con bajo stock:', error);
    res.status(500).send('Error interno del servidor');
  }
});


async function obtenerColoresPrendas(db) {
  try {
    const coleccion = await obtenerTiposDeColeccion();
    const coloresSet = new Set(); // Definir coloresSet fuera del bucle forEach
    for (let col of coleccion) {
      const prendas = await db.collection(col).find({}).toArray();

      prendas.forEach(prenda => {
        prenda.colores.forEach(color => {
          coloresSet.add(color);
        });
      });
    }

    return Array.from(coloresSet);
  } catch (error) {
    console.error('Error al obtener colores de prendas:', error);
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
 try {
    await conectarMongoDB();
 } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
 }
});
