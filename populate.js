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
    stock: {
      "S": { "blanco": 10, "negro": 15, "azul": 5, "rojo": 7 },
      "M": { "blanco": 8, "negro": 10, "azul": 12, "rojo": 5 },
      "L": { "blanco": 14, "negro": 6, "azul": 8, "rojo": 10 },
      "XL": { "blanco": 9, "negro": 12, "azul": 5, "rojo": 9 }
    },
    imagenes: ["imagen1.jpg", "imagen2.jpg"],
    proveedor: {
      nombre: "Proveedor ABC",
      contacto: "contacto@proveedorabc.com"
    }
  },
  {
    nombre: "Camiseta básica de manga corta",
    descripcion: "Una camiseta básica y cómoda para uso diario.",
    precio: 9.99,
    tallas: ["S", "M", "L", "XL"],
    colores: ["blanco", "negro", "gris", "azul", "rojo"],
    stock: {
      "S": { "blanco": 20, "negro": 25, "gris": 15, "azul": 10, "rojo": 5 },
      "M": { "blanco": 18, "negro": 20, "gris": 12, "azul": 15, "rojo": 8 },
      "L": { "blanco": 22, "negro": 15, "gris": 10, "azul": 20, "rojo": 12 },
      "XL": { "blanco": 15, "negro": 10, "gris": 8, "azul": 25, "rojo": 10 }
    },
    imagenes: ["camiseta1.jpg", "camiseta1_back.jpg"],
    proveedor: {
      nombre: "Proveedor A",
      contacto: "proveedora@example.com"
    }
  },
  {
    nombre: "Camiseta estampada de algodón",
    descripcion: "Camiseta de algodón suave con estampado llamativo.",
    precio: 14.99,
    tallas: ["S", "M", "L"],
    colores: ["blanco", "negro", "azul", "verde"],
    stock: {
      "S": { "blanco": 5, "negro": 7, "azul": 6, "verde": 10 },
      "M": { "blanco": 8, "negro": 10, "azul": 5, "verde": 8 },
      "L": { "blanco": 10, "negro": 12, "azul": 7, "verde": 5 }
    },
    imagenes: ["camiseta2.jpg", "camiseta2_back.jpg"],
    proveedor: {
      nombre: "Proveedor B",
      contacto: "proveedorb@example.com"
    }
  },
  {
    nombre: "Camiseta deportiva transpirable",
    descripcion: "Camiseta de tejido técnico transpirable para deportes.",
    precio: 24.99,
    tallas: ["S", "M", "L", "XL", "XXL"],
    colores: ["negro", "azul", "rojo"],
    stock: {
      "S": { "negro": 10, "azul": 8, "rojo": 6 },
      "M": { "negro": 12, "azul": 10, "rojo": 8 },
      "L": { "negro": 15, "azul": 5, "rojo": 7 },
      "XL": { "negro": 5, "azul": 7, "rojo": 6 },
      "XXL": { "negro": 6, "azul": 5, "rojo": 4 }
    },
    imagenes: ["camiseta3.jpg", "camiseta3_back.jpg"],
    proveedor: {
      nombre: "Proveedor C",
      contacto: "proveedorc@example.com"
    }
  },
  {
    nombre: "Camiseta de cuello en V",
    descripcion: "Camiseta de manga corta con cuello en V.",
    precio: 12.99,
    tallas: ["S", "M", "L"],
    colores: ["blanco", "negro", "gris", "azul"],
    stock: {
      "S": { "blanco": 12, "negro": 10, "gris": 8, "azul": 7 },
      "M": { "blanco": 15, "negro": 12, "gris": 10, "azul": 8 },
      "L": { "blanco": 18, "negro": 15, "gris": 12, "azul": 10 }
    },
    imagenes: ["camiseta4.jpg", "camiseta4_back.jpg"],
    proveedor: {
      nombre: "Proveedor D",
      contacto: "proveedord@example.com"
    }
  },
  {
    nombre: "Camiseta holgada de algodón",
    descripcion: "Camiseta de algodón suelta y cómoda.",
    precio: 16.99,
    tallas: ["S", "M", "L", "XL"],
    colores: ["blanco", "negro", "gris"],
    stock: {
      "S": { "blanco": 10, "negro": 12, "gris": 8 },
      "M": { "blanco": 12, "negro": 15, "gris": 10 },
      "L": { "blanco": 15, "negro": 18, "gris": 12 },
      "XL": { "blanco": 8, "negro": 10, "gris": 5 }
    },
    imagenes: ["camiseta6.jpg", "camiseta6_back.jpg"],
    proveedor: {
      nombre: "Proveedor F",
      contacto: "proveedorf@example.com"
    }
  },
  {
    nombre: "Camiseta de tirantes básica",
    descripcion: "Camiseta de tirantes cómoda para climas cálidos.",
    precio: 7.99,
    tallas: ["S", "M", "L", "XL"],
    colores: ["blanco", "negro", "gris"],
    stock: {
      "S": { "blanco": 20, "negro": 25, "gris": 22 },
      "M": { "blanco": 18, "negro": 20, "gris": 25 },
      "L": { "blanco": 22, "negro": 15, "gris": 20 },
      "XL": { "blanco": 15, "negro": 10, "gris": 15 }
    },
    imagenes: ["camiseta5.jpg", "camiseta5_back.jpg"],
    proveedor: {
      nombre: "Proveedor E",
      contacto: "proveedore@example.com"
    }
  },
  {
    nombre: "Camiseta gráfica retro",
    descripcion: "Camiseta con estampado gráfico retro.",
    precio: 19.99,
    tallas: ["S", "M", "L"],
    colores: ["negro", "gris"],
    stock: {
      "S": { "negro": 10, "gris": 5 },
      "M": { "negro": 15, "gris": 10 },
      "L": { "negro": 12, "gris": 8 }
    },
    imagenes: ["camiseta8.jpg", "camiseta8_back.jpg"],
    proveedor: {
      nombre: "Proveedor H",
      contacto: "proveedorh@example.com"
    }
  },
  {
    nombre: "Camiseta con logo bordado",
    descripcion: "Camiseta con logo bordado en el pecho.",
    precio: 17.99,
    tallas: ["S", "M", "L", "XL"],
    colores: ["blanco", "negro", "gris"],
    stock: {
      "S": { "blanco": 10, "negro": 15, "gris": 12 },
      "M": { "blanco": 8, "negro": 10, "gris": 8 },
      "L": { "blanco": 12, "negro": 7, "gris": 10 },
      "XL": { "blanco": 10, "negro": 5, "gris": 7 }
    },
    imagenes: ["camiseta10.jpg", "camiseta10_back.jpg"],
    proveedor: {
      nombre: "Proveedor J",
      contacto: "proveedorj@example.com"
    }
  }
];
const pantalones = [
  {
    nombre: "Pantalón vaquero ajustado",
    descripcion: "Pantalón vaquero ajustado de estilo moderno.",
    precio: 39.99,
    tallas: ["28", "30", "32", "34", "36"],
    colores: ["azul claro", "azul oscuro", "negro"],
    stock: {
      "28": { "azul claro": 10, "azul oscuro": 8, "negro": 7 },
      "30": { "azul claro": 12, "azul oscuro": 10, "negro": 9 },
      "32": { "azul claro": 15, "azul oscuro": 12, "negro": 10 },
      "34": { "azul claro": 18, "azul oscuro": 14, "negro": 12 },
      "36": { "azul claro": 10, "azul oscuro": 8, "negro": 7 }
    },
    imagenes: ["pantalon1.jpg", "pantalon1_back.jpg"],
    proveedor: {
      nombre: "Proveedor A",
      contacto: "proveedora@example.com"
    }
  },
  {
    nombre: "Pantalón chino",
    descripcion: "Pantalón chino de algodón con corte clásico.",
    precio: 29.99,
    tallas: ["30", "32", "34", "36"],
    colores: ["beige", "gris", "caqui"],
    stock: {
      "30": { "beige": 10, "gris": 8, "caqui": 7 },
      "32": { "beige": 12, "gris": 10, "caqui": 9 },
      "34": { "beige": 15, "gris": 12, "caqui": 10 },
      "36": { "beige": 8, "gris": 7, "caqui": 6 }
    },
    imagenes: ["pantalon2.jpg", "pantalon2_back.jpg"],
    proveedor: {
      nombre: "Proveedor B",
      contacto: "proveedorb@example.com"
    }
  },
  {
    nombre: "Pantalón deportivo",
    descripcion: "Pantalón deportivo de tejido técnico para actividades físicas.",
    precio: 34.99,
    tallas: ["S", "M", "L", "XL"],
    colores: ["negro", "gris", "azul"],
    stock: {
      "S": { "negro": 15, "gris": 12, "azul": 10 },
      "M": { "negro": 20, "gris": 15, "azul": 12 },
      "L": { "negro": 25, "gris": 18, "azul": 15 },
      "XL": { "negro": 10, "gris": 8, "azul": 5 }
    },
    imagenes: ["pantalon3.jpg", "pantalon3_back.jpg"],
    proveedor: {
      nombre: "Proveedor C",
      contacto: "proveedorc@example.com"
    }
  },
  {
    nombre: "Pantalón cargo",
    descripcion: "Pantalón cargo con múltiples bolsillos.",
    precio: 45.99,
    tallas: ["30", "32", "34", "36"],
    colores: ["verde militar", "negro", "gris"],
    stock: {
      "30": { "verde militar": 10, "negro": 8, "gris": 7 },
      "32": { "verde militar": 12, "negro": 10, "gris": 9 },
      "34": { "verde militar": 15, "negro": 12, "gris": 10 },
      "36": { "verde militar": 8, "negro": 7, "gris": 6 }
    },
    imagenes: ["pantalon4.jpg", "pantalon4_back.jpg"],
    proveedor: {
      nombre: "Proveedor D",
      contacto: "proveedord@example.com"
    }
  },
  {
    nombre: "Pantalón corto deportivo",
    descripcion: "Pantalón corto deportivo para actividades al aire libre.",
    precio: 19.99,
    tallas: ["S", "M", "L", "XL"],
    colores: ["negro", "azul", "gris"],
    stock: {
      "S": { "negro": 20, "azul": 15, "gris": 12 },
      "M": { "negro": 25, "azul": 18, "gris": 15 },
      "L": { "negro": 30, "azul": 20, "gris": 18 },
      "XL": { "negro": 15, "azul": 10, "gris": 8 }
    },
    imagenes: ["pantalon5.jpg", "pantalon5_back.jpg"],
    proveedor: {
      nombre: "Proveedor E",
      contacto: "proveedore@example.com"
    }
  },
  {
    nombre: "Pantalón cargo corto",
    descripcion: "Pantalón cargo corto con bolsillos laterales.",
    precio: 25.99,
    tallas: ["30", "32", "34", "36"],
    colores: ["caqui", "negro", "gris"],
    stock: {
      "30": { "caqui": 12, "negro": 10, "gris": 8 },
      "32": { "caqui": 15, "negro": 12, "gris": 10 },
      "34": { "caqui": 18, "negro": 15, "gris": 12 },
      "36": { "caqui": 10, "negro": 8, "gris": 6 }
    },
    imagenes: ["pantalon6.jpg", "pantalon6_back.jpg"],
    proveedor: {
      nombre: "Proveedor F",
      contacto: "proveedorf@example.com"
    }
  },
  {
    nombre: "Pantalón de vestir",
    descripcion: "Pantalón de vestir elegante y clásico.",
    precio: 49.99,
    tallas: ["30", "32", "34", "36"],
    colores: ["negro", "gris", "azul marino"],
    stock: {
      "30": { "negro": 12, "gris": 10, "azul marino": 8 },
      "32": { "negro": 15, "gris": 12, "azul marino": 10 },
      "34": { "negro": 18, "gris": 15, "azul marino": 12 },
      "36": { "negro": 10, "gris": 8, "azul marino": 6 }
    },
    imagenes: ["pantalon7.jpg", "pantalon7_back.jpg"],
    proveedor: {
      nombre: "Proveedor G",
      contacto: "proveedorg@example.com"
    }
  },
  {
    nombre: "Pantalón cargo convertible",
    descripcion: "Pantalón cargo convertible en pantalón corto.",
    precio: 54.99,
    tallas: ["S", "M", "L", "XL"],
    colores: ["gris", "verde oliva", "negro"],
    stock: {
      "S": { "gris": 15, "verde oliva": 10, "negro": 8 },
      "M": { "gris": 20, "verde oliva": 15, "negro": 10 },
      "L": { "gris": 25, "verde oliva": 18, "negro": 12 },
      "XL": { "gris": 10, "verde oliva": 8, "negro": 5 }
    },
    imagenes: ["pantalon8.jpg", "pantalon8_back.jpg"],
    proveedor: {
      nombre: "Proveedor H",
      contacto: "proveedorh@example.com"
    }
  },
  {
    nombre: "Pantalón de mezclilla",
    descripcion: "Pantalón de mezclilla de estilo casual.",
    precio: 37.99,
    tallas: ["30", "32", "34", "36"],
    colores: ["azul claro", "azul oscuro", "negro"],
    stock: {
      "30": { "azul claro": 15, "azul oscuro": 12, "negro": 10 },
      "32": { "azul claro": 20, "azul oscuro": 15, "negro": 12 },
      "34": { "azul claro": 25, "azul oscuro": 18, "negro": 15 },
      "36": { "azul claro": 12, "azul oscuro": 10, "negro": 8 }
    },
    imagenes: ["pantalon9.jpg", "pantalon9_back.jpg"],
    proveedor: {
      nombre: "Proveedor I",
      contacto: "proveedori@example.com"
    }
  },
  {
    nombre: "Pantalón de algodón elástico",
    descripcion: "Pantalón de algodón elástico y cómodo.",
    precio: 29.99,
    tallas: ["S", "M", "L", "XL"],
    colores: ["negro", "gris", "beige"],
    stock: {
      "S": { "negro": 10, "gris": 8, "beige": 7 },
      "M": { "negro": 12, "gris": 10, "beige": 9 },
      "L": { "negro": 15, "gris": 12, "beige": 10 },
      "XL": { "negro": 8, "gris": 7, "beige": 6 }
    },
    imagenes: ["pantalon10.jpg", "pantalon10_back.jpg"],
    proveedor: {
      nombre: "Proveedor J",
      contacto: "proveedorj@example.com"
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
    "stock": {
      "S": { "floral": 25, "rojo": 20, "azul": 30 },
      "M": { "floral": 30, "rojo": 25, "azul": 35 },
      "L": { "floral": 35, "rojo": 30, "azul": 40 }
    },
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
    "stock": {
      "S": { "negro": 35, "azul marino": 30, "gris": 25 },
      "M": { "negro": 40, "azul marino": 35, "gris": 30 },
      "L": { "negro": 45, "azul marino": 40, "gris": 35 }
    },
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
    "stock": {
      "S": { "negro": 30, "azul marino": 25, "gris": 20 },
      "M": { "negro": 35, "azul marino": 30, "gris": 25 },
      "L": { "negro": 40, "azul marino": 35, "gris": 30 }
    },
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
    "stock": {
      "S": { "floral": 20, "negro": 25, "azul": 30 },
      "M": { "floral": 25, "negro": 30, "azul": 35 },
      "L": { "floral": 30, "negro": 35, "azul": 40 }
    },
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
    "stock": {
      "S": { "negro": 3, "gris": 2, "azul marino": 20 },
      "M": { "negro": 35, "gris": 30, "azul marino": 25 },
      "L": { "negro": 40, "gris": 35, "azul marino": 30 }
    },
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
    "stock": {
      "S": { "negro": 35, "azul": 30, "gris": 35 },
      "M": { "negro": 40, "azul": 35, "gris": 40 },
      "L": { "negro": 45, "azul": 40, "gris": 45 }
    },
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
    "stock": {
      "S": { "azul claro": 40, "azul oscuro": 45 },
      "M": { "azul claro": 35, "azul oscuro": 40 },
      "L": { "azul claro": 30, "azul oscuro": 35 }
    },
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
    "stock": {
      "S": { "blanco": 25, "negro": 25 },
      "M": { "blanco": 20, "negro": 20 },
      "L": { "blanco": 15, "negro": 15 }
    },
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
    "stock": {
      "S": { "negro": 40, "azul": 35, "rojo": 35 },
      "M": { "negro": 45, "azul": 40, "rojo": 40 },
      "L": { "negro": 50, "azul": 45, "rojo": 45 }
    },
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
    "stock": {
      "S": { "gris": 30, "negro": 30, "azul marino": 25 },
      "M": { "gris": 35, "negro": 35, "azul marino": 30 },
      "L": { "gris": 40, "negro": 40, "azul marino": 35 }
    },
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
    "stock": {
      "S": { "negro": 30, "gris": 30, "azul": 30, "rojo": 30 },
      "M": { "negro": 30, "gris": 30, "azul": 30, "rojo": 30 },
      "L": { "negro": 30, "gris": 30, "azul": 30, "rojo": 30 },
      "XL": { "negro": 30, "gris": 30, "azul": 30, "rojo": 30 }
    },
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
    "stock": {
      "S": { "gris": 30, "negro": 30, "azul": 30 },
      "M": { "gris": 30, "negro": 30, "azul": 30 },
      "L": { "gris": 30, "negro": 30, "azul": 30 }
    },
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
    "stock": {
      "S": { "blanco": 30, "negro": 30, "gris": 30 },
      "M": { "blanco": 30, "negro": 30, "gris": 30 },
      "L": { "blanco": 30, "negro": 30, "gris": 30 }
    },
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
    "stock": {
      "S": { "negro": 20, "gris": 20, "azul": 20 },
      "M": { "negro": 20, "gris": 20, "azul": 20 },
      "L": { "negro": 20, "gris": 20, "azul": 20 },
      "XL": { "negro": 20, "gris": 20, "azul": 20 }
    },
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
    "stock": {
      "S": { "negro": 20, "azul": 20, "rojo": 20 },
      "M": { "negro": 20, "azul": 20, "rojo": 20 },
      "L": { "negro": 20, "azul": 20, "rojo": 20 }
    },
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
    "stock": {
      "S": { "gris": 33, "negro": 33, "azul": 34 },
      "M": { "gris": 33, "negro": 33, "azul": 34 },
      "L": { "gris": 33, "negro": 33, "azul": 34 }
    },
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
    "stock": {
      "S": { "verde militar": 15, "marrón": 15, "beige": 15 },
      "M": { "verde militar": 15, "marrón": 15, "beige": 15 },
      "L": { "verde militar": 15, "marrón": 15, "beige": 15 },
      "XL": { "verde militar": 15, "marrón": 15, "beige": 15 }
    },
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
    "stock": {
      "S": { "negro": 28, "gris": 29, "azul": 28 },
      "M": { "negro": 28, "gris": 29, "azul": 28 },
      "L": { "negro": 28, "gris": 29, "azul": 28 }
    },
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
    "stock": {
      "S": { "negro": 19, "gris": 19, "azul": 19 },
      "M": { "negro": 19, "gris": 19, "azul": 19 },
      "L": { "negro": 19, "gris": 19, "azul": 19 },
      "XL": { "negro": 19, "gris": 19, "azul": 19 }
    },
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
    "stock": {
      "S": { "blanco": 26, "negro": 26, "azul": 26 },
      "M": { "blanco": 26, "negro": 26, "azul": 26 },
      "L": { "blanco": 26, "negro": 26, "azul": 26 }
    },
    "imagenes": ["sudadera10.jpg", "sudadera10_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor J",
      "contacto": "proveedorj@example.com"
    }
  }
];

const zapatos = [
  {
    "nombre": "Zapatillas deportivas",
    "descripcion": "Zapatillas deportivas con diseño moderno.",
    "precio": 59.99,
    "tallas": ["38", "39", "40", "41", "42"],
    "colores": ["blanco", "negro", "gris", "azul"],
    "stock": {
      "38": { "blanco": 20, "negro": 20, "gris": 20, "azul": 20 },
      "39": { "blanco": 20, "negro": 20, "gris": 20, "azul": 20 },
      "40": { "blanco": 20, "negro": 20, "gris": 20, "azul": 20 },
      "41": { "blanco": 20, "negro": 20, "gris": 20, "azul": 20 },
      "42": { "blanco": 20, "negro": 20, "gris": 20, "azul": 20 }
    },
    "imagenes": ["zapatillas1.jpg", "zapatillas1_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor A",
      "contacto": "proveedora@example.com"
    }
  },
  {
    "nombre": "Zapatos de vestir",
    "descripcion": "Zapatos de vestir elegantes y clásicos.",
    "precio": 79.99,
    "tallas": ["38", "39", "40", "41", "42"],
    "colores": ["negro", "marrón", "azul marino"],
    "stock": {
      "38": { "negro": 16, "marrón": 16, "azul marino": 16 },
      "39": { "negro": 16, "marrón": 16, "azul marino": 16 },
      "40": { "negro": 16, "marrón": 16, "azul marino": 16 },
      "41": { "negro": 16, "marrón": 16, "azul marino": 16 },
      "42": { "negro": 16, "marrón": 16, "azul marino": 16 }
    },
    "imagenes": ["zapatos2.jpg", "zapatos2_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor B",
      "contacto": "proveedorb@example.com"
    }
  },
  {
    "nombre": "Botas de montaña",
    "descripcion": "Botas de montaña resistentes y cómodas.",
    "precio": 99.99,
    "tallas": ["38", "39", "40", "41", "42"],
    "colores": ["negro", "gris", "verde"],
    "stock": {
      "38": { "negro": 24, "gris": 24, "verde": 24 },
      "39": { "negro": 24, "gris": 24, "verde": 24 },
      "40": { "negro": 24, "gris": 24, "verde": 24 },
      "41": { "negro": 24, "gris": 24, "verde": 24 },
      "42": { "negro": 24, "gris": 24, "verde": 24 }
    },
    "imagenes": ["botas1.jpg", "botas1_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor C",
      "contacto": "proveedorc@example.com"
    }
  },
  {
    "nombre": "Sandalias de verano",
    "descripcion": "Sandalias de verano cómodas y frescas.",
    "precio": 39.99,
    "tallas": ["38", "39", "40", "41", "42"],
    "colores": ["blanco", "negro", "rojo"],
    "stock": {
      "38": { "blanco": 30, "negro": 30, "rojo": 30 },
      "39": { "blanco": 30, "negro": 30, "rojo": 30 },
      "40": { "blanco": 30, "negro": 30, "rojo": 30 },
      "41": { "blanco": 30, "negro": 30, "rojo": 30 },
      "42": { "blanco": 30, "negro": 30, "rojo": 30 }
    },
    "imagenes": ["sandalias1.jpg", "sandalias1_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor D",
      "contacto": "proveedord@example.com"
    }
  },
  {
    "nombre": "Zapatillas de lona",
    "descripcion": "Zapatillas de lona informales y cómodas.",
    "precio": 29.99,
    "tallas": ["38", "39", "40", "41", "42"],
    "colores": ["blanco", "negro", "gris"],
    "stock": {
      "38": { "blanco": 36, "negro": 36, "gris": 36 },
      "39": { "blanco": 36, "negro": 36, "gris": 36 },
      "40": { "blanco": 36, "negro": 36, "gris": 36 },
      "41": { "blanco": 36, "negro": 36, "gris": 36 },
      "42": { "blanco": 36, "negro": 36, "gris": 36 }
    },
    "imagenes": ["zapatillas2.jpg", "zapatillas2_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor E",
      "contacto": "proveedore@example.com"
    }
  },
  {
    "nombre": "Mocasines de cuero",
    "descripcion": "Mocasines de cuero elegantes y confortables.",
    "precio": 69.99,
    "tallas": ["38", "39", "40", "41", "42"],
    "colores": ["negro", "marrón", "azul"],
    "stock": {
      "38": { "negro": 20, "marrón": 20, "azul": 20 },
      "39": { "negro": 20, "marrón": 20, "azul": 20 },
      "40": { "negro": 20, "marrón": 20, "azul": 20 },
      "41": { "negro": 20, "marrón": 20, "azul": 20 },
      "42": { "negro": 20, "marrón": 20, "azul": 20 }
    },
    "imagenes": ["mocasines1.jpg", "mocasines1_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor F",
      "contacto": "proveedorf@example.com"
    }
  },
  {
    "nombre": "Zapatos deportivos",
    "descripcion": "Zapatos deportivos ligeros y transpirables.",
    "precio": 49.99,
    "tallas": ["38", "39", "40", "41", "42"],
    "colores": ["blanco", "negro", "azul"],
    "stock": {
      "38": { "blanco": 26, "negro": 26, "azul": 26 },
      "39": { "blanco": 26, "negro": 26, "azul": 26 },
      "40": { "blanco": 26, "negro": 26, "azul": 26 },
      "41": { "blanco": 26, "negro": 26, "azul": 26 },
      "42": { "blanco": 26, "negro": 26, "azul": 26 }
    },
    "imagenes": ["zapatos3.jpg", "zapatos3_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor G",
      "contacto": "proveedorg@example.com"
    }
  },
  {
    "nombre": "Botines de cuero",
    "descripcion": "Botines de cuero versátiles y estilosos.",
    "precio": 89.99,
    "tallas": ["38", "39", "40", "41", "42"],
    "colores": ["negro", "marrón", "gris"],
    "stock": {
      "38": { "negro": 18, "marrón": 18, "gris": 18 },
      "39": { "negro": 18, "marrón": 18, "gris": 18 },
      "40": { "negro": 18, "marrón": 18, "gris": 18 },
      "41": { "negro": 18, "marrón": 18, "gris": 18 },
      "42": { "negro": 18, "marrón": 18, "gris": 18 }
    },
    "imagenes": ["botines1.jpg", "botines1_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor H",
      "contacto": "proveedorh@example.com"
    }
  },
  {
    "nombre": "Zapatillas de running",
    "descripcion": "Zapatillas de running con tecnología avanzada.",
    "precio": 69.99,
    "tallas": ["38", "39", "40", "41", "42"],
    "colores": ["negro", "azul", "verde"],
    "stock": {
      "38": { "negro": 22, "azul": 22, "verde": 22 },
      "39": { "negro": 22, "azul": 22, "verde": 22 },
      "40": { "negro": 22, "azul": 22, "verde": 22 },
      "41": { "negro": 22, "azul": 22, "verde": 22 },
      "42": { "negro": 22, "azul": 22, "verde": 22 }
    },
    "imagenes": ["zapatillas4.jpg", "zapatillas4_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor I",
      "contacto": "proveedori@example.com"
    }
  },
  {
    "nombre": "Zapatos de tacón",
    "descripcion": "Zapatos de tacón elegantes para ocasiones especiales.",
    "precio": 79.99,
    "tallas": ["38", "39", "40", "41", "42"],
    "colores": ["negro", "rojo", "nude"],
    "stock": {
      "38": { "negro": 14, "rojo": 14, "nude": 14 },
      "39": { "negro": 14, "rojo": 14, "nude": 14 },
      "40": { "negro": 14, "rojo": 14, "nude": 14 },
      "41": { "negro": 14, "rojo": 14, "nude": 14 },
      "42": { "negro": 14, "rojo": 14, "nude": 14 }
    },
    "imagenes": ["zapatos4.jpg", "zapatos4_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor J",
      "contacto": "proveedorj@example.com"
    }
  }
];

const chaquetas = [
  {
    "nombre": "Chaqueta vaquera",
    "descripcion": "Chaqueta vaquera clásica y atemporal.",
    "precio": 49.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["azul claro", "azul oscuro"],
    "stock": {
      "S": { "azul claro": 25, "azul oscuro": 25 },
      "M": { "azul claro": 25, "azul oscuro": 25 },
      "L": { "azul claro": 25, "azul oscuro": 25 },
      "XL": { "azul claro": 25, "azul oscuro": 25 }
    },
    "imagenes": ["chaqueta1.jpg", "chaqueta1_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor A",
      "contacto": "proveedora@example.com"
    }
  },
  {
    "nombre": "Chaqueta acolchada",
    "descripcion": "Chaqueta acolchada para días fríos.",
    "precio": 79.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["negro", "gris", "azul"],
    "stock": {
      "S": { "negro": 20, "gris": 20, "azul": 20 },
      "M": { "negro": 20, "gris": 20, "azul": 20 },
      "L": { "negro": 20, "gris": 20, "azul": 20 },
      "XL": { "negro": 20, "gris": 20, "azul": 20 }
    },
    "imagenes": ["chaqueta2.jpg", "chaqueta2_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor B",
      "contacto": "proveedorb@example.com"
    }
  },
  {
    "nombre": "Chaqueta de cuero",
    "descripcion": "Chaqueta de cuero elegante y resistente.",
    "precio": 159.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["negro", "marrón", "rojo"],
    "stock": {
      "S": { "negro": 30, "marrón": 30, "rojo": 30 },
      "M": { "negro": 30, "marrón": 30, "rojo": 30 },
      "L": { "negro": 30, "marrón": 30, "rojo": 30 },
      "XL": { "negro": 30, "marrón": 30, "rojo": 30 }
    },
    "imagenes": ["chaqueta3.jpg", "chaqueta3_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor C",
      "contacto": "proveedorc@example.com"
    }
  },
  {
    "nombre": "Chaqueta impermeable",
    "descripcion": "Chaqueta impermeable y transpirable.",
    "precio": 89.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["negro", "azul", "verde"],
    "stock": {
      "S": { "negro": 37, "azul": 37, "verde": 37 },
      "M": { "negro": 37, "azul": 37, "verde": 37 },
      "L": { "negro": 37, "azul": 37, "verde": 37 },
      "XL": { "negro": 37, "azul": 37, "verde": 37 }
    },
    "imagenes": ["chaqueta4.jpg", "chaqueta4_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor D",
      "contacto": "proveedord@example.com"
    }
  },
  {
    "nombre": "Chaqueta bomber",
    "descripcion": "Chaqueta bomber casual y moderna.",
    "precio": 69.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["negro", "verde oliva", "azul"],
    "stock": {
      "S": { "negro": 45, "verde oliva": 45, "azul": 45 },
      "M": { "negro": 45, "verde oliva": 45, "azul": 45 },
      "L": { "negro": 45, "verde oliva": 45, "azul": 45 },
      "XL": { "negro": 45, "verde oliva": 45, "azul": 45 }
    },
    "imagenes": ["chaqueta5.jpg", "chaqueta5_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor E",
      "contacto": "proveedore@example.com"
    }
  },
  {
    "nombre": "Chaqueta de punto",
    "descripcion": "Chaqueta de punto suave y cómoda.",
    "precio": 39.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["gris", "negro", "azul"],
    "stock": {
      "S": { "gris": 30, "negro": 30, "azul": 30 },
      "M": { "gris": 30, "negro": 30, "azul": 30 },
      "L": { "gris": 30, "negro": 30, "azul": 30 },
      "XL": { "gris": 30, "negro": 30, "azul": 30 }
    },
    "imagenes": ["chaqueta6.jpg", "chaqueta6_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor F",
      "contacto": "proveedorf@example.com"
    }
  },
  {
    "nombre": "Chaqueta deportiva",
    "descripcion": "Chaqueta deportiva ligera y transpirable.",
    "precio": 49.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["negro", "azul", "rojo"],
    "stock": {
      "S": { "negro": 33, "azul": 33, "rojo": 33 },
      "M": { "negro": 33, "azul": 33, "rojo": 33 },
      "L": { "negro": 33, "azul": 33, "rojo": 33 },
      "XL": { "negro": 33, "azul": 33, "rojo": 33 }
    },
    "imagenes": ["chaqueta7.jpg", "chaqueta7_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor G",
      "contacto": "proveedorg@example.com"
    }
  },
  {
    "nombre": "Chaqueta de plumas",
    "descripcion": "Chaqueta de plumas ligera y cálida.",
    "precio": 99.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["negro", "azul", "verde"],
    "stock": {
      "S": { "negro": 23, "azul": 23, "verde": 23 },
      "M": { "negro": 23, "azul": 23, "verde": 23 },
      "L": { "negro": 23, "azul": 23, "verde": 23 },
      "XL": { "negro": 23, "azul": 23, "verde": 23 }
    },
    "imagenes": ["chaqueta8.jpg", "chaqueta8_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor H",
      "contacto": "proveedorh@example.com"
    }
  },
  {
    "nombre": "Chaqueta vaquera oversize",
    "descripcion": "Chaqueta vaquera oversize con diseño moderno.",
    "precio": 59.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["azul claro", "azul oscuro"],
    "stock": {
      "S": { "azul claro": 27, "azul oscuro": 27 },
      "M": { "azul claro": 27, "azul oscuro": 27 },
      "L": { "azul claro": 27, "azul oscuro": 27 },
      "XL": { "azul claro": 27, "azul oscuro": 27 }
    },
    "imagenes": ["chaqueta9.jpg", "chaqueta9_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor I",
      "contacto": "proveedori@example.com"
    }
  },
  {
    "nombre": "Chaqueta de cuero biker",
    "descripcion": "Chaqueta de cuero biker con estilo rebelde.",
    "precio": 129.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["negro", "marrón", "rojo"],
    "stock": {
      "S": { "negro": 18, "marrón": 18, "rojo": 18 },
      "M": { "negro": 18, "marrón": 18, "rojo": 18 },
      "L": { "negro": 18, "marrón": 18, "rojo": 18 },
      "XL": { "negro": 18, "marrón": 18, "rojo": 18 }
    },
    "imagenes": ["chaqueta10.jpg", "chaqueta10_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor J",
      "contacto": "proveedorj@example.com"
    }
  }
];

const vestidos = [
  {
    "nombre": "Vestido casual",
    "descripcion": "Vestido casual de algodón para uso diario.",
    "precio": 39.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["azul", "rojo", "negro"],
    "stock": {
      "S": { "azul": 30, "rojo": 30, "negro": 30 },
      "M": { "azul": 30, "rojo": 30, "negro": 30 },
      "L": { "azul": 30, "rojo": 30, "negro": 30 },
      "XL": { "azul": 30, "rojo": 30, "negro": 30 }
    },
    "imagenes": ["vestido1.jpg", "vestido1_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor K",
      "contacto": "proveedork@example.com"
    }
  },
  {
    "nombre": "Vestido de noche",
    "descripcion": "Elegante vestido de noche con detalles brillantes.",
    "precio": 99.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["negro", "azul", "rojo"],
    "stock": {
      "S": { "negro": 17, "azul": 17, "rojo": 16 },
      "M": { "negro": 17, "azul": 17, "rojo": 16 },
      "L": { "negro": 17, "azul": 17, "rojo": 16 },
      "XL": { "negro": 17, "azul": 17, "rojo": 16 }
    },
    "imagenes": ["vestido2.jpg", "vestido2_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor L",
      "contacto": "proveedorl@example.com"
    }
  },
  {
    "nombre": "Vestido estampado",
    "descripcion": "Vestido estampado con diseños florales.",
    "precio": 49.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["blanco", "negro", "azul"],
    "stock": {
      "S": { "blanco": 27, "negro": 27, "azul": 26 },
      "M": { "blanco": 27, "negro": 27, "azul": 26 },
      "L": { "blanco": 27, "negro": 27, "azul": 26 },
      "XL": { "blanco": 27, "negro": 27, "azul": 26 }
    },
    "imagenes": ["vestido3.jpg", "vestido3_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor M",
      "contacto": "proveedorm@example.com"
    }
  },
  {
    "nombre": "Vestido midi",
    "descripcion": "Vestido midi elegante y cómodo.",
    "precio": 59.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["negro", "gris", "rojo"],
    "stock": {
      "S": { "negro": 22, "gris": 22, "rojo": 22 },
      "M": { "negro": 22, "gris": 22, "rojo": 22 },
      "L": { "negro": 22, "gris": 22, "rojo": 22 },
      "XL": { "negro": 22, "gris": 22, "rojo": 22 }
    },
    "imagenes": ["vestido4.jpg", "vestido4_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor N",
      "contacto": "proveedorn@example.com"
    }
  },
  {
    "nombre": "Vestido de verano",
    "descripcion": "Vestido ligero y fresco para el verano.",
    "precio": 34.99,
    "tallas": ["S", "M", "L", "XL"],
    "colores": ["blanco", "azul", "amarillo"],
    "stock": {
      "S": { "blanco": 3, "azul": 3, "amarillo": 34 },
      "M": { "blanco": 33, "azul": 33, "amarillo": 34 },
      "L": { "blanco": 33, "azul": 33, "amarillo": 34 },
      "XL": { "blanco": 33, "azul": 33, "amarillo": 34 }
    },
    "imagenes": ["vestido5.jpg", "vestido5_back.jpg"],
    "proveedor": {
      "nombre": "Proveedor O",
      "contacto": "proveedoro@example.com"
    }
  }
];

const accesorios = [
  {
    "nombre": "Bufanda",
    "descripcion": "Bufanda suave y cálida.",
    "precio": 14.99,
    "colores": ["rojo", "azul", "gris"],
    "stock": {
      "S": { "rojo": 33, "azul": 33, "gris": 34 },
    },
    "imagenes": ["accesorio1.jpg"],
    "proveedor": {
      "nombre": "Proveedor P",
      "contacto": "proveedorp@example.com"
    }
  },
  {
    "nombre": "Gorra",
    "descripcion": "Gorra ajustable y cómoda.",
    "precio": 19.99,
    "colores": ["negro", "azul", "blanco"],
    "stock": {
      "S": { "negro": 33, "azul": 33, "blanco": 34 },
    },
    "imagenes": ["accesorio2.jpg"],
    "proveedor": {
      "nombre": "Proveedor Q",
      "contacto": "proveedorq@example.com"
    }
  },
  {
    "nombre": "Gafas de sol",
    "descripcion": "Gafas de sol con protección UV.",
    "precio": 29.99,
    "colores": ["negro", "marrón", "azul"],
    "stock": {
      "S": { "negro": 33, "marrón": 33, "azul": 34 },
    },
    "imagenes": ["accesorio3.jpg"],
    "proveedor": {
      "nombre": "Proveedor R",
      "contacto": "proveedorr@example.com"
    }
  },
  {
    "nombre": "Cinturón",
    "descripcion": "Cinturón de cuero elegante.",
    "precio": 24.99,
    "colores": ["negro", "marrón", "gris"],
    "stock": {
      "S": { "negro": 33, "marrón": 33, "gris": 34 },
    },
    "imagenes": ["accesorio4.jpg"],
    "proveedor": {
      "nombre": "Proveedor S",
      "contacto": "proveedors@example.com"
    }
  }
];

const bolsos = [
  {
    "nombre": "Bolso de mano",
    "descripcion": "Bolso de mano elegante y versátil.",
    "precio": 59.99,
    "colores": ["negro", "marrón", "rojo"],
    "stock": {
      "S": { "negro": 33, "marrón": 33, "rojo": 34 },
    },
    "imagenes": ["bolso1.jpg"],
    "proveedor": {
      "nombre": "Proveedor T",
      "contacto": "proveedort@example.com"
    }
  },
  {
    "nombre": "Mochila",
    "descripcion": "Mochila espaciosa y cómoda.",
    "precio": 69.99,
    "colores": ["negro", "azul", "gris"],
    "stock": {
      "S": { "negro": 33, "azul": 33, "gris": 34 },
    },
    "imagenes": ["bolso2.jpg"],
    "proveedor": {
      "nombre": "Proveedor U",
      "contacto": "proveedoru@example.com"
    }
  },
  {
    "nombre": "Bolso bandolera",
    "descripcion": "Bolso bandolera práctico y moderno.",
    "precio": 49.99,
    "colores": ["negro", "azul", "marrón"],
    "stock": {
      "S": { "negro": 33, "azul": 33, "marrón": 34 },
    },
    "imagenes": ["bolso3.jpg"],
    "proveedor": {
      "nombre": "Proveedor V",
      "contacto": "proveedorv@example.com"
    }
  },
  {
    "nombre": "Bolso tote",
    "descripcion": "Bolso tote espacioso y elegante.",
    "precio": 79.99,
    "colores": ["negro", "marrón", "gris"],
    "stock": {
      "S": { "negro": 33, "marrón": 33, "gris": 34 },
    },
    "imagenes": ["bolso4.jpg"],
    "proveedor": {
      "nombre": "Proveedor W",
      "contacto": "proveedorw@example.com"
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
    await db.collection('sudaderas').insertMany(sudaderas);
    await db.collection('zapatos').insertMany(zapatos);
    await db.collection('chaquetas').insertMany(chaquetas);
    await db.collection('vestidos').insertMany(vestidos);
    await db.collection('accesorios').insertMany(accesorios);
    await db.collection('bolsos').insertMany(bolsos);

    console.log('Datos insertados correctamente en la base de datos');
  } catch (error) {
    console.error('Error al insertar datos:', error);
  } finally {
    client.close();
  }
}

// Llama a la función para insertar los datos
insertarDatos();
