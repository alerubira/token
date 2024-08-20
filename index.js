const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

// Clave secreta para firmar y verificar el token
const claveSecreta = 'miClaveSuperSecreta123';
const app = express();

// Configuración de Pug
app.set('views', path.join(__dirname, 'vistas'));
app.set('view engine', 'pug');

// Middleware para archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));
// Middleware para parsear JSON en el body de las solicitudes
app.use(bodyParser.json());


// Configuración de rutas
app.get('/', (req, res) => {
    res.render('vistaPrincipal', { title: 'Probando token' });
  });
app.post('/token',(req,res)=>{
  const datosUsuario = req.body;  // Obtener datos del cuerpo de la solicitud
    const token = generarToken(datosUsuario);  // Generar token
    console.log('Token generado:', token);
    res.json({ token });  // Devolver el token como respuesta en formato JSON
})  
app.get('/secundaria',verificarToken,(req,res)=>{
res.render('vistaSecundaria',{title:'pagina secundaria'});
})
app.get('/tercera',(req,res)=>{
  res.render('vistaTercera',{title:'pagina tercera'});
})
// Función para generar un token
function generarToken(datos) {
  return jwt.sign(datos, claveSecreta, { expiresIn: '1h' }); // Token válido por 1 hora
}

// Función para verificar un token

function verificarToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
      return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, claveSecreta, (err, user) => {
      if (err) {
          return res.status(403).json({ error: 'Token inválido o expirado' });
      }
      req.user = user;
      next();
  });
}


// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
