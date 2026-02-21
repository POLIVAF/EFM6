const express = require('express');
const fs = require('fs');
const path = require('path');
const exphbs = require('express-handlebars');

const app = express();
const PORT = 3000;

// Middlewares base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Handlebars
app.engine('hbs', exphbs.engine({
  extname: 'hbs',
  defaultLayout: 'main',
  layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Rutas HU-01
app.get('/', (req, res) => {
  res.render('home');
});

app.get('/register', (req, res) => {
  res.render('register');
});

app.get('/login', (req, res) => {
  res.render('login');
});

// HU-02: Dashboard con datos persistentes
app.get('/dashboard', (req, res) => {
  try {
    const dataPath = path.join(__dirname, 'data', 'data.json');
    const data = fs.readFileSync(dataPath, 'utf-8'); // lee el archivo
    const parsedData = JSON.parse(data); // parsea a objeto JS

   // Tomamos el primer board del arreglo
    const board = parsedData.boards[0];

    res.render('dashboard', { board });
  } catch (error) {
    console.error('Error leyendo data.json:', error);
    res.status(500).send('Error cargando el dashboard');
  }
});

app.listen(PORT, () => {
  console.log(`🚀 KanbanPro corriendo en http://localhost:${PORT}`);
});