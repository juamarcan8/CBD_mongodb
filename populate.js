const { MongoClient } = require('mongodb');

// Configuración de la conexión a MongoDB
const uri = 'mongodb://localhost:27017';
const dbName = 'CBD'; // Nombre de tu base de datos

// Datos de ejemplo para camisetas, pantalones y faldas
const camisetas = [
  {
    nombre: "Camiseta de manga corta",
    descripcion: "Una camiseta cómoda y elegante para uso diario.",
    precio: 20.99,
    tallas: ["S", "M", "L", "XL"],
    colores: ["blanco", "negro", "azul", "rojo"],
    cantidad: 100,
    imagenes: ["imagen1.jpg", "imagen2.jpg"],
    proveedor: {
      nombre: "Proveedor ABC",
      contacto: "contacto@proveedorabc.com"
    },
    
  },
  {
    "nombre": "Camiseta básica de manga corta",
    "descripcion": "Una camiseta básica y cómoda para uso diario.",
    "precio": 9.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["blanco", "negro", "gris", "azul", "rojo"],
    "cantidad": 200,
    "imagenes": ["camiseta1.jpg", "camiseta1_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor A",
      "contacto": "proveedora@example.com"
    }
  },
  {
    "nombre": "Camiseta estampada de algodón",
    "descripcion": "Camiseta de algodón suave con estampado llamativo.",
    "precio": 14.99,
    "tallas": ["S", "M", "L"],
    "colores": ["blanco", "negro", "azul", "verde"],
    "cantidad": 150,
    "imagenes": ["camiseta2.jpg", "camiseta2_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor B",
      "contacto": "proveedorb@example.com"
    }
  },
  {
    "nombre": "Camiseta deportiva transpirable",
    "descripcion": "Camiseta de tejido técnico transpirable para deportes.",
    "precio": 24.99,
    "tallas": ["S", "M", "L", "XL", "XXL"],
    "colores": ["negro", "azul", "rojo"],
    "cantidad": 100,
    "imagenes": ["camiseta3.jpg", "camiseta3_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor C",
      "contacto": "proveedorc@example.com"
    }
  },
  {
    "nombre": "Camiseta de cuello en V",
    "descripcion": "Camiseta de manga corta con cuello en V.",
    "precio": 12.99,
    "tallas": ["S", "M", "L"],
    "colores": ["blanco", "negro", "gris", "azul"],
    "cantidad": 180,
    "imagenes": ["camiseta4.jpg", "camiseta4_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor D",
      "contacto": "proveedord@example.com"
    }
  },
  {
    "nombre": "Camiseta holgada de algodón",
    "descripcion": "Camiseta de algodón suelta y cómoda.",
    "precio": 16.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["blanco", "negro", "gris"],
    "cantidad": 120,
    "imagenes": ["camiseta6.jpg", "camiseta6_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor F",
      "contacto": "proveedorf@example.com"
    }
  },
  {
    "nombre": "Camiseta de tirantes básica",
    "descripcion": "Camiseta de tirantes cómoda para climas cálidos.",
    "precio": 7.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["blanco", "negro", "gris"],
    "cantidad": 220,
    "imagenes": ["camiseta5.jpg", "camiseta5_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor E",
      "contacto": "proveedore@example.com"
    }
  },
  {
    "nombre": "Camiseta holgada de algodón",
    "descripcion": "Camiseta de algodón suelta y cómoda.",
    "precio": 16.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["blanco", "negro", "gris"],
    "cantidad": 120,
    "imagenes": ["camiseta6.jpg", "camiseta6_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor F",
      "contacto": "proveedorf@example.com"
    }
  },
  {
    "nombre": "Camiseta holgada de algodón",
    "descripcion": "Camiseta de algodón suelta y cómoda.",
    "precio": 16.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["blanco", "negro", "gris"],
    "cantidad": 120,
    "imagenes": ["camiseta6.jpg", "camiseta6_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor F",
      "contacto": "proveedorf@example.com"
    }
  },
  {
    "nombre": "Camiseta gráfica retro",
    "descripcion": "Camiseta con estampado gráfico retro.",
    "precio": 19.99,
    "tallas": ["S", "M", "L"],
    "colores": ["negro", "gris"],
    "cantidad": 90,
    "imagenes": ["camiseta8.jpg", "camiseta8_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor H",
      "contacto": "proveedorh@example.com"
    }
  },
  {
    "nombre": "Camiseta con logo bordado",
    "descripcion": "Camiseta con logo bordado en el pecho.",
    "precio": 17.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["blanco", "negro", "gris"],
    "cantidad": 110,
    "imagenes": ["camiseta10.jpg", "camiseta10_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor J",
      "contacto": "proveedorj@example.com"
    }
  },
  {
    "nombre": "Camiseta con logo bordado",
    "descripcion": "Camiseta con logo bordado en el pecho.",
    "precio": 17.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["blanco", "negro", "gris"],
    "cantidad": 110,
    "imagenes": ["camiseta10.jpg", "camiseta10_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor J",
      "contacto": "proveedorj@example.com"
    }
  }
  
  // Agrega más datos de ejemplo según sea necesario
];

const pantalones =[
  {
    "nombre": "Pantalón vaquero ajustado",
    "descripcion": "Pantalón vaquero ajustado de estilo moderno.",
    "precio": 39.99,
    "tallas": ["28", "30", "32", "34", "36"],
    "colores": ["azul claro", "azul oscuro", "negro"],
    "cantidad": 100,
    "imagenes": ["pantalon1.jpg", "pantalon1_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor A",
      "contacto": "proveedora@example.com"
    }
  },
  {
    "nombre": "Pantalón chino",
    "descripcion": "Pantalón chino de algodón con corte clásico.",
    "precio": 29.99,
    "tallas": ["30", "32", "34", "36"],
    "colores": ["beige", "gris", "caqui"],
    "cantidad": 80,
    "imagenes": ["pantalon2.jpg", "pantalon2_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor B",
      "contacto": "proveedorb@example.com"
    }
  },
  {
    "nombre": "Pantalón deportivo",
    "descripcion": "Pantalón deportivo de tejido técnico para actividades físicas.",
    "precio": 34.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["negro", "gris", "azul"],
    "cantidad": 120,
    "imagenes": ["pantalon3.jpg", "pantalon3_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor C",
      "contacto": "proveedorc@example.com"
    }
  },
  {
    "nombre": "Pantalón cargo",
    "descripcion": "Pantalón cargo con múltiples bolsillos.",
    "precio": 45.99,
    "tallas": ["30", "32", "34", "36"],
    "colores": ["verde militar", "negro", "gris"],
    "cantidad": 70,
    "imagenes": ["pantalon4.jpg", "pantalon4_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor D",
      "contacto": "proveedord@example.com"
    }
  },
  {
    "nombre": "Pantalón corto deportivo",
    "descripcion": "Pantalón corto deportivo para actividades al aire libre.",
    "precio": 19.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["negro", "azul", "gris"],
    "cantidad": 150,
    "imagenes": ["pantalon5.jpg", "pantalon5_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor E",
      "contacto": "proveedore@example.com"
    }
  },
  {
    "nombre": "Pantalón cargo corto",
    "descripcion": "Pantalón cargo corto con bolsillos laterales.",
    "precio": 25.99,
    "tallas": ["30", "32", "34", "36"],
    "colores": ["caqui", "negro", "gris"],
    "cantidad": 90,
    "imagenes": ["pantalon6.jpg", "pantalon6_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor F",
      "contacto": "proveedorf@example.com"
    }
  },
  {
    "nombre": "Pantalón de vestir",
    "descripcion": "Pantalón de vestir elegante y clásico.",
    "precio": 49.99,
    "tallas": ["30", "32", "34", "36"],
    "colores": ["negro", "gris", "azul marino"],
    "cantidad": 60,
    "imagenes": ["pantalon7.jpg", "pantalon7_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor G",
      "contacto": "proveedorg@example.com"
    }
  },
  {
    "nombre": "Pantalón cargo convertible",
    "descripcion": "Pantalón cargo convertible en pantalón corto.",
    "precio": 54.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["gris", "verde oliva", "negro"],
    "cantidad": 110,
    "imagenes": ["pantalon8.jpg", "pantalon8_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor H",
      "contacto": "proveedorh@example.com"
    }
  },
  {
    "nombre": "Pantalón de mezclilla",
    "descripcion": "Pantalón de mezclilla de estilo casual.",
    "precio": 37.99,
    "tallas": ["30", "32", "34", "36"],
    "colores": ["azul claro", "azul oscuro", "negro"],
    "cantidad": 130,
    "imagenes": ["pantalon9.jpg", "pantalon9_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor I",
      "contacto": "proveedori@example.com"
    }
  },
  {
    "nombre": "Pantalón de algodón elástico",
    "descripcion": "Pantalón de algodón elástico y cómodo.",
    "precio": 29.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["negro", "gris", "beige"],
    "cantidad": 100,
    "imagenes": ["pantalon10.jpg", "pantalon10_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor J",
      "contacto": "proveedorj@example.com"
    }
  }
];


const faldas = [
  {
    "nombre": "Falda plisada",
    "descripcion": "Falda plisada de estilo retro con estampado floral.",
    "precio": 29.99,
    "tallas": ["S", "M", "L"],
    "colores": ["floral", "rojo", "azul"],
    "cantidad": 75,
    "imagenes": ["falda1.jpg", "falda1_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor A",
      "contacto": "proveedora@example.com"
    }
  },
  {
    "nombre": "Falda de tubo",
    "descripcion": "Falda de tubo ajustada y elegante.",
    "precio": 34.99,
    "tallas": ["S", "M", "L"],
    "colores": ["negro", "azul marino", "gris"],
    "cantidad": 90,
    "imagenes": ["falda2.jpg", "falda2_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor B",
      "contacto": "proveedorb@example.com"
    }
  },
  {
    "nombre": "Falda plisada midi",
    "descripcion": "Falda plisada de longitud media y estilo versátil.",
    "precio": 39.99,
    "tallas": ["S", "M", "L"],
    "colores": ["negro", "azul marino", "gris"],
    "cantidad": 80,
    "imagenes": ["falda3.jpg", "falda3_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor C",
      "contacto": "proveedorc@example.com"
    }
  },
  {
    "nombre": "Falda larga estampada",
    "descripcion": "Falda larga con estampado floral y corte fluido.",
    "precio": 49.99,
    "tallas": ["S", "M", "L"],
    "colores": ["floral", "negro", "azul"],
    "cantidad": 60,
    "imagenes": ["falda4.jpg", "falda4_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor D",
      "contacto": "proveedord@example.com"
    }
  },
  {
    "nombre": "Falda lápiz",
    "descripcion": "Falda lápiz ajustada y sofisticada.",
    "precio": 42.99,
    "tallas": ["S", "M", "L"],
    "colores": ["negro", "gris", "azul marino"],
    "cantidad": 70,
    "imagenes": ["falda5.jpg", "falda5_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor E",
      "contacto": "proveedore@example.com"
    }
  },
  {
    "nombre": "Falda corta plisada",
    "descripcion": "Falda corta plisada con cintura elástica.",
    "precio": 27.99,
    "tallas": ["S", "M", "L"],
    "colores": ["negro", "azul", "gris"],
    "cantidad": 100,
    "imagenes": ["falda6.jpg", "falda6_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor F",
      "contacto": "proveedorf@example.com"
    }
  },
  {
    "nombre": "Falda de mezclilla",
    "descripcion": "Falda de mezclilla de estilo casual.",
    "precio": 36.99,
    "tallas": ["S", "M", "L"],
    "colores": ["azul claro", "azul oscuro"],
    "cantidad": 85,
    "imagenes": ["falda7.jpg", "falda7_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor G",
      "contacto": "proveedorg@example.com"
    }
  },
  {
    "nombre": "Falda de encaje",
    "descripcion": "Falda de encaje femenina y elegante.",
    "precio": 45.99,
    "tallas": ["S", "M", "L"],
    "colores": ["blanco", "negro"],
    "cantidad": 50,
    "imagenes": ["falda8.jpg", "falda8_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor H",
      "contacto": "proveedorh@example.com"
    }
  },
  {
    "nombre": "Falda plisada corta",
    "descripcion": "Falda plisada corta de estilo juvenil.",
    "precio": 31.99,
    "tallas": ["S", "M", "L"],
    "colores": ["negro", "azul", "rojo"],
    "cantidad": 110,
    "imagenes": ["falda9.jpg", "falda9_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor I",
      "contacto": "proveedori@example.com"
    }
  },
  {
    "nombre": "Falda midi de punto",
    "descripcion": "Falda midi de punto con cintura elástica.",
    "precio": 38.99,
    "tallas": ["S", "M", "L"],
    "colores": ["gris", "negro", "azul marino"],
    "cantidad": 65,
    "imagenes": ["falda10.jpg", "falda10_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor J",
      "contacto": "proveedorj@example.com"
    }
  }
];

const sudaderas = [
  {
    "nombre": "Sudadera con capucha básica",
    "descripcion": "Sudadera con capucha de algodón básica y cómoda.",
    "precio": 29.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["negro", "gris", "azul", "rojo"],
    "cantidad": 120,
    "imagenes": ["sudadera1.jpg", "sudadera1_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor A",
      "contacto": "proveedora@example.com"
    }
  },
  {
    "nombre": "Sudadera con cremallera",
    "descripcion": "Sudadera con cremallera frontal y bolsillos laterales.",
    "precio": 39.99,
    "tallas": ["S", "M", "L"],
    "colores": ["gris", "negro", "azul"],
    "cantidad": 90,
    "imagenes": ["sudadera2.jpg", "sudadera2_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor B",
      "contacto": "proveedorb@example.com"
    }
  },
  {
    "nombre": "Sudadera estampada",
    "descripcion": "Sudadera con estampado llamativo en el pecho.",
    "precio": 34.99,
    "tallas": ["S", "M", "L"],
    "colores": ["blanco", "negro", "gris"],
    "cantidad": 110,
    "imagenes": ["sudadera3.jpg", "sudadera3_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor C",
      "contacto": "proveedorc@example.com"
    }
  },
  {
    "nombre": "Sudadera con capucha y estampado",
    "descripcion": "Sudadera con capucha y estampado en la espalda.",
    "precio": 44.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["negro", "gris", "azul"],
    "cantidad": 80,
    "imagenes": ["sudadera4.jpg", "sudadera4_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor D",
      "contacto": "proveedord@example.com"
    }
  },
  {
    "nombre": "Sudadera con diseño gráfico",
    "descripcion": "Sudadera con diseño gráfico en tonos vibrantes.",
    "precio": 49.99,
    "tallas": ["S", "M", "L"],
    "colores": ["negro", "azul", "rojo"],
    "cantidad": 70,
    "imagenes": ["sudadera5.jpg", "sudadera5_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor E",
      "contacto": "proveedore@example.com"
    }
  },
  {
    "nombre": "Sudadera con cuello redondo",
    "descripcion": "Sudadera con cuello redondo y detalle de logo.",
    "precio": 37.99,
    "tallas": ["S", "M", "L"],
    "colores": ["gris", "negro", "azul"],
    "cantidad": 100,
    "imagenes": ["sudadera6.jpg", "sudadera6_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor F",
      "contacto": "proveedorf@example.com"
    }
  },
  {
    "nombre": "Sudadera con estampado de camuflaje",
    "descripcion": "Sudadera con estampado de camuflaje en tonos tierra.",
    "precio": 54.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["verde militar", "marrón", "beige"],
    "cantidad": 60,
    "imagenes": ["sudadera7.jpg", "sudadera7_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor G",
      "contacto": "proveedorg@example.com"
    }
  },
  {
    "nombre": "Sudadera con detalle de costuras",
    "descripcion": "Sudadera con detalle de costuras y bolsillo en el pecho.",
    "precio": 41.99,
    "tallas": ["S", "M", "L"],
    "colores": ["negro", "gris", "azul"],
    "cantidad": 85,
    "imagenes": ["sudadera8.jpg", "sudadera8_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor H",
      "contacto": "proveedorh@example.com"
    }
  },
  {
    "nombre": "Sudadera con capucha y bolsillos",
    "descripcion": "Sudadera con capucha y bolsillos laterales.",
    "precio": 47.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["negro", "gris", "azul"],
    "cantidad": 75,
    "imagenes": ["sudadera9.jpg", "sudadera9_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor I",
      "contacto": "proveedori@example.com"
    }
  },
  {
    "nombre": "Sudadera con estampado abstracto",
    "descripcion": "Sudadera con estampado abstracto en tonos brillantes.",
    "precio": 52.99,
    "tallas": ["S", "M", "L"],
    "colores": ["blanco", "negro", "azul"],
    "cantidad": 80,
    "imagenes": ["sudadera10.jpg", "sudadera10_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor J",
      "contacto": "proveedorj@example.com"
    }
  }
];


// Función para insertar datos en la base de datos
async function insertarDatos() {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    const db = client.db(dbName);
    await db.dropDatabase();

    // Insertar datos en las colecciones correspondientes
    await db.collection('camisetas').insertMany(camisetas);
    await db.collection('pantalones').insertMany(pantalones);
    await db.collection('faldas').insertMany(faldas);
    await db.collection('sudaderas').insertMany(sudaderas)

    console.log('Datos insertados correctamente en la base de datos');
  } catch (error) {
    console.error('Error al insertar datos:', error);
  } finally {
    client.close();
  }
}

// Llama a la función para insertar los datos
insertarDatos();
