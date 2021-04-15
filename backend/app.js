const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const morgan = require('morgan');

let Ddos = require('ddos');
let ddos = new Ddos({ burst: 10, limit: 15 });

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
require('dotenv').config();

mongoose
  .connect(
    'mongodb+srv://' +
      process.env.UserDB +
      ':' +
      process.env.PassDB +
      '@' +
      process.env.DbAddress,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  next();
});

app.use(express.json());

app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use(helmet());

app.use(mongoSanitize());

app.use(ddos.express);

module.exports = app;
