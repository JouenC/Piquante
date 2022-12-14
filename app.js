// Import from Mongoose, Express and various routes
const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const saucesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');
const path = require('path');

// Allows connection with the MongoDB database
mongoose.connect('mongodb+srv://Piqcjuante:Piqcjcjuante@cluster0.twaoxho.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

// Manage CORS (Cross-Origin Request Sharing) issues
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());

// Setting up the different routes
app.use('/api/sauces', saucesRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

// File export
module.exports = app;