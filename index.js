const express = require('express');
const path = require('path');


const app = express();

// Configuración de Pug
app.set('views', path.join(__dirname, 'vistas'));
app.set('view engine', 'pug');

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de rutas
app.get('/', (req, res) => {
    res.render('index', { title: 'Mi Aplicación Node con Express y Pug' });
  });

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
